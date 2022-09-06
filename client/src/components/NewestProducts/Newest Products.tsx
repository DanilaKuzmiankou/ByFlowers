import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { ProductItem } from '../ProductItem/ProductItem'
import { IProduct } from '../../models/IProduct'
import { getNewestProducts } from '../../api/store/Product'
import { catalogProductItem, productStyles } from '../../themes'

export const NewestProducts = () => {
  const [newestProducts, setNewestProducts] = useState<IProduct[]>()

  const fetchNewestProducts = async () => {
    const response = await getNewestProducts(4)
    setNewestProducts(response.data)
    console.log('resp', response.data)
  }

  const productContainerHeightNumber =
    parseInt(catalogProductItem.container.height as unknown as string, 10) - 100

  const goToItemPage = (selectedProduct: IProduct) => {}

  useEffect(() => {
    console.log('niw', catalogProductItem.container.height)
    fetchNewestProducts()
  }, [])

  return (
    <Box sx={{ margin: '50px 0' }}>
      <Typography
        sx={{
          ...productStyles.customBoldFont,
          ...productStyles.headerTypographyStyle,
          ...{ marginBottom: '20px', textAlign: 'center' },
        }}
      >
        Our newest stems for you
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
        {newestProducts?.map((newestProduct) => (
          <Grid
            item
            xs={36}
            sm={18}
            md={13}
            lg={9}
            xl={7}
            xxl={5}
            key={newestProduct.id}
            onClick={() => goToItemPage(newestProduct)}
            style={{ padding: '20px' }}
          >
            <ProductItem height="400px" product={newestProduct} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
