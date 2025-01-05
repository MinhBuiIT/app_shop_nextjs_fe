'use client'

// MUI Library
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material'

//React Hook Form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

// React Library
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import CustomeTextField from 'src/components/custom-text-field'
import IconifyIcon from 'src/components/Icon'
import { registerSchema, TRegisterFormData } from 'src/utils/schema'

// Images
import { FacebookIcon, GoogleIcon } from 'src/components/icons'
import registerDark from '/public/images/register-dark.png'
import registerLight from '/public/images/register-light.png'

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'
    })
  }
}))

type TProps = {}
const initialDataForm: TRegisterFormData = {
  email: '',
  password: '',
  confirmPassword: ''
}
const LoginPage: NextPage<TProps> = () => {
  const theme = useTheme()
  const {
    handleSubmit,
    control,
    clearErrors,
    formState: { errors }
  } = useForm<TRegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: initialDataForm
  })
  const [isVisibilityPassword, setIsVisibilityPassword] = useState(false)
  const [isVisibilityConfirmPassword, setIsVisibilityConfirmPassword] = useState(false)
  const onSubmit = (data: TRegisterFormData) => {
    console.log('data', { data })
  }
  console.log('errors', errors)

  return (
    <Box sx={{ display: 'flex', gap: 20, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          display: {
            xs: 'none',
            sm: 'flex'
          },
          justifyContent: 'center',
          alignItems: 'center',
          height: {
            xs: '0',
            sm: '500px',
            md: '600px'
          },
          flex: 1,
          padding: '26px 0',
          marginLeft: '28px',
          backgroundColor: theme.palette.mode === 'light' ? theme.palette.customColors.bodyBg : 'transparent'
        }}
      >
        <Image
          priority={true}
          src={theme.palette.mode === 'light' ? registerLight : registerDark}
          alt='Login-Imag'
          width={0}
          height={0}
          style={{ width: 'auto', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <SignUpContainer
        direction='column'
        justifyContent='space-between'
        sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ padding: 8 }} width={'100%'}>
          <Typography component='h1' variant='h4' sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Controller
                name='email'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomeTextField
                    label='Email *'
                    onChange={e => {
                      clearErrors('email')
                      onChange(e)
                    }}
                    onBlur={onBlur}
                    value={value || ''}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    FormHelperTextProps={{
                      classes: {
                        root: 'margin-x-0'
                      }
                    }}
                    placeholder='Enter your email'
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomeTextField
                    label='Password *'
                    onChange={e => {
                      clearErrors('password')
                      onChange(e)
                    }}
                    onBlur={onBlur}
                    value={value || ''}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    FormHelperTextProps={{
                      classes: {
                        root: 'margin-x-0'
                      }
                    }}
                    placeholder='Enter your password'
                    type={isVisibilityPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end' sx={{ cursor: 'pointer' }}>
                          <IconButton
                            onClick={e => {
                              e.stopPropagation()
                              setIsVisibilityPassword(!isVisibilityPassword)
                            }}
                          >
                            <IconifyIcon
                              icon={
                                isVisibilityPassword
                                  ? 'material-symbols-light:visibility-outline'
                                  : 'material-symbols-light:visibility-off-outline-rounded'
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />

              <Controller
                name='confirmPassword'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomeTextField
                    label='Confirm Password *'
                    onChange={e => {
                      clearErrors('confirmPassword')
                      onChange(e)
                    }}
                    onBlur={onBlur}
                    value={value || ''}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    FormHelperTextProps={{
                      classes: {
                        root: 'margin-x-0'
                      }
                    }}
                    placeholder='Enter your confirm password'
                    type={isVisibilityConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end' sx={{ cursor: 'pointer' }}>
                          <IconButton
                            onClick={e => {
                              e.stopPropagation()
                              setIsVisibilityConfirmPassword(!isVisibilityConfirmPassword)
                            }}
                          >
                            <IconifyIcon
                              icon={
                                isVisibilityConfirmPassword
                                  ? 'material-symbols-light:visibility-outline'
                                  : 'material-symbols-light:visibility-off-outline-rounded'
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />

              <Button type='submit' fullWidth variant='contained'>
                Sign up
              </Button>
            </Box>
          </form>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: '16px' }}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
              sx={{
                borderColor: theme.palette.grey[400],
                color: `rgba(${theme.palette.customColors.main})`,
                backgroundColor: theme.palette.customColors.bodyBg
              }}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
              sx={{
                borderColor: theme.palette.grey[400],
                color: `rgba(${theme.palette.customColors.main})`,
                backgroundColor: theme.palette.customColors.bodyBg,
                marginTop: '8px'
              }}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Do you have an account? <Link href='/login'>Sign in</Link>
            </Typography>
          </Box>
        </Box>
      </SignUpContainer>
    </Box>
  )
}

export default LoginPage
