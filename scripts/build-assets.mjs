/**
 * Gera os assets binários do produto (ícones da PWA e imagem social) a partir
 * de SVG escrito à mão. Rodar com `npm run assets` sempre que a marca mudar.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const iconsDir = join(publicDir, 'icons')

const BG = '#08090f'
const GOLD = '#e3ab4f'

const mark = (size, padding) => {
  const c = size / 2
  const r = size * 0.26
  const offset = size * 0.095
  const stroke = Math.max(2, size * 0.055)
  return `
    <circle cx="${c - offset}" cy="${c}" r="${r}" fill="none" stroke="${GOLD}" stroke-width="${stroke}"/>
    <circle cx="${c + offset}" cy="${c}" r="${r}" fill="none" stroke="${GOLD}" stroke-width="${stroke}" opacity="0.45"/>
  `.replace('__pad', String(padding))
}

const icon = (size, { maskable = false } = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <radialGradient id="g" cx="50%" cy="34%" r="76%">
      <stop offset="0%" stop-color="#14161f"/>
      <stop offset="100%" stop-color="${BG}"/>
    </radialGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${maskable ? 0 : size * 0.21}" fill="url(#g)"/>
  <g transform="translate(${maskable ? size * 0.5 : size * 0.5} ${maskable ? size * 0.5 : size * 0.5}) scale(${maskable ? 0.72 : 1}) translate(${-size * 0.5} ${-size * 0.5})">
    ${mark(size)}
  </g>
</svg>`

const social = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="18%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#1a1c26"/>
      <stop offset="100%" stop-color="${BG}"/>
    </radialGradient>
    <radialGradient id="glow" cx="82%" cy="88%" r="55%">
      <stop offset="0%" stop-color="#35b489" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#35b489" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g opacity="0.16" stroke="${GOLD}" stroke-width="1.2" fill="none">
    <circle cx="880" cy="315" r="250"/>
    <circle cx="1010" cy="315" r="250"/>
  </g>

  <g transform="translate(84 92)">
    <circle cx="16" cy="16" r="15" fill="none" stroke="${GOLD}" stroke-width="3"/>
    <circle cx="28" cy="16" r="15" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0.45"/>
    <text x="60" y="24" font-family="Archivo, Helvetica, Arial, sans-serif" font-size="24" font-weight="800" letter-spacing="3" fill="#f2f3f7">INCURSÃO</text>
  </g>

  <text x="84" y="300" font-family="Archivo, Helvetica, Arial, sans-serif" font-size="82" font-weight="800" fill="#f2f3f7" letter-spacing="-2">Sua rota até</text>
  <text x="84" y="386" font-family="Archivo, Helvetica, Arial, sans-serif" font-size="82" font-weight="800" fill="${GOLD}" letter-spacing="-2">Avengers: Doomsday</text>

  <text x="84" y="452" font-family="Helvetica, Arial, sans-serif" font-size="27" fill="#a8adbd">30 produções em ordem curada · o motivo de cada uma · seu progresso salvo</text>

  <g font-family="'JetBrains Mono', monospace" font-size="19" fill="#6d7386" letter-spacing="3">
    <text x="84" y="546">30 PRODUÇÕES</text>
    <text x="330" y="546">6 NÚCLEOS</text>
    <text x="540" y="546">SEM CADASTRO</text>
    <text x="800" y="546">INSTALÁVEL</text>
  </g>
  <rect x="84" y="500" width="1032" height="1" fill="#232733"/>
</svg>`

await mkdir(iconsDir, { recursive: true })

const jobs = [
  [join(iconsDir, 'icon-192.png'), icon(192), 192],
  [join(iconsDir, 'icon-512.png'), icon(512), 512],
  [join(iconsDir, 'maskable-512.png'), icon(512, { maskable: true }), 512],
  [join(iconsDir, 'apple-touch-icon.png'), icon(180), 180],
]

for (const [out, svg, size] of jobs) {
  await sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toFile(out)
  console.log('gerado', out)
}

await sharp(Buffer.from(social)).png({ compressionLevel: 9 }).toFile(join(publicDir, 'social.png'))
console.log('gerado', join(publicDir, 'social.png'))

// robots + headers auxiliares
await writeFile(
  join(publicDir, 'robots.txt'),
  'User-agent: *\nAllow: /\n',
  'utf8',
)
