import React from 'react';
import Box from "@mui/material/Box";
import './AboutUs.css'
import {Grid, Typography} from "@mui/material";
import {CustomSwiper} from "../../components/CustomSwiper/CustomSwiper";
import {productStyles} from "../../themes";
import {IconContext} from "react-icons";
import {BsTelephone} from "react-icons/bs";
import {AdvantagesSection} from "../../components/AdvantagesSection/AdvantagesSection";

const callUs = {
    display: "flex",
    flexDirection: {
        xs: 'column',
        sm: 'column',
        lg: 'row',
    },
    justifyContent: "center",
    padding: "20px 0",
    backgroundColor: "#e3f1e5"
}

const commentHeaderTypographyStyle = {
    fontFamily: 'MabryPro, sans-serif',
    color: '#3f0791',
    margin: '50px 20px 100px',
    fontSize: '2rem',
}

const commentTypographyStyle = {
    fontFamily: 'MabryPro, sans-serif',
    color: '#3f0791',
    margin: '50px 20px 100px',
    fontSize: '2rem',
}

export const AboutUs = () => {

    return (
        <>
            <CustomSwiper />
            <AdvantagesSection />
            <Box sx={callUs}>
                <Typography
                    sx={{...productStyles.customBoldFont, ...{ mr: 2, whiteSpace: 'word', textAlign: 'center', userSelect: 'text' }}}>
                    Want to speak to us about flower delivery in your area? Call us: +375 29 423 74 65
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <IconContext.Provider value={{ color: 'black', size: '27'}}>
                    <BsTelephone />
                </IconContext.Provider>
                </Box>
            </Box>
            <div className='comments'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <div className='comment-container'>
                            <div  data-aos="zoom-in-right" className='comment'>
                                <Typography
                                    sx={commentHeaderTypographyStyle}>
                                    I just bought 3 bouquets of roses and u now? I liked them! I will buy flowers
                                    only in this shop for the rest of my goddamn life man
                                </Typography>

                                <div data-aos="fade-up">
                                    <Typography>
                                        Kelly Leveaue
                                    </Typography>


                                    <Box
                                        component="img"
                                        className='comment-image'
                                        src={require("../../assets/images/human1.jpg")}
                                    />
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div data-aos="zoom-in-up"  className='comment'>
                            <p>
                                True man
                            </p>

                            <div data-aos="fade-up">
                                <p>
                                    Vin Diesel
                                </p>
                                <Box
                                    component="img"
                                    className='comment-image'
                                    src={require("../../assets/images/human2.jpg")}
                                />
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div data-aos="zoom-in-up" className='comment'>
                            <p>
                                Of course dude
                            </p>
                            <p>
                                Arnold Schwarzenegger
                            </p>
                            <div className="comment-image-container">

                                <Box
                                    data-aos="fade-up"
                                    component="img"
                                    className='comment-image'
                                    src={require("../../assets/images/human3.jpg")}
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </>

    );
};