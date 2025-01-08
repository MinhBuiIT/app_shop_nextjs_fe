import { IconButton } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import { useSettings } from 'src/hooks/useSettings'

const ModeTheme = () => {
  const { settings, saveSettings } = useSettings()

  const changeMode = () => {
    const newMode = settings.mode === 'light' ? 'dark' : 'light'
    saveSettings({ ...settings, mode: newMode })
  }

  return (
    <IconButton onClick={changeMode}>
      <IconifyIcon icon={settings.mode === 'light' ? 'ic:sharp-dark-mode' : 'material-symbols:light-mode'} />
    </IconButton>
  )
}

export default ModeTheme
