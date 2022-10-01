import { FC, useMemo, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import './CustomMenu.css'
import { ControlledMenu, MenuItem, useMenuState } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/core.css'
import { IconContext } from 'react-icons'
import { IoIosArrowDown } from 'react-icons/io'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'

interface MenuProps {
  menuName: string
  buttonStyle: Object
  menuItemsNames: string[]
  onMenuItemClick: Function
  isFlowers: boolean
}

export const CustomHoverMenu: FC<MenuProps> = ({
  menuName,
  buttonStyle,
  menuItemsNames,
  onMenuItemClick,
  isFlowers,
}) => {
  const ref = useRef(null)
  const [isOpen, setOpen] = useState<boolean>()
  const [menuProps, toggleMenu] = useMenuState({ transition: true })
  const arrowIconPropsMemoized = useMemo(
    () => ({ color: 'white', size: '23' }),
    [],
  )

  const switchCategory = () => {
    onMenuItemClick('', '', isFlowers)
  }

  return (
    <div
      onMouseLeave={() => setOpen(false)}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <Button
        ref={ref}
        component={Link}
        to="/products"
        onMouseEnter={() => setOpen(true)}
        sx={buttonStyle}
        disableRipple
        onClick={switchCategory}
      >
        {menuName}
      </Button>
      <Box
        sx={{ display: 'inline-block', margin: '4px 0 0 5px', padding: '0' }}
        aria-label="arrow"
      >
        <IconContext.Provider value={arrowIconPropsMemoized}>
          <IoIosArrowDown />
        </IconContext.Provider>
      </Box>
      <ControlledMenu
        menuClassName="custom-menu"
        align="center"
        {...menuProps}
        state={isOpen ? 'open' : 'closed'}
        anchorRef={ref}
        onMouseLeave={() => setOpen(false)}
        onClose={() => setOpen(false)}
        offsetY={10}
        transition={{ open: true, close: true }}
        transitionTimeout={900}
      >
        {menuItemsNames &&
          menuItemsNames.length > 0 &&
          menuItemsNames?.map((itemName) => (
            <MenuItem
              className="custom-menu-item"
              key={itemName}
              onClick={() => onMenuItemClick(itemName)}
            >
              <Typography
                component={Link}
                to="/products"
                sx={{
                  color: 'black',
                  fontWeight: 500,
                  fontSize: '1.4rem',
                  marginLeft: '4px',
                  textDecoration: 'none',
                  userSelect: 'none',
                }}
                textAlign="center"
              >
                {itemName}
              </Typography>
            </MenuItem>
          ))}
      </ControlledMenu>
    </div>
  )
}
