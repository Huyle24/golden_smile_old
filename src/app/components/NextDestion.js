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
import {BASE_URL} from "../../../redux/actions/type"

function NextDestion(props) {
    const [listCountry, setListCountry] = useState([]);
    const getListCountry = () => {
        const URL = actionType.BASE_URL_API + 'Balotour/Country/list_country_and_tour';

        axios.get(URL, {
            headers: {
                "x-api-key": "api_key",
                "USER-TOKEN": "2BF8MD9TRK78NPQ0RHQ712WERV50QUIDK0N3QRFFZW7OL6G8E0WTMGJYHKAOOGJZA4SO23NI98SP5L1L2EL67829CS6V21QZS4WFP6K8RK8669QJ2J6QVHFTWOOZ8Y22",
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
            .then(function (res) {
                console.log(res.data.data);
                setListCountry(res.data.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    useEffect(() => {
        getListCountry();
    }, []);

    return (
        <Container>
            <div className="NextDestion_tour">
                <div className="text-center pt-9">
                    <div className="Next_title">Điểm đến yêu thích</div>
                    <span className="divider-Trekking"></span>
                </div>
                    <Row className="mt-3 no-gutters">
                        {listCountry ? (listCountry.filter((item, idx) => idx < 12).map((item) => (
                            <div className="col-xs-6 col-md-3">
                                <div data-aos="fade-zoom-in"
                                    data-aos-easing="ease-in-back"
                                    data-aos-duration="2000"
                                    data-aos-delay="100">
                                    <Link href="/Category">
                                    <div data-animate="fadeIn" className="nextion_item  px-2 fadeIn animated">
                                        <div className="card_tour_nextdestion text-white class-dark-nexttour hover-zoom-info"><img
                                                src={item.bucket_img}
                                                alt="Trung Quốc" className="images_next"/>
                                            <div className="images_next-overlay d-flex justify-content-center flex-column">
                                                <h2 className="name_next mb-0">{item.name}</h2>
                                            </div> <a href="https://goldensmiletravel.com/du-lich-trung-quoc.html" className="name_number">
                                                <div className="images_next-overlay d-flex justify-content-end flex-column">
                                                    <p className="trip_generality fs-13 font-weight-500  text-center"><span
                                                            className="trip_number">{item.number_tour} CHUYẾN THAM QUAN</span></p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                             </div>
                        ))) : ''}

                    </Row>
            </div>
        </Container>
    )
}


const mapStateToProps = state => ({
    tourListInfo: state.tourListInfo
});

export default connect(mapStateToProps, actions)(NextDestion);