const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL
const API_CONFIG = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    ME: `/auth/me`,
    LOGOUT: `/auth/logout`,
    REFRESH: `${BASE_URL}/auth/refresh-token`
  }
}

export default API_CONFIG
