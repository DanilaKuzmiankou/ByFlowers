import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Navigation, Pagination} from "swiper";
import "./CustomSwiper.css"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export const CustomSwiper = () => {
    return (
        <Swiper
            speed={600}
            spaceBetween={0}
            effect='fade'
            slidesPerView={1}
            loop={true}
            touchStartPreventDefault={false}
            pagination={{
                clickable: true,
            }}
            navigation
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
                            Shop the season’s freshest flowers
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
                            The most beautiful flowers
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
                            Best gift for loved ones
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
                            Quick application processing
                        </p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};