import {createTheme} from '@mui/material/styles';
import * as React from "react";
import {keyframes} from "@emotion/react";


// Update the AppBar's color prop options
declare module '@mui/material/AppBar' {
    interface AppBarPropsColorOverrides {
        neutral: true;
        green: true;
        lilac: true;
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

const slidebg = keyframes`
  0% {
    background-position: -30vw 0
  }
  100% {
    background-position: 55vw 0
  }`

export const buyButtonDefaultStyle = {
    display: 'none'
} as React.CSSProperties

export const buyButtonHoverStyle = {
    height: '45px',
    zIndex: 2,
    fontSize: "1.59rem",
    lineHeight: 2.4,
    textAlign: "center",
    borderRadius: "3px",
    color: "#fff",
    textTransform: "uppercase",
    textDecoration: "none",
    backgroundColor: '#d23139',
    border: "0",
    WebkitBoxShadow: "inset 0 -3px 0 0 #b42c32",
    boxShadow: "inset 0 -3px 0 0 #b42c32",
    '&:hover': {
        animationDuration: "4s",
        animationFillMode: "forwards",
        animationIterationCount: "infinite",
        animationName: `${slidebg}`,
        animationTimingFunction: "linear",
        background: "linear-gradient(30deg, rgba(210,49,57,0.9990371148459384) 26%, rgba(228,66,83,0.8281687675070029) 35%, rgba(255,99,122,1) 58%, rgba(210,49,57,1) 70%)",
    }

} as React.CSSProperties

export const productStyles = {
    customBoldFont: {
        fontFamily: 'Avenir, sans-serif',
        fontSize: {
            xl: '2rem',
            xxl: '2rem',
            xxxl: '2.3rem',
            lg: '1.7rem',
            md: '1.7rem',
            sm: '1.7rem',
            xs: '1.6rem'
        },
        fontWeight: '600 !important',
        letterSpacing: '0 !important',
    },
    customNormalFont: {
        color: 'black',
        fontFamily: 'Avenir, sans-serif',
        fontSize: {
            xl: '1.8rem',
            xxl: '1.8rem',
            xxxl: '2.7rem',
            sm: '1.3rem',
            xs: '1.8rem',
            lg: '1.8rem'
        },
        fontWeight: '0 !important',
        letterSpacing: '0 !important',
    },
    headerTypographyStyle: {
        fontSize: {
            lg: '2.5rem',
            md: '2rem',
            sm: '2rem',
            xl: '3rem',
            xs: '1.9rem'
        },
        display: {
            xs: 'inline-block',
            sm: 'block'
        },
        padding: {
            xs: 0,

        },
        whiteSpace: 'nowrap',
    },
    filtersHeaderTypography: {
        fontSize: {
            xxxl: '2.8rem',
            xl: '2rem',
            sm: '1.5rem',
            xs: '1.7rem'
        },
        margin: '5px 0'
    },
    checkboxGroup: {
        marginLeft: '10px'
    }
}


export const catalogProductItem = {
    pictureStyle: {
        position: "absolute",
        bottom: 0,
        backgroundSize: 'cover',
        height: {
            xxxl: '75%',
            xxl: '75%',
            xl: '75%',
            lg: '75%',
            md: '75%',
            sm: '75%',
            xs: '75%'
        },
        width: {
            xxxl: '90%',
            xl: '90%',
            lg: '90%',
            md: '90%',
            sm: '90%',
            xs: '90%'
        }
    },
    typographyStyle: {
        fontFamily: 'Avenir',
        position: 'absolute',
        fontSize: {
            xxl: '2rem',
            xl: '2.0rem',
            lg: '1.6rem',
            md: '2rem',
            sm: '1.6rem',
            xs: '1.9rem'
        },
        top: "0px",
        left: "20px",
        right: "20px",
        textAlign: 'center',
        fontWeight: 500,
        textDecoration: 'none',
        color: 'inherit',
        backgroundColor: 'transparent',
    },
    container: {
        boxSizing: "border-box",
        height: {
            xxxl: "400px",
            xxl: '300px',
            xl: '400px',
            lg: '400px',
            md: '300px',
            sm: '300px',
            xs: '400px'
        },
        width: "100%",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        //border: "1px solid #cddfe0"
        border: {xs: "0.01em solid #000000", sm: 'none'},
        '&:hover': {
            border: "0.01em solid",
            borderColor: 'inherit',
            borderRadius: '3%',
            boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
        }
    }
}