import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'

const useHttps = process.env.HTTPS === '1' || process.env.HTTPS === 'true'

export default defineConfig({
  server: { host: true, https: useHttps ? {} : undefined },
  preview: { host: true, https: useHttps ? {} : undefined },
  plugins: [
    react(),
    useHttps && basicSsl(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'icon-192.png',
        'icon-512.png',
        'icon-maskable.png',
      ],
      manifest: {
        id: '/',
        name: 'Sakina — Prayer Times & Quran',
        short_name: 'Sakina',
        description:
          'Accurate prayer times with adhan, Qibla direction, the Holy Quran, daily adhkar and tasbih.',
        theme_color: '#fbfbfa',
        background_color: '#fbfbfa',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'en',
        dir: 'auto',
        categories: ['lifestyle', 'utilities', 'books'],
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Qibla', short_name: 'Qibla', url: '/qibla' },
          { name: 'Azkars', short_name: 'Azkars', url: '/azkars' },
          { name: 'Quran', short_name: 'Quran', url: '/quran' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.alquran\.cloud\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'quran-api',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api',
              networkTimeoutSeconds: 6,
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
