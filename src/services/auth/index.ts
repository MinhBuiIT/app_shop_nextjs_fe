import axios from 'axios'

//Config
import API_CONFIG from 'src/configs/api'

//Types
import { TLoginData } from 'src/types/auth'

export const loginApi = async (data: TLoginData) => {
  return await axios.post(API_CONFIG.AUTH.LOGIN, {
    ...data
  })
}
