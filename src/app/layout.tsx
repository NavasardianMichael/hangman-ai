import { Metadata } from 'next'

export const metadata: Metadata = {
  manifest: '/manifest.webmanifest',
  title: 'Կախաղան | Hangman',
  description:
    'Գուշակիր արհեստական բանականության մտապահած բառը: Հայտնի ԿԱԽԱՂԱՆ (HANGMAN) Խաղի հայկական տարբերակն արդեն հասանելի է առցանց',
  keywords: [
    'Hangman',
    'Armenian',
    'game',
    'online',
    'multiplayer',
    'виселица',
    'на армянском',
    'армянский',
    'игра',
    'կախաղան',
    'խաղ',
    'Միքայել Նավասարդյան',
    'հայերեն',
    'գուշակել բառ',
    'երկու հոգանոց խաղ',
    'կախամարդ',
    'կախաղան խաղ',
    'հայկական խաղ',
  ],
  robots: 'index, follow',
  verification: {
    google: 'otJjduk66KdJqUVQWUMGb3RCg7U5NGhdFLCDpcjP5_U',
  },
  // viewport: 'width=device-width, initial-scale=1.0',

  alternates: {
    canonical: 'https://hangman-ai-git-master-navasardianmichaels-projects.vercel.app',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192x192.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicon.svg', type: 'image/png' }],
  },
  openGraph: {
    url: 'https://hangman-ai-git-master-navasardianmichaels-projects.vercel.app',
    type: 'website',
    title: 'Կախաղան | Hangman',
    description:
      'Գուշակիր արհեստական բանականության մտապահած բառը: Հայտնի ԿԱԽԱՂԱՆ (HANGMAN) Խաղի հայկական տարբերակն արդեն հասանելի է առցանց',
    siteName: 'Կախաղան | Hangman',
    images: [
      {
        url: '/icon-192x192.png',
        alt: 'Կախաղան - Armenian Hangman Game',
      },
    ],
  },
  authors: [
    {
      name: 'Michael Navasardyan',
      url: 'https://www.linkedin.com/in/michael-navasardyan/',
    },
    {
      name: 'Միքայել Նավասարդյան',
      url: 'https://www.linkedin.com/in/michael-navasardyan/',
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hy">
      <body>{children}</body>
    </html>
  )
}
