'use client'
import Slider from "react-slick";
import {connect} from "react-redux";
import React, {Component, useEffect, useState} from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import {Container, Row} from "react-bootstrap";
import * as actionType from "../../../redux/actions/type";
import * as actions from "../../../redux/actions";

function TourPopularType(props) {

    let banner_list = props.fetchImgInfo.data && props.fetchImgInfo.isLoading === false ? props.fetchImgInfo.data.banner : '';
    return (
        <div className="section-indent overflow-hidden mb-6" data-animated-id="10">
            <div className="Tour_type_popular">

                <div className="tour_popular">
                    <div className="T_popular_bi">
                        <div class="T_backgroundImage"
                             style={{backgroundImage: `url(${banner_list && banner_list[0] &&  banner_list[0].bucket_img ? banner_list[0].bucket_img : 'https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png'})`}}>
                        </div>
                        <div className="T_image_top"></div>
                    </div>
                    <div className="T_popular_content">
                        <div className="Tour_p_title">
                            <Link
                                href={banner_list && banner_list[0] && banner_list[0].url_link ? banner_list[0].url_link : '#'}>
                                    <span
                                        className="t_title_text">{banner_list && banner_list[0] && banner_list[0].title ? banner_list[0].title : 'Chưa nhập tiêu đề'}
                                    </span>
                            </Link>
                        </div>
                        <div>
                            <Link className={'text-white text-hover'}
                                  href={banner_list && banner_list[0] && banner_list[0].url_link ? banner_list[0].url_link : '#'}>
                                {banner_list && banner_list[0] && banner_list[0].description ? banner_list[0].description : 'Chưa nhập nội dung'}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tour_popular">
                    <div className="T_popular_bi">
                        <div class="T_backgroundImage"
                             style={{backgroundImage: `url(${banner_list && banner_list[1] && banner_list[1].bucket_img ? banner_list[1].bucket_img : 'https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png'})`}}>
                        </div>
                        <div className="T_image_top"></div>
                    </div>
                    <div className="T_popular_content">
                        <div className="Tour_p_title">
                            <Link className={'text-white '}
                                  href={banner_list && banner_list[1] && banner_list[1].url_link ? banner_list[1].url_link : '#'}>
                                <span
                                    className="t_title_text">{banner_list && banner_list[1] && banner_list[1].title ? banner_list[1].title : 'Chưa nhập tiêu đề'}</span>
                            </Link>
                        </div>
                        <div>
                            <Link className={'text-white text-hover'}
                                  href={banner_list && banner_list[1] && banner_list[1].url_link ? banner_list[1].url_link : '#'}>
                                {banner_list && banner_list[1] && banner_list[1].description ? banner_list[1].description : 'Chưa nhập nội dung'}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tour_popular">
                    <div className="T_popular_bi">
                        <div class="T_backgroundImage"
                             style={{backgroundImage: `url(${banner_list && banner_list[2] && banner_list[2].bucket_img ? banner_list[2].bucket_img : 'https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png'})`}}>
                        </div>
                        <div className="T_image_top"></div>
                    </div>
                    <div className="T_popular_content">
                        <div className="Tour_p_title">
                            <Link className={'text-white'}
                                  href={banner_list && banner_list[2] && banner_list[2].url_link ? banner_list[2].url_link : '#'}>
                                <span
                                    className="t_title_text">{banner_list && banner_list[2] && banner_list[2].title ? banner_list[2].title : 'Chưa nhập tiêu đề'}</span>
                            </Link>
                        </div>
                        <div>
                            <Link className={'text-white text-hover'}
                                  href={banner_list && banner_list[2] && banner_list[2].url_link ? banner_list[2].url_link : '#'}>
                                {banner_list && banner_list[2] && banner_list[2].description ? banner_list[2].description : 'Chưa nhập nội dung'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({

    fetchImgInfo: state.fetchImgInfo
});
export default connect(mapStateToProps, actions)(TourPopularType);
