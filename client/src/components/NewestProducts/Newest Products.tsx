import { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { observer } from 'mobx-react-lite'
import { ProductItem } from '../ProductItem/ProductItem'
import { getNewestProducts } from '../../api/store/Product'
import { productStyles } from '../../themes'
import productsStore from '../../store/ProductsStore'

export const NewestProducts = observer(() => {
  useEffect(() => {
    async function fetchNewestProducts() {
      if (productsStore.newestProducts.length === 0) {
        const response = await getNewestProducts(4)
        productsStore.setNewestProducts(response.data)
      }
    }
    fetchNewestProducts()
  }, [])

  return (
    <Box sx={{ margin: '50px 0' }}>
      <Typography
        sx={{
          ...productStyles.customBoldFont,
          ...productStyles.headerTypographyStyle,
          ...{
            marginBottom: '20px',
            textAlign: 'center',
            display: 'block',
            whiteSpace: 'word',
          },
        }}
      >
        Новейшие предложения для вас
      </Typography>
      <Grid
        container
        columns={36}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {productsStore.newestProducts?.map((newestProduct) => (
          <Grid
            item
            xs={36}
            sm={18}
            md={13}
            lg={9}
            xl={7}
            xxl={5}
            key={newestProduct.id}
            style={{ padding: '20px' }}
          >
            <ProductItem height="400px" product={newestProduct} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
})
