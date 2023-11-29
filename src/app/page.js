"use client"
import Image from 'next/image'
import styles from './page.module.css'
import '../../public/style/pages/home/home.scss'
import '../../public/style/pages/home/responsive.scss'
import '../../public/style/pages/home/searchbox.scss'
import '../../public/style/pages/home/Favorite.scss'
// import '../../public/style/pages/home/NextDestion.scss'
import Carousels from './components/Carousels'
import SearchBox from './components/SearchBox'
import Promotion from './components/Promotion'
import ProductTravel from './components/ProductTravel'
import CardList from './components/CardList'
import SpecialOffers from './components/SpecialOffers'
import {connect} from "react-redux";
import * as actions from "../../redux/actions";
import { Montserrat } from 'next/font/google';
import ImagesBanner from './components/ImagesBanner';
import TourTrekking from './components/TourTrekking'
import TourPopularType from './components/TourPopularType'
import NextDestion from './components/NextDestion'
import BlogWhy from './components/BlogWhy'
import Banner from './components/Banner'
import Favorite from './components/Favorite'


export default function Home() {

  return (
    <main className="{Montserrat.main_home}">
      <Carousels />
      <Promotion />
      <ImagesBanner />
      <SpecialOffers />
      <CardList />
      <TourTrekking />
      <TourPopularType />
      <NextDestion />
      <BlogWhy />
      <Banner />
    </main>
  )
}


