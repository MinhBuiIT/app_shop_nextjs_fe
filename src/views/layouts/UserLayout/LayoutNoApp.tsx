// ** Reacts & Next
import { NextPage } from 'next'
import React from 'react'

// ** MUI
import { Box, CssBaseline, Toolbar } from '@mui/material'

// ** Components
import MainNav from './MainNav'

type TProps = {
  children: React.ReactNode
}

const drawerWidth = 240

const LayoutNoApp: NextPage<TProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* CssBaseline để thiết lập kiểu cơ bản */}
      <CssBaseline />

      {/* AppBar (thanh tiêu đề) */}
      <MainNav drawerWidth={drawerWidth} isNavSidebarOpen={false} setIsNavSidebarOpen={() => {}} isMenuHidden={true} />

      {/* Nội dung chính */}
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default LayoutNoApp
