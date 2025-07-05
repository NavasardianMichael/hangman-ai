import { GoogleGenAI } from '@google/genai'


export async function POST(request: Request) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY })
  try {
    const payload = await request.json();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a random armenian word with at least ${payload.minLettersCount} letters. The word should be suitable for a game of hangman. Just return the word without any additional text or formatting.`,
    })
    const res = response.text
    return new Response(res)
  }
  catch (error) {
    console.error('Error generating word:', error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
