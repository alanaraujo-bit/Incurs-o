import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * URL pública do site, resolvida em tempo de build.
 *
 * Scrapers de Open Graph não executam JavaScript e vários (WhatsApp entre
 * eles) não resolvem caminhos relativos, então a imagem social e a canonical
 * precisam ser absolutas no HTML entregue. A Vercel expõe o domínio de
 * produção como variável de build; localmente cai no preview padrão.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return `https://${vercel}`
  return 'http://localhost:4173'
}

/** Substitui %SITE_URL% no index.html pelo domínio real do deploy. */
function siteUrlPlugin() {
  const siteUrl = resolveSiteUrl()
  return {
    name: 'incursao-site-url',
    transformIndexHtml(html: string) {
      return html.replaceAll('%SITE_URL%', siteUrl)
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    siteUrlPlugin(),
    tailwindcss(),
    VitePWA({
      // autoUpdate, e não 'prompt': com prompt, o botão "Atualizar" fica dentro
      // da aplicação. Se a versão em cache não montar, o usuário não alcança o
      // botão e o service worker mantém a versão quebrada para sempre.
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        id: '/',
        name: 'Incursão — rota até Avengers: Doomsday',
        short_name: 'Incursão',
        description:
          'Companion de maratona: a rota curada de filmes e séries para chegar preparado a Avengers: Doomsday.',
        lang: 'pt-BR',
        dir: 'ltr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        orientation: 'portrait-primary',
        background_color: '#08090f',
        theme_color: '#08090f',
        categories: ['entertainment', 'lifestyle', 'utilities'],
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Continuar maratona', short_name: 'Continuar', url: '/?continuar=1' },
          { name: 'A rota', short_name: 'Rota', url: '/rota' },
          { name: 'Meu progresso', short_name: 'Progresso', url: '/progresso' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,webmanifest}'],
        navigateFallback: '/index.html',
        // Estes precisam vir da rede, nunca do fallback de navegação.
        navigateFallbackDenylist: [/^\/sw\.js$/, /^\/manifest\.webmanifest$/, /^\/social\.png$/],
        cleanupOutdatedCaches: true,
        // Assume o controle imediatamente para que uma correção chegue na
        // primeira abertura seguinte, sem depender de fechar todas as abas.
        skipWaiting: true,
        clientsClaim: true,
      },
      devOptions: { enabled: false },
    }),
  ],
  build: {
    // As rotas secundárias já são divididas por import dinâmico em App.tsx.
    chunkSizeWarningLimit: 700,
  },
})
