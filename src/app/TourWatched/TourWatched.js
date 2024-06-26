import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {useEffect, useState} from "react";
import Link from "next/link"
import * as GlobalJs from "../../../js/global";
import Modal from "react-bootstrap/Modal";
import {BASE_URL_API, GET_TOKEN, GET_LANG_CODE} from '../../../redux/actions/type';
import {GET_LANG_vi, GET_LANG_ko} from '../../../js/lang';
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import {useRouter, useSearchParams} from "next/navigation";
import Card from "react-bootstrap/Card";
import {CiLocationOn, CiTimer} from "react-icons/ci";
import {BsPeople} from "react-icons/bs";

function TourWatched(props) {
    const searchParams = useSearchParams();
    const [tot, setTot] = useState(0);
    const [listTourWat, setListTourWat] = useState([])
    useEffect(() => {
        props.getToProductWatchedAction();
    }, [])
    let listTourWatched = props.getToProductWatch ? props.getToProductWatch : '';
    console.log(listTourWatched)
    useEffect(() => {
        props.fetchTourDetailW3(searchParams.get('id'))
    }, [searchParams.get('id')])


    useEffect(() => {
        let totalPrice = listTourWat.reduce(function (accumulator, item) {
            return accumulator + parseInt(item.total_price);
        }, 0);
        setTot(totalPrice);
    }, [listTourWat]);

    const removeItemWatched = (id) => {
        let newWatched = [];
        newWatched = listTourWat.filter((item) => item.id !== id)
        setListTourWat(newWatched);
        localStorage.setItem("productWatched", JSON.stringify(newWatched));
    }


    useEffect(() => {
        setListTourWat(listTourWatched)
    }, [listTourWatched])


    return (
        <Card className={'invoice-list'}>
            <Card.Body>
                <div className={' px-2 px-md-5'}>
                    <Row>
                        <div className={'mb-2 title-card'}>TOUR ĐÃ XEM</div>
                        {listTourWat ? (listTourWat.map((item, idx) => (
                            <Card className={'mt-3'}>
                                <Card.Body className={'body-card-invoice '}>
                                    <Row key={idx} className="mt-lg-3 mt-0">
                                        <Col lg="3" className={'pe-mobile-0 d-flex justify-content-center'}>
                                            <Link href={"/Tour?tour_type=2" + "&permalink=" + item.permalink}
                                                  onClick={() => Product_watched(item)} className={'d-flex justify-content-center'}>
                                                <img className={'image-invoice'}
                                                     src={item.bucket_img ? item.bucket_img : "https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png"}
                                                     alt="tour"/>
                                            </Link>
                                        </Col>
                                        <Col lg="9">
                                            <div className={'d-flex justify-content-between flex-wrap-mobile'}>

                                                <div className={'tour-name '}
                                                     style={{maxWidth: "85%"}}>
                                                    <Link href={"/Tour?tour_type=2" + "&permalink=" + item.permalink}
                                                          onClick={() => Product_watched(item)}>
                                                        {item.name ? item.name : ""}
                                                    </Link>
                                                </div>
                                                <div className={'d-flex flex-wrap align-items-center'}>
                                                    <BsPeople/>
                                                    <span
                                                        className={'text-danger fw-bold ms-2'}>{item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].count_order_tour : 0}</span> /
                                                    <span>{item.max_customer}</span>


                                                </div>
                                            </div>

                                            <div className="mt-1">
                                                    <span
                                                        className={'invoice_code'}>  {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].code : ''}</span>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center mt-1 flex-wrap">
                                                <div style={{minWidth:'200px',maxWidth:'55%'}}>
                                                    <CiLocationOn/>
                                                    <span className=" ms-2">
                                               {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].city_start : ''} - {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].city_name : ''}
                                                      </span>
                                                </div>
                                                <div style={{minWidth:'200px',maxWidth:'45%'}} className={'d-flex  flex-lg-wrap align-items-center justify-content-lg-end '}>
                                                    <CiTimer/>
                                                    <span className=" ms-2 ">
                                                  {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].date_type_name : ''}
                                                         </span>
                                                </div>
                                            </div>
                                            <div className={'mt-1'}>
                                                <div
                                                    className="d-flex justify-content-between align-content-center flex-wrap ">
                                                    <div
                                                        className=" text-danger fw-bold fs-5 d-flex align-content-center flex-wrap">
                                                        {item.tour_open_list && item.tour_open_list.length > 0 ? item.tour_open_list[0].price_1_person : ''} đ
                                                    </div>

                                                    <div
                                                        className="btn-delete">
                                                        <i class='bx bxs-trash '
                                                           onClick={() => removeItemWatched(item.id)}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))) : ''}

                    </Row>
                </div>
            </Card.Body>
        </Card>
    )
}


const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
    getToProductWatch: state.getToProductWatch,
});
export default connect(mapStateToProps, actions)(TourWatched);