import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IProduct} from "../../models/IProduct";
import {Grid, TextField, Typography} from "@mui/material";
import {buyButtonHoverStyle, catalogProductItem, productStyles} from "../../themes";
import productsStore from "../../store/ProductsStore";
import Box from "@mui/material/Box";

import './Product.css'
import {ProductGallery} from "../../components/ProductGallery/ProductGallery";
import Button from "@mui/material/Button";
import {getRecommendationProducts} from "../../api/store/Product";
import {ProductItem} from "../../components/ProductItem/ProductItem";
import basketStore from "../../store/BasketStore";
import {addToBasket, getBasketProductCount} from "../../api/store/Basket";
import userStore from "../../store/UserStore";
import {toJS} from "mobx";


interface LocationState {
    productJson: string
}

export const Product = () => {

    const location = useLocation();
    let {productJson} = location.state as LocationState;
    let product = JSON.parse(productJson) as IProduct

    const navigate = useNavigate()
    const [count, setCount] = useState<number>(1)
    const [totalCount, setTotalCount] = useState<number>(product.count)
    const [recommendationsProducts, setRecommendationsProducts] = useState<IProduct[]>()


    const defaultContainerStyle = {
        position: 'relative',
        minHeight: '100vh',
        width: 'content',
        display: 'flex',
        justifyContent: 'center',
        padding: '30px 0'
    } as React.CSSProperties

    const defaultEmptyContainerStyle = {
        textAlign: 'center',
        position: 'absolute',
        top: '25%',
        left: 0,
        right: 0,
        margin: '0 auto',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center'
    } as React.CSSProperties

    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>(defaultContainerStyle)
    const [emptyContainerStyle, setEmptyContainerStyle] = useState<React.CSSProperties>(defaultEmptyContainerStyle)



    useEffect(() => {
        async function fetch(){
            console.log('user:', toJS(userStore.user))
            if(userStore.user.email) {
                const response = await getBasketProductCount(product.id, userStore.user.email)
                const basketCount = response.data
                setTotalCount(product.count - basketCount)
            }
        }
        fetch()
        fetchRecommendationsProducts()
    }, [userStore.user])

    useEffect(() => {
        checkForPresence()
    }, [totalCount])

    async function fetchRecommendationsProducts() {
        const recommendationsProductsFromApi = await getRecommendationProducts(3)
        setRecommendationsProducts(recommendationsProductsFromApi.data)
    }

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
        padding: '20px 0',
        backgroundColor: '#38403D',
        color: 'white',
        minHeight: '500px'
    }

    const recommendationsBoxName = {
        display: 'block',
        fontSize: '3.5rem',
        textAlign: 'center',
        padding: '30px 0'
    }

    const recommendationsBoxItem = {
        display: 'inline-block',
        width: '350px',
        padding: '20px'
    }

    const increaseCount = () => {
        if (count < totalCount) setCount(count + 1)
    }
    const decreaseCount = () => {
        if (count > 1) setCount(count - 1)
    }

    const setNewCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentCount = Number(event.target.value)
        if (!isNaN(currentCount)) {
            if (currentCount === 0) setCount(1)
            else if (currentCount > totalCount) setCount(totalCount)
            else setCount(currentCount)
        }
    }


    const goToItemPage = (product: IProduct) => {
        navigate('../product', { state: {
                productJson: JSON.stringify(product)
            } })
        fetchRecommendationsProducts()
        window.scrollTo(0, 0)
    }

    const addProductToBasket = async () => {
        basketStore.setBasketProducts(basketStore.basketProducts + count)
        const response = await addToBasket(product.id, count, userStore.user.email)
        setCount(1)
        const currentProductCount = response.data
        product.count = currentProductCount
        setTotalCount(currentProductCount)
    }

    const checkForPresence = () => {
        if(totalCount<=0) {
            const newDefaultNoItemsContainerStyle = {...defaultEmptyContainerStyle}
            newDefaultNoItemsContainerStyle.display = 'flex'
            console.log('res:', defaultEmptyContainerStyle)
            setContainerStyle({...defaultContainerStyle, ...{
                    opacity: 0.5,
                    pointerEvents: 'none'
            }})
            setEmptyContainerStyle({...emptyContainerStyle, ...{display: 'flex'}})
        }
    }


    return (
        <>
            {product ?
                <div style={{ position: 'relative' }}>
                    <Box sx={emptyContainerStyle}>
                        <Typography
                            sx={{...productStyles.customBoldFont, ...productStyles.headerTypographyStyle, ...{zIndex: 300}}}>
                            There is no more {product.name} in storage!
                        </Typography>
                    </Box>
                    <Grid container sx={containerStyle}>
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
                                        sx={{
                                            ...productStyles.customNormalFont, ...{
                                                whiteSpace: 'normal',
                                                width: '550px'
                                            }
                                        }}>
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
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    margin: '15px 0',
                                    alignItems: 'center'
                                }}>
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
                                        inputProps={{style: {textAlign: 'center', fontSize: '1.2rem'}}}
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
                                    Total count: {totalCount}
                                </Typography>
                                <Button
                                    onClick={addProductToBasket}
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
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            {recommendationsProducts?.map((product) => (
                                <Box sx={recommendationsBoxItem} onClick={() => goToItemPage(product)}>
                                    <ProductItem product={product}/>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </div>
                : null}
        </>
    );
};
