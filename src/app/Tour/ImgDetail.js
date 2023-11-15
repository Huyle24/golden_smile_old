import { Col, Container, Row } from "react-bootstrap";
import{FreeMode,Navigation,Thumbs} from "swiper/modules";

import {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import Overview from "@/app/Tour/Overview";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";

function ImgDetail(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    let image_detail_info = props.tourDetailInfoW3.data && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data.image : '';

    return (
        <Container className="mt-3 imgDetail mb-5">
            <Row>
                <Col xl={8} className="listImgTourDetail">
                    <Swiper spaceBetween={10} navigation={true} thumbs={{swiper: thumbsSwiper}} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper2">
                        {image_detail_info ? (image_detail_info.map((item,index) => (
                            <SwiperSlide key={index} className="swiper-slide-tour">
                                <img src={item} alt="and"/>
                            </SwiperSlide>
                        ))) : []}
                    </Swiper>
                    <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={"auto"} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper1 pt-2">
                        {image_detail_info ? (image_detail_info.map((item,index) => (
                            <SwiperSlide key={index} className="swiper-slide-tour ">
                                <img src={item} alt="and" className="object-fit-cover"/>
                            </SwiperSlide>
                        ))) : []}
                    </Swiper>
                </Col>
                <Col xl={4} >
                    <Overview/>
                </Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(ImgDetail);
