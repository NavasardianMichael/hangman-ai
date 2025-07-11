import { GoogleGenAI } from '@google/genai'
import { DIFFICULTY_LEVELS } from 'helpers/constants/app'
import { GetWordAPI } from './types'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY })
export async function POST(request: Request) {
  try {
    const payload: GetWordAPI['payload'] = await request.json()
    const { minLettersCount, category, difficulty } = payload

    const AIResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Ստեղծել հայերեն բառ, որը համապատասխանում է հետևյալ չափանիշներին: Բառը պետք է լինի առնվազն ${minLettersCount} տառից բաղկացած, պատկանի "${category}" կատեգորիային  և ունենա "${difficulty}" բարդության մակարդակ հետևյալներից՝ "${Object.values(
        DIFFICULTY_LEVELS
      )}": Պատասխանիր միայն մեկ բառով, եթե թեման չի ենթադրում երկու բառ, օրինակ՝ անուն ազգանուն, առանց լրացուցիչ բացատրությունների կամ մեկնաբանությունների։`,
    })
    const res = AIResponse.text
    return new Response(res)
  } catch (error) {
    console.error('Error generating word:', error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
