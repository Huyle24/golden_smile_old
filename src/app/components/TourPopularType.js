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

function TourPopularType(props) {
    return (
        <Container>
            <div className="Tour_type_popular">
                <div className="tour_popular">
                    <div className="T_popular_bi">
                        <div className="T_backgroundImage"></div>
                        <div className="T_image_top"></div>
                    </div>

                    <div className="T_popular_content">
                        <div className="Tour_p_title">
                            <div className="t_title_text">TOUR KHÁCH ĐOÀN</div>
                        </div>
                        <div className="Tour_p_btn">
                            <div className="Tour_button_contact">
                                <span className="Tour_call"></span>
                                <div className="Tour_button_title">ĐĂNG KÝ TƯ VẤN</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tour_popular">
                    <div className="T_popular_bi">
                        <div className="T_backgroundImage"></div>
                        <div className="T_image_top"></div>
                    </div>

                    <div className="T_popular_content">
                        <div className="Tour_p_title">
                            <div className="t_title_text">TOUR MICE</div>
                        </div>
                        <div className="Tour_p_btn">
                            <div className="Tour_button_contact">
                                <span className="Tour_call"></span>
                                <div className="Tour_button_title">ĐĂNG KÝ TƯ VẤN</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tour_popular">
                    <div className="T_popular_bi">
                        <div className="T_backgroundImage"></div>
                        <div className="T_image_top"></div>
                    </div>

                    <div className="T_popular_content">
                        <div className="Tour_p_title">
                            <div className="t_title_text">TỔ CHỨC SỰ KIỆN</div>
                        </div>
                        <div className="Tour_p_btn">
                            <div className="Tour_button_contact">
                                <span className="Tour_call"></span>
                                <div className="Tour_button_title">ĐĂNG KÝ TƯ VẤN</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default TourPopularType;