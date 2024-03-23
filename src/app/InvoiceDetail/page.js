"use client"

import PaymentSidebar from "@/app/OrderTour/PaymentSidebar";
import {Col, Row} from "react-bootstrap";
import ListInvoice from "@/app/Invoice/ListInvoice";
import CustomerInfo from "@/app/components/CustomerInfo";
import InvoiceDetail from "./InvoiceDetail"
import BreadCrums from "@/app/Category/components/BreadCrums";
export default function Invoice() {

    return (
        <div className="container  main_showcustomer">
            <BreadCrums/>
            <Row>
                <Col md={4}>
                    <CustomerInfo/>
                </Col>
                <Col md={8}>
                    <InvoiceDetail/>
                </Col>
            </Row>

        </div>
    )
}