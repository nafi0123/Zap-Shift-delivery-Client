import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/banner/banner1.png';
import bannerImg2 from '../../../assets/banner/banner2.png';
import bannerImg3 from '../../../assets/banner/banner3.png';

const Banner = () => {
    return (
        <section className="mt-4">
            <Carousel autoPlay={true}
            infiniteLoop={true}>
                <div>
                    <img src={bannerImg1} alt="Banner 1" />
                </div>
                <div>
                    <img src={bannerImg2} alt="Banner 2" />
                </div>
                <div>
                    <img src={bannerImg3} alt="Banner 3" />
                </div>
            </Carousel>
        </section>
    );
};

export default Banner;
