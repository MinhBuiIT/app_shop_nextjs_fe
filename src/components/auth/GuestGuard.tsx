/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect } from 'react'
import { ACCESS_TOKEN } from 'src/configs/auth'
import { getLocalStorage } from 'src/helper/storage'
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props

  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (user !== null && getLocalStorage(ACCESS_TOKEN)) {
      router.replace('/')
    }
  }, [router, user])
  if (loading || (user !== null && !loading)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export default GuestGuard
