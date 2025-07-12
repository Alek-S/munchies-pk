'use client'
import { useRef, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store, AppStore } from '@/store'

/** Wrapper component to give Next.js components access to Redux store */
export const StoreProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const storeRef = useRef<AppStore>(store())
  if (!storeRef.current) {
    storeRef.current = store()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
