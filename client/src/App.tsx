import React from 'react';
import {ThemeProvider} from "@mui/material";
import {Navbar, BottomBar} from "./components/index.components";
import {theme} from "./themes";
import './App.css'
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes";
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
    AOS.init();
    return (
        <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Navbar />
            <AppRoutes />
            <BottomBar />
        </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;