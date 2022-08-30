import React from 'react';
import Box from "@mui/material/Box";
import './AboutUs.css'
import {Grid, Typography} from "@mui/material";
import {CustomSwiper} from "../../components/CustomSwiper/CustomSwiper";
import {productStyles} from "../../themes";
import productsStore from "../../store/ProductsStore";
import basketStore from "../../store/BasketStore";
import {IconContext} from "react-icons";
import {RiPlantLine} from "react-icons/ri";
import IconButton from "@mui/material/IconButton";
import {AdvantagesSection} from "../../components/AdvantagesSection/AdvantagesSection";

export const AboutUs = () => {

    return (
        <>
            <CustomSwiper />
            <AdvantagesSection />
            <div className='comments'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <div className='comment-container'>
                            <div  data-aos="zoom-in-right" className='comment'>
                                <p>
                                    I just bought 3 bouquets of roses and u now? I liked them! I will buy flowers
                                    only in this shop for the rest of my goddamn life man
                                </p>

                                <p>
                                    Kelly Leveaue
                                </p>

                                <div className="comment-image-container">
                                    <Box
                                        data-aos="fade-up"
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
                            <p>
                                Vin Diesel
                            </p>
                            <div className="comment-image-container">
                                <Box
                                    data-aos="fade-up"
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