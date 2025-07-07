import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: 'Կախաղան',
    name: 'Կախաղան | Hangman',
    theme_color: '#ffffff',
    orientation: 'portrait',
    start_url: '/',
    display: 'standalone',
    description: 'Հայտնի ԿԱԽԱՂԱՆ (HANGMAN) Խաղի հայկական տարբերակն արդեն հասանելի է առցանց',
    screenshots: [
      {
        src: '/screenshot1.png',
        type: 'image/png',
        sizes: '379x863',
        form_factor: 'wide',
      },
      {
        src: '/screenshot2.png',
        type: 'image/png',
        sizes: '379x863',
        form_factor: 'narrow',
      },
      {
        src: '/screenshot3.png',
        type: 'image/png',
        sizes: '379x863',
      },
    ],
    icons: [
      {
        src: '/icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-192x192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
