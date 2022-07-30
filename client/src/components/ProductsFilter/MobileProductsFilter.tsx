import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TuneTwoToneIcon from "@mui/icons-material/TuneTwoTone";
import {ProductsFilter, ProductsProps} from "./ProductsFilter";
import {FC} from "react";
import productsStore from "../../store/ProductsStore";
import {observer} from "mobx-react-lite";
import {SwipeableDrawer} from "@mui/material";

const drawerWidth = '80%';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export const MobileProductsFilter = observer<ProductsProps>(({
                                                                                             productsList, mainCheckboxName
                                                                                         }) => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: open ? 'fixed' : 'none'}}>
            <SwipeableDrawer
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '75%',
                        boxSizing: 'border-box',
                    }
                }}
                anchor='left'
                open={Boolean(productsStore.drawerIsOpen)}
                onClose={() => productsStore.setDrawerIsOpen(false)}
                onOpen={() => productsStore.setDrawerIsOpen(true)}
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
