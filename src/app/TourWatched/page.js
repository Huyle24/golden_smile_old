"use client"
import {useEffect, useState} from "react";
import * as actionType from "../../../redux/actions/type";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import TourWatched from "@/app/TourWatched/TourWatched";


export default function click_tour(){ 
    return (
        <div className="main_showcustomer">
            <Container>
                <Row>
                    <Col lg={12}>
                        <TourWatched />
                    </Col>
                </Row>
            </Container>
           
        </div>
    )
}