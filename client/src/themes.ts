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



export const theme = createTheme({
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

