import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_people from '../../../assets/brands/start_people.png';
import { Autoplay } from 'swiper/modules';

const brandLogos = [
    amazon,
    amazon_vector,
    casio,
    moonstar,
    randstad,
    star,
    start_people
];

const Brands = () => {
    return (
        <div className='mt-15 px-6 lg:px-20'>
            {/* Heading */}
            <h3 className='text-2xl md:text-3xl font-bold text-center text-secondary mb-15'>
                We’ve helped thousands of sales teams
            </h3>

            {/* Slider */}
            <Swiper
                loop={true}
                slidesPerView={4}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                }}
                spaceBetween={40}
                grabCursor={true}
                centeredSlides={true}
                modules={[Autoplay]}
                autoplay={{
                    delay: 1200,
                    disableOnInteraction: false,
                }}
            >
                {brandLogos.map((logo, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <img
                            src={logo}
                            alt="brand"
                            className="w-28 md:w-32 opacity-70 hover:opacity-100 transition-all duration-300"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Brands;
