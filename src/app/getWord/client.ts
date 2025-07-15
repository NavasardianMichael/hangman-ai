import { STORE_VARS } from 'helpers/constants/app'
import { normalizeSpaces } from 'helpers/utils/commons'
import { getPassedWordsFromLocalStorage } from 'helpers/utils/words'
import { GetWordAPI } from './types'

export const getWord = async (
  settings: Omit<GetWordAPI['payload'], 'passedWords'>
): Promise<GetWordAPI['response']> => {
  const passedWords = getPassedWordsFromLocalStorage()
  const response = await fetch('/getWord', {
    method: 'POST',
    body: JSON.stringify({
      ...settings,
      passedWords,
    }),
  })
  const data = await response.text()
  const newWord = normalizeSpaces(data).toUpperCase()
  if (!passedWords.includes(newWord)) {
    passedWords.push(newWord)
    localStorage.setItem(STORE_VARS.PASSED_WORDS, JSON.stringify(passedWords))
  }
  return newWord
}
