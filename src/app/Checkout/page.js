"use client"
import BreadCrums from '../Category/components/BreadCrums'

import {Col, Row} from "react-bootstrap";
import PaymentMethod from "@/app/Checkout/PaymentMethod";

export default function OrderTour() {

    return (

        <div className="container main_showcustomer">
            <BreadCrums/>
            <PaymentMethod/>
        </div>
    )
}