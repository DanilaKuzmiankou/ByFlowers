import {Checkbox, FormControlLabel, FormGroup, Grid, Pagination, TextField, Typography} from '@mui/material';
import './Plants.css'
import {ChangeEvent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {ProductsFilter} from "../../components/ProductsFilter/ProductsFilter";
import {observer} from "mobx-react-lite";
import productsStore from "../../store/ProductsStore";
import {toJS} from "mobx";
import {productStyles} from "../../themes";
import {ProductItem} from "../../components/ProductItem/ProductItem";


export const Plants = observer(() => {


    const plants = ['Cactus', 'Begonia', 'Paddle Plant', 'Lady Palm', 'Peperomia', 'Pothos', 'Agloenema Chinese Evergreen', 'Mini Jade Plant', 'Asparagus Fern']


    return (
        <>
        <Grid columns={16} container style={{width: '100%'}}>
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
                    <div className='header-container'>
                        <Typography
                            sx={{...productStyles.customBoldFont, ...productStyles.headerTypographyStyle}}>
                            {productsStore.selectedProductsName}
                        </Typography>
                    </div>
                    <div style={{width: '100%'}}>
                        <Grid container spacing={3} sx={{padding: '20px', width: '100%'}}>
                            {productsStore.products.map((product) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} xxl={2} key={product.id} data-aos="zoom-in"
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
        <Pagination sx={{paddingBottom: '10px', fontSize: '30rem'}} count={10} variant="outlined" size="large"/>
    </div>
        </>
    );
})

