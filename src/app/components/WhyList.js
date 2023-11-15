import { Container, Row, Col } from "react-bootstrap";
import {FaApple} from 'react-icons/fa';
import { WhyListData } from "../data";
import {Autoplay, Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
export default function WhyList(){
    return (
        <Container className="mb-4">
            <h4 className="color-text text-center">Khách hàng của chúng tôi</h4>
            <Swiper
                cssMode={true}
                navigation={true}
                showsButtons={false}
                showsPagination={true}
                breakpoints={{

                    425: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    576: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: true,
                }}
                modules={[Navigation, Autoplay]}
            >
                {WhyListData.map((item) =>(
                    <SwiperSlide key={item.id} className="logo_customer">
                        <img src={item.img} alt="khach hang"/>
                    </SwiperSlide>
                ) )}
            </Swiper>
        </Container>
    )
}