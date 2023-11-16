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
         <Form className="trangchu_formsearch">
            <div className="row tab_filter">
                <div className="col-md-12">
                  <Nav className="tab_filter_searchnav"
                    activeKey="/home"
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                  >
                    <Nav.Item className="li_searchnav">
                      <Nav.Link className="search_mucfilter" eventKey="link-1">
                        <i class='bx bxl-react'></i>
                        <div className="search_content_nav">Tour <br></br> trong nước</div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="li_searchnav">
                      <Nav.Link className="search_mucfilter" eventKey="link-2">
                        <i class='bx bxl-react'></i>
                        <div className="search_content_nav">Tour <br></br> trong nước</div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="li_searchnav">
                      <Nav.Link className="search_mucfilter" eventKey="link-3"> 
                        <i class='bx bxl-react'></i>
                        <div className="search_content_nav">Tour <br></br> trong nước</div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="li_searchnav">
                      <Nav.Link className="search_mucfilter" eventKey="link-4">
                        <i class='bx bxl-react'></i>
                        <div className="search_content_nav">Tour <br></br> trong nước</div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
            </div>
            <div className="form_filter">

            </div>
         </Form>
      </div>
    </Container>
  );
}
const mapStateToProps = state => ({
    userInfo: state.userInfo,

});
export default connect(mapStateToProps, actions)(SearchBox);