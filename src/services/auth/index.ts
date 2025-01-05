import axios from 'axios'

//Config
import API_CONFIG from 'src/configs/api'
import axiosInstance from 'src/helper/axios'

//Types
import { TLoginData } from 'src/types/auth'

export const loginApi = async (data: TLoginData) => {
  return await axios.post(API_CONFIG.AUTH.LOGIN, {
    ...data
  })
}

export const logoutApi = async () => {
  return await axiosInstance.post(API_CONFIG.AUTH.LOGOUT)
}
