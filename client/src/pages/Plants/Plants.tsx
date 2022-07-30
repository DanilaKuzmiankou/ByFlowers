import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Pagination,
    TextField,
    Typography,
    useMediaQuery, useTheme
} from '@mui/material';
import './Plants.css'
import {ChangeEvent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {ProductsFilter} from "../../components/ProductsFilter/ProductsFilter";
import {observer} from "mobx-react-lite";
import productsStore from "../../store/ProductsStore";
import {toJS} from "mobx";
import {productStyles} from "../../themes";
import {ProductItem} from "../../components/ProductItem/ProductItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import {MobileProductsFilter} from "../../components/ProductsFilter/MobileProductsFilter";

export const Plants = observer(() => {

    const theme = useTheme();

    const plants = ['Cactus', 'Begonia', 'Paddle Plant', 'Lady Palm', 'Peperomia', 'Pothos', 'Agloenema Chinese Evergreen', 'Mini Jade Plant', 'Asparagus Fern']

    let itemsLimit:number = 12

    const sm = useMediaQuery(theme.breakpoints.between("xs", "md"));
    const md = useMediaQuery(theme.breakpoints.between("sm", "lg"));
    const lgAndXl = useMediaQuery(theme.breakpoints.between("md", "xxxl"));
    const xxxl = useMediaQuery(theme.breakpoints.up("xxl"))

    useEffect(()=> {
        getItemsCountPerPage()
        //<Grid item xs={12} sm={6} md={4} lg={3} xl={3} xxl={2} key={product.id} data-aos="zoom-in"

    }, [])


    const openDrawer = () => {
        productsStore.setDrawerIsOpen(true)
    }

    const getItemsCountPerPage = () => {
        if (md) {
            productsStore.setItemsLimit(12)
        } else if (lgAndXl) {
            productsStore.setItemsLimit(16)
        }
        else if(xxxl) {
            productsStore.setItemsLimit(24)
        }

    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        productsStore.setItemsOffset(page*productsStore.itemsLimit-productsStore.itemsLimit)
        productsStore.fetchSameProducts()
    }

    return (
        <>
        <Grid columns={16} container style={{width: '100%', minHeight: '100vh'}}>
            <Grid item
                  xs={0}
                  sm={4}
                  md={3}
                  lg={2}
                  xl={3}
                  sx={{
                      display: {xs: 'none', sm:'initial'},
                      alignSelf: 'start',
                      position: 'sticky',
                      top: 0}}>
                <div className='filters-container'>
                    <ProductsFilter
                        productsList={plants}
                        mainCheckboxName='Plants'
                    />
                </div>
            </Grid>
            <Grid item
                  xs={16}
                  sm={12}
                  md={13}
                  lg={14}
                  xl={13}>
                <div className='products-container'>
                    <Box sx={{
                        position: 'relative',
                        alignItems: 'start',
                        justifyContent: 'start',
                        padding: {
                            sm: '20px',
                            xs: '10px 6px'
                        }
                    }}>
                        <Typography
                            sx={{...productStyles.customBoldFont, ...productStyles.headerTypographyStyle}}>
                            {productsStore.selectedProductsName}
                        </Typography>
                        <Box
                            onClick={openDrawer}
                            sx={{
                                display: { xs: 'inline-block', sm: 'none'}
                            }}
                        >
                            <IconButton sx={{position: 'absolute', right: '10px', top: '3px'}} >
                                <TuneTwoToneIcon fontSize={'large'} />
                            </IconButton>
                        </Box>
                    </Box>

                    <MobileProductsFilter
                        productsList={plants}
                        mainCheckboxName='Plants'
                    />
                    <div >
                        <Grid container spacing={{xs: 3, sm: 3}} sx={{padding: {sm: '20px', xs: '0 7px'}, width: '100%'}}>
                            {productsStore.products.map((product) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} xxxl={2} key={product.id} data-aos="zoom-in"
                                      sx={{display: 'flex', justifyContent: 'center'}}
                                >
                                    <ProductItem productName={product.name} productImage={product.pictures[0].picture}
                                                 productPrice={product.price}/>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            </Grid>

        </Grid>
    <div className='pagination-container'>
        <Pagination sx={{paddingBottom: '10px', fontSize: '30rem'}}
                    count={Math.ceil(productsStore.productsCount/productsStore.itemsLimit)}
                    variant="outlined"
                    size="large"
                    onChange={handleChangePage}
        />
    </div>
        </>
    );
})

