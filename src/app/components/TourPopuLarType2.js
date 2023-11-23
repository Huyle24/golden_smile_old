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

function TourPopularType2(props) {
    return (
        <div className="section-indent overflow-hidden mb-6" data-animated-id="10">
        <div className="Tour_type_popular">
            <div className="tour_popular">
                <div className="T_popular_bi">
                    <div class="T_backgroundImage"
                        style={{backgroundImage: "url('https://goldensmiletravel.com/uploads/images/tuvan/2021/09/28/team-b-1632797391.png')"}}>
                    </div>
                    <div className="T_image_top"></div>
                </div>
                <div className="T_popular_content">
                    <div className="Tour_p_title"><span className="t_title_text">TOUR KHÁCH ĐOÀN</span></div>
                    <div className="Tour_p_btn">
                        <div className="Tour_button_contact"><a href="javascript:void(0)"
                                onclick="window.showDangKyTuVan(this,'TOUR KHÁCH ĐOÀN')" data-title="TOUR KHÁCH ĐOÀN"
                                className="btnDangKyTuVan"><span className="Tour_call"></span>
                                <div className="Tour_button_title">
                                    ĐĂNG KÝ TƯ VẤN
                                </div>
                            </a> <a data-toggle="modal" href="#tuvan-modal" className="modal" style={{display: 'none' }}></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tour_popular">
                <div className="T_popular_bi">
                    <div class="T_backgroundImage"
                        style={{backgroundImage: "url('https://goldensmiletravel.com/uploads/images/tuvan/2021/09/28/anh-111-cltn-1632797449.jpeg')"}}>
                    </div>
                    <div className="T_image_top"></div>
                </div>
                <div className="T_popular_content">
                    <div className="Tour_p_title"><span className="t_title_text">TOUR MICE</span></div>
                    <div className="Tour_p_btn">
                        <div className="Tour_button_contact"><Link href="javascript:void(0)"
                                onclick="window.showDangKyTuVan(this,'TOUR MICE')" data-title="TOUR MICE"
                                className="btnDangKyTuVan"><span className="Tour_call"></span>
                                <div className="Tour_button_title">
                                    ĐĂNG KÝ TƯ VẤN
                                </div>
                            </Link> <Link data-toggle="modal" href="#tuvan-modal" className="modal" style={{display: 'none' }}></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tour_popular">
                <div className="T_popular_bi">
                    <div class="T_backgroundImage"
                        style={{backgroundImage: "url('https://goldensmiletravel.com/uploads/images/tuvan/2021/09/28/event-1632797649.jpeg')"}}>
                    </div>
                    <div className="T_image_top"></div>
                </div>
                <div className="T_popular_content">
                    <div className="Tour_p_title"><span className="t_title_text">TỔ CHỨC SỰ KIỆN</span></div>
                    <div className="Tour_p_btn">
                        <div className="Tour_button_contact"><Link href="javascript:void(0)"
                                onclick="window.showDangKyTuVan(this,'TỔ CHỨC SỰ KIỆN')" data-title="TỔ CHỨC SỰ KIỆN"
                                className="btnDangKyTuVan"><span className="Tour_call"></span>
                                <div className="Tour_button_title">
                                    ĐĂNG KÝ TƯ VẤN
                                </div>
                            </Link> <Link data-toggle="modal" href="#tuvan-modal" className="modal" style={{display: 'none' }}></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )
    }
    
export default TourPopularType2;