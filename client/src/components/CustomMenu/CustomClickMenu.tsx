import React, {FC, useRef, useState} from 'react';

import Typography from "@mui/material/Typography";
import "./CustomMenu.css"
import {ControlledMenu, MenuItem, useMenuState} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';
import {IconContext} from "react-icons";
import {AiOutlineUser} from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import {MdLogout} from "react-icons/md";
import userStore from "../../store/UserStore";

interface MenuProps {
    buttonStyle: Object
}

const onLogoutClick = () => {
    userStore.logout()
}

const userMenu = ['Logout']
const userMenuIcons = [<MdLogout />]
const userMenuOnClick = [onLogoutClick]

export const CustomClickMenu:FC<MenuProps> = ({buttonStyle }) => {

    const ref = useRef(null);
    const [isOpen, setOpen] = useState<boolean>();
    const [menuProps, toggleMenu] = useMenuState({ transition: true });

    return (
        <>
            <IconButton
                ref={ref}
                className="btn"
                sx={buttonStyle}
                size="large"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={() => setOpen(true)}
                color="inherit"
            >
                <IconContext.Provider value={{ color: 'white', size: '23'}}>
                    <AiOutlineUser />
                </IconContext.Provider>
            </IconButton>
            <ControlledMenu
                menuClassName='custom-menu'
                {...menuProps}
                state={isOpen ? 'open' : 'closed'}
                anchorRef={ref}
                onClose={() => setOpen(false)}
            >
                {userMenu.map((itemName, index) => (
                    <MenuItem
                        className='custom-menu-item'
                        key={itemName}
                        onClick={() => userMenuOnClick[index]()}
                    >
                        <IconContext.Provider value={{ color: 'black', size: '18'}}>
                            {userMenuIcons[index]}
                        </IconContext.Provider>
                        <Typography
                            sx={{
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
        </>

    );
};

