/** Estado final: rota 100% concluída, nos dois temas e nas duas larguras. */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const base = process.argv[2] ?? 'http://localhost:4173'
await mkdir('.shots', { recursive: true })

const SLUGS = await fetch(base + '/').then(() => [
  'homem-de-ferro','capitao-america-o-primeiro-vingador','thor','os-vingadores',
  'capitao-america-o-soldado-invernal','vingadores-era-de-ultron','capitao-america-guerra-civil',
  'doutor-estranho','thor-ragnarok','pantera-negra','vingadores-guerra-infinita','vingadores-ultimato',
  'wandavision','falcao-e-o-soldado-invernal','viuva-negra','loki-t1','loki-t2','shang-chi',
  'homem-aranha-sem-volta-para-casa','doutor-estranho-no-multiverso-da-loucura',
  'pantera-negra-wakanda-para-sempre','x-men','x-men-2','x-men-o-confronto-final',
  'x-men-dias-de-um-futuro-esquecido','as-marvels','deadpool-e-wolverine',
  'capitao-america-admiravel-mundo-novo','thunderbolts','quarteto-fantastico-primeiros-passos',
])

const state = {
  schema: 1,
  createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
  updatedAt: new Date().toISOString(),
  entries: Object.fromEntries(SLUGS.map((s) => [s, { status: 'done', at: new Date().toISOString() }])),
  revealed: [],
  spoilerPolicy: 'guard',
  onboarded: true,
}

const browser = await chromium.launch()
for (const theme of ['dark', 'light']) {
  for (const vp of [
    { name: 'desktop', width: 1440, height: 900, mobile: false },
    { name: 'iphone', width: 390, height: 844, mobile: true },
  ]) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
      deviceScaleFactor: 2,
      colorScheme: theme,
      locale: 'pt-BR',
    })
    await ctx.addInitScript(
      ([s, t]) => {
        localStorage.setItem('incursao.progress', s)
        localStorage.setItem('incursao.theme', t)
      },
      [JSON.stringify(state), theme],
    )
    const page = await ctx.newPage()
    for (const [name, route] of [
      ['completo-home', '/'],
      ['completo-progresso', '/progresso'],
      ['completo-rota', '/rota'],
    ]) {
      await page.goto(base + route, { waitUntil: 'networkidle' })
      await page.waitForTimeout(1200)
      await page.screenshot({ path: `.shots/${theme}-${vp.name}-${name}.png` })
    }
    await ctx.close()
  }
}
await browser.close()
console.log('estado final capturado')
