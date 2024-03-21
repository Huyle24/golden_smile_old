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
import OutboundTour from "@/app/components/OutboundTour";


export default function Home() {


    return (
        <main className="{Montserrat.main_home}">
            <Carousels/>
            <Promotion/>
            <ImagesBanner/>
            <JointTour/>
            <InboundTour/>
            <OutboundTour/>
            <TourPopularType/>
            <NextDestion/>
            <BlogWhy/>
            <Banner/>
            <TourCountryandProvince/>
        </main>
    )
}


