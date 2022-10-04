import {
  Grid,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import './Products.css'
import { ChangeEvent, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone'
import { ProductsFilter } from '../../components/ProductsFilter/ProductsFilter'
import productsStore from '../../store/ProductsStore'
import { productStyles } from '../../themes'
import { ProductItem } from '../../components/ProductItem/ProductItem'
import { MobileProductsFilter } from '../../components/ProductsFilter/MobileProductsFilter'
import { CustomSelect } from '../../components/CustomSelect/CustomSelect'
import { NoItemsPlug } from '../../components/NoItemsPlug/NoItemsPlug'

export const Products = observer(() => {
  const theme = useTheme()
  const smToLg = useMediaQuery(theme.breakpoints.between('sm', 'lg'))
  const lgToXl = useMediaQuery(theme.breakpoints.between('lg', 'xl'))
  const xlToXxl = useMediaQuery(theme.breakpoints.between('xl', 'xxl'))
  const xxlUp = useMediaQuery(theme.breakpoints.up('xxl'))
  const [page, setPage] = useState<number>(
    (productsStore.itemsOffset + productsStore.itemsLimit) /
      productsStore.itemsLimit,
  )
  const getItemsCountPerPage = () => {
    if (smToLg) {
      productsStore.setItemsLimit(12)
    } else if (lgToXl) {
      productsStore.setItemsLimit(15)
    } else if (xlToXxl) {
      productsStore.setItemsLimit(20)
    } else if (xxlUp) {
      productsStore.setItemsLimit(24)
    }
  }

  useEffect(() => {
    document.body.style.position = 'static'
    getItemsCountPerPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    productsStore.isFlowers,
    productsStore.flowers,
    productsStore.plants,
    getItemsCountPerPage,
  ])

  useEffect(() => {
    if (productsStore.productsNames?.length > 0) {
      productsStore.fetchProducts()
    } else {
      productsStore.setProducts([])
      productsStore.setProductsCount(0)
    }
  }, [productsStore.productsNames])

  const openDrawer = () => {
    productsStore.setIsDrawerOpen(true)
  }
  const handleChangePage = async (
    event: ChangeEvent<unknown>,
    newPage: number,
  ) => {
    if (newPage !== page) {
      productsStore.setItemsOffset(
        newPage * productsStore.itemsLimit - productsStore.itemsLimit,
      )
      await productsStore.fetchProducts()
      setPage(newPage)
      window.scrollTo(0, 0)
    }
  }

  const productsTypographyStyle = {
    fontFamily: 'AvenirBold, sans-serif',
    fontSize: {
      lg: '2.5rem',
      sm: '2rem',
      xl: '3rem',
      xs: `${productsStore.productsNames.length > 2 ? '1.3' : '1.8'}rem`,
    },
    display: 'inline-block',
    padding: 0,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    fontWeight: '600 !important',
    letterSpacing: '0 !important',
  }

  return (
    <>
      <Grid
        columns={16}
        container
        sx={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#F2F2F2',
          padding: { xs: '3px', md: '10px' },
        }}
      >
        <Grid
          item
          xs={0}
          sm={0}
          md={3}
          lg={3}
          xl={3}
          sx={{
            display: { xs: 'none', md: 'inline-block' },
            alignSelf: 'start',
            position: 'sticky',
            top: 0,
          }}
        >
          <div className="filters-container">
            <ProductsFilter
              mainCheckboxName={productsStore.isFlowers ? 'Цветы' : 'Растения'}
            />
          </div>
        </Grid>
        <Grid item xs={16} sm={16} md={13} lg={13} xl={13}>
          <div className="products-container">
            <Box
              sx={{
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                flexFlow: { xs: 'row wrap', lg: 'initial' },
                justifyContent: 'start',
                padding: {
                  sm: '20px',
                  xs: '7px 3px',
                },
              }}
            >
              <Typography sx={productsTypographyStyle}>
                {productsStore.selectedProductsName}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  mt: '5px',
                }}
              >
                <Box
                  onClick={openDrawer}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    alignItems: 'center',
                  }}
                >
                  <IconButton sx={{ p: '0 5px 0' }}>
                    <TuneTwoToneIcon fontSize="large" />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    pr: { xs: '5px', md: '50px' },
                    alignItems: 'center',
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  <Typography
                    sx={{
                      ...productStyles.customBoldFont,
                      ...{
                        marginLeft: 'auto',
                        mr: '10px',
                        whiteSpace: 'no-wrap',
                      },
                    }}
                  >
                    Сортировать по
                  </Typography>
                  <CustomSelect />
                </Box>
              </Box>
            </Box>

            <MobileProductsFilter
              mainCheckboxName={productsStore.isFlowers ? 'Цветы' : 'Растения'}
            />

            {productsStore.products && productsStore.products.length > 0 ? (
              <Grid
                container
                spacing={{ xs: 3, sm: 3 }}
                sx={{ padding: { sm: '20px', xs: '0 7px' }, width: '100%' }}
              >
                {productsStore.products.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                    xl={3}
                    xxl={2}
                    key={product.id}
                    data-aos="zoom-in"
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <ProductItem product={product} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <NoItemsPlug
                text={`К сожалению, у нас нет этих ${
                  productsStore.isFlowers ? 'цветов' : 'растений'
                } на складе`}
                pictureHeight="250px"
                pictureWidth="250px"
              />
            )}
          </div>
        </Grid>
      </Grid>
      <div className="pagination-container">
        <Pagination
          sx={{ paddingBottom: '10px', fontSize: '30rem' }}
          count={Math.ceil(
            productsStore.productsCount / productsStore.itemsLimit,
          )}
          page={page}
          variant="outlined"
          size="large"
          onChange={handleChangePage}
        />
      </div>
    </>
  )
})
