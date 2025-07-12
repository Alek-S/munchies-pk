import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

/** so redux hooks use TS types */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
