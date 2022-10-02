import { useMemo } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { IconContext } from 'react-icons'
import { BsFacebook, BsInstagram, BsTelephone } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'
import { productStyles } from '../../themes'

export const Contacts = () => {
  const mainContainer = {
    backgroundColor: '#F4F4E3',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '100px 0',
    minHeight: '100vh',
  }

  const subContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    mt: '175px',
  }

  const itemContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  const typography = {
    fontFamily: 'AvenirBold, sans-serif',
    fontSize: '2.6rem',
    fontWeight: '600 !important',
    mt: '10px',
  }
  const iconPropsMemoized = useMemo(() => ({ color: 'black', size: '37' }), [])
  return (
    <Box sx={mainContainer}>
      <Typography
        sx={{
          ...productStyles.customBoldFont,
          ...productStyles.headerTypographyStyle,
          ...{ fontSize: '4rem', textAlign: 'center' },
        }}
      >
        Остались вопросы? Задайте их нам!
      </Typography>
      <Box sx={subContainer}>
        <Box sx={itemContainer}>
          <IconContext.Provider value={iconPropsMemoized}>
            <BsTelephone />
          </IconContext.Provider>
          <Typography sx={typography}>+7 996 284 74 60</Typography>
        </Box>
        <Box sx={itemContainer}>
          <IconContext.Provider value={iconPropsMemoized}>
            <FiMail />
          </IconContext.Provider>
          <Typography sx={typography}>byflowersru@gmail.com</Typography>
        </Box>
        <Box sx={itemContainer}>
          <IconContext.Provider value={iconPropsMemoized}>
            <BsFacebook />
          </IconContext.Provider>
          <a
            target="_blank"
            href="https://www.facebook.com/groups/12688897134534643062353"
            rel="noopener noreferrer"
          >
            <Typography sx={typography}>Facebook</Typography>
          </a>
        </Box>
        <Box sx={itemContainer}>
          <IconContext.Provider value={iconPropsMemoized}>
            <BsInstagram />
          </IconContext.Provider>
          <a
            target="_blank"
            href="https://www.instagram.com/flower-bel/"
            rel="noopener noreferrer"
          >
            <Typography sx={typography}>Instagram</Typography>
          </a>
        </Box>
      </Box>
    </Box>
  )
}
