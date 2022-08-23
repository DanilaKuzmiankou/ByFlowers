import React from 'react';
import Box from "@mui/material/Box";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import './AboutUs.css'
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Navigation, Pagination} from "swiper";
import {Grid} from "@mui/material";

export const AboutUs = () => {

    return (
        <>
            <Swiper
                speed={600}
                spaceBetween={0}
                effect='fade'
                slidesPerView={1}
                navigation={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[EffectFade, Autoplay, Navigation, Pagination]}
            >

                <SwiperSlide>
                    <div
                        className="parallax-bg"
                        style={{
                            backgroundImage: 'url(' + require("../../assets/images/carouselFlowers.jpg") + ')'
                        }}
                    >
                        <div className="text">
                            <p>
                                Best shop ever
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="parallax-bg"
                        style={{
                            backgroundImage: 'url(' + require("../../assets/images/carouselFlowers2.jpg") + ')'
                        }}
                    >
                        <div className="text">
                            <p>
                                Cool text
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="parallax-bg"
                        style={{
                            backgroundImage: 'url(' + require("../../assets/images/carouselFlowers3.jpg") + ')'
                        }}
                    >
                        <div className="text">
                            <p>
                                Another interesting text
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="parallax-bg"
                        style={{
                            backgroundImage: 'url(' + require("../../assets/images/carouselFlowers4.jpg") + ')'
                        }}
                    >
                        <div className="text">
                            <p>
                                And another one
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
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