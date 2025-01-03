import { PASSWORD_REG } from 'src/configs/regex'
import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email('Email is not in correct formart').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      PASSWORD_REG,
      'Password must contain at least 8 characters, one uppercase, one lowercase and one special case character'
    ),
  rememberMe: yup.boolean()
})

export const registerSchema = yup.object().shape({
  email: yup.string().email('Email is not in correct formart').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      PASSWORD_REG,
      'Password must contain at least 8 characters, one uppercase, one lowercase and one special case character'
    ),
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match')
})

export type TLoginFormData = yup.InferType<typeof loginSchema>
export type TRegisterFormData = yup.InferType<typeof registerSchema>
