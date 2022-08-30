import React, {FC, useRef, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./CustomMenu.css"
import {ControlledMenu, MenuItem, useMenuState} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';
import {IconContext} from "react-icons";
import {IoIosArrowDown} from "react-icons/io";
import Box from "@mui/material/Box";

interface MenuProps {
    menuName: string,
    buttonStyle: Object,
    menuItemsNames: string[],
    onMenuItemClick: Function,
}


export const CustomHoverMenu:FC<MenuProps> = ({menuName, buttonStyle,
                                                  menuItemsNames, onMenuItemClick}) => {

    const ref = useRef(null);
    const [isOpen, setOpen] = useState<boolean>();
    const [menuProps, toggleMenu] = useMenuState({ transition: true });

    return (
        <div  onMouseLeave={() => setOpen(false)} style={{display: 'flex', alignItems: 'center'}}>
            <Button
                ref={ref}
                onMouseEnter={() => setOpen(true)}
                sx={buttonStyle}
                disableRipple
            >
                {menuName}

            </Button>
            <Box sx={{display: 'inline-block', margin: '4px 0 0 5px', padding: '0'}} aria-label="arrow" >
                        <IconContext.Provider value={{ color: 'white', size: '23'}}>
                            <IoIosArrowDown   />
                        </IconContext.Provider>
            </Box>
            <ControlledMenu
                menuClassName='custom-menu'
                align="center"
                {...menuProps}
                state={isOpen ? 'open' : 'closed'}
                anchorRef={ref}
                onMouseLeave={() => setOpen(false)}
                onClose={() => setOpen(false)}
                offsetY={10}
                transition={{open: true, close: true}}
                transitionTimeout={900}
            >
                {menuItemsNames.map((itemName) => (
                    <MenuItem
                        className='custom-menu-item'
                        key={itemName}
                        onClick={() => onMenuItemClick(itemName)}
                    >
                        <Typography
                            sx={{
                                color: 'black',
                                fontWeight: 500,
                                fontSize: '1.4rem',
                                marginLeft: '4px'
                        }}
                            textAlign="center"
                        >
                            {itemName}
                        </Typography>
                    </MenuItem>
                ))}
            </ControlledMenu>
        </div>

    );
};

