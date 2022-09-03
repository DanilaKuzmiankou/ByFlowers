import React, {FC, MouseEventHandler} from 'react';
import IconButton from "@mui/material/IconButton";
import {IconContext} from "react-icons";
import {GrClose} from "react-icons/gr";

interface CloseButtonProps {
    closeFunction: MouseEventHandler<HTMLElement>
}

export const CloseButton:FC<CloseButtonProps> = ({closeFunction}) => {
    return (
        <IconButton sx={{ marginLeft: 'auto'}} onClick={closeFunction} aria-label="close">
            <IconContext.Provider value={{ color: 'black', size: '18'}}>
                <GrClose />
            </IconContext.Provider>
        </IconButton>
    );
};

