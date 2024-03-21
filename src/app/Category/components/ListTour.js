import {Container, Row, Col, Form, Card} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {FaTicketAlt, FaPlusCircle, FaArrowRight, FaCartPlus, FaRegHeart, FaCalendarAlt} from 'react-icons/fa';
import Paginate from "./Paginate";
import Link from "next/link";
import * as actionType from "../../../../redux/actions/type";
import * as actions from "../../../../redux/actions";
import {BASE_URL_API, GET_TOKEN, GET_LANG_CODE} from '../../../../redux/actions/type';
import {GET_LANG_vi, GET_LANG_ko} from '../../../../js/lang';
import axios from "axios";
import {useState, useEffect} from "react";
import {connect} from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import {CiBarcode, CiLocationOn, CiTimer} from "react-icons/ci";
import {SwiperSlide} from "swiper/react";
import {BsPeople} from "react-icons/bs";
import {fetchCountryList, fetchCountryListBalotour} from "../../../../redux/actions";
import {useSearchParams} from "next/navigation";

const OFF_DEFAULT = 9;

function ListTour(props) {
    const [value, onChange] = useState(new Date());
    const [textShow, setTextShow] = useState('');
    const searchParams = useSearchParams()
    const formatTourParam = searchParams.get('formatTour');
    const countryParam = searchParams.get('country');
    const dateStartParam = searchParams.get('dateStart');
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
                            id: 1,
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
    const [tour_list, setTourlist] = useState([])
    const [seeMore, setSeemore] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [searchKeyWord, setSearchKeyWord] = useState('')
    const [checkboxOrder, setCheckboxOrder] = useState('');
    let list_tour = props.jointTourListInfo.data && props.jointTourListInfo.isLoading === false ? props.jointTourListInfo.data.tour_list : '';
    let FilterValues = props.updateFilterValuesInfo.FilterValues ? props.updateFilterValuesInfo.FilterValues : '';


    console.log('FilterValues', FilterValues);
    console.log('list_tour', list_tour)
    useEffect(() => {

        props.fetchCountryListBalotour()

    }, [])

    useEffect(() => {
        console.log('nguyen1')
        props.fetchJointTourList('', '', '', 30, FilterValues.countryStart, '', FilterValues.cityStart, '',  FilterValues.dateStart,  FilterValues.dateEnd, '', '',FilterValues.dateType, FilterValues.formatTour, FilterValues.typeTourism);
        }, [FilterValues])

    useEffect(() => {
        console.log('nguyen2')
        props.fetchJointTourList('', '', '', 30, countryParam?countryParam:'', '', '', '',  dateStartParam?dateStartParam:'',' ', '', '','', formatTourParam ?formatTourParam:'','' );
    }, [searchParams])

    // useEffect(() => {
    //     props.fetchJointTourList('', '', '', '', '', '', '', '', 1)
    // }, [])

    // const [checkboxTypeDate, setCheckboxTypeDate] = useState('');
    // const [allshow, allsetShow] = useState(false);
    // const allhandleClose = () => allsetShow(false);
    // const allhandleShow = () => allsetShow(true);
    //
    // const getLangText = async () => {
    //     let lang_code = await GET_LANG_CODE();
    //     let lang_text ={}
    //     switch (JSON.parse(lang_code)) {
    //         case 'vi':
    //             lang_text = GET_LANG_vi().tour
    //             break;
    //         default:
    //             lang_text = GET_LANG_ko().tour
    //             break;
    //     }
    //     setTextShow(lang_text)
    // }
    //
    // const tree_view = (index) => {
    //     tourFilterTmp[index]['is_click'] = !tourFilterTmp[index]['is_click'];
    //     setTourFilterTmp(tourFilterTmp)
    //     setLoadingPage(!loadingPage)
    // }
    // const getTourmore =async ()=>{
    //     let limit_new = limit + OFF_DEFAULT
    //     let url_api = BASE_URL_API + "Balotour/Tour/tourList?off="+OFF_DEFAULT+"&limit="+limit_new+"&keyword="+searchKeyWord+"&tour_type="+checkboxOrder+"&typedate="+checkboxTypeDate;
    //     let token = await GET_TOKEN();
    //     axios.get(url_api, {
    //         headers: {
    //             "x-api-key": "api_key",
    //             'USER-TOKEN':JSON.parse(token),
    //             'LANG-CODE': JSON.parse(GET_LANG_CODE()),
    //             "Content-Type": "multipart/form-data"
    //         }
    //     }).then(async function (response) {
    //         let daaa= tourList.concat(response.data.data.tour_list)
    //         setTourlist(daaa)
    //         setLimit(limit_new)
    //
    //         if (response.data.data.tour_list == '' || response.data.data.tour_list.length < OFF_DEFAULT){
    //             setSeemore(true)
    //         }
    //
    //         console.log(response.data.data)
    //     })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    // const change_input = (event)=>{
    //     setSearchKeyWord(event.target.value)
    //     getTourList(event.target.value,checkboxOrder,checkboxTypeDate)
    // }
    // const change_type_tour = (type)=>{
    //     setCheckboxOrder(type)
    //     getTourList(searchKeyWord,type,checkboxTypeDate)
    // }
    // const change_type_date = (typeDate)=>{
    //     setCheckboxTypeDate(typeDate)
    //     getTourList(searchKeyWord,checkboxOrder,typeDate)
    //
    // }
    // const getTourList =async (key_work,tour_type,typeDate)=>{
    //     let url_api = BASE_URL_API + "Balotour/Tour/tourList?off=9&limit=&keyword="+key_work+"&tour_type="+tour_type+"&typedate="+typeDate;
    //
    //     let token = await GET_TOKEN();
    //     axios.get(url_api, {
    //         headers: {
    //             "x-api-key": "api_key",
    //             'USER-TOKEN':JSON.parse(token),
    //             'LANG-CODE': JSON.parse(GET_LANG_CODE()),
    //             "Content-Type": "multipart/form-data"
    //         }
    //     }).then(async function (response) {
    //
    //         setTourlist(response.data.data.tour_list)
    //         if (response.data.data.tour_list == '' || response.data.data.tour_list.length < OFF_DEFAULT){
    //             setSeemore(true)
    //         }else{
    //             setSeemore(false)
    //         }
    //         setLimit(0)
    //     })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    // useEffect(()=>{
    //     props.fetchTourList(9,limit,searchKeyWord,'',checkboxOrder,checkboxTypeDate)
    //     getLangText()
    // },[])


    // let paginate = Math.round(tour_list_num_row / OFF_DEFAULT);

    // useEffect(() => {
    //     setTourlist(tour_list)
    //
    // }, [tour_list])
    // useEffect(()=>{
    //
    //
    //     if(tour_list_num_row > OFF_DEFAULT){
    //         setSeemore(false)
    //     }else{
    //         setSeemore(true)
    //     }
    //
    //
    // },[tour_list_num_row])

    return (
        <Col lg={9}>
            {/*<h1 className="py-4 h2 fw-bold heading text-center">Du lịch Miền Bắc</h1>*/}
            {/*<p>Miền Bắc Việt Nam gồm Tây Bắc, Đông Bắc và đồng bằng Sông Hồng, là cái nôi văn hóa lịch sử hàng ngàn năm*/}
            {/*    của Việt Nam. Thiên nhiên và cảnh đẹp hùng vĩ, 4 mùa xuân hạ thu đông, miền Bắc luôn là điểm hẹn hấp dẫn*/}
            {/*    cho ta trở lại nhiều lần.</p>*/}
            {/*<div className="d-flex justify-content-between align-items-center">*/}
            {/*    <span>Chúng tôi tìm thấy <span>530</span> tours cho Quý khách.</span>*/}
            {/*    <div className="d-flex align-items-center">*/}
            {/*        <span className="me-2">Sắp xếp theo</span>*/}
            {/*        <Form>*/}
            {/*            <Form.Select aria-label="Default select example">*/}
            {/*                <option>---Tất cả---</option>*/}
            {/*                <option value="1">One</option>*/}
            {/*                <option value="2">Two</option>*/}
            {/*                <option value="3">Three</option>*/}
            {/*            </Form.Select>*/}
            {/*        </Form>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Row>
                {list_tour ? (list_tour.map((item, index) => (
                    <Col md={4} className={'mt-2'}>

                        <Card>
                            <Card className="position-relative border border-0 header_tour_img">
                                <Link  href={"/Tour?tour_type=2" + "&permalink=" + item.permalink} onClick={() => Product_watched(item)}>
                                    <Card.Img
                                        variant="top"
                                        src={item.bucket_img ? item.bucket_img : 'https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png'}
                                        // src={`${BASE_URL}upload/tour/${item.img}`}
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
                                <Link
                                    href={"/Tour?tour_type=2" + "&permalink=" + item.permalink}
                                    onClick={() => Product_watched(item)}>
                                    <Card.Title className="card_title_tour " style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }} data-bs-toggle="tooltip" data-bs-placement="top" title={item.name}>
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
                                            <Link
                                                href={'/OrderTour?tour_open_id=' + item1.id}>
                                                    <span
                                                        key={index1}
                                                        className="px-2 py-1 item_day_tour fw-bold">{item1.date_start_tour.slice(0, 5)}</span>
                                            </Link>
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
                                        <Link
                                            href={"/Tour?tour_type=2" + "&permalink=" + item.permalink}
                                            onClick={() => Product_watched(item)}
                                            className={'d-flex align-content-center flex-wrap'}>
                                            <button className="button-detail btn ">
                                                Xem chi tiết
                                            </button>
                                        </Link>

                                    </div>


                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                ))) : ''}
            </Row>
            {/*<Col lg="12">*/}
            {/*    {*/}
            {/*        seeMore == false ?*/}
            {/*            <div className="see-more text-center pb-4 mt-4" onClick={() => getTourmore()}>*/}
            {/*                <button>Xem tất cả</button>*/}
            {/*            </div>*/}
            {/*            : ''*/}
            {/*    }*/}
            {/*</Col>*/}
        </Col>
    )
}

const mapStateToProps = state => ({

    jointTourListInfo: state.jointTourListInfo,
    countryListInfo: state.countryListInfo,
    updateFilterValuesInfo: state.updateFilterValuesInfo
});
export default connect(mapStateToProps, actions)(ListTour);