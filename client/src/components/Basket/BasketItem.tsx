import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { IconContext } from 'react-icons'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ProductCounterInput } from '../ProductCounterInput/ProductCounterInput'
import { productStyles } from '../../themes'
import { CountInputProps, IBasketProduct } from '../../models/IProduct'
import userStore from '../../store/UserStore'
import basketStore from '../../store/BasketStore'

interface BasketItemProps {
  basketProduct: IBasketProduct
  productNumber: number
}

const basketItemStyle = {
  padding: '5px',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  '&:hover': {
    boxShadow:
      'rgb(44, 62, 80) -15px 0px 15px -15px, rgb(44, 62, 80) 15px 0px 15px -15px',
  },
}

export const BasketItem: FC<BasketItemProps> = ({
  basketProduct,
  productNumber,
}) => {
  const countInputRef = useRef<CountInputProps>(null)
  const [itemCount, setItemCount] = useState<number>(basketProduct.count)

  const iconPropsMemoized = useMemo(() => ({ color: 'black', size: '13' }), [])

  useEffect(() => {
    if (countInputRef.current) {
      countInputRef.current.counterSetCount(basketProduct.count)
      basketStore.setBasketProductsCost(
        productNumber,
        itemCount * basketProduct.product.price,
      )
    }
  }, [basketProduct])

  useEffect(() => {
    basketStore.setBasketProductsCost(
      productNumber,
      itemCount * basketProduct.product.price,
    )
  }, [itemCount])

  const deleteItemFromBasket = () => {
    basketStore.changeBasketProductsActual(basketProduct.product.id, 0)
    basketStore.deleteProduct(
      userStore.user.email,
      basketProduct.product.id,
      productNumber,
    )
  }

  const updateCount = (count: number) => {
    basketStore.changeBasketProductsActual(basketProduct.product.id, count)
    if (count > 0) {
      setItemCount(count)
      console.log('new')
    } else deleteItemFromBasket()
  }

  return (
    <Box sx={basketItemStyle}>
      <Box
        component="img"
        sx={{
          height: '130px',
          width: '140px',
          flexShrink: 0,
        }}
        src={basketProduct.product.pictures[0].picture}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          paddingLeft: '5px',
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontSize: '1.1rem',
              fontWeight: '700',
              letterSpacing: '0 !important',
              marginTop: '3px',
            }}
          >
            {basketProduct.product.name}
          </Typography>
          <IconButton
            onClick={deleteItemFromBasket}
            aria-label="delete"
            sx={{ marginLeft: 'auto' }}
          >
            <IconContext.Provider value={iconPropsMemoized}>
              <RiDeleteBin6Line />
            </IconContext.Provider>
          </IconButton>
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <Box
            sx={{
              width: '110px',
            }}
          >
            <ProductCounterInput
              ref={countInputRef}
              setItemCount={updateCount}
              totalCount={basketProduct.product.count}
              startCount={basketProduct.count}
              minCount={0}
            />
          </Box>
          <Typography
            sx={{
              ...productStyles.customBoldFont,
              ...{ display: 'inline-block', marginLeft: 'auto' },
            }}
          >
            {basketProduct.product.price * itemCount}$
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
