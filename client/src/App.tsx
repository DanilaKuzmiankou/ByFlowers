import React, {useEffect} from 'react';
import {ThemeProvider} from "@mui/material";
import {BottomBar, Navbar} from "./components/index.components";
import {theme} from "./themes";
import './App.css'
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes";
// @ts-ignore
import Aos from "aos";
import "aos/dist/aos.css";
import userStore from "./store/UserStore";
import {BasketContainer} from "./components/Basket/BasketContainer";
import {CompleteOrder} from "./components/CompleteOrder/CompleteOrder";


const App = () => {

    useEffect(() => {
        if(localStorage.getItem('token')){
            userStore.checkIsUserAuth()
        }
    }, [])

    Aos.init();
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
    );
};

export default App;