import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
// @ts-ignore
import Aos from 'aos'
import 'aos/dist/aos.css'
import { ThemeProvider, useMediaQuery } from '@mui/material'
import { theme } from './themes'
import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import userStore from './store/UserStore'
import { BasketContainer } from './components/Basket/BasketContainer'
import { CompleteOrder } from './components/CompleteOrder/CompleteOrder'
import { BottomBar } from './components/BottomBar/BottomBar'
import { Navbar } from './components/Navbar/Navbar'
import { AuthDialog } from './components/Auth/AuthDialog'
import { CustomCookieConsent } from './components/CookieConsent/CustomCookieConsent'

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkIsUserAuth()
    }
  }, [])

  const smallerThanSm = useMediaQuery(theme.breakpoints.down('sm'))

  Aos.init({
    offset: smallerThanSm ? 10 : 120,
  })
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Navbar />
        <AppRoutes />
        <BasketContainer />
        <CompleteOrder />
        <AuthDialog />
        <CustomCookieConsent />
        <BottomBar />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
