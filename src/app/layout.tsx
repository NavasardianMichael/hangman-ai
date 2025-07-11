import { Metadata } from 'next'
import Script from 'next/script'

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
  alternates: {
    canonical: 'https://hangman-ai-ivory.vercel.app/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192x192.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicon.svg', type: 'image/png' }],
  },
  openGraph: {
    url: 'https://hangman-ai-ivory.vercel.app/',
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
  creator: 'Միքայել Նավասարդյան',
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
  category: 'game',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hy">
      <head>
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),
          dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NFWCRW7P');
  `}
        </Script>
      </head>
      <body><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NFWCRW7P"
        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>{children}</body>
    </html>
  )
}
