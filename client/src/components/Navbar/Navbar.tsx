import * as React from 'react'
import { useEffect, useMemo } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { IconContext } from 'react-icons'
import { Badge, BadgeProps, Link } from '@mui/material'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { styled } from '@mui/material/styles'
import userStore from '../../store/UserStore'
import productsStore from '../../store/ProductsStore'
import basketStore from '../../store/BasketStore'
import { CustomClickMenu } from '../CustomMenu/CustomClickMenu'
import { HideOnScroll } from '../HideOnScroll/HideOnScroll'
import { getProductsTypes } from '../../api/store/Product'
import { CustomHoverMenu } from '../CustomMenu/CustomHoverMenu'
import { MobileNavbarElements } from './MobileNavbarElements'

const siteLogo = 'FlowersDelivery'
const pages = ['About us', 'Flowers', 'Plants']
const pagesLinks = ['aboutUs', 'products', 'products']
const pages2 = ['About us']

const navbarButtonsStyle = {
  fontFamily: 'IntroCondBlack',
  minWidth: '0',
  backgroundColor: 'inherit',
  color: '#fff',
  fontSize: '1.70rem',
  lineHeight: 1,
  fontWeight: 700,
  margin: '24px 0 24px 33px',
  padding: '5px 0 5px',
  '&:hover': {
    backgroundColor: 'inherit',
    '&:after': {
      opacity: 1,
    },
  },
  '&:after': {
    opacity: 0,
    position: 'absolute',
    width: '100%',
    height: '1px',
    bottom: 0,
    left: '0px',
    content: '""',
    borderTop: '2px solid #FFFFFF',
    transition: 'opacity 1000ms ease',
  },
}

const navbarLoginButtonStyle = {
  my: 2,
  mx: 0.5,
  fontFamily: 'IntroCondBlack',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '.2rem solid #fff',
  borderRadius: '7px',
  padding: '7px',
  transition: 'background-color 200ms ease',
  color: '#fff',
  fontSize: '1.20rem',
  lineHeight: 1,
  fontWeight: 700,
}

export const Navbar = observer(() => {
  useEffect(() => {
    async function fetch() {
      if (productsStore.flowers?.length === 0) {
        const flowersTypesResponse = await getProductsTypes(true)
        productsStore.setFlowers(flowersTypesResponse.data)
      }
      if (productsStore.plants?.length === 0) {
        const plantsTypesResponse = await getProductsTypes(false)
        productsStore.setPlants(plantsTypesResponse.data)
      }
    }

    fetch()
  }, [])

  const navigate = useNavigate()

  const iconPropsMemoized = useMemo(() => ({ color: 'white', size: '23' }), [])

  const switchPage = (
    linkName: string,
    productType?: string,
    isFlowers?: boolean,
  ): void => {
    window.scrollTo(0, 0)
    productsStore.setSelectedNavbarProduct(productType || '')
    if (isFlowers !== undefined) productsStore.setIsFlowers(isFlowers)
    userStore.setIsNavbarMenuOpen(false)
    navigate(linkName)
  }

  const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    '& .MuiBadge-badge': {
      height: '15px',
      minWidth: '15px',
      width: '15px',
      right: 3,
      top: 4,
      padding: '0 4px',
    },
  }))

  const upperNavbarButtonsStyle = {
    margin: '3px',
    padding: 0,
  }

  const changeBasketState = () => {
    basketStore.setIsBasketOpen(!basketStore.isBasketOpen)
  }

  const handleLogin = () => {
    userStore.setIsAuthDialogOpen(true)
    userStore.setIsLoginPageOpen(true)
  }

  return (
    <HideOnScroll>
      <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <AppBar
          sx={{ p: 0, m: 0, backgroundColor: '#1B1A27' }}
          position="static"
        >
          <Container
            sx={{ zIndex: 10, p: { xs: '0 2px', md: '0 24px' } }}
            maxWidth="xl"
          >
            <Toolbar disableGutters>
              <Box
                component="img"
                onClick={() => switchPage(pagesLinks[0])}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 1,
                  height: 55,
                  width: 75,
                  cursor: 'pointer',
                }}
                alt="Logo"
                src={require('../../assets/images/flowersEmblem.png')}
              />
              <Link
                variant="h6"
                noWrap
                onClick={() => switchPage(pagesLinks[0])}
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  textAlign: 'right',
                  fontFamily: 'GilroyHeavyItalic',
                  fontWeight: 700,
                  transition: 'background-color 200ms ease',
                  fontSize: '1.95rem',
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                {siteLogo}
              </Link>

              <MobileNavbarElements
                pages={pages2}
                switchPage={switchPage}
                siteLogo={siteLogo}
                pagesLinks={pagesLinks}
              />

              <Box
                sx={{
                  flexGrow: { md: 1, xs: 0 },
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {pages2.map((page, id) => (
                    <Button
                      key={page}
                      onClick={() => switchPage(pagesLinks[id])}
                      sx={navbarButtonsStyle}
                      disableRipple
                    >
                      {page}
                    </Button>
                  ))}
                  <CustomHoverMenu
                    menuName="Plants"
                    buttonStyle={navbarButtonsStyle}
                    menuItemsNames={productsStore.plants}
                    onMenuItemClick={(plantName: string) =>
                      switchPage('products', plantName, false)
                    }
                    isFlowers={false}
                  />
                  <CustomHoverMenu
                    menuName="Flowers"
                    buttonStyle={navbarButtonsStyle}
                    menuItemsNames={productsStore.flowers}
                    onMenuItemClick={(flowerName: string) =>
                      switchPage('products', flowerName, true)
                    }
                    isFlowers
                  />
                </Box>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '3%',
                  }}
                >
                  {userStore.isAuth ? (
                    <CustomClickMenu buttonStyle={upperNavbarButtonsStyle} />
                  ) : (
                    <Button sx={navbarLoginButtonStyle} onClick={handleLogin}>
                      Login
                    </Button>
                  )}
                  <IconButton
                    sx={upperNavbarButtonsStyle}
                    onClick={changeBasketState}
                    aria-label="cart"
                  >
                    <StyledBadge
                      badgeContent={basketStore.basketProductsTypesCount}
                      color="success"
                    >
                      <IconContext.Provider value={iconPropsMemoized}>
                        <RiShoppingBasket2Line id="openMenuButton" />
                      </IconContext.Provider>
                    </StyledBadge>
                  </IconButton>
                </div>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </HideOnScroll>
  )
})
