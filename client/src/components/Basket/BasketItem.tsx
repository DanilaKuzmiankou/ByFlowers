import React, {FC, useEffect, useRef, useState} from 'react';
import {CountInputProps, IBasketProduct, IProduct} from "../../models/IProduct";
import Typography from "@mui/material/Typography";
import {buyButtonHoverStyle, catalogProductItem, productStyles} from "../../themes";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ProductCounterInput} from "../ProductCounterInput/ProductCounterInput";
import {toJS} from "mobx";
import IconButton from "@mui/material/IconButton";
import {IconContext} from "react-icons";
import {RiDeleteBin6Line} from "react-icons/ri";
import {deleteBasketProduct} from "../../api/store/Basket";
import userStore from "../../store/UserStore";
import basketStore from "../../store/BasketStore";

interface BasketItemProps {
    basketProduct: IBasketProduct,
}

const basketItemStyle = {
    padding: '5px',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    '&:hover': {
        boxShadow: "rgb(44, 62, 80) -15px 0px 15px -15px, rgb(44, 62, 80) 15px 0px 15px -15px"
    }
}

export const BasketItem: FC<BasketItemProps> = ({basketProduct}) => {

    const countInputRef = useRef<CountInputProps>(null)

    const [itemCount, setItemCount] = useState<number>(basketProduct.count)


    useEffect(() => {
        if (countInputRef.current) {
            countInputRef.current.counterSetCount(basketProduct.count)
        }
    }, [basketProduct])


    const deleteItemFromBasket = () => {
        basketStore.deleteProduct(userStore.user.email, basketProduct.product.id)
    }


    return (
        <Box sx={basketItemStyle}>
            <Box
                component="img"
                sx={{
                    height: '130px',
                    width: '140px',
                    flexShrink: 0
                }}
                src={basketProduct.product.pictures[0].picture}
            />
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: '5px'}}>
                <Box
                    sx={{display: 'flex', flexDirection: 'row'}}
                >
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        letterSpacing: '0 !important',
                        marginTop: '3px'
                    }
                    }
                >
                    {basketProduct.product.name}
                </Typography>
                <IconButton
                    onClick={deleteItemFromBasket}
                    aria-label="delete"
                    sx={{ marginLeft: 'auto' }}
                >
                    <IconContext.Provider value={{ color: 'black', size: '13'}}>
                        <RiDeleteBin6Line />
                    </IconContext.Provider>
                </IconButton>
                </Box>
                <Box
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >

                    <Box sx={{
                        width: '80px'
                    }}
                    >
                        <ProductCounterInput
                            ref={countInputRef}
                            setItemCount={setItemCount}
                            totalCount={basketProduct.product.count}
                            startCount={basketProduct.count}
                        />
                    </Box>
                    <Typography
                        sx={{...productStyles.customBoldFont, ...{display: 'inline-block', marginLeft: 'auto'}}}>
                        {basketProduct.product.price * itemCount}$
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};