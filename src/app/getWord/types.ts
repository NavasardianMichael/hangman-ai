import { TAppSlice } from 'store/app/types'

export type GetWordAPI = {
  payload: Pick<TAppSlice['settings'], 'minLettersCount' | 'category' | 'difficulty'> & {
    passedWords: string[]
  }
  response: string
}
