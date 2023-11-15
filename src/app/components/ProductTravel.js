import { Container } from "react-bootstrap"
import React, { Component, useEffect, useState } from "react";
import * as actionType from "../../../redux/actions/type";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import Link from "next/link";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {fetchCountHotelList} from "../../../redux/actions";
import {useRouter} from "next/navigation";
import moment from "moment/moment";

function ProductTravel(props){
    const [today, setToday] = useState(new Date());
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date(moment(dateStart, "DD-MM-YYYY").add(1, 'days')));
    const [counterAdult, setCounterAdult] = useState(1);
    const [counterChild, setCounterChild] = useState(0);
    const [counterRoom, setCounterRoom] = useState(1);
    const [keyWord, setKeyWord] = useState('');
    const router = useRouter()

  let countListHotel = props.countHotelListInfo && props.countHotelListInfo.isLoading === false ? props.countHotelListInfo.data : '';
    let keywork = props.countHotelListInfo.data && props.countHotelListInfo.isLoading === false ? props.countHotelListInfo.data.name_city : '';
  console.log(countListHotel)
    const showHotel = () => {
        // props.fetchHotelList(counterAdult, counterChild, counterRoom, keyWord, moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY'), moment(dateEnd, "DD-MM-YYYY").format('DD/MM/YYYY'), 5, limit);


        if(moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY') < moment(today, "DD-MM-YYYY").format('DD/MM/YYYY')){

            Toast.fire({
                title: "Chọn sai ngày đi",
                icon: "error"
            })
            return false

        }



        if(moment(dateEnd, "DD-MM-YYYY").format('YYYY-MM-DD') < moment(dateStart, "DD-MM-YYYY").format('YYYY-MM-DD')){
            Toast.fire({
                title: "Chọn sai ngày về",
                icon: "error"
            })
            return false

        }


        // router.push('/stay/list?adult_number=' + counterAdult + '&child_number='+ counterChild + '&room_number='+counterRoom + '&keyword=' + keywork + '&date_start=' + moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY') + '&date_end=' + moment(dateEnd, "DD-MM-YYYY").format('DD/MM/YYYY'))
    }

  useEffect(() => {
      props.fetchCountHotelList()
  }, []);
      return (
        <Container className="mt-4">
          <h4 className="color-text">Khám phá sản phẩm Nhanhtravel</h4>
          <Swiper className="mt-4"
          cssMode={true}
          navigation={true}

          breakpoints={{
              425: {
              slidesPerView: 2,
              spaceBetween: 10,
              },
              576: {
              slidesPerView: 3,
              spaceBetween: 20,
              },

              768: {
              slidesPerView: 3,
              spaceBetween: 20,
              },
              992: {
              slidesPerView: 4,
              spaceBetween: 20,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Navigation]}
          >
            {countListHotel ? (countListHotel.map((item,index) =>
              <SwiperSlide key = {index}>
                <div className="explore-tour__item__image header_tour_img">
                    <Link href={`/stay/list?adult_number=${counterAdult}&child_number=${counterChild}&room_number=${counterRoom}&keyword=${item.name_city}&date_start=${moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY')}&date_end=${moment(dateEnd, "DD-MM-YYYY").format('DD/MM/YYYY')}`}>
                      <img src={item.image} className="card-img w-100" loading="lazy"/>
                    </Link>
                    <div>
                        <h5 className="color-text">{item.name_city}</h5>
                        <p className="fs-6">{item.hotel_count} chỗ ở</p>
                    </div>

                    <span className="overlay"></span>
                </div>
              </SwiperSlide>
            )) : ''}
          </Swiper>
        </Container>
      );
    }

const mapStateToProps = state => ({
    countHotelListInfo: state.countHotelListInfo,
});
export default connect(mapStateToProps, actions)(ProductTravel);