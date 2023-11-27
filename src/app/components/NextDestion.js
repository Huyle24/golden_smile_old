'use client'
import Slider from "react-slick";
import {connect} from "react-redux";
import React, { Component, useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Container, Row } from "react-bootstrap";

function NextDestion(props) {
    const Next_List = [
        {
            images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/img-7847-1675392344-1676988222.jfif",
            country: "Ấn Độ",
            chuyen_number: "3 CHUYẾN THAM QUAN",
        },
        {
            images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/thumb-1920-716104-1676988825.jpg",
            country: "Australia",
            chuyen_number: "9 CHUYẾN THAM QUAN",
        },
        {
            images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/09/27/du-lich-bhutan-16-1695788477.jpg",
            country: "Bhutan",
            chuyen_number: "1 CHUYẾN THAM QUAN",
        },
        {
            images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/vi-tri-dia-ly-cua-dai-loan-1676988660.jpg",
            country: "Đài Loan",
            chuyen_number: "2 CHUYẾN THAM QUAN",
        },
        {
            images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/4a95ec44cd1fbafd69d16194085a71fbarticle-img-id2547300-1676988738.jpg",
            country: "Hàn Quốc",
            chuyen_number: "11 CHUYẾN THAM QUAN",
        },
        {
            images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/maxresdefault-2-1676988709.jpg",
            country: "Hoa Kỳ",
            chuyen_number: "2 CHUYẾN THAM QUAN",
        },
        {
            images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/huong-dan-cac-dau-moi-lay-hang-9225-5460-1511781583-1676987737.jpg",
            country: "Nhật Bản",
            chuyen_number: "2 CHUYẾN THAM QUAN",
        },
        {
            images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/thoi-tiet-thai-lan-1676988765.jpg",
            country: "Thái Lan",
            chuyen_number: "12 CHUYẾN THAM QUAN",
        },
    ]
    return (
        <Container>
            <div className="NextDestion_tour">
                <div className="text-center pt-9">
                    <div className="Next_title">Điểm đến yêu thích</div>
                    <span className="divider-Trekking"></span>
                </div>

                <Row className="mt-3">
                    {Next_List ? (Next_List.map((item, index) =>
                        <div className="col-xs-6 col-md-3 next_target">
                            <Link href="/Category">
                                <div className="card_tour_nextdestion hover-zoom-in">
                                    <img src={item.images} className="images_next" alt="Hình ảnh điểm đến" />
                                    <div className="name_next">
                                        <h2>{item.country}</h2>
                                    </div>
                                    <div className="number_total_visit">
                                        <span className="trip_number">{item.chuyen_number}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )) : ''}
                </Row>
            </div>
        </Container>
    )
}

export default NextDestion;