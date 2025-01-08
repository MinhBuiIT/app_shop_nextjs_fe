import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import LanguageDropdown from '../components/language-dropdown'
import MenuProfile from '../components/menu-profile'
import ModeTheme from '../components/mode-theme'

// ** Hooks i18n

type TProps = {
  drawerWidth: number
  isNavSidebarOpen: boolean
  setIsNavSidebarOpen: (value: boolean) => void
  isMenuHidden?: boolean
}

function MainNav({
  drawerWidth,
  isNavSidebarOpen,
  setIsNavSidebarOpen,
  isMenuHidden = false
}: TProps): React.JSX.Element {
  const theme = useTheme()
  const styleSx = isNavSidebarOpen
    ? { width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }
    : { width: '100%', ml: 0 }

  return (
    <AppBar
      position='fixed'
      sx={{
        ...styleSx,
        color: theme.palette.customColors.main,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        })
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          {!isMenuHidden && (
            <IconButton
              onClick={() => setIsNavSidebarOpen(!isNavSidebarOpen)}
              sx={{
                color:
                  theme.palette.mode === 'light'
                    ? theme.palette.customColors.lightPaperBg
                    : theme.palette.primary.contrastText
              }}
            >
              <IconifyIcon icon={'material-symbols:menu-rounded'} />
            </IconButton>
          )}

          <Typography variant='h6' noWrap component='div' color={'inherit'}>
            Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LanguageDropdown />
          <ModeTheme />

          <MenuProfile />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default MainNav
