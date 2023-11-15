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

    const [today, setToday] = useState(new Date());
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date(moment(dateStart, "DD-MM-YYYY").add(1, 'days')));

    const [limit, setLimit] = useState(0)
    const [loadingPage, setLoadingPage] = useState(false)

    const [counterAdult, setCounterAdult] = useState(1);
    const [counterChild, setCounterChild] = useState(0);
    const [counterRoom, setCounterRoom] = useState(1);
    const [keyWord, setKeyWord] = useState('');
    const router = useRouter()

    const choose_date_start = (date) => {
        let date_start =  new Date(date)
        setDateStart(date_start)

    }
    const choose_date_end = (date) => {
        let date_end =  new Date(date)
        setDateEnd(date_end)

    }
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

        // router.push({
        //     pathname: '/stay/list',
        //     query: {
        //         adult_number : counterAdult,
        //         child_number : counterChild,
        //         room_number  : counterRoom,
        //         keyword      : keyWord ,
        //         date_start   : moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY'),
        //         date_end     : moment(dateEnd, "DD-MM-YYYY").format('DD/MM/YYYY') ,
        //
        //
        //     },
        // })

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
        <Tab.Container id="left-tabs-example" defaultActiveKey="link-1">
          <Nav
            variant="tabs"
            defaultActiveKey="link-1"
            className="searchbox_nav_tabs"
          >
            <Nav.Item className="nav_item_search">
              <Nav.Link
                eventKey="link-1"
                className="d-flex flex-column align-items-center nav_link_search "
              >
                <FaCar className="mb-2 icon_detail_tour" />
                <p className="fw-bold text-center" style={{ maxWidth: '110px' }}>Tour du lịch trọn gói</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav_item_search">
              <Nav.Link
                eventKey="link-2"
                className="d-flex flex-column align-items-center nav_link_search "
              >
                <FaRegBuilding className="mb-2 icon_detail_tour" />
                <p className="fw-bold text-center search_box_height_title">Khách sạn</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav_item_search">
              <Nav.Link
                eventKey="link-3"
                className="d-flex flex-column align-items-center nav_link_search "
              >
                <FaPlaneDeparture className="mb-2 icon_detail_tour" />
                <p className="fw-bold text-center search_box_height_title">Vé máy bay</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav_item_search ">
              <Nav.Link
                eventKey="link-6"
                className="d-flex flex-column align-items-center nav_link_search "
              >
                <FaSearch className="mb-2 icon_detail_tour" />
                <p className="fw-bold text-center search_box_height_title">Tra cứu booking</p>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="bg-white p-4 searchbox_content">
            <Tab.Pane eventKey="link-1">
              <Tab.Container defaultActiveKey="link-2-1">
                <Nav variant="pills" defaultActiveKey="link-2-1" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="link-2-1">Du lịch trong nước</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2-2">Du lịch nước ngoài</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="link-2-1">
                    <Tab.Container defaultActiveKey="link-2-1-1">
                      <Nav variant="tabs" defaultActiveKey="link-2-1-1">
                        <Nav.Item>
                          <Nav.Link eventKey="link-2-1-1">Tour trọn gói</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="link-2-2-2">
                            Dịch vụ điểm đến
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content className="pt-4">
                        <Tab.Pane eventKey="link-2-1-1">
                          <Row>
                            <Col lg="6" className="d-flex">
                              <Form.Select className="max-height-content form-search mb-3">
                                <option>Điểm đi</option>
                              </Form.Select>
                              <FaArrowsAltH className="icon_arrow" />
                              <Form.Select className="max-height-content form-search mb-3">
                                <option>Điểm đến</option>min
                              </Form.Select>
                            </Col>
                            <Col lg="3">
                              <Form.Control
                                type="date"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                className="input_date form-search mb-3"
                              />
                            </Col>
                            <Col lg="2">
                              <Form.Select className="input_select_num_date form-search mb-3">
                                <option>Số ngày</option>
                              </Form.Select>
                            </Col>
                            <Col lg="1">
                              <Button className="btn_submit mb-3">
                                <FaSearch />
                              </Button>
                            </Col>
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="link-2-2-2">
                          <Row>
                            <Col lg="4">
                                <Form.Select className="max-height-content form-search mb-3">
                                    <option>Điểm đến</option>
                                </Form.Select>
                            </Col>
                            <Col lg="4">
                              <Form.Control
                                type="date"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                className="input_date form-search mb-3"
                              />
                            </Col>
                            <Col lg="4">
                              <Button className="btn_submit mb-3">
                                <FaSearch />
                              </Button>
                            </Col>
                          </Row>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="link-2-2">
                    <Row>
                      <Col lg="6" className="d-flex">
                        <Form.Select className="max-height-content form-search mb-3">
                          <option>Điểm đến</option>
                        </Form.Select>
                        <FaArrowsAltH className="icon_arrow" />
                        <Form.Select className="max-height-content form-search mb-3">
                          <option>Ngày đi</option>
                        </Form.Select>
                      </Col>
                      <Col lg="3">
                        <Form.Control
                          type="date"
                          id="inputPassword5"
                          aria-describedby="passwordHelpBlock"
                          className="input_date form-search mb-3"
                        />
                      </Col>
                      <Col lg="2">
                        <Form.Select className="input_select_num_date form-search mb-3">
                          <option>Số ngày</option>
                        </Form.Select>
                      </Col>
                      <Col lg="1">
                        <Button className="btn_submit mb-3">
                          <FaSearch />
                        </Button>
                      </Col>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
              <Row>
                <p className="color_blue fw-bold">Khách sạn</p>
                <Col lg="4 mb-3">
                    <Form.Label htmlFor="location">Điểm đến hoặc tên khách sạn</Form.Label>
                    <Form.Control
                        type="text"
                        className="input_date form-search"
                        id="location"
                        onChange={(e) => searchKeyWord(e)}
                    />
                </Col>

                <Col lg="4">
                    <div className="d-flex flex-column">
                        <span className="mb-2">Ngày nhận phòng</span>
                        <DatePicker className="form-control form-search" dateFormat="dd/MM/y"   selected={dateStart} onChange={(date) => choose_date_start(date)} />
                    </div>
                </Col>
                <Col lg="4">
                    <div className="d-flex flex-column">
                        <span className="mb-2">Ngày trả phòng</span>
                        <DatePicker className="form-control form-search" dateFormat="dd/MM/y" selected={dateEnd}  onChange={(date) => choose_date_end(date)} />
                    </div>
                </Col>
                <Col lg="4 mb-3">
                    <NavDropdown
                        id="numberPerson"
                        title={<span>{counterAdult} {textShow ? textShow.Adult : ''}, {counterChild} {textShow ? textShow.Children : ''} </span>}
                        className="form-search form-control"
                    >
                        <div className="p-2">
                            <span>Số người tham gia</span>
                            <div>
                                <span>Người lớn</span>
                                <div className="icon_change">
                                    <FaMinusCircle onClick={() => minusNumberAdult()}/>
                                    <span className="mx-3">{counterAdult}</span>
                                    <FaPlusCircle onClick={() => plusNumberAdult()}/>
                                </div>
                            </div>
                            <div>
                                <span>Trẻ em ( 2 - 11 )</span>
                                <div className="icon_change">
                                    <FaMinusCircle onClick={() => minusNumberChild()}/>
                                    <span className="mx-3">{counterChild}</span>
                                    <FaPlusCircle onClick={() => plusNumberChild()}/>
                                </div>
                            </div>
                        </div>
                    </NavDropdown>
                </Col>
                <Col lg="4 mb-3">

                    <NavDropdown
                        title={<span>{counterRoom} {textShow ? textShow.Number_Of_Room : ''}</span>}
                        className="form-search form-control"
                    >
                        <div>
                            <div className="p-2">
                                <span>Số phòng</span>
                            </div>
                            <div>
                                <div className="icon_change text-center">
                                    <FaMinusCircle onClick={() => minusNumberRoom()}/>
                                    <span className="mx-3">{counterRoom}</span>
                                    <FaPlusCircle onClick={() => plusNumberRoom()}/>
                                </div>
                            </div>
                        </div>
                    </NavDropdown>
                </Col>
                <Col lg="4">
                      <Button className="btn_submit" onClick={() => showHotel()}>
                          <FaSearch />
                      </Button>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
              <Tab.Container defaultActiveKey="link-3-1">
                  <Nav variant="pills" defaultActiveKey="link-3-1" className="mb-3">
                      <Nav.Item>
                      <Nav.Link eventKey="link-3-1">Một chiều</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                      <Nav.Link eventKey="link-3-2">Khứ hồi</Nav.Link>
                      </Nav.Item>
                  </Nav>
                  <Tab.Content defaultActiveKey="link-3-1">
                      <Tab.Pane eventKey="link-3-1">
                          <Row>
                              <p>Máy bay</p>
                              <Col lg="4 mb-3">
                                  <Form.Select className="input_select_num_date form-search form-search">
                                      <option>Điểm đi</option>
                                  </Form.Select>
                              </Col>
                              <Col lg="4 mb-3">
                                  <Form.Select className="input_select_num_date form-search">
                                      <option>Điểm đến</option>
                                  </Form.Select>
                              </Col>
                              <Col lg="4 mb-3">
                                  <Form.Control
                                  type="date"
                                  id="inputPassword5"
                                  aria-describedby="passwordHelpBlock"
                                  className="input_date form-search"
                                  />
                              </Col>
                              <Col lg="4 mb-3">
                                  <Form.Select className="input_select_num_date form-search">
                                      <option>Số người</option>
                                  </Form.Select>
                              </Col>
                              <Col lg="4 mb-3">
                                  <Form.Select className="input_select_num_date form-search">
                                      <option>Hãng bay</option>
                                  </Form.Select>
                              </Col>
                              <Col lg="4">
                                      <Button className="btn_submit">
                                          <FaSearch />
                                      </Button>
                              </Col>
                          </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="link-3-2">
                          <Row>
                              <p>Máy bay</p>
                              <Col lg="4 mb-3">
                                  <Form.Select className="input_select_num_date form-search">
                                      <option>Điểm đi</option>
                                  </Form.Select>
                              </Col>
                              <Col lg="4 mb-3">
                                  <Form.Select className="input_select_num_date form-search">
                                      <option>Điểm đến</option>
                                  </Form.Select>
                              </Col>
                              <Col lg="4 mb-3">
                                  <Form.Control
                                      type="date"
                                      id="inputPassword5"
                                      aria-describedby="passwordHelpBlock"
                                      className="input_date form-search"
                                  />
                              </Col>
                              <Col lg="4 mb-3">
                                  <Form.Select className="input_select_num_date form-search">
                                      <option>Số người</option>
                                  </Form.Select>
                              </Col>
                              <Col lg="4 mb-3">
                                  <Form.Select className="input_select_num_date form-search">
                                      <option>Chuyến bay</option>
                                  </Form.Select>
                              </Col>
                              <Col lg="4">
                                      <Button className="btn_submit">
                                          <FaSearch />
                                      </Button>
                              </Col>
                          </Row>
                      </Tab.Pane>
                  </Tab.Content>
              </Tab.Container>
            </Tab.Pane>
            {/*<Tab.Pane eventKey="link-4">Four tab content</Tab.Pane>*/}
            {/*<Tab.Pane eventKey="link-5">Five tab content</Tab.Pane>*/}
            <Tab.Pane eventKey="link-6">
              
            <Tab.Container defaultActiveKey="link-6-1">
                  <Nav variant="pills" defaultActiveKey="link-6-1" className="mb-3">
                      <Nav.Item>
                      <Nav.Link eventKey="link-6-1">Vui lòng nhập mã booking của bạn</Nav.Link>
                      </Nav.Item>
                  </Nav>
                  <Tab.Content defaultActiveKey="link-6-1">
                      <Tab.Pane eventKey="link-6-1">
                          <Row>
                              <Col lg="9 mb-3">
                                  <Form.Control
                                  type="text"
                                  id="inputPassword5"
                                  aria-describedby="passwordHelpBlock"
                                  className="input_date form-search"
                                  />
                              </Col>
                              <Col lg="3">
                                      <Button className="btn_submit">
                                          <FaSearch />
                                      </Button>
                              </Col>
                          </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="link-6-2">
                          <Row>
                              <Col lg="9 mb-3">
                                  <Form.Control
                                  type="text"
                                  id="inputPassword5"
                                  aria-describedby="passwordHelpBlock"
                                  className="input_date form-search"
                                  />
                              </Col>
                              <Col lg="3">
                                      <Button className="btn_submit">
                                          <FaSearch />
                                      </Button>
                              </Col>
                          </Row>
                      </Tab.Pane>
                  </Tab.Content>
              </Tab.Container>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </Container>
  );
}
const mapStateToProps = state => ({
    userInfo: state.userInfo,

});
export default connect(mapStateToProps, actions)(SearchBox);