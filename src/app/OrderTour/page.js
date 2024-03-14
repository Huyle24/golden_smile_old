"use client"
import BreadCrums from '../Category/components/BreadCrums'
import DetailTourPayment from '@/app/OrderTour/DetailTourPayment'
import PaymentSidebar from "@/app/OrderTour/PaymentSidebar";
import {Col, Row} from "react-bootstrap";

export default function OrderTour() {

    return (

        <div className="container">
            <BreadCrums/>
            <DetailTourPayment/>
        </div>
    )
}