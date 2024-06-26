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
import {PiWarningCircleThin} from "react-icons/pi";
import {fetchJointTourList, fetchPrivateTourList} from "../../../redux/actions";
import {BsPeople} from "react-icons/bs";


function InboundTour(props) {
    useEffect(() => {
        props.fetchInboundTourList('', '', '', '', '', '', '', '','','','','','',0,'' );
        // props.fetchPrivateTourList('', '', '', '', 1, '', '', '', 1);
    }, [])
    let list_inboundTour =props.tourInboundListInfo.data && props.tourInboundListInfo.isLoading === false ? props.tourInboundListInfo.data.tour_list : '';

    console.log('list_inboundTour',list_inboundTour)



    const Product_watched = (item) => {
        np
        props.addToWatchedAction(item);
    };

    return (
        <Container>
            <div className="tournuocngoai">
                <h4 className="mt-4">Tour Inbound</h4>
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
                    {list_inboundTour ? (list_inboundTour.map((item, index) => (

                        <SwiperSlide lg="4" className="mt-4" key={index}>
                            {/*<div data-aos="zoom-in-up" data-aos-once="true" data-aos-duration="3000">*/}
                            <div>
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
                                                {item.tour_type == 1 ? 'Tour riêng' : 'Tour ghép'}

                                            </Card.Text>
                                        </div>

                                    </Card>
                                    {/*{item.tour_type == 1 && (*/}
                                    {/*    <Card.Body className={'card-tour'}>*/}
                                    {/*        <Link href={"/Tour?id=" + item.id} onClick={() => Product_watched(item)}>*/}
                                    {/*            <Card.Title className="card_title_tour" style={{*/}
                                    {/*                overflow: 'hidden',*/}
                                    {/*                textOverflow: 'ellipsis',*/}
                                    {/*                whiteSpace: 'nowrap'*/}
                                    {/*            }} data-bs-toggle="tooltip" data-bs-placement="top" title={item.name}>*/}
                                    {/*                {item.name}*/}
                                    {/*            </Card.Title>*/}
                                    {/*        </Link>*/}
                                    {/*        <Card.Text className="mb-1 d-flex align-items-center">*/}
                                    {/*            <Card.Text className="d-flex align-items-center code-tour ">*/}
                                    {/*                {item.code}*/}
                                    {/*            </Card.Text>*/}
                                    {/*        </Card.Text>*/}
                                    {/*        <hr className={'hr-product-card'}/>*/}
                                    {/*        <div className="d-flex justify-content-between align-items-center">*/}
                                    {/*            <div className="d-flex  align-items-center">*/}
                                    {/*                <CiLocationOn/>*/}
                                    {/*                <span className="ms-2">*/}
                                    {/*            {item.city_start} - {item.destination}*/}
                                    {/*        </span>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}

                                    {/*        /!* <Card.Text className='text-decoration-line-through'>Giá: {item.price}đ</Card.Text> *!/*/}
                                    {/*        <div*/}
                                    {/*            className="d-flex justify-content-between align-items-center align-items-center">*/}
                                    {/*            <div>*/}
                                    {/*                <CiTimer/> <span*/}
                                    {/*                className="color-text ">{item.date_type_name}</span>*/}
                                    {/*            </div>*/}

                                    {/*        </div>*/}
                                    {/*        <div className="d-flex justify-content-between">*/}
                                    {/*            <div className="socho">*/}
                                    {/*                <PiWarningCircleThin style={{fontSize: 16}}/> Áp dụng cho đoàn*/}
                                    {/*                từ {item.min_customer} đến {item.max_customer} khách*/}
                                    {/*            </div>*/}


                                    {/*        </div>*/}
                                    {/*        <div className="d-flex justify-content-between  align-items-center">*/}
                                    {/*            <div className={'text-contact fs-5'}>Liên hệ</div>*/}
                                    {/*            <Link href={"/Tour?id=" + item.id}*/}
                                    {/*                  onClick={() => Product_watched(item)}>*/}
                                    {/*                <button className="button-detail btn">*/}
                                    {/*                    Xem chi tiết*/}
                                    {/*                </button>*/}
                                    {/*            </Link>*/}
                                    {/*        </div>*/}

                                    {/*    </Card.Body>*/}
                                    {/*)}*/}
                                    {/*{item.tour_type == 2 && (*/}
                                    <Card.Body className={'card-tour'}>
                                        <Link href={"/Tour?tour_type=2" + "&permalink=" + item.permalink}
                                              onClick={() => Product_watched(item)}>
                                            <Card.Title className="card_title_tour " style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }} data-bs-toggle="tooltip" data-bs-placement="top" title={item.name}>
                                                {item.name}
                                            </Card.Title>
                                        </Link>
                                        <Card.Text className="mb-1 d-flex align-items-center">
                                            <Card.Text className="d-flex align-items-center code-tour ">
                                                {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].code : ''}
                                            </Card.Text>
                                        </Card.Text>
                                        <hr className={'hr-product-card'}/>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex  align-items-center">
                                                <CiLocationOn/>
                                                <span className=" ms-2">
                                               {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].city_start : ''} - {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].city_name : ''}
                                                      </span>
                                            </div>

                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className={'d-flex flex-wrap align-items-center'}>
                                                <CiTimer/>
                                                <span className=" ms-2 ">
                                                  {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].date_type_name : ''}
                                            </span>
                                            </div>
                                            <div className={'d-flex flex-wrap align-items-center'}>
                                                <BsPeople/>
                                                <span
                                                    className={'text-danger fw-bold ms-2'}>{item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].count_order_tour : 0}</span> /
                                                <span>{item.max_customer}</span>


                                            </div>
                                        </div>
                                        <div className={'my-2'}>
                                            <div className={'text-secondary'}> Lịch khởi hành</div>
                                            <div className={'d-flex flex-wrap gap-1 calendar-start'}
                                                 style={{minHeight: 30}}>

                                                {item.tour_open_list.slice(0, 4).map((item1, index1) => (
                                                    <Link
                                                        href={'/OrderTour?tour_open_id=' + item1.id}>
                                                    <span
                                                        key={index1}
                                                        className="px-2 py-1 item_day_tour fw-bold">{item1.date_start_tour.slice(0, 5)}</span>
                                                    </Link>
                                                ))}


                                            </div>
                                        </div>
                                        {/*<div className="d-flex justify-content-between">*/}
                                        {/*    <div className="socho">*/}
                                        {/*        <PiWarningCircleThin style={{fontSize: 16}}/> Áp dụng cho đoàn*/}
                                        {/*        từ {item.min_customer} đến {item.max_customer} khách*/}
                                        {/*    </div>*/}


                                        {/*</div>*/}
                                        <div>
                                            <div
                                                className="d-flex justify-content-between align-content-center flex-wrap ">
                                                <div
                                                    className=" text-danger fw-bold fs-5">
                                                    {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].price_1_person : ''} đ
                                                </div>
                                                <Link href={"/Tour?tour_type=2" + "&permalink=" + item.permalink}
                                                      onClick={() => Product_watched(item)}
                                                      className={'d-flex align-content-center flex-wrap'}>
                                                    <button className="button-detail btn ">
                                                        Xem chi tiết
                                                    </button>
                                                </Link>
                                            </div>


                                        </div>

                                    </Card.Body>
                                    {/*)}*/}
                                </Card>
                            </div>
                        </SwiperSlide>
                    ))) : ''}
                </Swiper>
                <div data-aos="fade-up"
                     data-aos-duration="3000">
                    <div className="home-page__see-all text-end mt-4">
                        <Link href='/Category'>
                            <button
                                className="btn px-4 py-2 fw-bold d-inline-flex align-items-center text-white button-all">
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

    tourInboundListInfo: state.tourInboundListInfo
});
export default connect(mapStateToProps, actions)(InboundTour);
