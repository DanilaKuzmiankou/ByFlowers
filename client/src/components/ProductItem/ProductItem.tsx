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

    const [buttonText, setButtonText] = useState<string>(`${productPrice}$`)
    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>()

    const slidebg = keyframes`
            to {
                background-position:20vw;
            }
        `

    const typographyStyle = {
        textAlign: 'center',
        fontFamily: 'GilroyHeavyItalic',
        fontWeight: 700,
        textDecoration: 'none',
        color: 'black',
        backgroundColor: 'transparent',
    } as React.CSSProperties

    const buttonHoverStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75px',
        height: '45px',
        backgroundColor: 'rgb(88,229,88)',
        clipPath: 'polygon(33% 0, 100% 0, 100% 100%, 0 100%, 0 37%)',
        color: 'white',
        '&:hover': {
            background: "radial-gradient(circle, rgba(88,229,88,1) 0%, rgba(148,187,233,1) 100%)",
            animation: `${slidebg} 3s linear infinite`
        }

    } as React.CSSProperties



    const onItemHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonText('Buy!')
        setButtonStyle({...typographyStyle, ...buttonHoverStyle})
    }

    const onItemNotHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonText(`${productPrice}$`)
        setButtonStyle(typographyStyle)
    }

    useEffect(() => {
        console.log(toJS(productImage))
    }, [])

    return (
        <div className='container' onMouseOver={onItemHover} onMouseLeave={onItemNotHover}>
            <Box
                component="img"
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height: 125,
                    width: 125}}
                src={productImage}
            />
            <Typography
                variant="h6"
                noWrap
                sx={typographyStyle}
            >
                {productName}
            </Typography>
            <Button
                sx={buttonStyle}
            >
                {buttonText}
            </Button>
        </div>
    );
};