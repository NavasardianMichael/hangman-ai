import { GoogleGenAI } from '@google/genai'
import { TAppSlice } from 'store/app/types'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY })

console.log({ k: process.env.GEMINI_KEY })
export async function GET(payload: TAppSlice['settings']) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Generate a random word with at least ${payload.minLettersCount} letters. The word should be suitable for a game of hangman.`,
  })

  return response.text
}
