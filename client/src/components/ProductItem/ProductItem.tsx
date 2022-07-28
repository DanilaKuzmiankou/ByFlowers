import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./ProductItem.css"
import {toJS} from "mobx";
import Button from "@mui/material/Button";
import {keyframes} from "@emotion/react";
import {useMediaQuery, useTheme} from "@mui/material";

interface ProductProps {
    productName: string,
    productImage: string,
    productPrice: number
}

export const ProductItem:FC<ProductProps> = ({productName, productImage, productPrice}) => {

    const theme = useTheme();
    const greaterThanLarge = useMediaQuery(theme.breakpoints.up("lg"));

    const slidebg = keyframes`
      0% {
        background-position: -30vw 0
      }
      100% {
        background-position: 55vw 0
      }`

    const typographyStyle = {
        fontFamily: 'Avenir',
        position: 'absolute',
        fontSize: {
            xl: '2.0rem',
            lg: '1.6rem',
            md: '2rem',
            sm: '1.6rem'
        },
        top: "0px",
        left: "20px",
        right: "20px",
        textAlign: 'center',
        fontWeight: 500,
        textDecoration: 'none',
        color: 'black',
        backgroundColor: 'transparent',
    }

    const buttonDefaultStyle = {
        display: 'none'
    } as React.CSSProperties

    const buttonHoverStyle = {
        height: '45px',
        zIndex: 2,
        fontSize: "1.59rem",
        lineHeight: 2.4,
        position: "absolute",
        bottom: "10px",
        left: "20px",
        right: "20px",
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

    const imageStyle = {
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
    }

    const container = {
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
        width: {xs: '70%', sm: "100%"},
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        //border: "1px solid #cddfe0"
        border: { xs: "0.01em solid #000000", sm: 'none'},
        '&:hover': {
            border: "0.01em solid #000000",
            borderRadius: '3%'
        }
    }

    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>(buttonDefaultStyle)


    const onItemHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle(buttonHoverStyle)
    }

    const onItemNotHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle(buttonDefaultStyle)
    }

    return (
        <Box sx={container} onMouseOver={onItemHover} onMouseLeave={onItemNotHover}>
            <Typography
                variant="h6"
                noWrap
                sx={typographyStyle}
            >
                {productName}
            </Typography>
            <Typography
                variant="h6"
                noWrap
                sx={{...typographyStyle, ...{ top: '10%', zIndex: 3, fontWeight: 700 }}}
            >
                {productPrice}$
            </Typography>
            <Box
                component="img"
                sx={imageStyle}
                src={productImage}
            />
            <Button
                sx={buttonStyle}
            >
                Buy!
            </Button>
        </Box>
    );
};