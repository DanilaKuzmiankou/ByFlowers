import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom";
import {CustomHoverMenu} from "../index.components";
import productsStore from "../../store/ProductsStore";
import userStore from "../../store/UserStore";
import {observer} from "mobx-react-lite";
import {IconContext} from 'react-icons';
import {Badge, BadgeProps, Link} from "@mui/material";
import {RiShoppingBasket2Line} from "react-icons/ri";
import {styled} from "@mui/material/styles";
import basketStore from "../../store/BasketStore";
import {CustomClickMenu} from "../CustomMenu/CustomClickMenu";
import {HideOnScroll} from "../HideOnScroll/HideOnScroll";
import {useEffect, useState} from "react";
import {getProductsTypes} from "../../api/store/Product";

const siteLogo = 'FlowersDelivery'
const pages = ['Blog', 'About us', 'Flowers', 'Plants'];
const pagesLinks = ['blog', 'aboutUs', 'flowers', 'plants'];
const pages2 = ['Blog', 'About us'];



const navbarButtonsStyle = {
    fontFamily: 'IntroCondBlack',
    minWidth: '0',
    backgroundColor: 'inherit',
    color: '#fff',
    fontSize: '1.70rem',
    lineHeight: 1,
    fontWeight: 700,
    margin: '24px 0 24px 33px',
    padding: '5px 0 5px',
    '&:hover': {
        backgroundColor: 'inherit',
        "&:after": {
            opacity: 1
        }
    },
    "&:after": {
        opacity: 0,
        position : 'absolute',
        width : '100%',
        height : '1px',
        bottom: 0,
        left: '0px',
        content: '""',
        borderTop: '2px solid #FFFFFF',
        transition: 'opacity 1000ms ease'
    }
}


const navbarLoginButtonStyle = {
    my: 2,
    mx:0.5,
    fontFamily: 'IntroCondBlack',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    transition: 'background-color 200ms ease',
    color: '#fff',
    fontSize: '1.20rem',
    lineHeight: 1,
    fontWeight: 700,
    paddingTop: '7px',
    paddingBottom: '7px',
    paddingRight: '8px',
    paddingLeft: '8px'
}

export const Navbar = observer(() => {



    useEffect(() => {
        async function fetch(){
            const flowersTypesResponse = await getProductsTypes(true)
            const plantsTypesResponse = await getProductsTypes(false)
            productsStore.setFlowers(flowersTypesResponse.data)
            productsStore.setPlants(plantsTypesResponse.data)
        }
        fetch()
    }, [])


    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const switchPage = (linkName:string, productType?:string, isFlowers?:boolean):void => {
        handleCloseNavMenu()
        if(productType) {
            productsStore.setSelectedNavbarProduct(productType)
            if(isFlowers !== undefined) productsStore.setIsFlowers(isFlowers)
        }
        navigate(linkName)
    }

    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
            height: '15px',
            minWidth: '15px',
            width: '15px',
            right: 3,
            top: 4,
            padding: '0 4px',
        },
    }));

    const upperNavbarButtonsStyle = {
        margin: '3px',
        padding: 0
    }

    const changeBasketState = () => {
        basketStore.setIsBasketOpen(!basketStore.isBasketOpen)
    }

    return (
        <HideOnScroll>
        <div style={{ position: 'sticky', top:0, zIndex: 10 }}>
        <AppBar sx={{p:0, m:0}} position="static" color='neutral' >
            <Container sx={{zIndex: 10, p: { xs: '0 2px', md: '0 24px'} }} maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        onClick={() => switchPage(pagesLinks[1])}
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height: 55,
                            width: 75}}
                        alt="The house from the offer."
                        src={require("../../assets/images/flowersEmblem3.png")}
                    />
                    <Link
                        variant="h6"
                        noWrap
                        onClick={() => switchPage(pagesLinks[1])}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            textAlign: 'right',
                            fontFamily: 'GilroyHeavyItalic',
                            fontWeight: 700,
                            transition: 'background-color 200ms ease',
                            fontSize: '1.95rem',
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        {siteLogo}
                    </Link>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        {/*Mobile navbar links*/}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            disableScrollLock={true}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'flex', md: 'none' }
                            }}
                        >
                            {pages.map((page, id) => (
                                <MenuItem key={page}  onClick={() => switchPage(pagesLinks[id])}>
                                    <Typography
                                        sx={{
                                        fontWeight: 500,
                                        fontSize: '1.9rem',
                                        }}
                                        textAlign="center"
                                    >
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/*Mobile Logo image*/}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                    <Box
                        component="img"
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, height: 30, width: 42}}
                        alt="The house from the offer."
                        src={require("../../assets/images/flowersEmblem3.png")}
                    />
                    {/*Mobile Logo*/}
                    <Link
                        noWrap
                        onClick={() => switchPage(pagesLinks[1])}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 0,
                            fontWeight: 700,
                            fontSize: '1.9rem',
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {siteLogo}
                    </Link>
                    <Box/>
                    </Box>

                    <Box sx={{ flexGrow: { md: 1, xs: 0}, display: 'flex', justifyContent: 'end', alignItems:'center' }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {pages2.map((page, id) => (
                            <Button
                                key={page}
                                onClick={() => switchPage(pagesLinks[id])}
                                sx={navbarButtonsStyle}
                                disableRipple
                            >
                                {page}
                            </Button>
                        ))}
                        <CustomHoverMenu
                            menuName='Plants'
                            buttonStyle={navbarButtonsStyle}
                            menuItemsNames={productsStore.plants}
                            onMenuItemClick={(plantName:string) => switchPage('products', plantName, false)}
                        />
                        <CustomHoverMenu
                            menuName='Flowers'
                            buttonStyle={navbarButtonsStyle}
                            menuItemsNames={productsStore.flowers}
                            onMenuItemClick={(flowerName:string) => switchPage('products', flowerName, true)}
                        />
                        </Box>
                        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '3%'}}>
                            {userStore.isAuth ?
                                <CustomClickMenu buttonStyle={upperNavbarButtonsStyle} />
                                :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={navbarLoginButtonStyle}
                                    onClick={() => switchPage('login')}
                                >
                                    Login
                                </Button>
                            }
                            <IconButton sx={upperNavbarButtonsStyle} onClick={changeBasketState} aria-label="cart">
                                <StyledBadge badgeContent={basketStore.basketProductsTypesCount} color="success">
                                    <IconContext.Provider value={{ color: 'white', size: '23'}}>
                                        <RiShoppingBasket2Line id='openMenuButton'  />
                                    </IconContext.Provider>
                                </StyledBadge>
                            </IconButton>
                        </div>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </div>
</HideOnScroll>


);
});
