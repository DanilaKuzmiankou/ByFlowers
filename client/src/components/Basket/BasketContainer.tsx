import {styled} from "@mui/material/styles";
import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import basketStore from "../../store/BasketStore";
import {SwipeableDrawer, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {useEffect, useState} from "react";
import {buyButtonHoverStyle, productStyles} from "../../themes";
import userStore from "../../store/UserStore";
import {BasketItem} from "./BasketItem";
import Button from "@mui/material/Button";
import {NoItemsPlug} from "../NoItemsPlug/NoItemsPlug";
import productsStore from "../../store/ProductsStore";
import {IconContext} from "react-icons";
import {GrClose} from "react-icons/gr";
import IconButton from "@mui/material/IconButton";
import {CloseButton} from "../CloseButton/CloseButton";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export const BasketContainer = observer(() => {


    useEffect(() => {
        if(userStore.user.email) {
            basketStore.updateBasket(userStore.user.email)
        }
    }, [userStore.user.email])

    const openCompleteOrder = () => {
        basketStore.setIsCompleteOrderOpen(true)
    }

    return (
        <Box sx={{display: Boolean(basketStore.isBasketOpen) ? 'fixed' : 'none'}}>
            <SwipeableDrawer
                sx={{
                    '& .MuiDrawer-paper': {
                        width: {
                            xs: '100%',
                            sm: '400px',
                            lg: '500px',
                            xl: '30%'
                        },
                        boxSizing: 'border-box',
                        height: '100%'
                    }
                }}
                anchor='right'
                open={Boolean(basketStore.isBasketOpen)}
                onClose={() => basketStore.setIsBasketOpen(false)}
                onOpen={() => basketStore.setIsBasketOpen(true)}

                ModalProps={{
                    keepMounted: false,
                    }}
            >
                <DrawerHeader sx={{textAlign: 'start', display:'flex', justifyContent: 'start'}}>
                    Basket
                    <CloseButton closeFunction={() => basketStore.setIsBasketOpen(false)} />
                </DrawerHeader>
                <Divider />
                {basketStore.basketProducts && basketStore.basketProducts.length > 0
                    ?
                <Box sx={{padding: '0 10px 10px', display: 'flex', flexDirection: 'column', position: 'relative', height: "100%"}}>
                    {basketStore.basketProducts.map((basketProduct, index) => (
                        <BasketItem key={basketProduct.product.id} basketProduct={basketProduct} productNumber={index} />
                    ))}
                    <Box sx={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', margin: '5px 0'}}>
                        <Typography
                            sx={{...productStyles.customBoldFont, ...{display: 'inline-block'}}}>
                            Order Total
                        </Typography>
                        <Typography
                            sx={{...productStyles.customBoldFont, ...{display: 'inline-block', marginLeft: 'auto'}}}>
                            {basketStore.basketOrderTotal}$
                        </Typography>
                        </Box>
                        <Button
                            onClick={openCompleteOrder}
                            sx={{...buyButtonHoverStyle, ...{width: "100%"}}}
                        >
                            Buy!
                        </Button>
                    </Box>
                </Box>
                    :
                        <NoItemsPlug text='Sadly, you have no items in the basket' pictureHeight='100px' pictureWidth='100px' />
                    }
            </SwipeableDrawer>
        </Box>
    );
})
