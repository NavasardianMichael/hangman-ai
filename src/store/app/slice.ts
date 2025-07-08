import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CATEGORIES, DIFFICULTY_LEVELS, GAME_STAGES, PLAYERS, PLAY_MODES, STORE_VARS } from 'helpers/constants/app'
import { TAppActionPayloads, TAppSlice } from './types'
import { setIndexDB } from 'services/indexDB'

export const initialState: TAppSlice = {
  mode: null,
  currentStage: GAME_STAGES.start,
  currentPlayer: PLAYERS.player1,
  currentWord: '',
  points: {
    player1: 0,
    player2: 0,
  },
  settings: {
    withTimeLimit: true,
    timeLimit: 60,
    pointsToWin: 10,
    minLettersCount: 3,
    category: CATEGORIES.ցանկացած,
    difficulty: DIFFICULTY_LEVELS.միջին,
  },
  playerWon: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppOptions: (state, { payload }: PayloadAction<TAppActionPayloads['setAppOptions']>) => {
      const newState = {
        ...state,
        ...payload,
      }
      // setIndexDB(STORE_VARS.DB_NAME, STORE_VARS.STORE_NAME, STORE_VARS.PRIMARY_KEY, newState)
      return newState
    },
    setGameSettings: (state, { payload }: PayloadAction<TAppActionPayloads['setGameSettings']>) => {
      state.settings = {
        ...state.settings,
        ...payload,
      }
      setIndexDB(STORE_VARS.DB_NAME, STORE_VARS.STORE_NAME, STORE_VARS.PRIMARY_KEY, { settings: state.settings })
    },
    incrementCurrentPlayerPoint: (state) => {
      if (state.mode === PLAY_MODES.single) {
        state.points[PLAYERS.player1] += 1
        return
      }
      const opponent = state.currentPlayer === PLAYERS.player1 ? PLAYERS.player2 : PLAYERS.player1
      state.points[opponent] += 1
      // setIndexDB(STORE_VARS.DB_NAME, STORE_VARS.STORE_NAME, STORE_VARS.PRIMARY_KEY, state)
    },
  },
})

export const { setAppOptions, setGameSettings, incrementCurrentPlayerPoint } = appSlice.actions

export default appSlice.reducer
