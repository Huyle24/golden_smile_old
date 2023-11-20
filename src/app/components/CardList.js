import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaTicketAlt, FaCalendarAlt, FaArrowRight,FaRegHeart,FaCartPlus  } from "react-icons/fa";
import { ListTourData } from "../Category/ListTourData";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import * as actionType from "../../../redux/actions/type";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import {event} from "next/dist/build/output/log";
import {addToCartAction, fetchTourList} from "../../../redux/actions";
import Swal from "sweetalert2";
import {CiBarcode, CiLocationOn, CiTimer} from "react-icons/ci";
function CardList(props) {
    useEffect(() => {
        props.fetchTourList('', '', '', '', '', '', '', '',1)
    },[])

    let list_tour = props.tourListInfo.data && props.tourListInfo.isLoading === false ? props.tourListInfo.data.tour_list : '';

    console.log(list_tour)

  return (
    <Container >
      <div className="tourtrongnuoc">
        <h4 className="mt-4">Tour trong nước</h4>
        <span className="divider-Trekking"></span>
      
      <Swiper
          cssMode={true}
          navigation={true}

          breakpoints={{

          425: {
          slidesPerView: 1,
          spaceBetween: 20,
          },
          576: {
              slidesPerView: 2,
              spaceBetween: 10,
          },
          768: {
          slidesPerView: 2,
          spaceBetween: 20,
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
      modules={[Navigation]}
      >
            {list_tour ? (list_tour.map((item,index) =>(

            <SwiperSlide lg="4" className="mt-4" key={index}>
            <Card>
                <Card className="position-relative border border-0 header_tour_img">
                <Link href={"/Tour?id="+ item.id}>
                  <Card.Img
                      variant="top"
                      src={item.img}
                  />
                </Link>
                <Card.Text className="tag position-absolute text-primary mb-0">
                    Tour riêng
                </Card.Text>
                <FaRegHeart className="position-absolute tag_heart" />
                <div className="position-absolute tag_right_card d-flex flex-column align-items-end">
                    <Card.Text className="tag_point">9</Card.Text>
                    <Card.Text className="tag_number_care">
                    10 quan tâm
                    </Card.Text>
                </div>
                </Card>
                <Card.Body>
                <Link href={"/Tour?id=" + item.id}>
                  <Card.Title className="card_title_tour">{item.name}</Card.Title>
                </Link>
                <div className="d-flex justify-content-between align-items-center">
                   <div>
                       <Card.Text className="mb-1 d-flex align-items-center"><CiBarcode />
                           <Card.Text className="d-flex align-items-center color-text ms-2">
                               {item.code}
                           </Card.Text>
                       </Card.Text>
                       <div className="d-flex min-height-46 align-items-center">
                        <CiLocationOn />
                            <span className="color-text  ms-2">
                            {item.city_name}
                            </span>
                        </div>
                   </div>
                    <div>
                        <p className="mb-1 text-decoration-line-through fs-6 text-end">133,333,000đ</p>
                        <Card.Text className="text-danger fw-bold price min-height-46 d-flex align-items-center">
                            Giá: {item.price_1_person}đ
                        </Card.Text>
                    </div>
                </div>

                {/* <Card.Text className='text-decoration-line-through'>Giá: {item.price}đ</Card.Text> */}
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <CiTimer /> <span className="color-text ">{item.date_type_name}</span>
                    </div>
                    <Card.Text className="ticket p-2 mt-2">
                        {item.discount}% Giảm
                    </Card.Text>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <div>
                      Số chỗ còn <span className="fw-bold text-danger fs-5">9</span>
                  </div>
                    <Link href={"/Tour?id=" + item.id}>
                        <Button className="bg-danger border border-0">
                            Xem chi tiết
                        </Button>
                    </Link>

                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <FaCalendarAlt className="me-2"/>
                        <div className="clamp-1">
                            <Link href={"/Tour?id=" + item.id}>
                                <span className="me-2 border px-2 rounded item_day_tour fw-bold">11/12</span>
                            </Link>
                            <Link href={"/Tour?id=" + item.id}>
                                <span className="me-2 border px-2 rounded item_day_tour fw-bold">13/12</span>
                            </Link>
                            <Link href={"/Tour?id=" + item.id}>
                                <span className="me-2 border px-2 rounded item_day_tour fw-bold">15/12</span>
                            </Link>
                            <Link href={"/Tour?id=" + item.id}>
                                <span className="me-2 border px-2 rounded item_day_tour fw-bold">17/12</span>
                            </Link>
                            <Link href={"/Tour?id=" + item.id}>
                                <span className="me-2 border px-2 rounded item_day_tour fw-bold">19/12</span>
                            </Link>
                        </div>

                    </div>
                </div>
                </Card.Body>
            </Card>
            </SwiperSlide>
                ))): ''}
        </Swiper>
        <div className="home-page__see-all text-end mt-4">
            <Link href='/Category'>
                <Button className="btn px-4 py-2 fw-bold d-inline-flex align-items-center text-white">
                    Xem tất cả <FaArrowRight className="ms-2 " />
                </Button>
            </Link>

        </div>
      </div>
    </Container>
  );
}



const mapStateToProps = state => ({
    tourListInfo: state.tourListInfo
});
export default connect(mapStateToProps, actions)(CardList);
