import './Flowers.css'
import {useEffect} from "react";
import {ProductsFilter} from "../../components/ProductsFilter/ProductsFilter";

interface LocationState {
    productType: string
}


export const Flowers = () => {

    const flowers = ['Anutina eyes', 'Orchidea', 'Roses', 'Lilies']


    useEffect(() => {

    }, [])


    return (
        <>
            <ProductsFilter
                productsList={flowers}
                mainCheckboxName='Flowers'
            />
            <div className='products-container'>
                Avenir
            </div>
        </>
    );
};

