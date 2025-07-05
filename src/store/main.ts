'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appSlice } from './app/slice'

export const store = configureStore({
  reducer: combineReducers({
    app: appSlice.reducer,
  }),
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch


