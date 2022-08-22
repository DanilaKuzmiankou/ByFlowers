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
import {useEffect, useState} from "react";
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

    const [orderTotal, setOrderTotal] = useState<number>(0)

    useEffect(() => {
        if(userStore.user.email) {
            basketStore.updateBasket(userStore.user.email)
        }
    }, [userStore.user.email])


    useEffect(() => {
        const newOrderTotal = basketStore.basketProductsCost.reduce((partialSum, a) => partialSum + a, 0)
        setOrderTotal(newOrderTotal)
    }, [basketStore.basketProductsCost])

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
                <Box sx={{padding: '0 10px 10px', display: 'flex', flexDirection: 'column', position: 'relative', height: "100%"}}>
                    {basketStore.basketProducts.map((basketProduct, index) => (
                        <BasketItem key={basketProduct.product.id} basketProduct={basketProduct} productNumber={index} />
                    ))}
                    <Box sx={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
                        <Box>
                        <Typography
                            sx={{...productStyles.customBoldFont, ...{display: 'inline-block'}}}>
                            Order Total_
                        </Typography>
                        <Typography
                            sx={{...productStyles.customBoldFont, ...{display: 'inline-block', marginLeft: 'auto'}}}>
                            {orderTotal}$
                        </Typography>
                        </Box>
                        <Button
                            sx={{...buyButtonHoverStyle, ...{width: "100%"}}}
                        >
                            Buy!
                        </Button>
                    </Box>
                </Box>
            </SwipeableDrawer>
        </Box>
    );
})
