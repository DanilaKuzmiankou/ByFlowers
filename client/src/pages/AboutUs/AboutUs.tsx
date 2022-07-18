import React from 'react';
import Box from "@mui/material/Box";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import './AboutUs.css'
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Navigation, Pagination, Parallax} from "swiper";
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
                        <div className='comment'>
                            <p>
                                I just ate delicious cereal for dinner and the last time I did that was my sophomore
                                year in college!
                            </p>
                            <h2>
                                KELLY LEVEQUE
                            </h2>

                            <div className="comment-image-container">
                                <img
                                    style={{borderRadius: '100%'}}
                                    alt="Olympian Priscilla Frederick-Loomis" className="loaded"
                                     src="https://magicspoon.imgix.net/files/IMG_0697_a1df8eac-3061-4761-8399-94505e8afbbc_compact.jpg?v=1630356930&amp;amp;auto=format,compress"
                                     data-ll-status="loaded"
                                />
                            </div>
                        </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className='comment'>
                            <p>
                                And another one
                            </p>
                            <p>
                                And another one
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className='comment'>
                            <p>
                                And another one
                            </p>
                            <p>
                                And another one
                            </p>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className='bottom-bar'>
                <div className='bottom-trademarks'>
                    <div className='bottom-brand'>
                        FlowersMarket
                    </div>
                    <div>
                        &copy; All rights reserved
                    </div>
                    <div>
                        2020-2022
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
        </>

    );
};