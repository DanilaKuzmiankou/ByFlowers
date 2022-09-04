import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
// @ts-ignore
import Aos from 'aos'
import 'aos/dist/aos.css'
import { ThemeProvider } from '@mui/material'
import { theme } from './themes'
import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import userStore from './store/UserStore'
import { BasketContainer } from './components/Basket/BasketContainer'
import { CompleteOrder } from './components/CompleteOrder/CompleteOrder'
import { BottomBar } from './components/BottomBar/BottomBar'
import { Navbar } from './components/Navbar/Navbar'

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkIsUserAuth()
    }
  }, [])

  Aos.init()
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Navbar />
        <AppRoutes />
        <BasketContainer />
        <CompleteOrder />
        <BottomBar />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
