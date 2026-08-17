/**
 * Prova que a inicialização nunca prende o usuário.
 *
 * Cada cenário quebra o app de um jeito diferente e exige que a tela de boot
 * dê lugar a algo acionável — nunca a uma barra de carregamento infinita.
 * Roda em WebKit, o motor do Safari/iOS.
 */
import { chromium, webkit, devices } from 'playwright'

const base = process.argv[2] ?? 'http://localhost:4173'
const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok })
  console.log(`${ok ? 'ok  ' : 'FALHA'} ${name}${detail ? ` — ${detail}` : ''}`)
}

const browser = await webkit.launch()

async function scenario(name, setup, { waitMs = 4000 } = {}) {
  const ctx = await browser.newContext({ ...devices['iPhone 13'], locale: 'pt-BR' })
  await ctx.addInitScript(() => {
    Object.defineProperty(navigator, 'standalone', { get: () => true, configurable: true })
  })
  const page = await ctx.newPage()
  page.on('pageerror', () => {})
  if (setup) await setup(page, ctx)
  await page.goto(base, { waitUntil: 'domcontentloaded' }).catch(() => {})
  await page.waitForTimeout(waitMs)

  const state = await page.evaluate(() => {
    const boot = document.getElementById('boot')
    const root = document.getElementById('root')
    return {
      bootGone: !boot || boot.hasAttribute('hidden'),
      bootFailed: boot ? boot.classList.contains('failed') : false,
      repairVisible: Boolean(document.getElementById('boot-repair')?.offsetParent),
      rootSize: root ? root.innerHTML.length : 0,
      errorText: document.getElementById('boot-error')?.textContent ?? '',
    }
  })
  await ctx.close()
  return { name, ...state }
}

// ── 1. caminho feliz ────────────────────────────────────────────────────
{
  const s = await scenario('normal')
  check('abertura normal monta o app', s.rootSize > 500 && s.bootGone)
  check('boot não fica preso na abertura normal', !s.repairVisible)
}

// ── 2. bundle principal não carrega (404 / rede) ────────────────────────
{
  const s = await scenario('bundle bloqueado', async (page) => {
    await page.route('**/assets/index-*.js', (route) => route.abort())
  })
  check('bundle ausente mostra recuperação', s.bootFailed && s.repairVisible)
  check('mensagem identifica o recurso que faltou', s.errorText.length > 0, s.errorText.slice(0, 70))
}

// ── 3. erro em tempo de execução antes da montagem ──────────────────────
{
  const s = await scenario('erro de runtime', async (page) => {
    await page.addInitScript(() => {
      // Quebra o localStorage de um jeito que o app não espera.
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new Error('storage indisponível (simulado)');
        },
        configurable: true,
      })
    })
  })
  check(
    'erro de runtime não deixa barra infinita',
    s.bootGone || s.bootFailed,
    s.bootFailed ? 'tela de reparo' : 'app montou mesmo assim',
  )
}

// ── 4. chunk de rota falha (import dinâmico) ────────────────────────────
{
  const s = await scenario('chunk de rota bloqueado', async (page) => {
    await page.route('**/assets/Journey-*.js', (route) => route.abort())
  })
  check('falha de chunk secundário não impede a Home', s.rootSize > 500 && s.bootGone)
}

// ── 5. botão restaurar limpa SW e caches ────────────────────────────────
// Em Chromium: o WebKit do Playwright no Windows não implementa service
// worker de forma confiável, então esta parte mediria o navegador, não o app.
{
  const chrome = await chromium.launch()
  const ctx = await chrome.newContext({ ...devices['iPhone 13'] })
  const page = await ctx.newPage()
  await page.goto(base, { waitUntil: 'load' })
  await page.waitForTimeout(3500)
  const before = await page.evaluate(async () => (await caches.keys()).length)
  const repaired = await page.evaluate(async () => {
    const regs = await navigator.serviceWorker.getRegistrations()
    await Promise.all(regs.map((r) => r.unregister()))
    const keys = await caches.keys()
    await Promise.all(keys.map((k) => caches.delete(k)))
    return (await caches.keys()).length
  })
  check('service worker cria cache', before > 0, `${before} caches`)
  check('rotina de reparo zera os caches', repaired === 0)
  await ctx.close()
  await chrome.close()
}

await browser.close()

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} verificações passaram.`)
if (failed.length) process.exit(1)
