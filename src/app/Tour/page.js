"use client"
import BreadCrums from '../Category/components/BreadCrums'
import HeadDetail from './HeadDetail'
import ImgDetail from './ImgDetail'
import TimeLine2 from './TimeLine2'
import PrivateTour from "@/app/components/PrivateTour";
import {Col, Container} from "react-bootstrap";
import InfoDetail from "@/app/Tour/InfoDetail";


export default function TourId(){

    return (
        
        <div className="main_showcustomer">
            <BreadCrums />
            <ImgDetail/>

            <PrivateTour/>

        </div>
    )
}
