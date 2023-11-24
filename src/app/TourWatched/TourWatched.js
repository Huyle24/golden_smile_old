import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {useEffect, useState} from "react";
import Link from "next/link"
import * as GlobalJs from "../../../js/global";
import Modal from "react-bootstrap/Modal";
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE } from '../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../js/lang';
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import {useRouter, useSearchParams} from "next/navigation";

function TourWatched(props){
    const searchParams = useSearchParams();
    const [tot, setTot] = useState(0);
    const [listTourWat, setListTourWat] = useState([])
    useEffect(()=> {
        props.getToProductWatchedAction();
    },[])
    let listTourWatched = props.getToProductWatch ? props.getToProductWatch : '';

    useEffect(() => {
        props.fetchTourDetailW3(searchParams.get('id'))
    },[searchParams.get('id')])

   

    useEffect(() => {
        let totalPrice = listTourWat.reduce(function (accumulator, item) {
            return accumulator + parseInt(item.total_price) ;
        }, 0);
        setTot(totalPrice);
    }, [listTourWat]);

    const removeItemWatched = (id) => {
        let newWatched = [];
        newWatched = listTourWat.filter((item) => item.id !== id)
        setListTourWat(newWatched);
        localStorage.setItem("productWatched",JSON.stringify(newWatched));
    }


   

    useEffect(()=> {
        setListTourWat(listTourWatched)
    },[listTourWatched])


    return (
        <Container >
            <Row>
                <Col lg={12}>Các tour bạn đã xem qua!</Col>
                <Col lg={8}>
                {listTourWat ? (listTourWat.map((item,idx) => (
                    <Row key = {idx} className="mt-3 bg-color">
                        <Col lg="3" className="pe-0">
                            <img src={item.img ? item.img : ''} className="w-100 rounded-1 h-100 object-fit-cover" alt="tour"/>
                        </Col>
                        <Col lg="7" className="px-3 py-2 ">
                            <span className="tour_detail_title">{item.name}</span>
                            <div className="mt-3">
                                Mã tour <span className="color-text fw-bold">{item.code}</span>
                            </div>
                            <div className="mt-2">
                                Khởi hành <span className="color-text fw-bold">28/08/2023</span>
                            </div>
                            <div className="mt-2">
                                Thời gian <span className="color-text fw-bold">{item.date_type_name}</span>
                            </div>
                            <div className="mt-2">
                                Nơi khởi hành <span className="color-text fw-bold">{item.city_start_name}</span>
                            </div>
                            {/*<div className="mt-2">*/}
                            {/*    Số chỗ còn nhận  <span className="color-text fw-bold">9</span>*/}
                            {/*</div>*/}
                            <div className="mt-2">
                                Dịch vụ tùy chọn  <span className="color-text fw-bold">Bay hàng không Tway Air - 4 đêm khách sạn 3 sao đia phương</span>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="d-flex justify-content-between align-items-center mt-3 border-top p-2">
                                {/*<span className="color-text fw-bold">TỔNG CỘNG</span>*/}
                                <div onClick={() => removeItemWatched(item.id)} className="btn-delete">
                                    Xóa
                                </div>

                            </div>
                        </Col>
                    </Row>
                    ))) : ''}
                </Col>
            </Row>
        </Container>
    )
}



const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
    getToProductWatch: state.getToProductWatch,
});
export default connect(mapStateToProps, actions)(TourWatched);