import React, {FC, useState} from 'react';
import {FreeMode, Navigation, Thumbs} from "swiper";
import Box from "@mui/material/Box";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {IPicture} from "../../models/IProduct";
import {Swiper, SwiperSlide} from "swiper/react";
import './ProductGallery.css'

interface ProductGalleryProps {
    pictures: IPicture[]
}

const mainPicture = {
    height: {
        xs: '350px',
        md: '550px'
    },
    width: {
        xs: '300px',
        md: '500px'
    },
}

const additionalPicture = {
    height: {
        xs: '100px',
        md: '200px'
    },
    width: {
        xs: '90px',
        md: '190px'
    }
}

export const ProductGallery:FC<ProductGalleryProps> = ({pictures}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <>
            <Swiper
                loop={pictures.length > 1}
                spaceBetween={10}
                navigation={true}
                thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {pictures.map((picture, index) => (
                    <SwiperSlide key={index} style={{height: '100%'}}>
                        <Box
                            sx={mainPicture}
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
                            sx={additionalPicture}
                            component="img"
                            src={picture.picture}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};