// import { TAppSlice } from "store/app/types";
import { normalizeSpaces } from 'helpers/utils/commons'
import { GetWordAPI } from './types'

export const getWord = async (settings: GetWordAPI['payload']): Promise<GetWordAPI['response']> => {
  const response = await fetch('/getWord', {
    method: 'POST',
    body: JSON.stringify(settings),
  })
  const data = await response.text()
  return normalizeSpaces(data)
}
