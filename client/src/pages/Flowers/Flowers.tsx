import {Checkbox, FormControlLabel, FormGroup, TextField, Typography} from '@mui/material';
import './Flowers.css'
import {ChangeEvent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getProducts} from "../../api/store/Product";
import {checkForOne, getCheckedItems} from "../../utils/Utilst";
import {productStyles} from "../../themes";
import {ProductsFilter} from "../../components/ProductsFilter/ProductsFilter";

interface LocationState {
    productType: string
}


export const Flowers = () => {

    const flowers = ['Anutina eyes', 'Orchidea', 'Roses', 'Lilies']

    const location = useLocation();

    const {productType} = location.state as LocationState;

    useEffect(() => {

    }, [])


    return (
        <>
            <ProductsFilter
                productsList={flowers}
                productType={productType}
                mainCheckboxName='Flowers'
            />
            <div className='products-container'>
                Avenir
            </div>
        </>
    );
};

