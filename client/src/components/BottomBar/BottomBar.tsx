import React from 'react';
import Box from "@mui/material/Box";
import "./BottomBar.css"

export const BottomBar = () => {
    return (
        <div className='bottom-bar'>
            <div className='bottom-trademarks'>
                <div className='bottom-brand'>
                    FlowersMarket
                </div>
                <div className='bottom-rights'>
                    &copy; All rights reserved
                </div>
                <div className='bottom-rights'>
                    2020-2022
                </div>
                <div className='bottom-rights'>
                    Сайт, а  также вся информация предоставленная на сайте, носит исключительно <br />  информационный характер, и ни при каких условиях не является публичной офертой.
                </div>
            </div>
            <div className='bottom-icons'>
                <Box
                    component="img"
                    sx={{ height: 45,
                        width: 45, marginRight: '7px'}}
                    src={require("../../assets/images/instagramIcon.png")}
                />
                <Box
                    component="img"
                    sx={{ height: 45,
                        width: 45}}
                    src={require("../../assets/images/facebookIcon.png")}
                />
            </div>
        </div>
    );
};