import {Col, Container, Row} from "react-bootstrap";
import {FreeMode, Navigation, Thumbs} from "swiper/modules";

import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import Overview from "@/app/Tour/Overview";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {fetchTourDetailW3} from "../../../redux/actions";
import {log} from "qrcode/lib/core/galois-field";
import TimeLine2 from "@/app/Tour/TimeLine2";
import InfoDetail from "@/app/Tour/InfoDetail";
import {useSearchParams} from "next/navigation";
import {GET_TOKEN} from "../../../redux/actions/type";

function ImgDetail(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    let image_detail_info = props.tourDetailInfoW3.data && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data.tour_image_list : '';
    // console.log('image_detail_info')
    // console.log(image_detail_info)




    return (

        <Container className="mt-3 imgDetail mb-5">
            <Row>
                <Col xl={6}>
                    <div className="listImgTourDetail">
                        <Swiper spaceBetween={10} navigation={true} thumbs={{swiper: thumbsSwiper}}
                                modules={[FreeMode, Navigation, Thumbs]} className="mySwiper2">
                            {
                                image_detail_info && image_detail_info.length > 0 ? (
                                    image_detail_info.map((item, index) => (
                                        <SwiperSlide key={index} className="swiper-slide-tour">
                                            <img
                                                src={item.bucket_img ? item.bucket_img : "https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png"}
                                                alt="and"/>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide className="swiper-slide-tour">
                                        <img
                                            src={"https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png"}
                                            alt="and"/>
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>
                        <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={"auto"} freeMode={true}
                                watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper1 pt-2">
                            {
                                image_detail_info && image_detail_info.length > 0 ? (
                                    image_detail_info.map((item, index) => (
                                        <SwiperSlide key={index} className="swiper-slide-tour">
                                            <img
                                                src={item.bucket_img ? item.bucket_img : "https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png"}
                                                alt="and"/>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide className="swiper-slide-tour">
                                        <img
                                            src={"https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png"}
                                            alt="and"/>
                                    </SwiperSlide>
                                )
                            }

                        </Swiper>
                    </div>
                    <TimeLine2 className={'mt-2'}/>
                </Col>
                <Col xl={6}>
                    <Overview className={'col-overview'}/>
                </Col>
            </Row>

        </Container>

    );
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(ImgDetail);
