import React, {FC} from 'react';
import {IBasketProduct, IProduct} from "../../models/IProduct";
import Typography from "@mui/material/Typography";
import {buyButtonHoverStyle, catalogProductItem, productStyles} from "../../themes";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface BasketItemProps {
    basketProduct: IBasketProduct
}

export const BasketItem:FC<BasketItemProps> = ({basketProduct}) => {

    return (
        <Box>
            <Typography
                variant="h6"
                noWrap
                sx={productStyles.customBoldFont}
            >
                {basketProduct.product.name}
            </Typography>
            <Box
                component="img"
                sx={{
                    height: '125px',
                    width: '150px'
                }}
                src={basketProduct.product.pictures[0].picture}
            />

        </Box>
    );
};