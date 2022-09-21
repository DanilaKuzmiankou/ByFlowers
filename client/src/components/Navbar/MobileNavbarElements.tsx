import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from '@mui/material'
import { FC } from 'react'
import productsStore from '../../store/ProductsStore'
import { CustomMobileMenu } from '../CustomMenu/CustomMobileMenu'
import userStore from '../../store/UserStore'

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
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="mobileMenu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={() => userStore.setIsNavbarMenuOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <CustomMobileMenu
        pages={pages}
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
        <Box
          component="img"
          sx={{
            ml: 1,
            display: { xs: 'flex', md: 'none' },
            height: 30,
            width: 42,
            cursor: 'pointer',
          }}
          alt="Logo"
          src={require('../../assets/images/flowersEmblem.png')}
          onClick={() => switchPage(pagesLinks[0])}
        />
        {/* Mobile Logo */}
        <Link
          noWrap
          onClick={() => switchPage(pagesLinks[0])}
          sx={{
            ml: 1,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 0,
            fontWeight: 700,
            fontSize: '1.4rem',
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
