import { Metadata } from 'next'
import App from './App'

export const metadata: Metadata = {
  title: 'Կախաղան | Hangman',
  description:
    'Գուշակիր ընկերոջդ կամ արհեստական բանականության մտապահած բառը: Հայտնի ԿԱԽԱՂԱՆ (HANGMAN) Խաղի հայկական տարբերակն արդեն հասանելի է առցանց',
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
  verification: {
    google: 'oKcgmON-ywG-URRMl98W-eX5-TkXRIo_eyLLz9dapmc',
  },
}

function Home() {
  return <App />
}

export default Home