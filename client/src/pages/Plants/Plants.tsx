import {Grid, MenuItem, Pagination, Select, Typography, useMediaQuery, useTheme} from '@mui/material';
import './Plants.css'
import {ChangeEvent, useEffect} from "react";
import {ProductsFilter} from "../../components/ProductsFilter/ProductsFilter";
import {observer} from "mobx-react-lite";
import productsStore from "../../store/ProductsStore";
import {productStyles} from "../../themes";
import {ProductItem} from "../../components/ProductItem/ProductItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import {MobileProductsFilter} from "../../components/ProductsFilter/MobileProductsFilter";
import {CustomSelect} from "../../components/CustomSelect/CustomSelect";
import {NoItemsPlug} from "../../components/NoItemsPlug/NoItemsPlug";
import {getProductsTypesByCategory} from "../../api/store/Product";

export const Plants = observer(() => {

    const theme = useTheme();

    const plants = ['Cactus', 'Begonia', 'Paddle Plant', 'Lady Palm', 'Peperomia', 'Pothos', 'Agloenema Chinese Evergreen', 'Mini Jade Plant', 'Asparagus Fern']

    const md = useMediaQuery(theme.breakpoints.between("sm", "lg"));
    const lgAndXl = useMediaQuery(theme.breakpoints.between("md", "xxxl"));
    const xxxl = useMediaQuery(theme.breakpoints.up("xxl"))


    useEffect(() => {
        async function fetch() {
            const resp = await getProductsTypesByCategory(true)
            console.log('fet', resp.data)
        }
        fetch()
        getItemsCountPerPage()
    }, [])

    const openDrawer = () => {
        productsStore.setIsDrawerOpen(true)
    }

    const getItemsCountPerPage = () => {
        if (md) {
            productsStore.setItemsLimit(12)
        } else if (lgAndXl) {
            productsStore.setItemsLimit(16)
        } else if (xxxl) {
            productsStore.setItemsLimit(24)
        }
    }

    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        productsStore.setItemsOffset(page * productsStore.itemsLimit - productsStore.itemsLimit)
        productsStore.fetchProducts()
    }

    return (
        <>
            <Grid columns={16} container sx={{width: '100%', minHeight: '100vh', padding: {xs: '3px', md: '10px'}}}>
                <Grid item
                      xs={0}
                      sm={4}
                      md={3}
                      lg={2}
                      xl={3}
                      sx={{
                          display: {xs: 'none', sm: 'inline-block'},
                          alignSelf: 'start',
                          position: 'sticky',
                          top: 0
                      }}>
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
                            display: 'flex',
                            position: 'relative',
                            alignItems: 'start',
                            flexFlow: { xs: 'row wrap', sm: 'initial'},
                            justifyContent: 'start',
                            padding: {
                                sm: '20px',
                                xs: '7px 3px'
                            }
                        }}>
                            <Typography
                                sx={{...productStyles.customBoldFont, ...productStyles.headerTypographyStyle }}>
                                {productsStore.selectedProductsName}
                            </Typography>
                            <Box sx={{ display : 'flex', width: '100%', mt: '5px'}}>
                            <Box
                                onClick={openDrawer}
                                sx={{
                                    display: {xs: 'inline-block', sm: 'none'}
                                }}
                            >
                                <IconButton >
                                    <TuneTwoToneIcon fontSize={'large'}/>
                                </IconButton>
                            </Box>
                            <Box sx={{ pr: { xs: '5px', md: '50px'}, alignItems: 'center', display: 'flex', width: '100%'}}>
                                <Typography
                                    sx={{...productStyles.customBoldFont, ...{marginLeft: 'auto', mr: '10px', whiteSpace: 'no-wrap' }}}>
                                    Sort by
                                </Typography>
                                <CustomSelect />
                            </Box>
                            </Box>
                        </Box>

                        <MobileProductsFilter
                            productsList={plants}
                            mainCheckboxName='Plants'
                        />
                            {productsStore.products && productsStore.products.length > 0
                                ?
                                <Grid container spacing={{xs: 3, sm: 3}}
                                      sx={{padding: {sm: '20px', xs: '0 7px'}, width: '100%'}}>
                                    {productsStore.products.map((product) => (
                                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} xxxl={2} key={product.id}
                                              data-aos="zoom-in"
                                              sx={{display: 'flex', justifyContent: 'center'}}
                                        >

                                            <ProductItem
                                                product={product}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                :
                                <NoItemsPlug text='Sadly, we have no this items in the storage' pictureHeight='250px' pictureWidth='250px' />
                            }
                    </div>
                </Grid>
            </Grid>
            <div className='pagination-container'>
                <Pagination sx={{paddingBottom: '10px', fontSize: '30rem'}}
                            count={Math.ceil(productsStore.productsCount / productsStore.itemsLimit)}
                            variant="outlined"
                            size="large"
                            onChange={handleChangePage}
                />
            </div>
        </>
    );
})

