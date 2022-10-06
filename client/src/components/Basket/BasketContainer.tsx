import { styled } from '@mui/material/styles'
import { observer } from 'mobx-react-lite'
import Box from '@mui/material/Box'
import { SwipeableDrawer, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useEffect } from 'react'
import Button from '@mui/material/Button'
import { buyButtonHoverStyle, productStyles } from '../../themes'
import userStore from '../../store/UserStore'
import { BasketItem } from './BasketItem'
import { NoItemsPlug } from '../NoItemsPlug/NoItemsPlug'
import basketStore from '../../store/BasketStore'
import { CloseButton } from '../CloseButton/CloseButton'
import { RUBLE_SIGN } from '../../utils/Utils'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export const BasketContainer = observer(() => {
  useEffect(() => {
    if (userStore.user?.email) {
      basketStore.updateBasket(userStore.user.email)
    }
  }, [userStore.user.email])

  const openCompleteOrder = () => {
    basketStore.setIsCompleteOrderOpen(true)
  }

  return (
    <Box sx={{ display: basketStore.isBasketOpen ? 'fixed' : 'none' }}>
      <SwipeableDrawer
        sx={{
          '& .MuiDrawer-paper': {
            width: {
              xs: '100%',
              sm: '400px',
              lg: '500px',
              xl: '30%',
            },
            boxSizing: 'border-box',
            height: '100%',
          },
        }}
        anchor="right"
        open={Boolean(basketStore.isBasketOpen)}
        onClose={() => basketStore.setIsBasketOpen(false)}
        onOpen={() => basketStore.setIsBasketOpen(true)}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <DrawerHeader
          sx={{
            textAlign: 'start',
            display: 'flex',
            justifyContent: 'start',
            fontFamily: 'AvenirBold, sans-serif',
            ml: '10px',
            fontSize: '2rem',
          }}
        >
          Корзина
          <CloseButton
            closeFunction={() => basketStore.setIsBasketOpen(false)}
          />
        </DrawerHeader>
        <Divider />
        {basketStore.basketProducts && basketStore.basketProducts.length > 0 ? (
          <Box
            sx={{
              padding: '0 10px 10px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              height: '100%',
            }}
          >
            {basketStore.basketProducts?.map((basketProduct, index) => (
              <BasketItem
                key={basketProduct.product?.id || index}
                basketProduct={basketProduct}
                productNumber={index}
              />
            ))}
            <Box
              sx={{
                marginTop: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ display: 'flex', margin: '5px 0' }}>
                <Typography
                  sx={{
                    ...productStyles.customBoldFont,
                    ...{ display: 'inline-block' },
                  }}
                >
                  Общая стоимость
                </Typography>
                <Typography
                  sx={{
                    ...productStyles.customBoldFont,
                    ...{
                      display: 'inline-block',
                      marginLeft: 'auto',
                    },
                  }}
                >
                  {basketStore.basketOrderTotal} {RUBLE_SIGN}
                </Typography>
              </Box>
              <Button
                onClick={openCompleteOrder}
                sx={{ ...buyButtonHoverStyle, ...{ width: '100%' } }}
              >
                Купить!
              </Button>
            </Box>
          </Box>
        ) : (
          <NoItemsPlug
            text="У вас нет товаров в корзине"
            pictureHeight="100px"
            pictureWidth="100px"
          />
        )}
      </SwipeableDrawer>
    </Box>
  )
})
