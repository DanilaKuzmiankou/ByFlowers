import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from '@mui/material'
import { Link as ReactRouterLink } from 'react-router-dom'
import { FC } from 'react'
import productsStore from '../../store/ProductsStore'
import { CustomMobileMenu } from '../CustomMenu/CustomMobileMenu'
import settingsStore from '../../store/SettingsStore'

interface MobileNavbarElementsProps {
  pages: string[]
  switchPage: Function
  siteLogo: string
  pagesLinks: string[]
}

export const MobileNavbarElements: FC<MobileNavbarElementsProps> = ({
  pages,
  switchPage,
  siteLogo,
  pagesLinks,
}) => {
  return (
    <>
      <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
        <IconButton
          size="large"
          aria-label="mobileMenu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={() => settingsStore.setIsMobileNavbarMenuOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <CustomMobileMenu
        pages={pages}
        pagesLinks={pagesLinks}
        plantsNames={productsStore.plants}
        flowersNames={productsStore.flowers}
        onMenuItemClick={switchPage}
      />
      {/* Mobile Logo image */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'center',
            sm: 'center',
          },
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <ReactRouterLink to="/aboutUs">
          <Box
            component="img"
            sx={{
              ml: 1,
              display: { xs: 'flex', lg: 'none' },
              height: 30,
              width: 42,
              cursor: 'pointer',
            }}
            alt="Logo"
            src={require('../../assets/images/flowersEmblem.png')}
            onClick={() => switchPage(pagesLinks[0])}
          />
        </ReactRouterLink>
        {/* Mobile Logo */}
        <Link
          noWrap
          component={ReactRouterLink}
          to="/aboutUs"
          onClick={() => switchPage(pagesLinks[0])}
          sx={{
            ml: 0.5,
            display: { xs: 'flex', lg: 'none' },
            fontFamily: 'GilroyHeavyItalic',
            flexGrow: 0,
            fontWeight: 700,
            fontSize: {
              xs: '1.4rem',
              md: '1.8rem',
            },
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {siteLogo}
        </Link>
        <Box />
      </Box>
    </>
  )
}
