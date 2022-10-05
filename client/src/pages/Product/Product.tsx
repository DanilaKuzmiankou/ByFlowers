import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Collapse, Grid, Typography } from '@mui/material'
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
import { FlowerCareGuide } from '../../components/CareGuide/FlowerCareGuide'
import { PlantCareGuide } from '../../components/CareGuide/PlantCareGuide'
import { ExpandButton } from '../../components/ExpandButton/ExpandButton'

const addToCartButtonStyle = {
  width: {
    xs: '200px',
    sm: '100%',
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
  backgroundColor: '#F8F8F8',
  padding: '0 0 20px',
  color: 'black',
  minHeight: '500px',
}

const recommendationsBoxGrid = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const recommendationsBoxName = {
  display: 'block',
  fontSize: '3.5rem',
  textAlign: 'center',
  padding: '30px 0',
}

const defaultContainerStyle = {
  position: 'relative',
  width: '100%',
  maxWidth: '1400px',
  display: 'flex',
  justifyContent: 'center',
  padding: {
    xs: '10px 10px',
    sm: '10px 32px',
    lg: '10px 64px',
  },
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
    xs: '0',
    sm: '0 20px 0',
    md: '40px 0 0 30px',
  },
  display: 'flex',
  flexDirection: 'column',
}

export const Product = observer(() => {
  const [searchParams] = useSearchParams()
  const productJson = searchParams.get('productJson')
  const product = JSON.parse(productJson || '') as IProduct

  const countInputRef = useRef<CountInputProps>(null)
  const navigate = useNavigate()
  const [totalCount, setTotalCount] = useState<number>(product.count)
  const [recommendationsProducts, setRecommendationsProducts] =
    useState<IProduct[]>()
  const [containerStyle, setContainerStyle] = useState(defaultContainerStyle)
  const [emptyContainerStyle, setEmptyContainerStyle] =
    useState<React.CSSProperties>(defaultEmptyContainerStyle)
  const [message, setMessage] = useState<string>('')
  const [isTabOpen, setIsTabOpen] = useState<boolean>(true)

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
    navigate({
      pathname: '../product',
      search: `?${createSearchParams({
        productJson: JSON.stringify(selectedProduct),
      })}`,
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
        <>
          <Box sx={emptyContainerStyle}>
            <Typography
              sx={{
                ...productStyles.customBoldFont,
                ...productStyles.headerTypographyStyle,
                ...{ zIndex: 30 },
              }}
            >
              Больше {product.name} нет на складе!
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container sx={containerStyle}>
              <Grid
                item
                xs={12}
                sm={8}
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
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        sx={{
                          ...productStyles.customBoldFont,
                          ...productStyles.headerTypographyStyle,
                          ...{
                            color: isTabOpen ? '#FF0054' : '#000000',
                            userSelect: 'none',
                          },
                        }}
                        onClick={() => setIsTabOpen(!isTabOpen)}
                      >
                        Описание
                      </Typography>
                      <ExpandButton
                        isTabOpen={isTabOpen}
                        setIsTabOpen={setIsTabOpen}
                      />
                    </Box>

                    <Collapse in={isTabOpen} timeout="auto">
                      <Typography
                        sx={{
                          ...productStyles.productDescriptionFont,
                          ...{
                            whiteSpace: 'normal',
                            mt: '10px',
                            textAlign: 'left',
                          },
                        }}
                      >
                        {product.description}
                      </Typography>
                    </Collapse>
                    <hr />
                    {product.productType.isFlower ? (
                      <FlowerCareGuide />
                    ) : (
                      <PlantCareGuide />
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  alignSelf: 'start',
                  position: 'sticky',
                  top: '40px',
                }}
              >
                <Box sx={addToCartBox}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography
                      sx={{
                        ...productStyles.customBoldFont,
                        ...{ display: 'inline-block' },
                      }}
                    >
                      Цена:
                    </Typography>
                    <Typography
                      sx={{
                        ...productStyles.customBoldFont,
                        ...{ display: 'inline-block' },
                      }}
                    >
                      {product.price} &#8381;
                    </Typography>
                  </Box>

                  <ProductCounterInput
                    ref={countInputRef}
                    totalCount={totalCount}
                  />

                  <Typography sx={additionalText}>
                    На складе: {totalCount}
                  </Typography>
                  <Button
                    onClick={addProductToBasket}
                    sx={{ ...buyButtonHoverStyle, ...addToCartButtonStyle }}
                  >
                    Добавить в корзину
                  </Button>
                  {message ? (
                    <div className="custom-product-error-message">
                      {message}
                    </div>
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={recommendationsBox}>
            <Typography
              sx={{
                ...productStyles.customBoldFont,
                ...recommendationsBoxName,
              }}
            >
              Также может понравиться
            </Typography>
            <Grid container sx={recommendationsBoxGrid}>
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
        </>
      ) : null}
    </>
  )
})
