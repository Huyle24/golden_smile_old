import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {
    FaCar,
    FaRegBuilding,
    FaFighterJet,
    FaSearch,
    FaArrowsAltH, FaMinusCircle, FaPlusCircle,
} from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa6";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE } from '../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../js/lang';
import moment from 'moment';
import Swal from "sweetalert2";
import dayjs from 'dayjs';
import {useRouter} from "next/navigation";

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

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(new Date());
    const [value, onChange] = useState(new Date());

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



    const searchKeyWord = (e) => {
        setKeyWord(e.target.value)
    }

    const showHotel = () => {
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
        router.push('/stay/list?adult_number=' + counterAdult + '&child_number=' + counterChild + '&room_number='+ counterRoom + '&keyword='+ keyWord + '&date_start=' +moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY') + '&date_end=' + moment(dateEnd, "DD-MM-YYYY").format('DD/MM/YYYY'))
    }


    useEffect(() => {
        setTourFilterTmp(tourFilterTmp)
    }, [loadingPage])

    useEffect(() => {
        getLangText()
    }, [])

    let user_data = props.userInfo.data && props.userInfo.isLoading == false ? props.userInfo.data : '';

    const getLangText = async () => {
        let lang_code = await GET_LANG_CODE();
        let lang_text ={}
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
    <Container className="position-relative">
      <div className="search_box">
        <Tab.Container id="left-tabs-example" animation={true} defaultActiveKey="link-1">
         <Form className="trangchu_formsearch">
            <div className="row tab_filter">
                <div className="col-md-12">
                  <Nav className="tab_filter_searchnav"
                         variant="pills" defaultActiveKey="link-1"
                  >
                    <Nav.Item className="li_searchnav">
                      <Nav.Link className="search_mucfilter" eventKey="link-1">
                      <i class='bx bx-home-alt' ></i>
                        <div className="search_content_nav">Tour <br></br> trong nước</div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="li_searchnav">
                      <Nav.Link className="search_mucfilter" eventKey="link-2">
                        <i class='bx bxs-building-house' ></i>
                        <div className="search_content_nav">Tour <br></br> nước ngoài</div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="li_searchnav">
                      <Nav.Link className="search_mucfilter" eventKey="link-3"> 
                        <i class='bx bx-buildings' ></i>
                        <div className="search_content_nav">Tour <br></br> TREKKING</div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="li_searchnav">
                      <Nav.Link className="search_mucfilter" eventKey="link-4">
                        <i class='bx bxs-building' ></i>
                        <div className="search_content_nav">Tour <br></br> theo yêu cầu</div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
            </div>

            <Tab.Content>
                <Tab.Pane eventKey="link-1">
                <div className="form_filter">
                    <div className="forminfo_filter">
                        <div className="col choose_input_tour">
                            <label className="search_label">Điểm khởi hành</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                <option value="Nhật bản">Nhật bản</option>
                                <option value="Mỹ">Mỹ</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Điểm đến</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="Spa">Spa</option>
                                <option value="Vương Quốc Anh">Vương Quốc Anh</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Ngày khởi hành </label>
                            <DatePicker  className="form_location_filter form-control"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={new Date()}
                                disabledKeyboardNavigation
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Khoảng giá</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Từ 8 triệu trở lên">Từ 8 triệu trở lên</option>
                                <option value="Từ 4 triệu đến 8 triệu">Từ 4 triệu đến 8 triệu</option>
                                <option value="Dưới 4 triệu">Dưới 4 triệu</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                                <Button className="btn_search_find">Tìm Kiếm</Button>{' '}
                        </div>
                    </div>
                </div>
                </Tab.Pane>

                <Tab.Pane eventKey="link-2">
                <div className="form_filter">
                    <div className="forminfo_filter">
                        <div className="col choose_input_tour">
                            <label className="search_label">Điểm khởi hành</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                <option value="Nhật bản">Nhật bản</option>
                                <option value="Mỹ">Mỹ</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Điểm đến</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="Spa">Spa</option>
                                <option value="Vương Quốc Anh">Vương Quốc Anh</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Ngày khởi hành </label>
                            <DatePicker  className="form_location_filter form-control"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={new Date()}
                                disabledKeyboardNavigation
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Khoảng giá</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Từ 8 triệu trở lên">Từ 8 triệu trở lên</option>
                                <option value="Từ 4 triệu đến 8 triệu">Từ 4 triệu đến 8 triệu</option>
                                <option value="Dưới 4 triệu">Dưới 4 triệu</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                                <Button className="btn_search_find">Tìm Kiếm</Button>{' '}
                        </div>
                    </div>
                </div>
                </Tab.Pane>

                <Tab.Pane eventKey="link-3">
                <div className="form_filter">
                    <div className="forminfo_filter">
                        <div className="col choose_input_tour">
                            <label className="search_label">Điểm khởi hành</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                <option value="Nhật bản">Nhật bản</option>
                                <option value="Mỹ">Mỹ</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Điểm đến</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="Spa">Spa</option>
                                <option value="Vương Quốc Anh">Vương Quốc Anh</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Ngày khởi hành </label>
                            <DatePicker  className="form_location_filter form-control"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={new Date()}
                                disabledKeyboardNavigation
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Khoảng giá</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Từ 8 triệu trở lên">Từ 8 triệu trở lên</option>
                                <option value="Từ 4 triệu đến 8 triệu">Từ 4 triệu đến 8 triệu</option>
                                <option value="Dưới 4 triệu">Dưới 4 triệu</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                                <Button className="btn_search_find">Tìm Kiếm</Button>{' '}
                        </div>
                    </div>
                </div>
                </Tab.Pane>

                <Tab.Pane eventKey="link-4">
                <div className="form_filter">
                    <div className="forminfo_filter">
                        <div className="col choose_input_tour">
                            <label className="search_label">Điểm khởi hành</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                <option value="Nhật bản">Nhật bản</option>
                                <option value="Mỹ">Mỹ</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Điểm đến</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="Spa">Spa</option>
                                <option value="Vương Quốc Anh">Vương Quốc Anh</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Ngày khởi hành </label>
                            <DatePicker  className="form_location_filter form-control"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={new Date()}
                                disabledKeyboardNavigation
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>
                        <div className="col choose_input_tour">
                            <label className="search_label">Khoảng giá</label>
                            <Form.Select aria-label="Tất cả" className="form_location_filter form-control">
                                <option>Tất cả</option>
                                <option value="Từ 8 triệu trở lên">Từ 8 triệu trở lên</option>
                                <option value="Từ 4 triệu đến 8 triệu">Từ 4 triệu đến 8 triệu</option>
                                <option value="Dưới 4 triệu">Dưới 4 triệu</option>
                            </Form.Select>
                        </div>
                        <div className="col choose_input_tour">
                                <Button className="btn_search_find">Tìm Kiếm</Button>{' '}
                        </div>
                    </div>
                </div>
                </Tab.Pane>
            </Tab.Content>
         </Form>
        </Tab.Container>
      </div>
      
    </Container>
  );
}
const mapStateToProps = state => ({
    userInfo: state.userInfo,

});
export default connect(mapStateToProps, actions)(SearchBox);