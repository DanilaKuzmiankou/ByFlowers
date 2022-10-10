import { useEffect, useMemo } from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography } from '@mui/material'
import { IconContext } from 'react-icons'
import { BsFacebook, BsInstagram, BsTelephone } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'

export const Contacts = () => {
  useEffect(() => {
    document.body.style.position = 'fixed'
    return () => {
      document.body.style.position = 'static'
    }
  }, [])

  const mainContainer = {
    backgroundColor: '#F4F4E3',
    display: 'flex',
    flexDirection: 'column',
    height: `100vh`,
    justifyContent: { lg: 'center' },
  }

  const itemContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  const typography = {
    fontFamily: 'AvenirBold, sans-serif',
    fontSize: '2.6rem',
    fontWeight: '200 !important',
    mt: '10px',
  }

  const header = {
    fontFamily: 'AvenirBold, sans-serif',
    fontSize: {
      lg: '4rem',
      sm: '3.6rem',
      xs: '2rem',
    },
    fontWeight: '200 !important',
    letterSpacing: '0 !important',
    whiteSpace: 'word',
    textAlign: 'center',
    mb: { xs: '30px', lg: '70px' },
  }

  const iconPropsMemoized = useMemo(() => ({ color: 'black', size: '37' }), [])
  return (
    <Box sx={mainContainer}>
      <Typography sx={header}>Остались вопросы? Задайте их нам!</Typography>
      <Grid container rowSpacing={4}>
        <Grid item sx={itemContainer} xs={12} lg={3}>
          <IconContext.Provider value={iconPropsMemoized}>
            <BsTelephone />
          </IconContext.Provider>
          <Typography sx={typography}>+7 996 284 74 60</Typography>
        </Grid>
        <Grid item sx={itemContainer} xs={12} lg={3}>
          <IconContext.Provider value={iconPropsMemoized}>
            <FiMail />
          </IconContext.Provider>
          <Typography sx={typography}>byflowersru@gmail.com</Typography>
        </Grid>
        <Grid item sx={itemContainer} xs={12} lg={3}>
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
        </Grid>
        <Grid item sx={itemContainer} xs={12} lg={3}>
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
        </Grid>
      </Grid>
    </Box>
  )
}
