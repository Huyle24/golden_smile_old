"use client"
import React, {useEffect, useState} from "react";
import * as actionType from "../../../redux/actions/type";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import TourWatched from "@/app/TourWatched/TourWatched";
import CustomerInfo from "@/app/components/CustomerInfo";
import BreadCrums from "@/app/Category/components/BreadCrums";


export default function click_tour(){ 
    return (
        <div className="container main_showcustomer">
            <BreadCrums/>
            <Row>
                <Col md={4}> <CustomerInfo/></Col>
                <Col md={8}>
                    <TourWatched/>
                </Col>
            </Row>
        </div>
)
}