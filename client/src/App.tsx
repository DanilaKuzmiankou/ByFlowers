import React from 'react';
import {Button, ThemeProvider} from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import {theme} from "./themes";

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <div >
                LOOOL
                </div>
        </ThemeProvider>
    );
};

export default App;