"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Head from 'next/head'
import Header from './components/Header';
import Footer from './components/Footer';
import {Provider} from "react-redux";
import {SSRProvider} from "react-bootstrap";
import store from "../../redux/store";
import {useEffect, useState} from "react";

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
      <Head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui"/>
                <meta name="description" content="Demo bootstrap"/>
                <meta name="keywords" content="Demo bootstrap"/>
                <meta name="author" content="Idspa"/>
                <title>Nhanhtravel</title>

                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="apple-touch-fullscreen" content="yes"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
                <link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900%7CMontserrat:300,400,500,600,700,800,900" rel="stylesheet"/>
                <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossorigin="anonymous"
                />
                <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

                <script
                  src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
                  crossorigin></script>

                <script
                  src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
                  crossorigin></script>
                  <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Head>

          <Provider store={store}>
      <Header />
      {children}
      <Footer />
              </Provider>
      </body>
    </html>
  )
}
