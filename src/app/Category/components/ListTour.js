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

const ITEMS_PER_PAGE = 6;

function ListTour(props) {
    const [value, onChange] = useState(new Date());
    const [textShow, setTextShow] = useState('');
    const searchParams = useSearchParams()
    const formatTourParam = searchParams.get('formatTour');
    const countryParam = searchParams.get('country');
    const dateStartParam = searchParams.get('dateStart');
    const typeTourismParam = searchParams.get('type_tourism_id');
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
    const [currentPage, setCurrentPage] = useState(1);
    let list_tour = props.jointTourListInfo.data && props.jointTourListInfo.isLoading === false ? props.jointTourListInfo.data.tour_list : '';
    let FilterValues = props.updateFilterValuesInfo.FilterValues ? props.updateFilterValuesInfo.FilterValues : '';
    let country_list = props.countryListInfo.data && props.countryListInfo.isLoading === false ? props.countryListInfo.data : '';

    const totalPages = list_tour ? (Math.ceil(list_tour.length / ITEMS_PER_PAGE)) : '';

    console.log('countryParam', countryParam)
    // Lấy index của item đầu tiên trên trang hiện tại
    const indexOfFirstItem = (currentPage - 1) * ITEMS_PER_PAGE;

    // Lấy danh sách items của trang hiện tại
    const currentItems = list_tour ? list_tour.slice(indexOfFirstItem, indexOfFirstItem + ITEMS_PER_PAGE) : '';

    // Hàm xử lý khi chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    console.log('FilterValues', FilterValues);
    console.log('list_tour', list_tour)
    useEffect(() => {

        props.fetchCountryListBalotour()

    }, [])

    useEffect(() => {
        console.log('nguyen1')
        props.fetchJointTourList('', '', '', 30, FilterValues.countryStart, '', FilterValues.cityStart, '', FilterValues.dateStart, FilterValues.dateEnd, '', '', FilterValues.dateType, FilterValues.formatTour, FilterValues.typeTourism);
    }, [FilterValues])

    // useEffect(() => {
    //     console.log('nguyen2')
    //     props.fetchJointTourList('', '', '', 30, countryParam ? countryParam : '', '', '', '', dateStartParam ? dateStartParam : '', ' ', '', '', '', formatTourParam ? formatTourParam : '', typeTourismParam ? typeTourismParam : '');
    // }, [searchParams])


    return (
        <Col lg={9}>
            <Row>
                {currentItems ? (currentItems.map((item, index) => (
                    <Col md={4} className={'mt-2'}>
                        <Card>
                            <Card className="position-relative border border-0 header_tour_img">
                                <Link href={"/Tour?tour_type=2" + "&permalink=" + item.permalink}
                                      onClick={() => Product_watched(item)}>
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

            {country_list && countryParam && country_list.filter(item => item.id === countryParam)[0].description && (
                <Row>
                    <Card>
                        <Card.Body>
                            {country_list && countryParam ? country_list.filter(item => item.id === countryParam).map((item, index) => (
                                <span dangerouslySetInnerHTML={{__html: item.description}}></span>)) : ''}

                        </Card.Body>
                    </Card>
                </Row>
            )
            }
            <div className={'d-flex justify-content-center mt-2'}>
                <nav>
                    <ul className="pagination">
                        {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button className="page-link " onClick={() => handlePageChange(page)}>
                                    {page}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

            </div>

        </Col>
    )
}

const mapStateToProps = state => ({

    jointTourListInfo: state.jointTourListInfo,
    countryListInfo: state.countryListInfo,
    updateFilterValuesInfo: state.updateFilterValuesInfo
});
export default connect(mapStateToProps, actions)(ListTour);