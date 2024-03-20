"use client"
import '../../public/style/pages/home/home.scss'
import '../../public/style/pages/home/responsive.scss'
import '../../public/style/pages/home/searchbox.scss'
import '../../public/style/pages/home/Favorite.scss'
import Carousels from './components/Carousels'
import Promotion from './components/Promotion'
import JointTour from './components/JointTour'
import PrivateTour from './components/PrivateTour'
import ImagesBanner from './components/ImagesBanner';
import InboundTour from './components/InboundTour';
import TourPopularType from './components/TourPopularType';
import NextDestion from './components/NextDestion';
import BlogWhy from './components/BlogWhy';
import Banner from './components/Banner';
import {Col, Container, Row} from 'react-bootstrap'
import TourCountryandProvince from "@/app/components/TourCountryandProvince";


export default function Home() {

    const listInboundNation = Array.from({length: 15}).map((item, index) => (
        <Col xs={4} key={index} className={'nation'}>
            Bến Tre
        </Col>
    ));
    const listOutboundNation = Array.from({length: 15}).map((item, index) => (
        <Col xs={4} key={index} className={'nation'}>
            Hàn Quốc
        </Col>
    ));
    return (
        <main className="{Montserrat.main_home}">
            <Carousels/>
            <Promotion/>
            <ImagesBanner/>
            <JointTour/>
            {/*<PrivateTour/>*/}
            <InboundTour/>
            <TourPopularType/>
            <NextDestion/>
            <BlogWhy/>
            <Banner/>
            <TourCountryandProvince/>
        </main>
    )
}


