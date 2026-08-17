/**
 * Verificação funcional de ponta a ponta, sem framework de teste.
 * Percorre os fluxos que o produto promete e falha ruidosamente.
 */
import { chromium } from 'playwright'

const base = process.argv[2] ?? 'http://localhost:4173'
const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'ok  ' : 'FALHA'} ${name}${detail ? ` — ${detail}` : ''}`)
}

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  locale: 'pt-BR',
  colorScheme: 'dark',
})
const page = await context.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))

// ── 1. primeira abertura mostra onboarding ──────────────────────────────
await page.goto(base + '/', { waitUntil: 'networkidle' })
check('onboarding aparece na primeira abertura', await page.getByText('Uma rota, não uma lista.').isVisible())

await page.getByRole('button', { name: 'Pular' }).click()
await page.waitForTimeout(400)
check('pular leva direto para a base', await page.getByText('Núcleos da preparação').isVisible())

// ── 2. estado zerado ────────────────────────────────────────────────────
check(
  'progresso inicia em 0%',
  (await page.locator('aside').getByText('0/30 concluídos').count()) > 0,
)

// ── 3. marcar assistido pelo cartão continuar ───────────────────────────
await page.getByRole('button', { name: 'Marcar assistido' }).first().click()
await page.waitForTimeout(700)
check('toast de conclusão aparece', await page.getByText('Homem de Ferro concluído.').isVisible())
check(
  'contador avança para 1/30',
  (await page.locator('aside').getByText('1/30 concluídos').count()) > 0,
)

// ── 4. desfazer pelo toast ──────────────────────────────────────────────
await page.getByRole('button', { name: 'Desfazer' }).click()
await page.waitForTimeout(500)
check(
  'desfazer volta para 0/30',
  (await page.locator('aside').getByText('0/30 concluídos').count()) > 0,
)

// ── 5. persistência através de reload ───────────────────────────────────
await page.getByRole('button', { name: 'Marcar assistido' }).first().click()
await page.waitForTimeout(500)
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(700)
check(
  'progresso sobrevive ao reload',
  (await page.locator('aside').getByText('1/30 concluídos').count()) > 0,
)
check('onboarding não reaparece', !(await page.getByText('Uma rota, não uma lista.').isVisible()))

// ── 6. deep link direto para um título ──────────────────────────────────
await page.goto(base + '/titulo/thunderbolts', { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
check('deep link de título funciona', await page.getByRole('heading', { name: 'Thunderbolts*' }).isVisible())

// ── 7. spoiler protegido e revelável ────────────────────────────────────
const spoilerButton = page.getByRole('button', { name: /asterisco significa/i })
check('spoiler começa oculto', await spoilerButton.isVisible())
check(
  'corpo do spoiler não está visível antes de revelar',
  (await page.getByText(/apresentado publicamente como/i).count()) === 0,
)
await spoilerButton.click()
await page.waitForTimeout(500)
check('spoiler revela após clique', await page.getByText(/apresentado publicamente como/i).isVisible())

// ── 8. Doomsday não é marcável ──────────────────────────────────────────
await page.goto(base + '/destino', { waitUntil: 'networkidle' })
check('página do destino carrega', await page.getByRole('heading', { name: /Avengers:/ }).first().isVisible())
await page.goto(base + '/titulo/doomsday', { waitUntil: 'networkidle' })
await page.waitForTimeout(300)
check('rota /titulo/doomsday redireciona para /destino', page.url().endsWith('/destino'))

// ── 9. tema alterna e persiste ──────────────────────────────────────────
await page.goto(base + '/', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /tema claro/i }).click()
await page.waitForTimeout(400)
check('tema muda para claro', (await page.locator('html').getAttribute('data-theme')) === 'light')
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(500)
check('tema claro persiste', (await page.locator('html').getAttribute('data-theme')) === 'light')
await page.getByRole('button', { name: /tema escuro/i }).click()
await page.waitForTimeout(300)

// ── 10. busca e filtros ─────────────────────────────────────────────────
await page.goto(base + '/catalogo', { waitUntil: 'networkidle' })
await page.getByLabel('Buscar produção').fill('loki')
await page.waitForTimeout(500)
// busca cobre título, sinopse e papel editorial: "loki" também casa com Ragnarok
const shown = await page.locator('h3').count()
check(
  'busca filtra o catálogo',
  shown > 0 && shown < 6 && (await page.getByRole('heading', { name: 'Loki — 1ª temporada' }).isVisible()),
  `${shown} resultados para "loki"`,
)
await page.getByLabel('Buscar produção').fill('zzzz')
await page.waitForTimeout(500)
check('estado vazio da busca aparece', await page.getByText('Nada encontrado').isVisible())

// ── 11. conclusão de fase dispara celebração ────────────────────────────
await context.addInitScript(() => {
  const slugs = [
    'x-men',
    'x-men-2',
    'x-men-o-confronto-final',
  ]
  const raw = localStorage.getItem('incursao.progress')
  const state = raw ? JSON.parse(raw) : null
  if (!state) return
  for (const s of slugs) state.entries[s] = { status: 'done', at: new Date().toISOString() }
  localStorage.setItem('incursao.progress', JSON.stringify(state))
})
await page.goto(base + '/titulo/x-men-dias-de-um-futuro-esquecido', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await page.getByRole('button', { name: 'Marcar assistido' }).first().click()
await page.waitForTimeout(900)
check(
  'celebração de fase aparece ao fechar o bloco',
  await page.getByRole('heading', { name: 'Legado dos X-Men' }).isVisible(),
)
await page.getByRole('button', { name: 'Seguir' }).click()
await page.waitForTimeout(400)

// ── 12. exportação de progresso ─────────────────────────────────────────
await page.goto(base + '/progresso', { waitUntil: 'networkidle' })
const download = page.waitForEvent('download', { timeout: 8000 })
await page.getByRole('button', { name: /Exportar progresso/ }).click()
const file = await download
check('exporta arquivo JSON', file.suggestedFilename().endsWith('.json'), file.suggestedFilename())

// ── 13. zerar progresso ─────────────────────────────────────────────────
await page.getByRole('button', { name: 'Zerar' }).click()
await page.waitForTimeout(400)
check('confirmação de reset abre em diálogo', await page.getByRole('dialog').isVisible())
await page.getByRole('button', { name: 'Zerar tudo' }).click()
await page.waitForTimeout(700)
// Verificado sem recarregar: o addInitScript da etapa 11 reinjeta dados a cada navegação.
check(
  'reset devolve a 0/30',
  (await page.locator('aside').getByText('0/30 concluídos').count()) > 0,
)
check(
  'localStorage foi limpo pelo reset',
  (await page.evaluate(
    () => Object.keys(JSON.parse(localStorage.getItem('incursao.progress') ?? '{}').entries ?? {}).length,
  )) === 0,
)

// ── 14. acessibilidade básica: navegação por teclado ────────────────────
await page.goto(base + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await page.keyboard.press('Tab')
const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? '')
check('primeiro foco é o skip link', firstFocus.includes('Pular para o conteúdo'), firstFocus)

// ── 15. reduced motion não quebra a renderização ────────────────────────
const reduced = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: 'reduce',
  colorScheme: 'dark',
})
await reduced.addInitScript(() =>
  localStorage.setItem(
    'incursao.progress',
    JSON.stringify({ schema: 1, entries: {}, revealed: [], spoilerPolicy: 'guard', onboarded: true, createdAt: '', updatedAt: '' }),
  ),
)
const rPage = await reduced.newPage()
rPage.on('pageerror', (e) => errors.push('reduced: ' + e.message))
await rPage.goto(base + '/rota', { waitUntil: 'networkidle' })
await rPage.waitForTimeout(600)
check('rota renderiza com prefers-reduced-motion', await rPage.getByText('Fundação dos Vingadores').isVisible())
await reduced.close()

// ── 16. service worker registra (PWA) ───────────────────────────────────
await page.goto(base + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1800)
const swReady = await page.evaluate(async () => {
  if (!('serviceWorker' in navigator)) return false
  const reg = await navigator.serviceWorker.getRegistration()
  return Boolean(reg)
})
check('service worker registrado', swReady)

const manifest = await page.evaluate(async () => {
  const res = await fetch('/manifest.webmanifest')
  if (!res.ok) return null
  return res.json()
})
check(
  'manifest válido e standalone',
  Boolean(manifest && manifest.display === 'standalone' && manifest.icons?.length >= 3),
)

check('nenhum erro de página', errors.length === 0, errors.join(' | '))

await browser.close()

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} verificações passaram.`)
if (failed.length) process.exit(1)
