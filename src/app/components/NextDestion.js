'use client'
import Slider from "react-slick";
import React, { Component, useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import * as actionType from "../../../redux/actions/type";

function NextDestion(props) {
    // const Next_List = [
    //     {
    //         images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/img-7847-1675392344-1676988222.jfif",
    //         country: "Ấn Độ",
    //         chuyen_number: "3 CHUYẾN THAM QUAN",
    //     },
    //     {
    //         images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/thumb-1920-716104-1676988825.jpg",
    //         country: "Australia",
    //         chuyen_number: "9 CHUYẾN THAM QUAN",
    //     },
    //     {
    //         images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/09/27/du-lich-bhutan-16-1695788477.jpg",
    //         country: "Bhutan",
    //         chuyen_number: "1 CHUYẾN THAM QUAN",
    //     },
    //     {
    //         images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/vi-tri-dia-ly-cua-dai-loan-1676988660.jpg",
    //         country: "Đài Loan",
    //         chuyen_number: "2 CHUYẾN THAM QUAN",
    //     },
    //     {
    //         images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/4a95ec44cd1fbafd69d16194085a71fbarticle-img-id2547300-1676988738.jpg",
    //         country: "Hàn Quốc",
    //         chuyen_number: "11 CHUYẾN THAM QUAN",
    //     },
    //     {
    //         images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/maxresdefault-2-1676988709.jpg",
    //         country: "Hoa Kỳ",
    //         chuyen_number: "2 CHUYẾN THAM QUAN",
    //     },
    //     {
    //         images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/huong-dan-cac-dau-moi-lay-hang-9225-5460-1511781583-1676987737.jpg",
    //         country: "Nhật Bản",
    //         chuyen_number: "2 CHUYẾN THAM QUAN",
    //     },
    //     {
    //         images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/thoi-tiet-thai-lan-1676988765.jpg",
    //         country: "Thái Lan",
    //         chuyen_number: "12 CHUYẾN THAM QUAN",
    //     },
    // ]
    
    useEffect(() => {
        props.fetchTourList('', '', '', '', '', '', '', '',1)

    }, []);
  let list_tour = props.tourListInfo.data && props.tourListInfo.isLoading === false ? props.tourListInfo.data.tour_list : '';
    return (
        <Container>
            <div className="NextDestion_tour">
                <div className="text-center pt-9">
                    <div className="Next_title">Điểm đến yêu thích</div>
                    <span className="divider-Trekking"></span>
                </div>
                

                <Row className="mt-3 no-gutters">
                     {list_tour ? (list_tour.filter((item, idx) => idx < 8).map((item) => ( 
                        <div className="col-xs-6 col-md-3">
                        <Link href="/Category">
                        <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                            <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                    src="https://demo.nhanhtravel.com/upload/tour/20230404094719.png"
                                    alt="Trung Quốc" className="images_next"/>
                                <div className="images_next-overlay d-flex justify-content-center flex-column">
                                    <h2 className="name_next mb-0">{item.name}</h2>
                                </div> <a href="https://goldensmiletravel.com/du-lich-trung-quoc.html" className="name_number">
                                    <div className="images_next-overlay d-flex justify-content-end flex-column">
                                        <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                                className="trip_number">8 CHUYẾN THAM QUAN</span></p>
                                    </div>
                                </a>
                            </div>
                        </div>
                         </Link>
                    </div>
                     ))) : ''}
                   
                {/* <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/img-7847-1675392344-1676988222.jfif"
                                alt="Ấn Độ" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Ấn Độ</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-an-do.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                            className="trip_number">3 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/thumb-1920-716104-1676988825.jpg"
                                alt="Australia" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Australia</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-australia.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                            className="trip_number">9 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/09/27/du-lich-bhutan-16-1695788477.jpg"
                                alt="Bhutan" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Bhutan</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-bhutan.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                            className="trip_number">1 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/vi-tri-dia-ly-cua-dai-loan-1676988660.jpg"
                                alt="Đài Loan" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Đài Loan</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-dai-loan.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                            className="trip_number">2 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/4a95ec44cd1fbafd69d16194085a71fbarticle-img-id2547300-1676988738.jpg"
                                alt="Hàn Quốc" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Hàn Quốc</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-han-quoc.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                            className="trip_number">11 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/maxresdefault-2-1676988709.jpg"
                                alt="Hoa Kỳ" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Hoa Kỳ</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-hoa-ky.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                            className="trip_number">2 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://via.placeholder.com/300" alt="Indonesia" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Indonesia</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-indonesia.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                            className="trip_number">1 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://via.placeholder.com/300" alt="Lào" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Lào</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-lao.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                            className="trip_number">2 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/huong-dan-cac-dau-moi-lay-hang-9225-5460-1511781583-1676987737.jpg"
                                alt="Nhật Bản" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Nhật Bản</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-nhat-ban.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                            className="trip_number">8 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://via.placeholder.com/300" alt="Sing Mã" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Sing Mã</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-sing-ma.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center3"><span
                                            className="trip_number">2 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/thoi-tiet-thai-lan-1676988765.jpg"
                                alt="Thái Lan" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Thái Lan</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-thai-lan.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center snipcss0-7-112-113"><span
                                            className="trip_number">12 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-3">
                    <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/06/22/1-phuong-hoang-co-tran-1629707504-1678546868-1687421197.jpeg"
                                alt="Trung Quốc" className="images_next"/>
                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                <h2 className="name_next mb-0">Trung Quốc</h2>
                            </div> <a href="https://goldensmiletravel.com/du-lich-trung-quoc.html" className="name_number">
                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                    <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                            className="trip_number">8 CHUYẾN THAM QUAN</span></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div> */}
                </Row>
            </div>
        </Container>
    )
}


const mapStateToProps = state => ({
    tourListInfo: state.tourListInfo
});

export default connect(mapStateToProps, actions)(NextDestion);