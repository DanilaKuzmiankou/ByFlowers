import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import { observer } from 'mobx-react-lite'
import { list, listItem, productStyles } from '../../themes'
import { CloseButton } from '../CloseButton/CloseButton'
import { MobileProductsList } from './MobileProductsList'
import settingsStore from '../../store/SettingsStore'

interface CustomMobileMenuProps {
  pages: string[]
  pagesLinks: string[]
  plantsNames: string[]
  flowersNames: string[]
  onMenuItemClick: Function
}

export const CustomMobileMenu = observer<CustomMobileMenuProps>(
  ({ pages, pagesLinks, plantsNames, flowersNames, onMenuItemClick }) => {
    return (
      <SwipeableDrawer
        sx={{
          '& .MuiDrawer-paper': {
            width: {
              xs: '70%',
            },
            boxSizing: 'border-box',
            height: '100%',
          },
          display: {
            xs: 'initial',
            md: 'none',
          },
        }}
        anchor="left"
        open={Boolean(settingsStore.isMobileNavbarMenuOpen)}
        onClose={() => settingsStore.setIsMobileNavbarMenuOpen(false)}
        onOpen={() => settingsStore.setIsMobileNavbarMenuOpen(true)}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              margin: '5px 0 7px',
            }}
          >
            <Typography
              sx={{
                ...productStyles.customBoldFont,
                ...productStyles.headerTypographyStyle,
                ...{
                  textAlign: 'left',
                  display: 'inline-block',
                  ml: '10px',
                  fontSize: '2.5rem',
                },
              }}
            >
              Меню
            </Typography>
            <CloseButton
              closeFunction={() =>
                settingsStore.setIsMobileNavbarMenuOpen(false)
              }
            />
          </Box>
          <Box
            sx={{
              padding: '0 20px 10px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              height: '100%',
            }}
          >
            <List component="ul" disablePadding>
              {pages.map((page, index) => (
                <ListItem key={page} sx={listItem} divider component="div">
                  <ListItemButton
                    sx={list}
                    onClick={() => onMenuItemClick('aboutUs')}
                    component={Link}
                    to={pagesLinks[index]}
                  >
                    <ListItemText
                      primary={page}
                      primaryTypographyProps={list}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <MobileProductsList
              menuName="Растения"
              onMenuItemClick={onMenuItemClick}
              productsNames={plantsNames}
              isFlowers={false}
            />
            <MobileProductsList
              menuName="Цветы"
              onMenuItemClick={onMenuItemClick}
              productsNames={flowersNames}
              isFlowers
            />
          </Box>
        </>
      </SwipeableDrawer>
    )
  },
)
