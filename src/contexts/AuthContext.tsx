// ** React Imports
import { createContext, ReactNode, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import API_CONFIG from 'src/configs/api'
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from 'src/configs/auth'

// ** Types
import { getLocalStorage, removeLocalStorage, setLocalStorage } from 'src/helper/storage'
import { loginApi } from 'src/services/auth'
import { AuthValuesType, ErrCallbackType, LoginParams, UserDataType } from './types'

// ** Libs

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = getLocalStorage(ACCESS_TOKEN)
      console.log('storedToken', storedToken)

      setLoading(true)
      if (storedToken) {
        await axios
          .get(API_CONFIG.AUTH.ME, {
            headers: {
              Authorization: `Bearer ` + storedToken
            }
          })
          .then(async response => {
            setLoading(false)

            setUser({ ...response.data.data })
          })
          .catch(() => {
            removeLocalStorage([USER_DATA, REFRESH_TOKEN, ACCESS_TOKEN])
            setUser(null)
            setLoading(false)
            if (!router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
        if (!router.pathname.includes('login')) {
          router.replace('/login')
        }
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    loginApi({ email: params.email, password: params.password })
      .then(response => {
        const { access_token, refresh_token } = response.data.data

        params.rememberMe ? setLocalStorage([{ key: REFRESH_TOKEN, value: refresh_token }]) : null
        const returnUrl = router.query.returnUrl

        const userData = response.data.data.user
        setUser({ ...userData })
        setLocalStorage([{ key: ACCESS_TOKEN, value: access_token }])

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    removeLocalStorage([USER_DATA, REFRESH_TOKEN, ACCESS_TOKEN])
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
