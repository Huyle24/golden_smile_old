"use client"
import Image from 'next/image'
import styles from './page.module.scss'
import '../../public/style/pages/home/home.scss'
import '../../public/style/pages/home/responsive.scss'
import '../../public/style/pages/home/searchbox.scss'
import '../../public/style/pages/home/Favorite.scss'
import Carousels from './components/Carousels'
import SearchBox from './components/SearchBox'
import Promotion from './components/Promotion'
import ProductTravel from './components/ProductTravel'
import JointTour from './components/JointTour'
import PrivateTour from './components/PrivateTour'
import {connect} from "react-redux";
import * as actions from "../../redux/actions";
import {Montserrat} from 'next/font/google';
import ImagesBanner from './components/ImagesBanner';
import InboundTour from './components/InboundTour';
import TourPopularType from './components/TourPopularType';
import NextDestion from './components/NextDestion';
import BlogWhy from './components/BlogWhy';
import Banner from './components/Banner';
import Favorite from './components/Favorite';
import {Row, Col, Container} from 'react-bootstrap'


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
            <PrivateTour/>
            <InboundTour/>
            <TourPopularType/>
            <NextDestion/>
            <BlogWhy/>
            <Banner/>
            <div className={'bg-white'}>
            <Container className={'pt-4'}>
                <Row className={'px-2'}>
                    <Col sm={6} className={'d-flex justify-content-center'}>
                        <div className="card tour_inboud">

                            <h2 className="title text-uppercase">tour trong nước</h2>
                            <div className="tour_inboud-card-body  ">
                                <Row>
                                    {listInboundNation}
                                </Row>

                            </div>

                        </div>
                    </Col>
                    <Col sm={6} className={'d-flex justify-content-center'}>
                        <div className="card tour_outbound">

                            <h2 className="title text-uppercase">Tour nước ngoài</h2>
                            <div className="tour_inboud-card-body  ">
                                <Row>
                                    {listOutboundNation}
                                </Row>

                            </div>

                        </div>
                    </Col>

                </Row>
            </Container>
            </div>
        </main>
    )
}


