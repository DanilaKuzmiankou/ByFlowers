import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { IconContext } from 'react-icons'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { list, listItem } from '../../themes'

interface MobileProductsListProps {
  menuName: string
  onMenuItemClick: Function
  productsNames: string[]
  isFlowers: boolean
}
export const MobileProductsList: FC<MobileProductsListProps> = ({
  menuName,
  onMenuItemClick,
  productsNames,
  isFlowers,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const iconPropsMemoized = useMemo(() => ({ color: '#FF0054' }), [])

  return (
    <List disablePadding component="ul">
      <ListItem sx={listItem} divider component="div">
        <ListItemButton onClick={handleMenuClick} sx={list}>
          <ListItemText
            primary={menuName}
            primaryTypographyProps={{
              ...list,
              ...{ color: isMenuOpen ? '#FF0054' : '#000000' },
            }}
          />

          {isMenuOpen ? (
            <IconContext.Provider value={iconPropsMemoized}>
              <MdKeyboardArrowUp />
            </IconContext.Provider>
          ) : (
            <MdKeyboardArrowDown />
          )}
        </ListItemButton>
        <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
          <List component="ul" disablePadding>
            {productsNames?.map((product, index) => (
              <ListItem
                key={product}
                sx={list}
                divider={index !== productsNames.length - 1}
              >
                <ListItemButton
                  sx={{ pl: 3 }}
                  onClick={() =>
                    onMenuItemClick('products', product, isFlowers)
                  }
                >
                  <ListItemText
                    primary={product}
                    primaryTypographyProps={{
                      fontSize: '1.3rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </ListItem>
    </List>
  )
}
