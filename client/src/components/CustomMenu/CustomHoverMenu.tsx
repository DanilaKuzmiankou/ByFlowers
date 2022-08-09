import React, {FC, useRef, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./CustomMenu.css"
import {ControlledMenu, MenuItem, useMenuState} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';

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
        <div  onMouseLeave={() => setOpen(false)}>
            <Button
                ref={ref}
                className="btn"
                onMouseEnter={() => setOpen(true)}
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
            <ControlledMenu
                menuClassName='custom-menu'
                {...menuProps}
                state={isOpen ? 'open' : 'closed'}
                anchorRef={ref}
                onMouseLeave={() => setOpen(false)}
                onClose={() => setOpen(false)}
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

