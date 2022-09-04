import Box from '@mui/material/Box'
import { useMemo } from 'react'
import './AboutUs.css'
import { Typography } from '@mui/material'
import { IconContext } from 'react-icons'
import { BsTelephone } from 'react-icons/bs'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { CustomSwiper } from '../../components/CustomSwiper/CustomSwiper'
import { buyButtonHoverStyle, productStyles } from '../../themes'
import { AdvantagesSection } from '../../components/AdvantagesSection/AdvantagesSection'
import { CommentsSection } from '../../components/CommentsSection/CommentsSection'
import productsStore from '../../store/ProductsStore'

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
    xs: '10px 0',
    sm: '60px 65px',
    lg: '160px 90px',
  },
}

const startShoppingPictureContainer = {
  backgroundImage: `url(${require('../../assets/images/startShoppingPicture.jpg')})`,
  height: '100%',
  backgroundSize: 'fill',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  position: 'relative',
  padding: {
    xs: '100px 10px',
    sm: '120px 55px',
    lg: '90px 100px',
  },
  fontFamily: 'Avenir, serif',
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
  const navigate = useNavigate()

  const startShopping = () => {
    productsStore.setSelectedNavbarProduct('')
    productsStore.setIsFlowers(true)
    navigate('/products')
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
          Want to speak to us about flower delivery in your area? Call us: +375
          29 423 74 65
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconContext.Provider value={iconPropsMemoized}>
            <BsTelephone />
          </IconContext.Provider>
        </Box>
      </Box>
      <CommentsSection />
      <Box sx={startShoppingContainer}>
        <Box sx={startShoppingPictureContainer}>
          <Typography sx={shoppingTitleTypography}>
            Ready to start your journey?
          </Typography>
          <Typography sx={shoppingDescriptionTypography}>
            Choose from a variety of options exactly what suits you
          </Typography>
          <Button
            onClick={startShopping}
            sx={{ ...buyButtonHoverStyle, ...buttonStyle }}
          >
            Start shopping!
          </Button>
        </Box>
      </Box>
    </>
  )
}
