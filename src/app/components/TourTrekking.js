'use client'
import Slider from "react-slick";
import React, { Component, useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Row } from "react-bootstrap";
import * as actionType from "../../../redux/actions/type";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import {event} from "next/dist/build/output/log";
import {addToCartAction, fetchTourList} from "../../../redux/actions";
import Swal from "sweetalert2";

function TourTrekking(props) {
    useEffect(() => {
        props.fetchTourList('', '', '', '', '', '', '', '',1)
    },[])

    let list_tour = props.tourListInfo.data && props.tourListInfo.isLoading === false ? props.tourListInfo.data.tour_list : '';

    const Product_watched = (item) => {
        // alert(item.id);
            props.addToWatchedAction(item);
      }

    const settings = {
        dots: false, // hiển thị chỉ số ảnh
        infinite: true,
        speed: 1000,
        slidesToShow: 4, //hiển thị số ảnh xuất hiện
        slidesToScroll: 1, // scoll từng ảnh
        autoplay: false, // ảnh tự chuyển động
        autoplaySpeed: 5000,
        cssEase: "linear",
        arrows: false, // hiển thị hai đấu mũi tên điều hướng
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

    
    return (
        <div className="Tour_trekking_content">
          <div className="text-center pt-9">
            <div className="TheTourTrekking">Tour Trekking</div>
            <span className="divider-Trekking"></span>
          </div>
          <div className="container">
            <Slider {...settings} className="trekking_tour_slide">
                {list_tour ? (list_tour.map((item,index) =>(
                    <>
                        <div className="card mx-2 mt-2 trekking_card" >
                            <Link href={"/Tour?id="+ item.id} onClick={() => Product_watched(item)}>
                            <div className="card-image Trekking-img">    
                                <img src={item.img} />
                                <div className="item-content-price">
                                    <span className="item-label price_trekking">{item.price_1_person}đ</span>
                                </div>
                            </div>
                            </Link>
                                <div className="row info_trekking">
                                    <h2 className="trekking_content">
                                        <Link className="trekking_contentname" href={"/Tour?id="+ item.id} onClick={() => Product_watched(item)}>
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
                                                       {item.date_type_name}
                                                    </div>
                                                </div>

                                                <div className="row_info">
                                                    <div className="item_icons">
                                                        <i class='bx bx-user-circle'></i>
                                                    </div>
                                                    <div className="item_label">
                                                       16
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item_info_50">
                                                <div className="row_info">
                                                    <div className="item_icons">
                                                        <i class='bx bx-user-circle'></i>
                                                    </div>
                                                    <div className="item_label">
                                                        16
                                                    </div>
                                                </div>
                                            </div>

                                           
                                            <div className="row_info">
                                                <div className="item_icons">
                                                    <i class='bx bxs-copyright'></i>
                                                </div>
                                                <div className="item_label">
                                                    GST-TKK-BQ-PN
                                                </div>
                                            </div>

                                            <div className="row_info">
                                                <div className="item_icons">
                                                    <i class='bx bxs-calendar' ></i>
                                                </div>
                                                <div className="item_label">
                                                    Ngày khởi hành 19/07/2023
                                                </div>
                                            </div>

                                            <div className="row_info">
                                                <div className="item_icons">
                                                    <i class='bx bxs-edit-location' ></i>
                                                </div>
                                                <div className="item_label">
                                                    Điểm khởi hành  {item.city_name}
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

const mapStateToProps = state => ({
    tourListInfo: state.tourListInfo
});

export default  connect(mapStateToProps, actions)(TourTrekking);