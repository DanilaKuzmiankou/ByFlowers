import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./ProductItem.css"
import Button from "@mui/material/Button";
import {useMediaQuery, useTheme} from "@mui/material";
import {catalogProductItem, productStyles} from "../../themes";
import {useNavigate} from "react-router-dom";


interface ProductProps {
    id: number,
    name: string,
    image: string,
    price: number
}

export const ProductItem:FC<ProductProps> = ({id, name, image, price}) => {

    const theme = useTheme();
    const greaterThanLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const navigate = useNavigate()


    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>(catalogProductItem.buttonDefaultStyle)


    const onItemHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle(catalogProductItem.buttonHoverStyle)
    }

    const onItemNotHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle(catalogProductItem.buttonDefaultStyle)
    }

    const goToItemPage = () => {
        navigate('product', { state: { id: id } })
    }

    return (
        <Box sx={catalogProductItem.container} onMouseOver={onItemHover} onMouseLeave={onItemNotHover} onClick={goToItemPage}>
            <Typography
                variant="h6"
                noWrap
                sx={catalogProductItem.typographyStyle}
            >
                {name}
            </Typography>
            <Typography
                variant="h6"
                noWrap
                sx={{...catalogProductItem.typographyStyle, ...{ top: '10%', zIndex: 3, fontWeight: 700 }}}
            >
                {price}$
            </Typography>
            <Box
                component="img"
                sx={catalogProductItem.pictureStyle}
                src={image}
            />
            <Button
                sx={buttonStyle}
            >
                Buy!
            </Button>
        </Box>
    );
};