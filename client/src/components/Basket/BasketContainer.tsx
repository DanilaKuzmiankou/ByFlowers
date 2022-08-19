import {styled} from "@mui/material/styles";
import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import basketStore from "../../store/BasketStore";
import {SwipeableDrawer, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {buyButtonHoverStyle, productStyles} from "../../themes";
import productsStore from "../../store/ProductsStore";
import {ProductsFilter} from "../ProductsFilter/ProductsFilter";
import {useEffect} from "react";
import userStore from "../../store/UserStore";
import {BasketItem} from "./BasketItem";
import Button from "@mui/material/Button";

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


    return (
        <Box sx={{display: Boolean(basketStore.isBasketOpen) ? 'fixed' : 'none'}}>
            <SwipeableDrawer
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '30%',
                        boxSizing: 'border-box',
                    }
                }}
                anchor='right'
                open={Boolean(basketStore.isBasketOpen)}
                onClose={() => basketStore.setIsBasketOpen(false)}
                onOpen={() => basketStore.setIsBasketOpen(true)}
                ModalProps={{
                    keepMounted: true,
                }}
            >

                <DrawerHeader sx={{textAlign: 'start', display:'flex', justifyContent: 'start'}}>
                    Basket
                </DrawerHeader>
                <Divider />
                <Box sx={{padding: '0 10px', position: 'relative'}}>
                    {basketStore.basketProducts.map(basketProduct => (
                        <BasketItem key={basketProduct.product.id} basketProduct={basketProduct} />
                    ))}
                    <Button
                    >
                        Buy!
                    </Button>
                </Box>
            </SwipeableDrawer>
        </Box>
    );
})
