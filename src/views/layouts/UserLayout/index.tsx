// ** Reacts & Next
import { NextPage } from 'next'
import React from 'react'

// ** MUI
import { Box, CssBaseline, Toolbar } from '@mui/material'

// ** Components
import MainNav from './MainNav'
import SideNav from './SideNav'

type TProps = {
  children: React.ReactNode
}

const drawerWidth = 240

const UserLayout: NextPage<TProps> = ({ children }) => {
  const [isNavSidebarOpen, setIsNavSidebarOpen] = React.useState(true)

  return (
    <Box sx={{ display: 'flex' }}>
      {/* CssBaseline để thiết lập kiểu cơ bản */}
      <CssBaseline />

      {/* AppBar (thanh tiêu đề) */}
      <MainNav
        drawerWidth={drawerWidth}
        isNavSidebarOpen={isNavSidebarOpen}
        setIsNavSidebarOpen={setIsNavSidebarOpen}
      />

      {/* Drawer (Sidebar) */}
      <SideNav
        drawerWidth={drawerWidth}
        isNavSidebarOpen={isNavSidebarOpen}
        setIsNavSidebarOpen={setIsNavSidebarOpen}
      />

      {/* Nội dung chính */}
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default UserLayout
