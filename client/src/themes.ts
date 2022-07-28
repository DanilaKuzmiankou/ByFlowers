import { createTheme } from '@mui/material/styles';
import * as React from "react";


// Update the AppBar's color prop options
declare module '@mui/material/AppBar' {
    interface AppBarPropsColorOverrides {
        neutral: true;
        green:true;
        lilac:true;
    }
}

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: React.CSSProperties['color'];
        };
    }

    interface Palette {
        neutral: Palette['primary'];
        green: Palette['primary'];
        lilac: Palette['primary'];
    }
    interface PaletteOptions {
        neutral: PaletteOptions['primary'];
        green: PaletteOptions['primary'];
        lilac: PaletteOptions['primary'];
    }

    interface PaletteColor {
        darker?: string;
    }
    interface SimplePaletteColorOptions {
        darker?: string;
    }
    interface ThemeOptions {
        status: {
            danger: React.CSSProperties['color'];
        };
    }
}

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true; // removes the `xs` breakpoint
        sm: true;
        md: true;
        lg: true;
        xl: true;
        xxl: true;
        xxxl: true
    }
}

export const theme = createTheme({
    breakpoints: {
        // Define custom breakpoint values.
        // These will apply to Material-UI components that use responsive
        // breakpoints, such as `Grid` and `Hidden`. You can also use the
        // theme breakpoint functions `up`, `down`, and `between` to create
        // media queries for these breakpoints
        values: {
            xs: 0,
            sm: 700,
            md: 900,
            lg: 1200,
            xl: 1500,
            xxl: 2000,
            xxxl: 2300
        }
    },
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#1B1A27',
            contrastText: '#fff',
        },
        green: {
            main: '#36ef8a'
        },
        lilac: {
            main: '#C8A2C8'
        }
    },
});

export const productStyles = {
    customBoldFont: {
        fontFamily: 'Avenir, sans-serif',
        fontSize: {
            xl: '2rem',
            xxxl: '2.3rem',
        },
        fontWeight: '600 !important',
        letterSpacing: '0 !important',
    },
    customNormalFont: {
        fontFamily: 'Avenir, sans-serif',
        fontSize: {
            xl: '1.8rem',
            xxxl: '2.7rem',
            sm: '1.3rem'
        },
        fontWeight: '0 !important',
        letterSpacing: '0 !important',
    },
     headerTypographyStyle : {
        fontSize: {
            lg: '1.5rem',
            md: '2rem',
            sm:'2rem',
            xl: '3rem'
        },
        whiteSpace: 'nowrap',
    },
    filtersHeaderTypography: {
        fontSize: {
            xxxl: '2.8rem',
          xl: '2rem',
            sm:'1.5rem'

        },
        margin: '5px 0'
    },
    checkboxGroup: {
        marginLeft: '10px'
    }
}

