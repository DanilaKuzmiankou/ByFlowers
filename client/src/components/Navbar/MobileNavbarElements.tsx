import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Link } from '@mui/material'
import { FC, MouseEventHandler } from 'react'

interface MobileNavbarElementsProps {
  handleOpenNavMenu: MouseEventHandler<HTMLElement>
  handleCloseNavMenu: MouseEventHandler<HTMLElement>
  anchorElNav: HTMLElement | null
  pages: string[]
  switchPage: Function
  siteLogo: string
  pagesLinks: string[]
}

export const MobileNavbarElements: FC<MobileNavbarElementsProps> = ({
  handleCloseNavMenu,
  handleOpenNavMenu,
  anchorElNav,
  pages,
  switchPage,
  siteLogo,
  pagesLinks,
}) => {
  const isFlowersValues = [undefined, true, false]

  return (
    <>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="mobileMenu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        {/* Mobile navbar links */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          disableScrollLock
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'flex', md: 'none' },
          }}
        >
          {pages.map((page, id) => (
            <MenuItem
              key={page}
              onClick={() =>
                switchPage(pagesLinks[id], '', isFlowersValues[id])
              }
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: '1.9rem',
                }}
                textAlign="center"
              >
                {page}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {/* Mobile Logo image */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'right',
            sm: 'center',
          },
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <Box
          component="img"
          sx={{
            display: { xs: 'flex', md: 'none' },
            mr: 1,
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
            mr: 2,
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
