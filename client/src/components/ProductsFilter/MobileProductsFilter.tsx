import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {ProductsFilter, ProductsProps} from "./ProductsFilter";
import productsStore from "../../store/ProductsStore";
import {observer} from "mobx-react-lite";
import {SwipeableDrawer} from "@mui/material";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export const MobileProductsFilter = observer<ProductsProps>(({ productsList, mainCheckboxName}) => {
    return (
        <Box sx={{display: Boolean(productsStore.isDrawerOpen) ? 'fixed' : 'none'}}>
            <SwipeableDrawer
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '75%',
                        boxSizing: 'border-box',
                    }
                }}
                anchor='left'
                open={Boolean(productsStore.isDrawerOpen)}
                onClose={() => productsStore.setIsDrawerOpen(false)}
                onOpen={() => productsStore.setIsDrawerOpen(true)}
                ModalProps={{
                    keepMounted: true,
                }}
            >

                <DrawerHeader sx={{textAlign: 'start', display:'flex', justifyContent: 'start'}}>
                    Filters
                </DrawerHeader>
                <Divider />
                <Box sx={{padding: '0 10px'}}>
                <ProductsFilter productsList={productsList} mainCheckboxName={mainCheckboxName} />
                </Box>
            </SwipeableDrawer>
        </Box>
    );
})
