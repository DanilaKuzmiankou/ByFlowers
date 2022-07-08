import React from 'react';
import {Button, ThemeProvider} from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import {theme} from "./themes";
import './App.css'
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes";

const App = () => {

    return (
        <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Navbar />
            <AppRoutes />
        </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;