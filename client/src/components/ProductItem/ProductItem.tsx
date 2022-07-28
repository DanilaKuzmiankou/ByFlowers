import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./ProductItem.css"
import {toJS} from "mobx";
import Button from "@mui/material/Button";
import {keyframes} from "@emotion/react";

interface ProductProps {
    productName: string,
    productImage: string,
    productPrice: number
}

export const ProductItem:FC<ProductProps> = ({productName, productImage, productPrice}) => {


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
        top: "0px",
        left: "20px",
        right: "20px",
        textAlign: 'center',
        fontWeight: 700,
        textDecoration: 'none',
        color: 'black',
        backgroundColor: 'transparent',
    } as React.CSSProperties

    const buttonDefaultStyle = {
        display: 'none'
    } as React.CSSProperties

    const buttonHoverStyle = {
        height: '45px',
        zIndex: 2,
        fontSize: "1.54em",
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
        left: "20px",
        right: "20px",
        height: '80%',
        width: '90%'
    }

    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>(buttonDefaultStyle)


    const onItemHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle(buttonHoverStyle)
    }

    const onItemNotHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle(buttonDefaultStyle)
    }

    return (
        <div className='container' onMouseOver={onItemHover} onMouseLeave={onItemNotHover}>
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
                sx={{...typographyStyle, ...{ top: '25px', zIndex: 3 }}}
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
        </div>
    );
};