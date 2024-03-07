import {Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {FaArrowRight, FaCalendarAlt, FaRegHeart} from "react-icons/fa";
import {BsPeople} from "react-icons/bs";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation} from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import {useEffect, useState} from "react";
import Link from "next/link";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import {CiBarcode, CiLocationOn, CiTimer} from "react-icons/ci";
import {fetchJointTourList} from "../../../redux/actions";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

function JointTour(props) {
    useEffect(() => {
        props.fetchJointTourList('', '', '', '', '', '', '', '', 1)
    }, [])

    let list_tour = props.jointTourListInfo.data && props.jointTourListInfo.isLoading === false ? props.jointTourListInfo.data.tour_list : '';
    console.log('JointTour');
    console.log(list_tour);
    const Product_watched = (item) => {
        // alert(item.id);
        props.addToWatchedAction(item);
    }


    const [tourList, setTourlist] = useState([])
    const [selectedDate, setSelectedDate] = useState([]);
    const [seletedIndex, setSelectedIndex] = useState(0);
    const [indexDetail, setIndexDetail] = useState(0)
    const handlechooseDate = (item1, item, index, index1) => {
        setSelectedIndex(index);
        setIndexDetail(index1);
        console.log(index);
        console.log(index1);
    }
    return (
        <Container>
            <div className="tourtrongnuoc">
                <h4 className="mt-4">Tour ghép</h4>
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
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        770: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation]}
                >

                    {list_tour ? (list_tour.map((item, index) => (
                        <SwiperSlide lg="4" className={`mt-4 tour_${item.id}`} key={index}>
                            <div data-aos="zoom-in-up" data-aos-duration="3000">

                                <Card>
                                    <Card className="position-relative border border-0 header_tour_img">
                                        <Link href={"/Tour?id=" + item.id} onClick={() => Product_watched(item)}>
                                            <Card.Img
                                                variant="top"
                                                src={item.bucket_img ? item.bucket_img : 'https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png'}
                                            />
                                        </Link>
                                        <div
                                            className="position-absolute tag_right_card d-flex flex-column ">
                                            <Card.Text className="tag_number_care">
                                                Tour ghép
                                            </Card.Text>
                                        </div>
                                    </Card>

                                    <Card.Body className={'card-tour'}>
                                        <Link href={"/Tour?id=" + item.id} onClick={() => Product_watched(item)}>
                                            <Card.Title className="card_title_tour " style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}  data-bs-toggle="tooltip" data-bs-placement="top" title={item.name}>
                                                {item.name}
                                            </Card.Title>
                                        </Link>
                                        <Card.Text className="mb-1 d-flex align-items-center">
                                            <Card.Text className="d-flex align-items-center code-tour ">
                                                {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].code : ''}
                                            </Card.Text>
                                        </Card.Text>
                                        <hr className={'hr-product-card'}/>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex  align-items-center">
                                                <CiLocationOn/>
                                                <span className=" ms-2">
                                               {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].city_start : ''} - {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].city_name : ''}
                                                      </span>
                                            </div>

                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className={'d-flex flex-wrap align-items-center'}>
                                                <CiTimer/>
                                                <span className=" ms-2 ">
                                                  {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].date_type_name : ''}
                                            </span>
                                            </div>
                                            <div className={'d-flex flex-wrap align-items-center'}>
                                                <BsPeople/>
                                                <span
                                                    className={'text-danger fw-bold ms-2'}>{item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].count_order_tour : 0}</span> /
                                                <span>{item.max_customer}</span>


                                            </div>
                                        </div>
                                        <div className={'my-2'}>
                                            <div className={'text-secondary'}> Lịch khởi hành</div>
                                            <div className={'d-flex flex-wrap gap-1 calendar-start'}
                                                 style={{minHeight: 30}}>

                                                {item.tour_open_list.slice(0, 4).map((item1, index1) => (
                                                    <span
                                                        key={index1}
                                                        className="px-2 py-1 item_day_tour fw-bold">{item1.date_start_tour.slice(0, 5)}</span>
                                                ))}


                                            </div>
                                        </div>

                                        <div>
                                            <div className={'text-secondary'}>
                                                Giá
                                            </div>
                                            <div
                                                className="d-flex justify-content-between align-content-center flex-wrap ">
                                                <div
                                                    className=" text-danger fw-bold fs-5">
                                                    {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].price_1_person : ''} đ
                                                </div>
                                                <Link href={"/Tour?id=" + item.id} onClick={() => Product_watched(item)}
                                                      className={'d-flex align-content-center flex-wrap'}>
                                                    <button className="button-detail btn ">
                                                        Xem chi tiết
                                                    </button>
                                                </Link>
                                            </div>


                                        </div>

                                    </Card.Body>
                                </Card>
                            </div>
                        </SwiperSlide>
                    ))) : ''}
                </Swiper>
                <div data-aos="fade-up"
                     data-aos-duration="3000">
                    <div className="home-page__see-all text-end mt-4">
                        <Link href='/Category'>
                            <Button className="btn px-4 py-2 fw-bold d-inline-flex align-items-center text-white button-all ">
                                Xem tất cả <FaArrowRight className="ms-2 "/>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
}


const mapStateToProps = state => ({
    jointTourListInfo: state.jointTourListInfo
});
export default connect(mapStateToProps, actions)(JointTour);
