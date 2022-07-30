import React, {FC, MouseEventHandler, useRef} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import "./CustomMuiMenu.css"
import {productStyles} from "../../themes";

interface MenuProps {
    menuName: string,
    closeMenu: MouseEventHandler,
    openMenu: MouseEventHandler,
    buttonStyle: Object,
    anchorEl: null | HTMLElement,
    menuItemsNames: string[],
    onMenuItemClick: Function,
    isMenuOpen: boolean
}

export const CustomMuiMenu:FC<MenuProps> = ({menuName, closeMenu, openMenu,
                                               buttonStyle, anchorEl,
                                                  menuItemsNames, onMenuItemClick, isMenuOpen}) => {

    return (
        <Box display='inline-block' onMouseLeave={closeMenu}>
            <Button
                onMouseOver={openMenu}
                sx={buttonStyle}
            >
                {menuName}
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
                    anchorEl={anchorEl}
                    disableScrollLock={true}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    MenuListProps={{ onMouseLeave: closeMenu }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={isMenuOpen}
                    onClose={closeMenu}
                >
                    <Box className='menu-products'>
                        <div >
                            {menuItemsNames.map((itemName) => (
                                <MenuItem key={itemName} onClick={() => onMenuItemClick(itemName)}>
                                    <Typography sx={productStyles.customNormalFont} textAlign="center">{itemName}</Typography>
                                </MenuItem>
                            ))}
                        </div>
                    </Box>
                </Menu>
            </Box>
        </Box>
    );
};

