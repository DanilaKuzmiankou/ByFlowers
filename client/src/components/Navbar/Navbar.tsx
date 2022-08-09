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
import { IconContext } from 'react-icons';
import {Badge, BadgeProps} from "@mui/material";
import {RiShoppingBasket2Line} from "react-icons/ri";
import {styled} from "@mui/material/styles";
import basketStore from "../../store/BasketStore";
import {CustomClickMenu} from "../CustomMenu/CustomClickMenu";

const siteLogo = 'FlowersDelivery'
const pages = ['Blog', 'About us', 'Flowers', 'Plants'];
const pagesLinks = ['blog', 'aboutUs', 'flowers', 'plants'];
const pages2 = ['Blog', 'About us'];
const plants = ['Cactus', 'Begonia', 'Paddle Plant', 'Lady Palm', 'Peperomia', 'Pothos', 'Agloenema Chinese Evergreen', 'Mini Jade Plant', 'Asparagus Fern']
const flowers = ['Anutina eyes', 'Orchidea', 'Roses', 'Lilies']

const navbarButtonsStyle = {
    my: 2,
    mx:0.5,
    fontFamily: 'IntroCondBlack',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '999px',
    backgroundColor: 'hsla(0, 0%, 100%, 0.06)',
    transition: 'background-color 200ms ease',
    color: '#fff',
    fontSize: '1.70rem',
    lineHeight: 1,
    fontWeight: 700,
    paddingTop: '14px',
    paddingBottom: '14px',
    paddingRight: '13px',
    paddingLeft: '13px'
}

const navbarLoginButtonStyle = {
    my: 2,
    mx:0.5,
    fontFamily: 'IntroCondBlack',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '999px',
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
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const switchPage = (linkName:string, productType?:string):void => {
        handleCloseNavMenu()
        if(productType) {
            productsStore.setSelectedNavbarProduct(productType)
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

    return (
        <>
            <div style={{position: "static", height: '35px', backgroundColor: '#2c2b39', display: 'flex', justifyContent: 'end', alignItems: 'center', padding: '0 3%'}}>
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
                <IconButton sx={upperNavbarButtonsStyle} aria-label="cart">
                    <StyledBadge badgeContent={basketStore.basketProducts} color="success">
                        <IconContext.Provider value={{ color: 'white', size: '23'}}>
                            <RiShoppingBasket2Line  />
                        </IconContext.Provider>
                    </StyledBadge>
                </IconButton>
            </div>
        <AppBar sx={{p:0, m:0}} position="static" color='neutral' >
            <Container sx={{zIndex: 10}} maxWidth="xl" className='navbar'>
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        onClick={() => switchPage(pagesLinks[1])}
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height: 55,
                            width: 75}}
                        alt="The house from the offer."
                        src={require("../../assets/images/flowersEmblem3.png")}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
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
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent:'flex-end'}}>
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
                    <Box
                        component="img"
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, height: 30,
                            width: 42}}
                        alt="The house from the offer."
                        src={require("../../assets/images/flowersEmblem3.png")}
                    />
                    {/*Mobile Logo*/}
                    <Typography
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            fontSize: '1.9rem',
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {siteLogo}
                    </Typography>
                    <Box/>
                    <Box  sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'end' }}>
                        {pages2.map((page, id) => (
                            <Button
                                key={page}
                                onClick={() => switchPage(pagesLinks[id])}
                                sx={navbarButtonsStyle}
                            >
                                {page}
                            </Button>
                        ))}
                        <CustomHoverMenu
                            menuName='Plants'
                            buttonStyle={navbarButtonsStyle}
                            menuItemsNames={plants}
                            onMenuItemClick={(plantName:string) => switchPage('plants', plantName)}
                        />
                        <CustomHoverMenu
                            menuName='Flowers'
                            buttonStyle={navbarButtonsStyle}
                            menuItemsNames={flowers}
                            onMenuItemClick={(flowerName:string) => switchPage('flowers', flowerName)}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </>

    );
});
