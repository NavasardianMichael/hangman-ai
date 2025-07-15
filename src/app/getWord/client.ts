import { STORE_VARS } from 'helpers/constants/app'
import { normalizeSpaces } from 'helpers/utils/commons'
import { getPassedWordsFromLocalStorage } from 'helpers/utils/words'
import { GetWordAPI } from './types'

export const getWord = async (settings: GetWordAPI['payload']): Promise<GetWordAPI['response']> => {
  const response = await fetch('/getWord', {
    method: 'POST',
    body: JSON.stringify(settings),
  })
  const data = await response.text()
  const passedWords = getPassedWordsFromLocalStorage()
  const newWord = normalizeSpaces(data).toUpperCase()
  if (!passedWords.includes(newWord)) {
    passedWords.push(newWord)
    localStorage.setItem(STORE_VARS.PASSED_WORDS, JSON.stringify(passedWords))
  }
  return newWord
}
