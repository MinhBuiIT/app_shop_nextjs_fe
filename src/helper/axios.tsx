// ** Axios Interceptor **
import axios from 'axios'

// ** JWT Decode
import { jwtDecode } from 'jwt-decode'

// ** Next
import { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { ReactNode } from 'react'

// ** Config
import API_CONFIG from 'src/configs/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/configs/auth'

// ** Storage
import { getLocalStorage } from './storage'

const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL
const axiosInstance = axios.create({
  baseURL: BASE_URL
})

type TProp = {
  children: ReactNode
}

const handleRedirectToLogin = (router: NextRouter) => {
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

const Interceptor: NextPage<TProp> = ({ children }: TProp) => {
  const router = useRouter()

  axiosInstance.interceptors.request.use(
    async config => {
      const accessToken = getLocalStorage(ACCESS_TOKEN)
      const refreshToken = getLocalStorage(REFRESH_TOKEN)

      if (accessToken) {
        const { exp: expAT } = jwtDecode(accessToken)
        if ((expAT || 0) > Date.now() / 1000) {
          config.headers.Authorization = `Bearer ${accessToken}`
        } else if (refreshToken) {
          const { exp: expRT } = jwtDecode(refreshToken)
          if ((expRT || 0) > Date.now() / 1000) {
            // Call refresh token api
            await axios
              .post(
                API_CONFIG.AUTH.REFRESH,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`
                  }
                }
              )
              .then(response => {
                const newAccessToken = response.data.data['access_token']
                config.headers.Authorization = `Bearer ${newAccessToken}`
              })
              .catch(() => {
                // Redirect to login
                handleRedirectToLogin(router)
              })
          } else {
            // Redirect to login
            handleRedirectToLogin(router)
          }
        } else {
          // Redirect to login
          handleRedirectToLogin(router)
        }
      } else {
        // Redirect to login
        handleRedirectToLogin(router)
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )

  return <>{children}</>
}

export default axiosInstance
export { Interceptor }
