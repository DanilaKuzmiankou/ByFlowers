import React from 'react';
import Box from "@mui/material/Box";

export const AboutUs = () => {
    return (
        <div>
            <Box
                component="img"
                sx={{
                    height: '100%',
                    width: '100%'
            }}
                alt="The house from the offer."
                src={require("../../assets/images/mainPicture.jpg")}
            />

        </div>
    );
};