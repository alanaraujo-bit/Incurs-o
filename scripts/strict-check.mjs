/**
 * Verifica, em modo desenvolvimento (StrictMode ativo), que a celebração de
 * fase dispara exatamente uma vez por marco — e não duas.
 */
import { chromium } from 'playwright'

const base = process.argv[2] ?? 'http://localhost:5199'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'dark' })

await ctx.addInitScript(() => {
  localStorage.setItem(
    'incursao.progress',
    JSON.stringify({
      schema: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      entries: Object.fromEntries(
        ['x-men', 'x-men-2', 'x-men-o-confronto-final'].map((s) => [
          s,
          { status: 'done', at: new Date().toISOString() },
        ]),
      ),
      revealed: [],
      spoilerPolicy: 'guard',
      onboarded: true,
    }),
  )
})

const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))

await page.goto(base + '/titulo/x-men-dias-de-um-futuro-esquecido', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.getByRole('button', { name: 'Marcar assistido' }).first().click()
await page.waitForTimeout(1200)

const overlays = await page.getByRole('alertdialog').count()
console.log(`overlays de celebração renderizados: ${overlays} (esperado: 1)`)

// Um segundo marcar/desmarcar não deve reabrir a celebração da mesma fase.
await page.getByRole('button', { name: 'Seguir' }).click()
await page.waitForTimeout(500)
await page.getByRole('button', { name: 'Assistido' }).first().click()
await page.waitForTimeout(400)
await page.getByRole('button', { name: 'Marcar assistido' }).first().click()
await page.waitForTimeout(1000)
const second = await page.getByRole('alertdialog').count()
console.log(`celebração ao refazer o mesmo marco: ${second} (esperado: 1)`)

console.log(errors.length ? `ERROS: ${errors.join(' | ')}` : 'nenhum erro em modo dev/StrictMode')
await browser.close()
process.exit(overlays === 1 && errors.length === 0 ? 0 : 1)
