import { FC, useState } from 'react'
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper'
import Box from '@mui/material/Box'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IPicture } from '../../models/IProduct'
import './ProductGallery.css'

interface ProductGalleryProps {
  pictures: IPicture[]
}

const pictureWrapper = {
  height: '100%',
  width: '100%',
}

export const ProductGallery: FC<ProductGalleryProps> = ({ pictures }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  return (
    <>
      <Swiper
        loop={pictures.length > 1}
        spaceBetween={10}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="mySwiper2"
      >
        {pictures.map((picture, index) => (
          <SwiperSlide key={index} style={{ height: '100%' }}>
            <Box sx={pictureWrapper} component="img" src={picture.picture} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {pictures.map((picture, index) => (
          <SwiperSlide key={index + 200}>
            <Box sx={pictureWrapper} component="img" src={picture.picture} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
