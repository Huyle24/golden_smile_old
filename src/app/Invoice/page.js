"use client"

import PaymentSidebar from "@/app/OrderTour/PaymentSidebar";
import {Col, Row} from "react-bootstrap";
import ListInvoice from "@/app/Invoice/ListInvoice";
import CustomerInfo from "@/app/components/CustomerInfo";

export default function Invoice() {

    return (
        <div className="container mt-3">
            <Row>
                <Col md={4}>
                    <CustomerInfo/>
                </Col>
                <Col md={8}>
                    <ListInvoice/>
                </Col>
            </Row>

        </div>
    )
}