import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './Navbar.css'
import {useNavigate} from "react-router-dom";

const siteLogo = 'FlowersDelivery'
const pages = ['Blog', 'About us', 'Categories'];
const pagesLinks = ['blog', '', 'bestChoice'];
const pages2 = ['Blog', 'About us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const categories = ['Anutina eyes', 'orchidea', 'roses']

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
    fontSize: '1.10rem',
    lineHeight: 1,
    fontWeight: 700,
    paddingTop: '14px',
    paddingBottom: '14px',
    paddingRight: '13px',
    paddingLeft: '13px'
}

const ResponsiveAppBar = () => {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElCategories, setAnchorElCategories] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenCategoriesMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCategories(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseCategoriesMenu = () => {
        setAnchorElCategories(null);
    };


    const switchPage = (linkName:string):void => {
        handleCloseNavMenu()
        navigate(linkName, { replace : true})
    }


    const lol = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('hover')
        handleOpenCategoriesMenu(e)
    };

    return (
        <AppBar sx={{p:0, m:0}} position="static" color='neutral'>
            <Container maxWidth="xl" className='navbar'>
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
                            fontSize: '1.25rem',
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
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            {pages.map((page, id) => (
                                <MenuItem key={page}  onClick={() => switchPage(pagesLinks[id])}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/*Mobile Logo image*/}
                    <Box
                        component="img"
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, height: 55,
                            width: 75}}
                        alt="The house from the offer."
                        src={require("../../assets/images/flowersEmblem3.png")}
                    />
                    {/*Mobile Logo*/}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
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

                        <Button
                            key='Categories'
                            onClick={() => switchPage(pagesLinks[2])}
                            onMouseEnter={handleOpenCategoriesMenu}
                            sx={navbarButtonsStyle}
                        >
                            Categories
                            <div className="nav_dropdown-arrow w-embed">
                                <svg width="14" height="6" viewBox="0 0 14 6" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.0063 0.310204C12.348 0.0606614 12.902 0.0606614 13.2437 0.310204C13.5854 0.559746 13.5854 0.964334 13.2437 1.21388L7.61872 5.32169C7.27701 5.57123 6.72299 5.57123 6.38128 5.32169L0.756282 1.21388C0.414573 0.964334 0.414573 0.559746 0.756282 0.310204C1.09799 0.0606614 1.65201 0.0606614 1.99372 0.310204L7 3.96618L12.0063 0.310204Z"
                                        fill="currentColor"></path>
                                </svg>
                            </div>
                        </Button>
                        <Box sx={{ flexGrow: 0, pl: '10px' }}>
                            <Menu
                                id="menu-categories"
                                anchorEl={anchorElCategories}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                MenuListProps={{ onMouseLeave: handleCloseCategoriesMenu }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElCategories)}
                                onClose={handleCloseCategoriesMenu}
                            >
                                {categories.map((category, id) => (
                                    <MenuItem key={category} >
                                        <Typography textAlign="center">{category}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 0, pl: '10px' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
