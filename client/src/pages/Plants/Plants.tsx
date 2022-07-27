import {Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography} from '@mui/material';
import './Plants.css'
import {ChangeEvent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {ProductsFilter} from "../../components/ProductsFilter/ProductsFilter";
import {observer} from "mobx-react-lite";
import productsStore from "../../store/ProductsStore";
import {toJS} from "mobx";
import {productStyles} from "../../themes";
import {ProductItem} from "../../components/ProductItem/ProductItem";

interface LocationState {
    productType: string
}

export const Plants = observer(() => {



    const headerTypographyStyle = {
        fontSize: '2rem',
        whiteSpace: 'nowrap',
    } as React.CSSProperties;


    const plants = ['Cactus', 'Begonia', 'Paddle Plant', 'Lady Palm', 'Peperomia', 'Pothos', 'Agloenema Chinese Evergreen', 'Mini Jade Plant', 'Asparagus Fern']

    const location = useLocation();

    const {productType} = location.state as LocationState;

    return (
        <div style={{display: 'flex'}} >
            <div>
                <ProductsFilter
                    productsList={plants}
                    productType={productType}
                    mainCheckboxName='Plants'
                />
            </div>
            <div className='products-container'>
                <div className='header-container'>
                    <Typography sx  ={{...productStyles.customBoldFont, ...headerTypographyStyle}}>
                        {productsStore.selectedProductsName}
                    </Typography>
                </div>
                <div>
                    <Grid container spacing={2}>
                        {productsStore.products.map((product) => (
                            <Grid item xs={6} lg={3} key={product.id}>
                                <ProductItem productName={product.name} productImage={product.pictures[0].picture} productPrice={product.price} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
})

