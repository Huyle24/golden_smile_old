import { Container } from "react-bootstrap"
import React, { Component, useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import * as actionType from "../../../redux/actions/type";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import {GET_LANG_CODE} from "../../../redux/actions/type";
import {GET_LANG_ko, GET_LANG_vi} from "../../../js/lang";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";

function Promotion(props){


    let slideImageInfo = props.slideImageListInfo.data && props.slideImageListInfo.isLoading === false ? props.slideImageListInfo.data.slide_endow_img : '';
    const [textShow, setTextShow] = useState('')
    const getLangText = async () => {
        let lang_code = await GET_LANG_CODE();
        let lang_text ={}
        switch (JSON.parse(lang_code)) {
            case 'vi':
                lang_text = GET_LANG_vi().main
                break;
            default:
                lang_text = GET_LANG_ko().main
                break;
        }
        setTextShow(lang_text)
    }

    useEffect(() => {
        getLangText();
    }, []);

      return (

        <Container className="promotion mt-4">
            <h4 className="mt-4">Ưu đãi</h4>
            <span className="divider-Trekking"></span>
          <Swiper 
          cssMode={true}
          navigation={true}

          breakpoints={{
              425: {
                  slidesPerView: 2,
                  spaceBetween: 16,
              },
              768: {
              slidesPerView: 2,
              spaceBetween: 16,
              },

              992: {
                  slidesPerView: 3,
                  spaceBetween: 20,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Navigation,Autoplay]}
          className="mt-4">
            {slideImageInfo ? (slideImageInfo.map((item,index) => (
              <SwiperSlide key={index}>
                  <div className="header_tour_img rounded">
                    <div data-aos="zoom-in-down" data-aos-duration="3000"
                                    data-aos-delay="100">
                      <Link href="/Category">
                          <img src={item.image} className="img_promo w-100"/>
                      </Link>
                    </div>
                  </div>

              </SwiperSlide>
            ))) : ''}
          </Swiper>
        </Container>
      );
    }


const mapStateToProps = state => ({
    slideImageListInfo: state.slideImageListInfo,
});
export default connect(mapStateToProps, actions)(Promotion);