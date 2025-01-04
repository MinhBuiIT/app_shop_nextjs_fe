// MUI
import { Box } from '@mui/material'

// React & Next
import { NextPage } from 'next'
import React from 'react'

type TProps = {
  children: React.ReactNode
}

const BlankLayout: NextPage<TProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {children}
    </Box>
  )
}

export default BlankLayout
