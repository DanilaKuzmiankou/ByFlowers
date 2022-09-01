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

    const openCompleteOrder = () => {
        basketStore.setIsCompleteOrderOpen(true)
    }

    return (
        <Box sx={{display: Boolean(basketStore.isBasketOpen) ? 'fixed' : 'none'}}>
            <SwipeableDrawer
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '30%',
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
                            {orderTotal}$
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
