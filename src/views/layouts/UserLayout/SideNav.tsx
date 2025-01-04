'use client'
import { Box, Drawer, IconButton, List, Toolbar } from '@mui/material'
import React, { useEffect } from 'react'
import IconifyIcon from 'src/components/Icon'
import RecursiveSidenav from 'src/components/recursive-sidenav'
import { SIDE_NAV } from 'src/configs/layout'

type TProps = {
  drawerWidth: number
  isNavSidebarOpen: boolean
  setIsNavSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function recursiveKeyHasChildrens(obj: { [key: string]: boolean }, arr: typeof SIDE_NAV): { [key: string]: boolean } {
  if (arr.length > 0) {
    obj = arr.reduce((acc: any, item: any) => {
      if (item.childrens && item.childrens.length > 0) {
        acc[item.title] = false
        recursiveKeyHasChildrens(acc, item.childrens)
      }

      return acc
    }, obj)
  }

  return obj
}

function SideNav({ drawerWidth, isNavSidebarOpen, setIsNavSidebarOpen }: TProps): React.JSX.Element {
  const keysParentSideNav = recursiveKeyHasChildrens({}, SIDE_NAV)

  const [open, setOpen] = React.useState<{ [key: string]: boolean }>(keysParentSideNav)

  useEffect(() => {
    if (!isNavSidebarOpen) {
      setOpen(keysParentSideNav)
    }
  }, [isNavSidebarOpen])

  return (
    <Drawer
      variant='persistent'
      open={isNavSidebarOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
      }}
    >
      <Toolbar>
        <IconButton onClick={() => setIsNavSidebarOpen(false)}>
          <IconifyIcon icon={'mingcute:left-line'} />
        </IconButton>
      </Toolbar>

      <Box sx={{ overflow: 'auto' }}>
        <List>
          {SIDE_NAV.map(item => {
            return <RecursiveSidenav key={item.title} loop={0} obj={item} open={open} setOpen={setOpen} />
          })}
        </List>
      </Box>
    </Drawer>
  )
}

export default SideNav
