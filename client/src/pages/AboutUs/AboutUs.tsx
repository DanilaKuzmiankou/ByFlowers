import Box from '@mui/material/Box'
import { useMemo } from 'react'
import './AboutUs.css'
import { Typography } from '@mui/material'
import { IconContext } from 'react-icons'
import { BsTelephone } from 'react-icons/bs'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { CustomSwiper } from '../../components/CustomSwiper/CustomSwiper'
import { buyButtonHoverStyle, productStyles } from '../../themes'
import { AdvantagesSection } from '../../components/AdvantagesSection/AdvantagesSection'
import { CommentsSection } from '../../components/CommentsSection/CommentsSection'
import productsStore from '../../store/ProductsStore'
import { NewestProducts } from '../../components/NewestProducts/Newest Products'

const buttonStyle = {
  width: '250px',
  marginTop: '35px',
}

const callUs = {
  display: 'flex',
  flexDirection: {
    xs: 'column',
    sm: 'column',
    lg: 'row',
  },
  justifyContent: 'center',
  padding: '20px 0',
  marginBottom: '50px',
  backgroundColor: '#e3f1e5',
}

const startShoppingContainer = {
  backgroundColor: '#f3f3ef',
  height: {
    xs: '500px',
    sm: '550px',
    lg: '820px',
  },
  padding: {
    xs: '10px 0 0',
    sm: '60px 65px',
    lg: '160px 90px',
  },
}

const startShoppingPictureContainer = {
  backgroundImage: `url(${require('../../assets/images/startShoppingPicture.jpg')})`,
  height: '100%',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  position: 'relative',
  padding: {
    xs: '100px 10px',
    sm: '120px 55px',
    lg: '90px 100px',
  },
  fontFamily: 'AvenirBold, serif',
  color: 'white',
}

const shoppingTitleTypography = {
  fontSize: {
    xs: '2.3rem',
    sm: '3.5rem',
    lg: '6.4rem',
  },
}

const shoppingDescriptionTypography = {
  fontSize: {
    xs: '2rem',
    sm: '2.5rem',
    lg: '2.5rem',
  },
  marginTop: '20px',
}

export const AboutUs = () => {
  const startShopping = () => {
    productsStore.setIsFlowers(true)
    window.scrollTo(0, 0)
  }

  const iconPropsMemoized = useMemo(() => ({ color: 'black', size: '27' }), [])

  return (
    <>
      <CustomSwiper />
      <AdvantagesSection />
      <Box sx={callUs}>
        <Typography
          sx={{
            ...productStyles.customBoldFont,
            ...{
              mr: 2,
              whiteSpace: 'word',
              textAlign: 'center',
              userSelect: 'text',
            },
          }}
        >
          Хотите поговорить о доставке в ваш город? Позвоните нам: +7 996 284 74
          60
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconContext.Provider value={iconPropsMemoized}>
            <BsTelephone />
          </IconContext.Provider>
        </Box>
      </Box>
      <CommentsSection />
      <NewestProducts />
      <Box sx={startShoppingContainer}>
        <Box sx={startShoppingPictureContainer}>
          <Typography sx={shoppingTitleTypography}>
            Готовы начать приключение?
          </Typography>
          <Typography sx={shoppingDescriptionTypography}>
            Выбирайте то, что нужно именно вам
          </Typography>
          <Button
            component={Link}
            to="/products"
            onClick={startShopping}
            sx={{ ...buyButtonHoverStyle, ...buttonStyle }}
          >
            Начать покупки!
          </Button>
        </Box>
      </Box>
    </>
  )
}
