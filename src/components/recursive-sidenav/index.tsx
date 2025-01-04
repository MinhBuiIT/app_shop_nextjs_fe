'use client'

import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import IconifyIcon from '../Icon'

type TParam = {
  title: string
  path: string
  icon: string
  childrens?: TParam[]
}

const RecursiveSidenav = ({
  obj,
  loop,
  open,
  setOpen
}: {
  obj: TParam
  loop: number
  open: { [key: string]: boolean }
  setOpen: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >
}) => {
  const isChildren = obj.childrens && obj.childrens.length > 0

  return (
    <List component='div' sx={{ pl: loop * 4 }}>
      <ListItemButton
        onClick={() => {
          if (isChildren) {
            setOpen({ ...open, [obj.title]: !open[obj.title] })
          }
        }}
      >
        <ListItemIcon>
          <IconifyIcon icon={obj.icon} />
        </ListItemIcon>
        <ListItemText primary={obj.title} />
        {isChildren &&
          (open[obj.title] ? (
            <IconifyIcon icon={'si:expand-less-line'} />
          ) : (
            <IconifyIcon icon={'si:expand-more-line'} />
          ))}
      </ListItemButton>
      <Collapse in={open[obj.title]} timeout='auto' unmountOnExit>
        {obj.childrens?.map(child => (
          <RecursiveSidenav key={child.title} open={open} loop={loop + 1} obj={child} setOpen={setOpen} />
        ))}
      </Collapse>
    </List>
  )
}

export default RecursiveSidenav
