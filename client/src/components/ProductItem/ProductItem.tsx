import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./ProductItem.css"
import Button from "@mui/material/Button";
import {useMediaQuery, useTheme} from "@mui/material";
import {catalogProductItem, productStyles} from "../../themes";


interface ProductProps {
    productName: string,
    productImage: string,
    productPrice: number
}

export const ProductItem:FC<ProductProps> = ({productName, productImage, productPrice}) => {

    const theme = useTheme();
    const greaterThanLarge = useMediaQuery(theme.breakpoints.up("lg"));



    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>(catalogProductItem.buttonDefaultStyle)


    const onItemHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle(catalogProductItem.buttonHoverStyle)
    }

    const onItemNotHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle(catalogProductItem.buttonDefaultStyle)
    }

    return (
        <Box sx={catalogProductItem.container} onMouseOver={onItemHover} onMouseLeave={onItemNotHover}>
            <Typography
                variant="h6"
                noWrap
                sx={catalogProductItem.typographyStyle}
            >
                {productName}
            </Typography>
            <Typography
                variant="h6"
                noWrap
                sx={{...catalogProductItem.typographyStyle, ...{ top: '10%', zIndex: 3, fontWeight: 700 }}}
            >
                {productPrice}$
            </Typography>
            <Box
                component="img"
                sx={catalogProductItem.pictureStyle}
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