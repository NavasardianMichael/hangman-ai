import { useDispatch } from 'react-redux'
import { TAppDispatch } from 'store/main'

export const useAppDispatch: () => TAppDispatch = useDispatch
