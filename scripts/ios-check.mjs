/**
 * Reproduz a abertura no iOS: WebKit (mesmo motor do Safari), viewport de
 * iPhone e modo standalone. Captura QUALQUER erro que impeça a montagem.
 */
import { webkit, devices } from 'playwright'

const base = process.argv[2] ?? 'https://incursao.vercel.app'
const browser = await webkit.launch()
const ctx = await browser.newContext({
  ...devices['iPhone 13'],
  locale: 'pt-BR',
})

// Emula o app instalado na tela de início.
await ctx.addInitScript(() => {
  Object.defineProperty(navigator, 'standalone', { get: () => true, configurable: true })
})

const page = await ctx.newPage()
const logs = []
page.on('pageerror', (e) => logs.push(`PAGEERROR: ${e.message}\n${e.stack ?? ''}`))
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') logs.push(`${m.type().toUpperCase()}: ${m.text()}`)
})
page.on('requestfailed', (r) =>
  logs.push(`REQUESTFAILED: ${r.url()} — ${r.failure()?.errorText}`),
)
page.on('response', (r) => {
  if (r.status() >= 400) logs.push(`HTTP ${r.status()}: ${r.url()}`)
})

console.log(`abrindo ${base} em WebKit / iPhone 13 / standalone…`)
await page.goto(base, { waitUntil: 'load' })
await page.waitForTimeout(6000)

const bootVisible = await page.evaluate(() => {
  const boot = document.getElementById('boot')
  if (!boot) return 'boot removido (ok)'
  return boot.hasAttribute('hidden') ? 'boot oculto (ok)' : 'BOOT AINDA VISÍVEL — travado'
})
const rootHtml = await page.evaluate(
  () => document.getElementById('root')?.innerHTML.length ?? -1,
)

console.log(`\nestado do boot: ${bootVisible}`)
console.log(`tamanho do #root: ${rootHtml} caracteres (0 = app não montou)`)
console.log(`\n--- logs (${logs.length}) ---`)
for (const l of [...new Set(logs)]) console.log(l)

await page.screenshot({ path: '.shots/ios-webkit-boot.png' })
await browser.close()
