import { createTheme } from '@mui/material/styles'
import * as React from 'react'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    xxl: true
    xxxl: true
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1500,
      xxl: 2000,
      xxxl: 2300,
    },
  },
})

export const buyButtonDefaultStyle = {
  display: 'none',
} as React.CSSProperties

export const listItem = {
  display: 'block',
  padding: 0,
  margin: '0 0 10px',
}

export const list = {
  padding: 0,
  fontSize: '2rem',
}

export const linkButtonStyle = {
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  textDecoration: 'none',
  textTransform: 'none',
  fontSize: '1.5rem',
  color: '#007bff',
  '&.MuiButtonBase-root:hover': {
    bgcolor: 'transparent',
    textDecoration: 'underline #007bff',
  },
}

export const buyButtonHoverStyle = {
  fontFamily: 'AvenirBold',
  minHeight: '45px',
  zIndex: 2,
  fontSize: '1.59rem',
  textAlign: 'center',
  borderRadius: '3px',
  color: '#fff',
  textTransform: 'uppercase',
  textDecoration: 'none',
  border: '0',
  WebkitBoxShadow: 'inset 0 -3px 0 0 #b42c32',
  boxShadow: 'inset 0 -3px 0 0 #b42c32',
  backgroundColor: 'rgba(210,49,57,1)',
  background:
    'linear-gradient(to left, rgba(210,49,57,1) 50%, #b42c32 50%) right',
  backgroundSize: '200%',
  transition: '.3s ease-out',
  '&:hover': {
    backgroundPosition: 'left',
  },
} as React.CSSProperties

export const productStyles = {
  customBoldFont: {
    fontFamily: 'AvenirBold, sans-serif',
    fontSize: {
      xl: '2rem',
      xxxl: '2.3rem',
      sm: '1.7rem',
      xs: '1.6rem',
    },
    fontWeight: '600 !important',
    letterSpacing: '0 !important',
  },
  headerTypographyStyle: {
    fontSize: {
      lg: '2.5rem',
      sm: '2rem',
      xl: '3rem',
      xs: '2.1rem',
    },
    display: {
      xs: 'inline-block',
    },
    padding: 0,
    whiteSpace: 'nowrap',
  },
  filtersHeaderTypography: {
    fontSize: {
      xxxl: '2.8rem',
      xl: '2rem',
      sm: '1.5rem',
      xs: '1.7rem',
    },
    margin: '10px 0',
  },
  checkboxGroup: {
    marginLeft: '10px',
  },
  customNormalFont: {
    color: 'black',
    fontFamily: 'AvenirRegular, sans-serif',
    fontSize: {
      xxxl: '2.7rem',
      xl: '2.3rem',
      xs: '1.8rem',
    },
    fontWeight: '0 !important',
    letterSpacing: '0 !important',
  },
  productDescriptionFont: {
    color: 'black',
    fontFamily: 'AvenirRegular, sans-serif',
    fontSize: {
      xxxl: '2rem',
      xl: '1.7rem',
      xs: '1.4rem',
    },
    textAlign: 'center',
    fontWeight: '0 !important',
    letterSpacing: '0 !important',
  },
  customSmallFont: {
    color: 'black',
    fontFamily: 'AvenirRegular, sans-serif',
    fontSize: {
      xl: '1.6rem',
      xxxl: '2.1rem',
      xs: '1.3rem',
    },
    whiteSpace: 'normal',
    fontWeight: '0 !important',
    letterSpacing: '0 !important',
    textAlign: 'center !important',
  },
}

export const catalogProductItem = {
  pictureStyle: {
    position: 'absolute',
    bottom: '16px',
    left: 'calc(50%-270px)',
    backgroundSize: 'cover',
    height: '300px',
    width: '270px',
  },
  typographyStyle: {
    fontFamily: 'AvenirRegular',
    position: 'absolute',
    fontSize: {
      xxl: '2rem',
      xl: '2.0rem',
      lg: '1.6rem',
      md: '2rem',
      sm: '1.6rem',
      xs: '1.9rem',
    },
    top: {
      xs: '3px',
      lg: 0,
    },
    left: '20px',
    right: '20px',
    textAlign: 'center',
    fontWeight: 500,
    textDecoration: 'none',
    color: 'inherit',
    backgroundColor: 'transparent',
  },
  container: {
    boxSizing: 'border-box',
    height: '400px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'black',
    position: 'relative',
    '&:hover': {
      border: '0.01em solid',
      borderColor: 'inherit',
      borderRadius: '3%',
      boxShadow:
        'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
    },
    '.Mui-focused': {
      border: '0.01em solid',
      borderColor: 'inherit',
      borderRadius: '3%',
      boxShadow:
        'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
    },
  },
}
