const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL
const API_CONFIG = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    ME: `${BASE_URL}/auth/me`,
    LOGOUT: `${BASE_URL}/auth/logout`
  }
}

export default API_CONFIG
