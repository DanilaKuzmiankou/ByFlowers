import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useMediaQuery, useTheme} from "@mui/material";
import {buyButtonDefaultStyle, buyButtonHoverStyle, catalogProductItem, productStyles} from "../../themes";
import {useNavigate} from "react-router-dom";
import {IProduct} from "../../models/IProduct";
import basketStore from "../../store/BasketStore";


interface ProductProps {
    product: IProduct
}

export const ProductItem:FC<ProductProps> = ({product}) => {

    const theme = useTheme();
    const greaterThanLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const navigate = useNavigate()

    const buyButtonOverElementsStyle = {
        position: "absolute",
        bottom: "10px",
        left: "20px",
        right: "20px",
    } as React.CSSProperties

    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>(buyButtonDefaultStyle)


    const onItemHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle({...buyButtonHoverStyle, ...buyButtonOverElementsStyle})
    }

    const onItemNotHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle({...buyButtonDefaultStyle, ...buyButtonOverElementsStyle})
    }

    const goToItemPage = () => {
        navigate('../product', { state: {
            productJson: JSON.stringify(product)
        } })
    }


    return (

        <Box sx={catalogProductItem.container} onMouseOver={onItemHover} onMouseLeave={onItemNotHover} onClick={goToItemPage}>
            <Typography
                variant="h6"
                noWrap
                sx={catalogProductItem.typographyStyle}
            >
                {product.name}
            </Typography>
            <Typography
                variant="h6"
                noWrap
                sx={{...catalogProductItem.typographyStyle, ...{ top: '10%', zIndex: 3, fontWeight: 700 }}}
            >
                {product.price}$
            </Typography>
            <Box
                component="img"
                sx={catalogProductItem.pictureStyle}
                src={product.pictures[0].picture}
            />
            <Button
                sx={buttonStyle}
            >
                Buy!
            </Button>
        </Box>
    );
};