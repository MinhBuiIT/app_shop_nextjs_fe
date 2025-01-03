'use client'
import { styled, TextField, TextFieldProps } from '@mui/material'

const StyleTextField = styled(TextField)<TextFieldProps>(({ theme }) => {
  return {
    '& .MuiFormLabel-root': {
      position: 'relative',
      color: theme.palette.text.primary,
      fontSize: `${theme.typography.body1.fontSize} !important`,
      lineHeight: `${theme.typography.body1.lineHeight} !important`,
      left: 0,
      textAlign: 'start',
      transform: 'none',
      marginBottom: '4px',
      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.shorter
      }),
      '&.Mui-focused': {
        color: theme.palette.text.primary,
        '&.Mui-error': {
          color: theme.palette.error.main
        }
      }
    },

    '& .MuiInputBase-root': {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '4px',
      border: `1px solid ${theme.palette.divider}`,
      transition: theme.transitions.create(['border-color', 'box-shadow'], {
        duration: theme.transitions.duration.short
      }),
      '&::before, &::after': {
        display: 'none'
      },
      '&.Mui-error': {
        borderColor: theme.palette.error.main
      }
    },
    '& .MuiInputBase-root.MuiFilledInput-root:hover': {
      backgroundColor: theme.palette.background.paper
    },
    '& .MuiInputBase-input.MuiFilledInput-input': {
      padding: '12px 16px'
    }
  }
})

const CustomeTextField = (props: TextFieldProps) => {
  const { variant = 'filled', size = 'small', InputLabelProps, ...rest } = props

  return (
    <StyleTextField
      variant={variant}
      size={size}
      InputLabelProps={{ ...InputLabelProps, shrink: true }}
      {...rest}
      sx={{ marginTop: '8px' }}
    />
  )
}

export default CustomeTextField
