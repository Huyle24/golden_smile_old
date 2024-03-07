import {Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {FaArrowRight, FaCalendarAlt, FaRegHeart} from "react-icons/fa";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation} from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import {useEffect, useState} from "react";
import Link from "next/link";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import {CiBarcode, CiLocationOn, CiTimer} from "react-icons/ci";
import { PiWarningCircleThin } from "react-icons/pi";
import {fetchPrivateTourList} from "../../../redux/actions";


function PrivateTour(props) {
    useEffect(() => {
        props.fetchPrivateTourList('', '', '', '', 1, '', '', '', 1)
    }, [])
    let list_tour = props.privateTourListInfo.data && props.privateTourListInfo.isLoading === false ? props.privateTourListInfo.data.tour_list : '';
    console.log('PrivateTour')
    console.log(list_tour)
    const Product_watched = (item) => {
        np
        props.addToWatchedAction(item);
    };

    return (
        <Container>
            <div className="tournuocngoai">
                <h4 className="mt-4">Tour riêng</h4>
                <span className="divider-Trekking"></span>
                <Swiper
                    cssMode={true}
                    navigation={true}

                    breakpoints={{

                        425: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        576: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation]}
                >
                    {list_tour ? (list_tour.map((item, index) => (

                        <SwiperSlide lg="4" className="mt-4" key={index}>
                            <div data-aos="zoom-in-up" data-aos-once="true" data-aos-duration="3000">
                                <Card>
                                    <Card className="position-relative border border-0 header_tour_img">
                                        <Link href={"/Tour?id=" + item.id} onClick={() => Product_watched(item)}>
                                            <Card.Img
                                                variant="top"
                                                src={item.bucket_img ? item.bucket_img : 'https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png'}
                                            />
                                        </Link>
                                        <div
                                            className="position-absolute tag_right_card d-flex flex-column ">
                                            <Card.Text className="tag_number_care">
                                                Tour riêng
                                            </Card.Text>
                                        </div>

                                    </Card>
                                    <Card.Body className={'card-tour'}>
                                        <Link href={"/Tour?id=" + item.id} onClick={() => Product_watched(item)}>
                                            <Card.Title className="card_title_tour" style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }} data-bs-toggle="tooltip" data-bs-placement="top" title={item.name}>
                                                {item.name}
                                            </Card.Title>
                                        </Link>
                                        <Card.Text className="mb-1 d-flex align-items-center">
                                            <Card.Text className="d-flex align-items-center code-tour ">
                                                {item.code}
                                            </Card.Text>
                                        </Card.Text>
                                        <hr className={'hr-product-card'}/>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex  align-items-center">
                                                <CiLocationOn/>
                                                <span className="ms-2">
                                                {item.city_start} - {item.destination}
                                            </span>
                                            </div>
                                        </div>

                                        {/* <Card.Text className='text-decoration-line-through'>Giá: {item.price}đ</Card.Text> */}
                                        <div
                                            className="d-flex justify-content-between align-items-center align-items-center">
                                            <div>
                                                <CiTimer/> <span className="color-text ">{item.date_type_name}</span>
                                            </div>

                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="socho">
                                             <PiWarningCircleThin style={{fontSize:16}} />   Áp dụng cho đoàn từ {item.min_customer} đến {item.max_customer} khách
                                            </div>


                                        </div>
                                        <div className="d-flex justify-content-between py-2">
                                            <div className={'text-contact'}>Liên hệ</div>
                                            <Link href={"/Tour?id=" + item.id} onClick={() => Product_watched(item)}>
                                                <button className="button-detail btn">
                                                    Xem chi tiết
                                                </button>
                                            </Link>
                                        </div>

                                    </Card.Body>
                                </Card>
                            </div>
                        </SwiperSlide>
                    ))) : ''}
                </Swiper>
                <div data-aos="fade-up"
                     data-aos-duration="3000">
                    <div className="home-page__see-all text-end mt-4">
                        <Link href='/Category'>
                            <button className="btn px-4 py-2 fw-bold d-inline-flex align-items-center text-white button-all">
                                Xem tất cả <FaArrowRight className="ms-2 "/>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
}


const mapStateToProps = state => ({
    privateTourListInfo: state.privateTourListInfo
});
export default connect(mapStateToProps, actions)(PrivateTour);
