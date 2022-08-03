import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ProductModel} from "../../types/ProductModel";
import {Grid, TextField, Typography} from "@mui/material";
import {buyButtonHoverStyle, catalogProductItem, productStyles} from "../../themes";
import productsStore from "../../store/ProductsStore";
import Box from "@mui/material/Box";

import './Product.css'
import {ProductGallery} from "../../components/ProductGallery/ProductGallery";
import Button from "@mui/material/Button";


interface LocationState {
    productJson: string
}

export const Product = () => {

    const location = useLocation();
    let {productJson} = location.state as LocationState;
    let product = JSON.parse(productJson) as ProductModel

    const [count, setCount] = useState<number>(1)

    useEffect(() => {
        console.log('id', product)
    }, [])

    const addToCartButtonStyle = {
        width: '350px',
        display: 'block'
    }

    const counterButtonsStyle = {
        padding: 0,
        fontSize: '2rem',
        display: 'block',
        height: '35px',
        width: '35px',
        minWidth: '35px',
    }

    const additionalText = {
        color: '#9F9F9F',
        fontSize: '1.1rem',
        lineHeight: '0.8',
        width: '100%',
        textAlign: 'center',
        margin: '0 0 10px'
    }

    const recommendationsBox = {
        backgroundColor: '#38403D',
        color: 'white',
        minHeight: '500px'
    }

    const recommendationsBoxName = {
        display: 'block',
        fontSize: '3.5rem',
        textAlign: 'center',
        paddingTop: '30px'
    }

    const increaseCount = () => { if(count< product.count) setCount(count+1) }
    const decreaseCount = () => { if(count>1) setCount(count-1) }

    const setNewCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentCount = Number(event.target.value)
        if(!isNaN(currentCount)) {
            if (currentCount === 0) setCount(1)
            else if (currentCount > product.count) setCount(product.count)
            else setCount(currentCount)
        }
    }

    return (
        <>
            {product ?
                <>
                <Grid container sx={{
                    minHeight: '100vh',
                    width: 'content',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '30px 0'
                }}>
                    <Grid item xs={'auto'} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Box>
                            <Typography
                                sx={{...productStyles.customBoldFont, ...productStyles.headerTypographyStyle}}>
                                {product.name}
                            </Typography>
                            <ProductGallery pictures={product.pictures}/>
                            <Box>
                                <Typography
                                    sx={{...productStyles.customBoldFont, ...productStyles.headerTypographyStyle}}>
                                    Description
                                </Typography>
                                <hr/>
                                <Typography
                                    sx={{...productStyles.customNormalFont, ...{whiteSpace: 'normal', width: '550px'}}}>
                                    {product.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={'auto'}
                        sx={{
                            alignSelf: 'start',
                            position: 'sticky',
                            top: '0px'
                        }}>
                        <Box sx={{marginLeft: '30px', marginTop: "40px", display: 'flex', flexDirection: 'column'}}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography
                                    sx={{...productStyles.customBoldFont, ...{display: 'inline-block'}}}>
                                    Price:
                                </Typography>
                                <Typography
                                    sx={{...productStyles.customBoldFont, ...{display: 'inline-block'}}}>
                                    {product.price}$
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', margin: '15px 0', alignItems: 'center'}}>
                                <Button
                                    color="success"
                                    sx={counterButtonsStyle}
                                    onClick={decreaseCount}
                                >
                                    -
                                </Button>
                                <TextField
                                    color="success"
                                    sx={{...productStyles.customNormalFont, ...{display: 'inline-block'}}}
                                    inputProps={{style: { textAlign: 'center', fontSize: '1.2rem' }}}
                                    value={count}
                                    onChange={setNewCount}
                                    />
                                <Button
                                    color="success"
                                    sx={counterButtonsStyle}
                                    onClick={increaseCount}
                                >
                                    +
                                </Button>
                            </Box>
                            <Typography
                                sx={additionalText}>
                                Total count: {product.count}
                            </Typography>
                            <Button
                                sx={{...buyButtonHoverStyle, ...addToCartButtonStyle}}
                            >
                                Add to cart!
                            </Button>

                        </Box>

                    </Grid>
                </Grid>
                    <Box sx={recommendationsBox}>
                        <Typography
                            sx={{...productStyles.customBoldFont, ...recommendationsBoxName}}>
                            You may also like
                        </Typography>
                    </Box>
                </>
                : null}
        </>
    );
};
