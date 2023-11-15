import { Container, Row, Col, Form, Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {FaTicketAlt, FaPlusCircle, FaArrowRight, FaCartPlus, FaRegHeart, FaCalendarAlt} from 'react-icons/fa';
import Paginate from "./Paginate";
import Link from "next/link";
import * as actionType from "../../../../redux/actions/type";
import * as actions from "../../../../redux/actions";
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE } from '../../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../../js/lang';
import axios from "axios";
import { useState, useEffect } from "react";
import {connect} from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import {CiBarcode, CiLocationOn, CiTimer} from "react-icons/ci";
const OFF_DEFAULT = 9;
function ListTour(props){
    const [value, onChange] = useState(new Date());
    const [textShow, setTextShow] = useState('');

    let [tourFilterTmp, setTourFilterTmp] = useState([
        {
            id: 1,
            name: 'Tour 1 ngay',
            is_click: false,
            item_hd: [
                {
                    id: 1,
                    name: 'Mien bac',
                    is_click: false,
                    item_hd: [
                        {
                            id: 1 ,
                            name: 'Mien nam',
                        }

                    ]
                },
                {
                    id: 2,
                    name: 'Mien nam'
                }
            ]
        },
        {
            id: 2,
            name: 'Tour 2 ngay',
            is_click: false,
            item_hd: [
                {
                    id: 1,
                    name: 'Mien bac 2'
                },
                {
                    id: 2,
                    name: 'Mien nam 2'
                }
            ]
        }
    ]);
    const [limit, setLimit] = useState(0)
    const [tourList, setTourlist] = useState([])
    const [seeMore, setSeemore] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [searchKeyWord, setSearchKeyWord] = useState('')
    const [checkboxOrder, setCheckboxOrder] = useState('');

    const [checkboxTypeDate, setCheckboxTypeDate] = useState('');
    const [allshow, allsetShow] = useState(false);
    const allhandleClose = () => allsetShow(false);
    const allhandleShow = () => allsetShow(true);

    const getLangText = async () => {
        let lang_code = await GET_LANG_CODE();
        let lang_text ={}
        switch (JSON.parse(lang_code)) {
            case 'vi':
                lang_text = GET_LANG_vi().tour
                break;
            default:
                lang_text = GET_LANG_ko().tour
                break;
        }
        setTextShow(lang_text)
    }

    const tree_view = (index) => {
        tourFilterTmp[index]['is_click'] = !tourFilterTmp[index]['is_click'];
        setTourFilterTmp(tourFilterTmp)
        setLoadingPage(!loadingPage)
    }
    const getTourmore =async ()=>{
        let limit_new = limit + OFF_DEFAULT
        let url_api = BASE_URL_API + "Balotour/Tour/tourList?off="+OFF_DEFAULT+"&limit="+limit_new+"&keyword="+searchKeyWord+"&tour_type="+checkboxOrder+"&typedate="+checkboxTypeDate;
        let token = await GET_TOKEN();
        axios.get(url_api, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN':JSON.parse(token),
                'LANG-CODE': JSON.parse(GET_LANG_CODE()),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {
            let daaa= tourList.concat(response.data.data.tour_list)
            setTourlist(daaa)
            setLimit(limit_new)

            if (response.data.data.tour_list == '' || response.data.data.tour_list.length < OFF_DEFAULT){
                setSeemore(true)
            }

            console.log(response.data.data)
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    const change_input = (event)=>{
        setSearchKeyWord(event.target.value)
        getTourList(event.target.value,checkboxOrder,checkboxTypeDate)
    }
    const change_type_tour = (type)=>{
        setCheckboxOrder(type)
        getTourList(searchKeyWord,type,checkboxTypeDate)
    }
    const change_type_date = (typeDate)=>{
        setCheckboxTypeDate(typeDate)
        getTourList(searchKeyWord,checkboxOrder,typeDate)

    }
    const getTourList =async (key_work,tour_type,typeDate)=>{
        let url_api = BASE_URL_API + "Balotour/Tour/tourList?off=9&limit=&keyword="+key_work+"&tour_type="+tour_type+"&typedate="+typeDate;
        let token = await GET_TOKEN();
        axios.get(url_api, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN':JSON.parse(token),
                'LANG-CODE': JSON.parse(GET_LANG_CODE()),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {

            setTourlist(response.data.data.tour_list)
            if (response.data.data.tour_list == '' || response.data.data.tour_list.length < OFF_DEFAULT){
                setSeemore(true)
            }else{
                setSeemore(false)
            }
            setLimit(0)
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(()=>{
        props.fetchTourList(9,limit,searchKeyWord,'',checkboxOrder,checkboxTypeDate)
        getLangText()
    },[])



    let tour_list_num_row = props.tourListInfo.data && props.tourListInfo.data.num_row &&   props.tourListInfo.isLoading==false? props.tourListInfo.data.num_row : '';
    let tour_list = props.tourListInfo.data && props.tourListInfo.data &&   props.tourListInfo.isLoading==false? props.tourListInfo.data.tour_list : '';
    let date_type_list = props.tourListInfo.data && props.tourListInfo.data.date_type_list &&   props.tourListInfo.isLoading==false? props.tourListInfo.data.date_type_list : '';
    let paginate = Math.round(tour_list_num_row / OFF_DEFAULT);

    useEffect(() => {
        setTourlist(tour_list)

    }, [tour_list])
    useEffect(()=>{


        if(tour_list_num_row > OFF_DEFAULT){
            setSeemore(false)
        }else{
            setSeemore(true)
        }


    },[tour_list_num_row])

    return (
                <Col lg={9} >
                    <h1 className="py-4 h2 fw-bold heading text-center">Du lịch Miền Bắc</h1>
                    <p>Miền Bắc Việt Nam gồm Tây Bắc, Đông Bắc và đồng bằng Sông Hồng, là cái nôi văn hóa lịch sử hàng ngàn năm của Việt Nam. Thiên nhiên và cảnh đẹp hùng vĩ, 4 mùa xuân hạ thu đông, miền Bắc luôn là điểm hẹn hấp dẫn cho ta trở lại nhiều lần.</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Chúng tôi tìm thấy <span>530</span> tours cho Quý khách.</span>
                        <div className="d-flex align-items-center">
                            <span className="me-2">Sắp xếp theo</span>
                            <Form>
                                <Form.Select aria-label="Default select example">
                                <option>---Tất cả---</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                </Form.Select>
                            </Form>
                        </div>
                    </div>
                            <Row>
                                {tourList ? (tourList.map((item,index) => (
                                <Col lg={4} md={6} className="mt-4" key={index}>
                                    <Card >
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
                                                        <Card.Text className="d-flex align-items-center color-text  ms-2">
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
                                                        Giá: {item.price}đ
                                                    </Card.Text>
                                                </div>
                                            </div>

                                            {/* <Card.Text className='text-decoration-line-through'>Giá: {item.price}đ</Card.Text> */}
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <CiTimer /> <span className="color-text">{item.date_type_name}</span>
                                                </div>
                                                <Card.Text className="ticket p-2 mt-2">
                                                        Giảm {item.discount}%
                                                </Card.Text>
                                            </div>
                                            <div className="d-flex justify-content-between py-2">
                                                <div>
                                                    Số chỗ còn <span className="fw-bold text-danger fs-5">9</span>
                                                </div>

                                                <Link href={"/Tour?id=" + item.id}>
                                                    <Button className="bg-danger border border-0">
                                                        <FaCartPlus /> Đặt ngay
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

                                </Col>
                                ))) : ''}
                            </Row>
                    <Col lg="12">
                        {
                            seeMore == false ?
                                <div className="see-more text-center pb-4 mt-4" onClick={() => getTourmore()}>
                                    <button>Xem tất cả</button>
                                </div>
                                :''
                        }
                    </Col>
                </Col>
    )
}

const mapStateToProps = state => ({
    tourListInfo: state.tourListInfo,

});
export default connect(mapStateToProps, actions)(ListTour);