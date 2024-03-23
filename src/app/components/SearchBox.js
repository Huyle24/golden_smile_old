import {Container, Row, Col, Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import Link from "next/link";
import {
    FaCar,
    FaRegBuilding,
    FaFighterJet,
    FaSearch,
    FaArrowsAltH, FaMinusCircle, FaPlusCircle,
} from "react-icons/fa";
import {FaPlaneDeparture} from "react-icons/fa6";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import {BASE_URL_API, GET_TOKEN, GET_LANG_CODE} from '../../../redux/actions/type';
import {GET_LANG_vi, GET_LANG_ko} from '../../../js/lang';
import moment from 'moment';
import Swal from "sweetalert2";
import dayjs from 'dayjs';
import {useRouter} from "next/navigation";
import {
    Card,
    CardHeader,
    CardBody,
    Collapse,
} from "reactstrap";

function SearchBox(props) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const [openedCollapse, setOpenedCollapse] = React.useState("");
    const [startDate, setStartDate] = useState(null);
    console.log('startDate', startDate)
    const [endDate, setEndDate] = useState(new Date());
    const [value, onChange] = useState(new Date());
    let country_list = props.countryListInfo.data && props.countryListInfo.isLoading === false ? props.countryListInfo.data : '';
    let city_list = props.cityByLocationInfo.data && props.cityByLocationInfo.isLoading === false ? props.cityByLocationInfo.data : '';
    let [tourFilterTmp, setTourFilterTmp] = useState([
        {
            id: 1,
            name: 'Sân golf miền bắc',
            is_click: false,
            item_hd: [
                {
                    id: 1,
                    name: 'Sân golf tân sân nhất',

                },
                {
                    id: 2,
                    name: 'Sân golf tân sân nhất'
                }
            ]
        },
        {
            id: 2,
            name: 'Sân golf miền trung',
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
        },
        {
            id: 3,
            name: 'Sân golf miền Nam',
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
    const [textShow, setTextShow] = useState('');
    const [limit, setLimit] = useState(0)
    const [loadingPage, setLoadingPage] = useState(false)
    const [country, setCountry] = useState('')
    const [counterAdult, setCounterAdult] = useState(1);
    const [counterChild, setCounterChild] = useState(0);
    const [counterRoom, setCounterRoom] = useState(1);
    const [keyWord, setKeyWord] = useState('');
    const router = useRouter()

    // const choose_date_start = (date) => {
    //     let date_start =  new Date(date)
    //     setDateStart(date_start)

    // }
    // const choose_date_end = (date) => {
    //     let date_end =  new Date(date)
    //     setDateEnd(date_end)

    // }
    const tree_view = (index) => {
        tourFilterTmp[index]['is_click'] = !tourFilterTmp[index]['is_click'];
        setTourFilterTmp(tourFilterTmp)
        setLoadingPage(!loadingPage)
    }
    const handelDateStart = (event) => {
        setStartDate(event.target.value)
    }


    const plusNumberAdult = () => {
        let couter_new = parseInt(counterAdult) + 1;
        setCounterAdult(couter_new)
    }

    const minusNumberAdult = () => {
        let couter_new = parseInt(counterAdult) - 1;
        if (couter_new < 1) {
            return false
        }
        setCounterAdult(couter_new)
    }
    const plusNumberChild = () => {
        let couter_new = parseInt(counterChild) + 1;
        setCounterChild(couter_new)
    }

    const minusNumberChild = () => {
        let couter_new = parseInt(counterChild) - 1;
        if (couter_new < 0) {
            return false
        }
        setCounterChild(couter_new)
    }
    const plusNumberRoom = () => {
        let couter_new = parseInt(counterRoom) + 1;
        setCounterRoom(couter_new)
    }

    const minusNumberRoom = () => {
        let couter_new = parseInt(counterRoom) - 1;
        if (couter_new < 1) {
            return false
        }
        setCounterRoom(couter_new)
    }

    const handelCountry = (event) => {
        setCountry(event.target.value)
    }
    const searchKeyWord = (e) => {
        setKeyWord(e.target.value)
    }

    const showHotel = () => {
        if (moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY') < moment(today, "DD-MM-YYYY").format('DD/MM/YYYY')) {

            Toast.fire({
                title: "Chọn sai ngày đi",
                icon: "error"
            })
            return false

        }

        if (moment(dateEnd, "DD-MM-YYYY").format('YYYY-MM-DD') < moment(dateStart, "DD-MM-YYYY").format('YYYY-MM-DD')) {
            Toast.fire({
                title: "Chọn sai ngày về",
                icon: "error"
            })
            return false

        }
        router.push('/stay/list?adult_number=' + counterAdult + '&child_number=' + counterChild + '&room_number=' + counterRoom + '&keyword=' + keyWord + '&date_start=' + moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY') + '&date_end=' + moment(dateEnd, "DD-MM-YYYY").format('DD/MM/YYYY'))
    }


    useEffect(() => {
        setTourFilterTmp(tourFilterTmp)
    }, [loadingPage])

    useEffect(() => {
        getLangText()
    }, [])
    useEffect(() => {
        props.fetchCountryListBalotour()
        props.fetchCitybyLocation('', '', 1)

    }, [])
    let user_data = props.userInfo.data && props.userInfo.isLoading == false ? props.userInfo.data : '';
    const [activeKey, setActiveKey] = useState("link-1");

    // Hàm xử lý khi chọn tab
    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey);
        // Xử lý logic của bạn ở đây dựa trên tab được chọn

    };
    console.log('activeKey', activeKey)
    const getLangText = async () => {
        let lang_code = await GET_LANG_CODE();
        let lang_text = {}
        switch (JSON.parse(lang_code)) {
            case 'vi':
                lang_text = GET_LANG_vi().hotel
                break;
            default:
                lang_text = GET_LANG_ko().hotel
                break;
        }
        setTextShow(lang_text)
    }

    return (
        <>
            <Container className="position-relative">
                <div className="search_box">
                    <Tab.Container id="left-tabs-example" animation={true} defaultActiveKey="link-1">
                        <Form className="trangchu_formsearch">
                            <div className="row tab_filter">
                                <div className="col-md-12">
                                    <Nav className="tab_filter_searchnav" variant="pills" defaultActiveKey="link-1"
                                         onSelect={handleSelect}>
                                        <Nav.Item className="li_searchnav">
                                            <Nav.Link className="search_mucfilter" eventKey="link-1">
                                                <i className='bx bx-home-alt'></i>
                                                <div className="search_content_nav">Tour <br></br> ghép</div>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="li_searchnav">
                                            <Nav.Link className="search_mucfilter" eventKey="link-2">
                                                <i className='bx bxs-building-house'></i>
                                                <div className="search_content_nav">Tour <br></br> Inbound</div>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="li_searchnav">
                                            <Nav.Link className="search_mucfilter" eventKey="link-3">
                                                <i className='bx bx-buildings'></i>
                                                <div className="search_content_nav">Tour <br></br> Outbound</div>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="li_searchnav">
                                            <Nav.Link className="search_mucfilter" eventKey="link-4">
                                                <i className='bx bxs-building'></i>
                                                <div className="search_content_nav">Tour <br></br> Trekking</div>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>

                            <Tab.Content>
                                <div className="form_filter">
                                    <div className="container">
                                        <div className="forminfo_filter">
                                            <div className="col choose_input_tour">
                                                <label className="search_label">Điểm khởi hành</label>
                                                <Form.Select aria-label="Tất cả"
                                                             className="form_location_filter form-control"
                                                             onChange={handelCountry}>
                                                    <option>Tất cả</option>
                                                    {country_list && country_list.map((item, index) => (
                                                        <option value={item.id}>{item.name}</option>

                                                    ))}
                                                </Form.Select>
                                            </div>
                                            <div className="col choose_input_tour">
                                                <label className="search_label">Điểm đến</label>
                                                <Form.Select aria-label="Tất cả"
                                                             className="form_location_filter form-control">
                                                    <option>Tất cả</option>
                                                    {country_list && country_list.map((item, index) => (
                                                        <option value={item.id}>{item.name}</option>

                                                    ))}
                                                </Form.Select>
                                            </div>
                                            <div className="col choose_input_tour">
                                                <label className="search_label">Ngày khởi hành </label>
                                                <Form.Control
                                                    type="date"
                                                    id="inputPassword5"
                                                    aria-describedby="passwordHelpBlock"
                                                    className=""
                                                    onChange={handelDateStart}
                                                />
                                            </div>

                                            <div className="col choose_input_tour">
                                                <Link
                                                    href={"./Category?country=" + country + "&dateStart=" + startDate + "&formatTour=" + (activeKey === "link-2" ? 0 : activeKey === "link-3" ? 1 : '') + "&type_tourism_id=" + (activeKey === "link-4" ? 5 : '')}>
                                                    <Button className="btn_search_find">
                                                        Tìm Kiếm
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Tab.Content>
                        </Form>
                    </Tab.Container>
                </div>

                <form action="https://goldensmiletravel.com/search"
                      className="heritage-search heritage-search-mobile d-lg-none z-index-2 position-relative bg-white rounded mx-md-10">
                    <Col className=" ml-auto" md="12">
                        <div className=" accordion my-3" id="accordionExample">
                            <Card>
                                <CardHeader
                                    id="headingOne"
                                    aria-expanded={openedCollapse === "collapseOne"}
                                >

                                    <div className="form-group mb-0 position-relative">
                                        <a onClick={() =>
                                            setOpenedCollapse(
                                                openedCollapse === "collapseOne"
                                                    ? ""
                                                    : "collapseOne"
                                            )
                                        }
                                           className={`text-secondary bos-fited-left-center btn ${openedCollapse ? 'improve-search' : ''} shadow-none pr-3 pl-0 position-absolute py-0 h-100 border-right`}>
                                        </a>
                                        <input type="text" name="search" placeholder="Nhập tên tour..."
                                               className="form-control form-control-lg border shadow-none pr-9 pl-11 bg-white placeholder-muted"/>
                                        <Button type="submit"
                                                className="position-absolute bos-fited-right-center p-0 text-heading fs-20 px-3 shadow-none h-100 border-left">
                                            <i class='bx bx-search'></i>
                                        </Button>
                                        {" "}
                                    </div>
                                </CardHeader>
                                <Collapse
                                    isOpen={openedCollapse === "collapseOne"}
                                    aria-labelledby="headingOne"
                                    data-parent="#accordionExample"
                                    id="collapseOne"
                                >
                                    <CardBody className=" opacity-8">
                                        <div className="row mx-n2">
                                            <div className="col-sm-6 pt-4 px-2"><select title="Điểm khởi hành"
                                                                                        data-style="btn-lg py-2 h-52 bg-transparent"
                                                                                        name="where_from"
                                                                                        id="option_location_from"
                                                                                        className="form-control border shadow-none form-control-lg select2 bg-transparent">
                                                <option value="">Tất cả Điểm khởi hành</option>
                                            </select></div>
                                            <div className="col-sm-6 pt-4 px-2"><select name="where_to" title="Điểm đến"
                                                                                        data-style="btn-lg py-2 h-52 bg-transparent"
                                                                                        id="option_location_to"
                                                                                        className="form-control border shadow-none form-control-lg select2 bg-transparent">
                                                <option value="">Tất cả Điểm đến</option>
                                            </select></div>
                                            <div className="col-sm-6 pt-4 px-2"><input type="text" autocomplete="off"
                                                                                       name="begin_date"
                                                                                       placeholder="Ngày khởi hành"
                                                                                       className="form-control border shadow-none form-control-lg selectpicker bg-transparent"/>
                                            </div>

                                        </div>
                                    </CardBody>
                                </Collapse>
                            </Card>
                        </div>
                    </Col>
                </form>
            </Container>
        </>
    );
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    countryListInfo: state.countryListInfo,
    cityByLocationInfo: state.cityByLocationInfo
});
export default connect(mapStateToProps, actions)(SearchBox);