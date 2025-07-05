import { createAsyncThunk } from '@reduxjs/toolkit'
import { TAppDispatch, TRootState } from 'store/main'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: TRootState
  dispatch: TAppDispatch
  rejectValue: Error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra: any
}>()
