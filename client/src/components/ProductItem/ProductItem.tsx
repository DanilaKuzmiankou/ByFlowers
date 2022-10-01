import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { catalogProductItem } from '../../themes'
import { IProduct } from '../../models/IProduct'
import useHoverStyle from '../../utils/useHoverStyle'

interface ProductProps {
  product: IProduct
  height?: string
}

export const ProductItem: FC<ProductProps> = ({
  product,
  height = catalogProductItem.container.height,
}) => {
  const { buttonStyle, onItemHover, onItemNotHover } = useHoverStyle()

  return (
    <Box
      sx={{ ...catalogProductItem.container, ...{ height } }}
      component={Link}
      to={{
        pathname: '/product',
        search: `?${createSearchParams({
          productJson: JSON.stringify(product),
        })}`,
      }}
      onFocus={onItemHover}
      onBlur={onItemNotHover}
      onMouseOver={onItemHover}
      onMouseLeave={onItemNotHover}
      tabIndex={0}
    >
      <Typography variant="h6" noWrap sx={catalogProductItem.typographyStyle}>
        {product.name}
      </Typography>
      <Typography
        variant="h6"
        noWrap
        sx={{
          ...catalogProductItem.typographyStyle,
          ...{ top: { xs: '33px', lg: '10%' }, zIndex: 3, fontWeight: 700 },
        }}
      >
        {product.price} &#8381;
      </Typography>
      <Box
        component="img"
        sx={catalogProductItem.pictureStyle}
        src={product.pictures[0].picture}
      />
      <Button tabIndex={0} sx={buttonStyle}>
        Купить!
      </Button>
    </Box>
  )
}
