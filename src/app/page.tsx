import { Metadata } from 'next'
import App from './App'

export const metadata: Metadata = {
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
  viewport: 'width=device-width, initial-scale=1.0',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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
    siteName: 'Կախաղան',
    images: [
      {
        url: '/logo-192x192.png',
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

function Home() {
  return <App />
}

export default Home
