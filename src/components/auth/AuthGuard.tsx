/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect } from 'react'
import { ACCESS_TOKEN } from 'src/configs/auth'
import { getLocalStorage } from 'src/helper/storage'
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (user === null && !getLocalStorage(ACCESS_TOKEN)) {
      const { asPath } = router
      if (asPath !== '/') {
        // Khi mà đang ở trang khác trang chủ mà token hết hạn thì sẽ chuyển hướng về trang login và lưu lại trang hiện tại
        router.replace({
          query: { returnUrl: asPath },
          pathname: '/login'
        })
      } else {
        router.replace('/login')
      }
    }
  }, [router, user])

  if (loading || (user === null && !loading)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export default AuthGuard
