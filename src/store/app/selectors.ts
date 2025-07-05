import { TRootState } from 'store'
import { PLAY_MODES } from 'helpers/constants/app'

export const selectAppOptions = (state: TRootState) => {
  return state.app
}

export const selectPoints = (state: TRootState) => {
  return state.app.points
}

export const selectIsSingleMode = (state: TRootState) => state.app.mode === PLAY_MODES.single
export const selectGameSettings = (state: TRootState) => state.app.settings
