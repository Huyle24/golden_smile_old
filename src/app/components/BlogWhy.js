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

function BlogWhy() {
    const BlogList = [

    ]
    
    return (
         <section className="Blog_Why_content">
            <div className="why_choose taisao_chon_left_top"></div>
            <div className="why_choose taisao_chon_left_bottom"></div>
            <div className="reason_choose">
                <Row>
                    <div className="col-xs-12 col-md-12">
                        <div className="question_choose">
                            VÌ SAO CHỌN  <br></br>
                           GOLDEN SMILE TRAVEL ?
                        </div>
                    </div>
                </Row>
                <div className="number_reason">
                    <div className="col-6 col-md-4 reason_hangdau">
                        <div className="vong_tron_trang">
                            <div className="vong_tron_do">
                                <span className="vong_tron_title">1.</span>
                            </div>
                        </div>
                        <div className="content_reason_child">SẢN PHẨM</div>
                        <div className="reason_des">Độc đáo, mới lạ</div>
                    </div>
                    <div className="col-6 col-md-4 reason_hangdau">
                        <div className="vong_tron_trang">
                            <div className="vong_tron_do">
                                <span className="vong_tron_title">2.</span>
                            </div>
                        </div>
                        <div className="content_reason_child">CHẤT LƯỢNG</div>
                        <div className="reason_des">Đảm bảo tuyệt đối</div>
                    </div>
                    <div className="col-6 col-md-4 reason_hangdau">
                        <div className="vong_tron_trang">
                            <div className="vong_tron_do">
                                <span className="vong_tron_title">3.</span>
                            </div>
                        </div>
                        <div className="content_reason_child">GIÁ CẢ</div>
                        <div className="reason_des">Phải chăng và hợp lí theo yêu cầu</div>
                    </div>
                    <div className="col-6 col-md-6 reason_hangsau">
                        <div className="reason_item">
                            <div className="vong_tron_trang">
                                <div className="vong_tron_do">
                                    <span className="vong_tron_title">4.</span>
                                </div>
                            </div>
                            <div className="content_reason_child">THỦ TỤC</div>
                            <div className="reason_des">Nhanh chóng, đơn giản và chuyên nghiệp</div>
                        </div>
                    </div>
                    <div className="col-6 col-md-6 reason_hangsau">
                        <div className="reason_item">
                            <div className="vong_tron_trang">
                                <div className="vong_tron_do">
                                    <span className="vong_tron_title">5.</span>
                                </div>
                            </div>
                            <div className="content_reason_child">UY TÍN</div>
                            <div className="reason_des">Khẳng định đẳng cấp thông qua từng dịch vụ</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="why_choose taisao_chon_right_top"></div>
            <div className="why_choose taisao_chon_right_bottom"></div>
        </section>
    )
}

export default BlogWhy;