import { useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { observer } from 'mobx-react-lite'
import Button from '@mui/material/Button'
import { CountInputProps, IProduct } from '../../models/IProduct'
import { buyButtonHoverStyle, productStyles } from '../../themes'
import './Product.css'
import { ProductGallery } from '../../components/ProductGallery/ProductGallery'
import { getProduct, getRecommendationProducts } from '../../api/store/Product'
import { ProductItem } from '../../components/ProductItem/ProductItem'
import basketStore from '../../store/BasketStore'
import { addToBasket, getBasketProductCount } from '../../api/store/Basket'
import userStore from '../../store/UserStore'
import { ProductCounterInput } from '../../components/ProductCounterInput/ProductCounterInput'

interface LocationState {
  productJson: string
}

const addToCartButtonStyle = {
  width: {
    xs: '200px',
    sm: '350px',
  },
  display: 'block',
  alignSelf: 'center',
}

const additionalText = {
  color: '#9F9F9F',
  fontSize: '1.1rem',
  lineHeight: '0.8',
  width: '100%',
  textAlign: 'center',
  margin: '0 0 10px',
}

const recommendationsBox = {
  padding: '20px 0',
  backgroundColor: '#38403D',
  color: 'white',
  minHeight: '500px',
}

const recommendationsBoxName = {
  display: 'block',
  fontSize: '3.5rem',
  textAlign: 'center',
  padding: '30px 0',
}

const defaultContainerStyle = {
  position: 'relative',
  width: {
    xs: '100%',
    sm: 'content',
  },
  display: 'flex',
  justifyContent: 'center',
  padding: '10px 30px',
}

const defaultEmptyContainerStyle = {
  textAlign: 'center',
  position: 'absolute',
  top: '25%',
  left: 0,
  right: 0,
  margin: '0 auto',
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
} as React.CSSProperties

const addToCartBox = {
  margin: {
    xs: '0 0 10px 0',
    lg: '40px 0 0 30px',
  },
  display: 'flex',
  flexDirection: 'column',
}

export const Product = observer(() => {
  const location = useLocation()
  const { productJson } = location.state as LocationState
  const product = JSON.parse(productJson) as IProduct

  const countInputRef = useRef<CountInputProps>(null)
  const navigate = useNavigate()
  const [totalCount, setTotalCount] = useState<number>(product.count)
  const [recommendationsProducts, setRecommendationsProducts] =
    useState<IProduct[]>()
  const [containerStyle, setContainerStyle] = useState(defaultContainerStyle)
  const [emptyContainerStyle, setEmptyContainerStyle] =
    useState<React.CSSProperties>(defaultEmptyContainerStyle)
  const [message, setMessage] = useState<string>('')

  const checkForPresence = () => {
    if (totalCount <= 0) {
      const newDefaultNoItemsContainerStyle = { ...defaultEmptyContainerStyle }
      newDefaultNoItemsContainerStyle.display = 'flex'
      setContainerStyle({
        ...defaultContainerStyle,
        ...{
          opacity: 0.5,
          pointerEvents: 'none',
        },
      })
      setEmptyContainerStyle({ ...emptyContainerStyle, ...{ display: 'flex' } })
    } else {
      setContainerStyle(defaultContainerStyle)
      setEmptyContainerStyle(defaultEmptyContainerStyle)
      setMessage('')
    }
  }

  const updateTotalAmount = (basketProductCount: number) => {
    getProduct(product.id).then((response) => {
      if (basketProductCount !== -1)
        setTotalCount(response.data.count - basketProductCount)
    })
  }

  async function fetchRecommendationsProducts() {
    const recommendationsProductsFromApi = await getRecommendationProducts(3)
    setRecommendationsProducts(recommendationsProductsFromApi.data)
  }

  const goToItemPage = (selectedProduct: IProduct) => {
    navigate('../product', {
      state: {
        productJson: JSON.stringify(selectedProduct),
      },
    })
    fetchRecommendationsProducts()
    window.scrollTo(0, 0)
  }

  const addProductToBasket = async () => {
    if (!userStore.isAuth) {
      userStore.setIsAuthDialogOpen(true)
      return
    }
    const countRef = countInputRef.current
    if (countRef) {
      try {
        const response = await addToBasket(
          product.id,
          countRef.counterGetCount(),
          userStore.user.email,
        )
        countRef.counterSetCount(1)
        const currentProductCount = response.data.count
        product.count = currentProductCount
        setTotalCount(currentProductCount)
        basketStore.updateBasket(userStore.user.email)
        basketStore.changeBasketProductsActual(product.id, currentProductCount)
        if (response.data.message) {
          setMessage(response.data.message)
        }
      } catch (e) {
        if (e instanceof Error) {
          setMessage(e?.message)
        }
      }
    }
  }

  useEffect(() => {
    async function fetch() {
      if (userStore.user.email) {
        const response = await getBasketProductCount(
          product.id,
          userStore.user.email,
        )
        const basketCount = response.data
        setTotalCount(product.count - basketCount)
      }
    }
    fetch()
  }, [userStore.user, product.count, product.id])

  useEffect(() => {
    const basketProduct = basketStore.basketProductsActual.filter(
      (basketActualProduct) => basketActualProduct.id === product.id,
    )[0]
    if (basketProduct) {
      updateTotalAmount(basketProduct.count)
    } else {
      setTotalCount(product.count)
    }
  }, [basketStore.basketProductsActual, product.id, product.count])

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchRecommendationsProducts()
  }, [])

  useEffect(() => {
    checkForPresence()
  }, [totalCount])

  return (
    <>
      {product ? (
        <div style={{ position: 'relative' }}>
          <Box sx={emptyContainerStyle}>
            <Typography
              sx={{
                ...productStyles.customBoldFont,
                ...productStyles.headerTypographyStyle,
                ...{ zIndex: 30 },
              }}
            >
              There is no more {product.name} in storage!
            </Typography>
          </Box>
          <Grid container sx={containerStyle}>
            <Grid
              item
              xs="auto"
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Box>
                <Typography
                  sx={{
                    ...productStyles.customBoldFont,
                    ...productStyles.headerTypographyStyle,
                  }}
                >
                  {product.name}
                </Typography>

                <ProductGallery pictures={product.pictures} />

                <Box sx={{ width: '100%', margin: '20px 0' }}>
                  <Typography
                    sx={{
                      ...productStyles.customBoldFont,
                      ...productStyles.headerTypographyStyle,
                    }}
                  >
                    Description
                  </Typography>
                  <hr />
                  <Typography
                    sx={{
                      ...productStyles.customNormalFont,
                      ...{
                        whiteSpace: 'normal',
                        width: {
                          xs: '300px',
                          md: '450px',
                        },
                      },
                    }}
                  >
                    {product.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs="auto"
              sx={{
                alignSelf: 'start',
                position: 'sticky',
                top: '0px',
              }}
            >
              <Box sx={addToCartBox}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    sx={{
                      ...productStyles.customBoldFont,
                      ...{ display: 'inline-block' },
                    }}
                  >
                    Price:
                  </Typography>
                  <Typography
                    sx={{
                      ...productStyles.customBoldFont,
                      ...{ display: 'inline-block' },
                    }}
                  >
                    {product.price}$
                  </Typography>
                </Box>

                <ProductCounterInput
                  ref={countInputRef}
                  totalCount={totalCount}
                />

                <Typography sx={additionalText}>
                  Total amount: {totalCount}
                </Typography>
                <Button
                  onClick={addProductToBasket}
                  sx={{ ...buyButtonHoverStyle, ...addToCartButtonStyle }}
                >
                  Add to cart
                </Button>
                {message ? (
                  <div className="custom-product-error-message">{message}</div>
                ) : null}
              </Box>
            </Grid>
          </Grid>
          <Box sx={recommendationsBox}>
            <Typography
              sx={{
                ...productStyles.customBoldFont,
                ...recommendationsBoxName,
              }}
            >
              You may also like
            </Typography>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {recommendationsProducts?.map((recommendationProduct) => (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  key={recommendationProduct.id}
                  onClick={() => goToItemPage(recommendationProduct)}
                  style={{ padding: '20px', maxWidth: '350px' }}
                >
                  <ProductItem product={recommendationProduct} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      ) : null}
    </>
  )
})
