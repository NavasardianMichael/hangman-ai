'use client'

import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { getIndexDB } from 'services/indexDB'
import { setAppOptions } from 'store/app/slice'
import { TAppSlice } from 'store/app/types'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { STORE_VARS } from 'helpers/constants/app'

export const IndexDbProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isPending, setIsPending] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsPending(true)
    const restoreState = async () => {
      const storedState = await getIndexDB<TAppSlice>(STORE_VARS.DB_NAME, STORE_VARS.STORE_NAME, STORE_VARS.PRIMARY_KEY)
      if (storedState && Object.keys(storedState).length > 0) dispatch(setAppOptions(storedState))
      setIsPending(false)
    }
    restoreState()
  }, [dispatch])

  if (isPending) return null

  return <>{children}</>
}

export default IndexDbProvider
