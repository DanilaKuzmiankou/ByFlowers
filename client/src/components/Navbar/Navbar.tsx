import * as React from 'react'
import { useEffect, useMemo, useRef } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { observer } from 'mobx-react-lite'
import { IconContext } from 'react-icons'
import { Badge, BadgeProps, Link } from '@mui/material'
import { Link as ReactRouterLink } from 'react-router-dom'
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
import settingsStore from '../../store/SettingsStore'

const siteLogo = 'ByFlowers'
const pagesLinks = ['aboutUs', 'contacts']
const pages2 = ['О нас', 'Контакты']

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
  mx: 1.1,
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
  padding: '6px',
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

  const iconPropsMemoized = useMemo(() => ({ color: 'white', size: '23' }), [])

  const switchPage = (productType: string, isFlowers: boolean): void => {
    window.scrollTo(0, 0)
    if (isFlowers !== undefined) {
      const checkedProducts = productType !== '' ? [productType] : []
      productsStore.setIsNavbarMenuWasToggled(isFlowers, checkedProducts)
    }
    settingsStore.setIsMobileNavbarMenuOpen(false)
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
              <ReactRouterLink to="/aboutUs">
                <Box
                  component="img"
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
              </ReactRouterLink>
              <Link
                variant="h6"
                noWrap
                component={ReactRouterLink}
                to="/aboutUs"
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
                  <Button
                    key="aboutUs"
                    component={ReactRouterLink}
                    to="/aboutUs"
                    sx={navbarButtonsStyle}
                    disableRipple
                  >
                    О нас
                  </Button>
                  <CustomHoverMenu
                    menuName="Растения"
                    buttonStyle={navbarButtonsStyle}
                    menuItemsNames={productsStore.plants}
                    onMenuItemClick={(plantName: string) =>
                      switchPage(plantName, false)
                    }
                    isFlowers={false}
                  />
                  <CustomHoverMenu
                    menuName="Цветы"
                    buttonStyle={navbarButtonsStyle}
                    menuItemsNames={productsStore.flowers}
                    onMenuItemClick={(flowerName: string) =>
                      switchPage(flowerName, true)
                    }
                    isFlowers
                  />
                  <Button
                    key="contacts"
                    component={ReactRouterLink}
                    to="/contacts"
                    sx={navbarButtonsStyle}
                    disableRipple
                  >
                    Контакты
                  </Button>
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
                      Войти
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
