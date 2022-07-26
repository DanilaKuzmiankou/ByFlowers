import {Checkbox, FormControlLabel, FormGroup, TextField, Typography} from '@mui/material';
import './Plants.css'
import {ChangeEvent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {ProductsFilter} from "../../components/ProductsFilter/ProductsFilter";

interface LocationState {
    productType: string
}


export const Plants = () => {

    const plants = ['Сactus', 'Begonia', 'Paddle Plant', 'Lady Palm', 'Peperomia', 'Pothos', 'Agloenema Chinese Evergreen', 'Mini Jade Plant', 'Asparagus Fern']

    const location = useLocation();

    const { productType } = location.state as LocationState;


    return (
        <>
         <ProductsFilter
             products={plants}
             productType={productType}
             mainCheckboxName='Plants'
         />
          <div className='products-container'>
                Avenir
          </div>
        </>
    );
};

