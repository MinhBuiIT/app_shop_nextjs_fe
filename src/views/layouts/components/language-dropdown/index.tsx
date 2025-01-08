import { Box, BoxProps, IconButton, Popover, styled, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/components/Icon'
import { LANG_LIST } from 'src/configs/i18n'

interface BoxLangStyleProps extends BoxProps {
  selected: boolean
}

const BoxLangStyle = styled(Box)<BoxLangStyleProps>(({ theme, selected }) => {
  return {
    '& .MuiTypography-root': {
      color: !selected
        ? theme.palette.mode === 'light'
          ? theme.palette.grey[700]
          : theme.palette.primary.contrastText
        : theme.palette.primary.main,
      padding: '0px 10px'
    },
    '&': {
      cursor: 'pointer',
      padding: '8px 16px'
    },
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : `none`,
      '& .MuiTypography-root': {
        color: theme.palette.primary.main
      }
    }
  }
})

const LanguageDropdown = () => {
  const {
    i18n: { language, changeLanguage }
  } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', mr: 2 }}>
      <IconButton onClick={handleClick}>
        <IconifyIcon icon={'ic:baseline-language'} />
      </IconButton>

      <Popover
        id={'language-dropdown'}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        {LANG_LIST.map(lang => {
          return (
            <BoxLangStyle
              key={lang.value}
              selected={lang.value === language}
              onClick={() => {
                changeLanguage(lang.value)
                handleClose()
              }}
            >
              <Typography>{lang.label}</Typography>
            </BoxLangStyle>
          )
        })}
      </Popover>
    </Box>
  )
}

export default LanguageDropdown
