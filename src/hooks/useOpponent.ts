import { useMemo } from 'react'
import { selectAppOptions } from 'store/app/selectors'
import { TAppSlice } from 'store/app/types'
import { PLAYERS } from 'helpers/constants/app'
import { useAppSelector } from './useAppSelector'

export const useOpponent = (): TAppSlice['currentPlayer'] => {
  const { currentPlayer } = useAppSelector(selectAppOptions)

  return useMemo(() => {
    return currentPlayer === PLAYERS.player1 ? PLAYERS.player2 : PLAYERS.player1
  }, [currentPlayer])
}
