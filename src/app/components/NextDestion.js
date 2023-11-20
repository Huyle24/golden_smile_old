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
            images: "https://goldensmiletravel.com/zoom/300x300/uploads/images/location/admingst/2023/02/21/thumb-1920-716104-1676988825.jpg",
            country: "Australia",
            chuyen_number: "9 CHUYẾN THAM QUAN",
        }
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
                            <div className="card_tour_nextdestion hover-zoom-in">
                                <img src={item.images} className="images_next" alt="Hình ảnh điểm đến" />
                                <div className="name_next">
                                    <h2>{item.country}</h2>
                                </div>
                                <div className="number_total_visit">
                                    <span className="trip_number">{item.chuyen_number}</span>
                                </div>
                            </div>
                        </div>
                    )) : ''}
                </Row>
            </div>
        </Container>
    )
}

export default NextDestion;