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
 <div class="row mt-3 no-gutters snipcss0-1-1-4">
        <div class="col-xs-6 col-md-3 snipcss0-2-4-5">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-5-6">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-6-7"><img
                        src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/img-7847-1675392344-1676988222.jfif"
                        alt="Ấn Độ" class="card-img snipcss0-5-7-8"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-7-9">
                        <h2 class="card-title mb-0 snipcss0-6-9-10">Ấn Độ</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-an-do.html" class="snipcss0-5-7-11">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-11-12">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-12-13"><span
                                    class="card-text snipcss0-8-13-14">3 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3 snipcss0-2-4-15">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-15-16">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-16-17"><img
                        src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/thumb-1920-716104-1676988825.jpg"
                        alt="Australia" class="card-img snipcss0-5-17-18"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-17-19">
                        <h2 class="card-title mb-0 snipcss0-6-19-20">Australia</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-australia.html" class="snipcss0-5-17-21">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-21-22">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-22-23"><span
                                    class="card-text snipcss0-8-23-24">9 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3 snipcss0-2-4-25">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-25-26">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-26-27"><img
                        src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/09/27/du-lich-bhutan-16-1695788477.jpg"
                        alt="Bhutan" class="card-img snipcss0-5-27-28"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-27-29">
                        <h2 class="card-title mb-0 snipcss0-6-29-30">Bhutan</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-bhutan.html" class="snipcss0-5-27-31">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-31-32">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-32-33"><span
                                    class="card-text snipcss0-8-33-34">1 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3 snipcss0-2-4-35">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-35-36">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-36-37"><img
                        src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/vi-tri-dia-ly-cua-dai-loan-1676988660.jpg"
                        alt="Đài Loan" class="card-img snipcss0-5-37-38"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-37-39">
                        <h2 class="card-title mb-0 snipcss0-6-39-40">Đài Loan</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-dai-loan.html" class="snipcss0-5-37-41">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-41-42">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-42-43"><span
                                    class="card-text snipcss0-8-43-44">2 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3 snipcss0-2-4-45">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-45-46">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-46-47"><img
                        src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/4a95ec44cd1fbafd69d16194085a71fbarticle-img-id2547300-1676988738.jpg"
                        alt="Hàn Quốc" class="card-img snipcss0-5-47-48"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-47-49">
                        <h2 class="card-title mb-0 snipcss0-6-49-50">Hàn Quốc</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-han-quoc.html" class="snipcss0-5-47-51">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-51-52">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-52-53"><span
                                    class="card-text snipcss0-8-53-54">11 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3 snipcss0-2-4-55">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-55-56">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-56-57"><img
                        src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/maxresdefault-2-1676988709.jpg"
                        alt="Hoa Kỳ" class="card-img snipcss0-5-57-58"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-57-59">
                        <h2 class="card-title mb-0 snipcss0-6-59-60">Hoa Kỳ</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-hoa-ky.html" class="snipcss0-5-57-61">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-61-62">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-62-63"><span
                                    class="card-text snipcss0-8-63-64">2 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3 snipcss0-2-4-65">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-65-66">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-66-67"><img
                        src="https://via.placeholder.com/300" alt="Indonesia" class="card-img snipcss0-5-67-68"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-67-69">
                        <h2 class="card-title mb-0 snipcss0-6-69-70">Indonesia</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-indonesia.html" class="snipcss0-5-67-71">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-71-72">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-72-73"><span
                                    class="card-text snipcss0-8-73-74">1 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3 snipcss0-2-4-75">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-75-76">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-76-77"><img
                        src="https://via.placeholder.com/300" alt="Lào" class="card-img snipcss0-5-77-78"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-77-79">
                        <h2 class="card-title mb-0 snipcss0-6-79-80">Lào</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-lao.html" class="snipcss0-5-77-81">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-81-82">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-82-83"><span
                                    class="card-text snipcss0-8-83-84">2 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3 snipcss0-2-4-85">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-85-86">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-86-87"><img
                        src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/huong-dan-cac-dau-moi-lay-hang-9225-5460-1511781583-1676987737.jpg"
                        alt="Nhật Bản" class="card-img snipcss0-5-87-88"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-87-89">
                        <h2 class="card-title mb-0 snipcss0-6-89-90">Nhật Bản</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-nhat-ban.html" class="snipcss0-5-87-91">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-91-92">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-92-93"><span
                                    class="card-text snipcss0-8-93-94">8 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3 snipcss0-2-4-95">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-95-96">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-96-97"><img
                        src="https://via.placeholder.com/300" alt="Sing Mã" class="card-img snipcss0-5-97-98"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-97-99">
                        <h2 class="card-title mb-0 snipcss0-6-99-100">Sing Mã</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-sing-ma.html" class="snipcss0-5-97-101">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-101-102">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-102-103"><span
                                    class="card-text snipcss0-8-103-104">2 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3 snipcss0-2-4-105">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-105-106">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-106-107"><img
                        src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/thoi-tiet-thai-lan-1676988765.jpg"
                        alt="Thái Lan" class="card-img snipcss0-5-107-108"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-107-109">
                        <h2 class="card-title mb-0 snipcss0-6-109-110">Thái Lan</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-thai-lan.html" class="snipcss0-5-107-111">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-111-112">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-112-113"><span
                                    class="card-text snipcss0-8-113-114">12 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3 snipcss0-2-4-115">
            <div data-animate="fadeIn" class="location_item box px-2 fadeIn animated snipcss0-3-115-116">
                <div class="card text-white bg-overlay-gradient-6 hover-zoom-in snipcss0-4-116-117"><img
                        src="https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/06/22/1-phuong-hoang-co-tran-1629707504-1678546868-1687421197.jpeg"
                        alt="Trung Quốc" class="card-img snipcss0-5-117-118"/>
                    <div class="card-img-overlay d-flex justify-content-center flex-column snipcss0-5-117-119">
                        <h2 class="card-title mb-0 snipcss0-6-119-120">Trung Quốc</h2>
                    </div> <a href="https://goldensmiletravel.com/du-lich-trung-quoc.html" class="snipcss0-5-117-121">
                        <div class="card-img-overlay d-flex justify-content-end flex-column snipcss0-6-121-122">
                            <p class="fs-13 font-weight-500 letter-spacing-087 text-center snipcss0-7-122-123"><span
                                    class="card-text snipcss0-8-123-124">8 CHUYẾN THAM QUAN</span></p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
        </Container>
    )
}


const mapStateToProps = state => ({
tourListInfo: state.tourListInfo
});

export default connect(mapStateToProps, actions)(NextDestion);