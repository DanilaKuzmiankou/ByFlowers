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
  const lgAndXl = useMediaQuery(theme.breakpoints.between('md', 'xxl'))
  const [types, setTypes] = useState<string[]>([])
  const [page, setPage] = useState<number>(
    (productsStore.itemsOffset + productsStore.itemsLimit) /
      productsStore.itemsLimit,
  )

  const getItemsCountPerPage = () => {
    if (lgAndXl) {
      productsStore.setItemsLimit(16)
    } else {
      productsStore.setItemsLimit(12)
    }
  }

  useEffect(() => {
    setTypes(
      productsStore.isFlowers ? productsStore.flowers : productsStore.plants,
    )
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
      productsStore.setSelectedProductsName('')
      productsStore.setSelectedNavbarProduct('')
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

  return (
    <>
      <Grid
        columns={16}
        container
        sx={{
          width: '100%',
          minHeight: '100vh',
          padding: { xs: '3px', md: '10px' },
        }}
      >
        <Grid
          item
          xs={0}
          sm={3}
          md={3}
          lg={2}
          xl={3}
          sx={{
            display: { xs: 'none', sm: 'inline-block' },
            alignSelf: 'start',
            position: 'sticky',
            top: 0,
          }}
        >
          {types && types.length > 0 ? (
            <div className="filters-container">
              <ProductsFilter
                productsList={types}
                mainCheckboxName={
                  productsStore.isFlowers ? 'Цветы' : 'Растения'
                }
              />
            </div>
          ) : null}
        </Grid>
        <Grid item xs={16} sm={13} md={13} lg={14} xl={13}>
          <div className="products-container">
            <Box
              sx={{
                display: 'flex',
                position: 'relative',
                alignItems: 'start',
                flexFlow: { xs: 'row wrap', sm: 'initial' },
                justifyContent: 'start',
                padding: {
                  sm: '20px',
                  xs: '7px 3px',
                },
              }}
            >
              <Typography
                sx={{
                  ...productStyles.customBoldFont,
                  ...productStyles.headerTypographyStyle,
                }}
              >
                {productsStore.selectedProductsName}
              </Typography>
              <Box sx={{ display: 'flex', width: '100%', mt: '5px' }}>
                <Box
                  onClick={openDrawer}
                  sx={{
                    display: { xs: 'inline-block', sm: 'none' },
                  }}
                >
                  <IconButton>
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

            {types && types.length > 0 ? (
              <MobileProductsFilter
                productsList={types}
                mainCheckboxName={
                  productsStore.isFlowers ? 'Цветы' : 'Растения'
                }
              />
            ) : null}

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
                text="Sadly, we have no this items in the storage"
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
