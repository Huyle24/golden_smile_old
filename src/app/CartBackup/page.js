"use client"

import BreadCrums from '../Category/components/BreadCrums'
import BreadcrumbBooking from './BreadCrumBooking'
import OverviewBooking from './OverviewBooking'
import ProductBooking from './ProductBooking'
import {useEffect, useState} from "react";
import * as actionType from "../../../redux/actions/type";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import BookingLeft from "@/app/CartBackup/BookingLeft";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import OverviewRight from "@/app/CartBackup/OverviewRight";
export default function BookingId(){

    return (
        <div className="main_showcustomer">
            <BreadCrums/>
            <BreadcrumbBooking />
            <Container>
                <Row>
                    <Col lg={12}>
                        <BookingLeft />

                    </Col>
                </Row>
            </Container>
        </div>
    )
}