import React, {FC, useState} from 'react';
import {FreeMode, Navigation, Thumbs} from "swiper";
import Box from "@mui/material/Box";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {Picture} from "../../types/ProductModel";
import {Swiper, SwiperSlide} from "swiper/react";
import './ProductGallery.css'

interface ProductGalleryProps {
    pictures: Picture[]
}

export const ProductGallery:FC<ProductGalleryProps> = ({pictures}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <>
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {pictures.map((picture, index) => (
                    <SwiperSlide key={index} style={{height: '100%'}}>
                        <Box
                            sx={{ height: '550px', width: '500px'}}
                            component="img"
                            src={picture.picture}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {pictures.map((picture, index) => (
                    <SwiperSlide key={index+200} >
                        <Box
                            sx={{ height: '200px', width: '190px'}}
                            component="img"
                            src={picture.picture}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};