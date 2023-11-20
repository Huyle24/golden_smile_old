"use client"
import Image from 'next/image'
import styles from './page.module.css'
import '../../public/style/pages/home/home.scss'
import Carousels from './components/Carousels'
import SearchBox from './components/SearchBox'
import Promotion from './components/Promotion'
import ProductTravel from './components/ProductTravel'
import CardList from './components/CardList'
import SpecialOffers from './components/SpecialOffers'
import FavoriteLocation from './components/FavorireLocation'
import WhyList from './components/WhyList'
import {connect} from "react-redux";
import * as actions from "../../redux/actions";
import { Montserrat } from 'next/font/google';
import ImagesBanner from './components/ImagesBanner'


export default function Home() {

  return (
    <main className="{Montserrat.main_home}">
      <Carousels />
      <Promotion />
      {/* <ProductTravel /> */}
      <ImagesBanner />
      <CardList />
      <SpecialOffers />
      <FavoriteLocation />
      <WhyList />
    </main>
  )
}


