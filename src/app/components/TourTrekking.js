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
import { Row } from "react-bootstrap";

function TourTrekking(props) {
    const settings = {
        dots: false, // hiển thị chỉ số ảnh
        infinite: true,
        speed: 1000,
        slidesToShow: 4, //hiển thị số ảnh xuất hiện
        slidesToScroll: 1, // scoll từng ảnh
        autoplay: false, // ảnh tự chuyển động
        autoplaySpeed: 5000,
        cssEase: "linear",
        arrows: true, // hiển thị hai đấu mũi tên điều hướng
        responsive: [
          {
            breakpoint: 1300,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 990,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 880,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 574,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 300,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
        ],
      };

    const trekking_tour = [
        {
            price: '2,650,000',
            images: "https://goldensmiletravel.com/zoom/480x360/uploads/images/tour/2021/05/14/bu-gia-map-1620963307.jpeg",
            name: "VƯỜN QUỐC GIA BÙ GIA MẬP (SUỐI ĐAK KA - THÁC LƯU LY)",
            period: "2N1Đ",
            people: 16,
            coppyright: "GST-TK-BGM",
            timestart: "25/11/2023",
            location_start: "Hồ Chí Minh",
        },
        {
            price: 'Liên hệ',
            images: "https://goldensmiletravel.com/zoom/480x360/uploads/images/tour/2021/07/22/sapa-trong-may-mu-1626939876.jpeg",
            name: "LIÊN TUYẾN MIỀN BẮC (HÀ NỘI - HẠ LONG - YÊN TỬ - SA PA - HÀ NỘI)",
            period: "5N4D",
            people: 40,
            coppyright: "GST-ĐTB-HN-HL-SP",
            timestart: "2/12/2023",
            location_start: "Hồ Chí Minh",
        },
        {
            price: '3,450,000',
            images: "https://goldensmiletravel.com/zoom/480x360/uploads/images/tour/admingst/2023/02/23/dong-phong-nha-1677142315.jpg",
            name: "QUẢNG BÌNH | ĐỘNG PHONG NHA ( HANG OZO – HANG HOÀN MỸ ) | 4N3Đ",
            period: "4N3Đ",
            people: 15,
            coppyright: "GST-TKK-BQ-PN",
            timestart: "23/11/2023",
            location_start: "Hồ Chí Minh",
        },
        {
            price: '2,650,000',
            images: "https://goldensmiletravel.com/zoom/480x360/uploads/images/tour/2021/11/12/1800x1206-gs-banner-tnpd-102021-1636708263.jpg",
            name: "CUNG ĐƯỜNG THANH XUÂN (TREKKING TÀ NĂNG - PHAN DŨNG - CỔ THẠCH)",
            period: "2N2Đ",
            people: 15,
            coppyright: "GST-TKK-TN-PD",
            timestart: "02/12/2023",
            location_start: "Hồ Chí Minh",
        },

        {
            price: '750,000',
            images: "https://goldensmiletravel.com/zoom/480x360/uploads/images/tour/admingst/2022/10/08/gst-nui-dinh-8-1665202950.jpg",
            name: "TREKKING NÚI DINH | SƠN THUỶ HỮU TÌNH",
            period: "1N0Đ",
            people: 15,
            coppyright: "GST-TKK-ND-STHT",
            timestart: "25/11/2023",
            location_start: "Hồ Chí Minh",
        },
        {
            price: '3,450,000',
            images: "https://goldensmiletravel.com/zoom/480x360/uploads/images/tour/2021/05/14/bidoup-2-1620959928.jpeg",
            name: "XUYÊN RỪNG CHINH PHỤC NÓC NHÀ CAO NGUYÊN LÂM VIÊN (BIDOUP - NÚI BÀ)",
            period: "2N2Đ",
            people: 20,
            coppyright: "GST-TK-BIDOUP",
            timestart: "25/11/2023",
            location_start: "Hồ Chí Minh",
        },
        {
            price: '3,550,000',
            images: "https://goldensmiletravel.com/zoom/480x360/uploads/images/tour/admingst/2022/10/08/gst-lao-than-2-1665203255.jpg",
            name: "TREKKING CHINH PHỤC LẢO THẨN | NÓC NHÀ Y TÝ",
            period: "2N2Đ",
            people: 15,
            coppyright: "GST-TKK-TL-NHYT",
            timestart: "25/12/2023",
            location_start: "Hồ Chí Minh",
        }

    ];
    return (
        <div className="Tour_trekking_content">
          <div className="text-center pt-9">
            <div className="TheTourTrekking">Tour Trekking</div>
            <span className="divider-Trekking"></span>
          </div>
          <div className="container">
            <Slider {...settings} className="trekking_tour_slide">
                {trekking_tour ? (trekking_tour.map((item,index) =>(
                    <>
                        <div className="card mx-2 mt-2 trekking_card" >
                                
                                <div className="card-image Trekking-img">  
                                    <Link href={"/Tour?id="+ item.id}>
                                        <img src={item.images} />
                                    </Link>
                                    <div className="item-content-price">
                                        <span className="item-label price_trekking">{item.price}đ</span>
                                    </div>
                                </div>

                                <div className="row info_trekking">
                                    <h2 className="trekking_content">
                                        <Link className="trekking_contentname" href={"/Tour?id="+ item.id}>
                                            {item.name}
                                        </Link>
                                    </h2>
                                    <div className="tour_trekking_content">
                                        <div className="trekking_item">
                                            <div className="item_info_50">
                                                <div className="row_info">
                                                    <div className="item_icons">
                                                        <i class='bx bx-calendar-alt'></i>
                                                    </div>
                                                    <div className="item_label">
                                                        {item.period}
                                                    </div>
                                                </div>

                                                <div className="row_info">
                                                    <div className="item_icons">
                                                        <i class='bx bx-user-circle'></i>
                                                    </div>
                                                    <div className="item_label">
                                                        {item.people}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item_info_50">
                                                <div className="row_info">
                                                    <div className="item_icons">
                                                        <i class='bx bx-user-circle'></i>
                                                    </div>
                                                    <div className="item_label">
                                                        {item.people}
                                                    </div>
                                                </div>
                                            </div>

                                           
                                            <div className="row_info">
                                                <div className="item_icons">
                                                    <i class='bx bx-calendar-alt'></i>
                                                </div>
                                                <div className="item_label">
                                                    {item.period}
                                                </div>
                                            </div>

                                            <div className="row_info">
                                                <div className="item_icons">
                                                    <i class='bx bxs-calendar' ></i>
                                                </div>
                                                <div className="item_label">
                                                    Ngày khởi hành {item.timestart}
                                                </div>
                                            </div>

                                            <div className="row_info">
                                                <div className="item_icons">
                                                    <i class='bx bxs-edit-location' ></i>
                                                </div>
                                                <div className="item_label">
                                                    Điểm khởi hành {item.location_start}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </>
                ))): ''}
            </Slider>
          </div>
        </div>
    );
}

export default TourTrekking;