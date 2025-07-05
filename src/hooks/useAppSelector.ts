import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { TRootState } from 'store/main'

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector
