/**
 * Inspeção visual real: percorre as telas em três larguras e salva PNGs.
 * Uso: node scripts/shots.mjs [baseUrl]
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const base = process.argv[2] ?? 'http://localhost:4173'
const out = '.shots'
await mkdir(out, { recursive: true })

const VIEWPORTS = [
  { name: 'iphone', width: 390, height: 844, mobile: true },
  { name: 'small', width: 320, height: 690, mobile: true },
  { name: 'tablet', width: 834, height: 1112, mobile: false },
  { name: 'desktop', width: 1440, height: 900, mobile: false },
]

const ROUTES = [
  ['home', '/'],
  ['rota', '/rota'],
  ['catalogo', '/catalogo'],
  ['titulo', '/titulo/loki-t1'],
  ['elenco', '/elenco'],
  ['personagem', '/elenco/doctor-doom'],
  ['conexoes', '/conexoes'],
  ['doom', '/doom'],
  ['destino', '/destino'],
  ['progresso', '/progresso'],
]

const SEED = {
  schema: 1,
  createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  updatedAt: new Date().toISOString(),
  entries: Object.fromEntries(
    [
      'homem-de-ferro',
      'capitao-america-o-primeiro-vingador',
      'thor',
      'os-vingadores',
      'capitao-america-o-soldado-invernal',
      'vingadores-era-de-ultron',
      'capitao-america-guerra-civil',
      'doutor-estranho',
      'thor-ragnarok',
      'pantera-negra',
      'vingadores-guerra-infinita',
      'vingadores-ultimato',
      'wandavision',
      'falcao-e-o-soldado-invernal',
    ].map((slug) => [slug, { status: 'done', at: new Date().toISOString() }]),
  ),
  revealed: [],
  spoilerPolicy: 'guard',
  onboarded: true,
}
SEED.entries['viuva-negra'] = { status: 'watching', at: new Date().toISOString() }

const browser = await chromium.launch()
const problems = []

for (const theme of ['dark', 'light']) {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
      deviceScaleFactor: 2,
      locale: 'pt-BR',
      colorScheme: theme,
    })
    await context.addInitScript(
      ([state, t]) => {
        localStorage.setItem('incursao.progress', state)
        localStorage.setItem('incursao.theme', t)
      },
      [JSON.stringify(SEED), theme],
    )
    const page = await context.newPage()
    page.on('pageerror', (e) => problems.push(`[${theme}/${vp.name}] pageerror: ${e.message}`))
    page.on('console', (m) => {
      if (m.type() === 'error') problems.push(`[${theme}/${vp.name}] console: ${m.text()}`)
    })

    for (const [name, route] of ROUTES) {
      await page.goto(base + route, { waitUntil: 'networkidle' })
      await page.waitForTimeout(900)
      // scroll horizontal do body é defeito de layout: detecta e reporta
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      )
      if (overflow) problems.push(`[${theme}/${vp.name}] ${name}: overflow horizontal`)
      await page.screenshot({ path: `${out}/${theme}-${vp.name}-${name}.png`, fullPage: false })
    }
    await context.close()
  }
}

// Onboarding em estado limpo
const fresh = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
const freshPage = await fresh.newPage()
await freshPage.goto(base + '/', { waitUntil: 'networkidle' })
await freshPage.waitForTimeout(700)
await freshPage.screenshot({ path: `${out}/dark-iphone-onboarding.png` })
await fresh.close()

await browser.close()

if (problems.length) {
  console.log('PROBLEMAS ENCONTRADOS:')
  for (const p of [...new Set(problems)]) console.log(' -', p)
} else {
  console.log('Nenhum erro de console e nenhum overflow horizontal.')
}
