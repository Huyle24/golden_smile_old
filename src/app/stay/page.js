"use client"
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/navigation'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import Link from 'next/link'
import * as actions from "../../../redux/actions";
import { connect } from "react-redux";
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE } from '../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../js/lang';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swal from 'sweetalert2';

import {startTransition, useState, useEffect} from "react";
import axios from 'axios';
import moment from 'moment';
import * as GlobalJs from "../../../js/global"
import {Button} from "react-bootstrap";

function page(props) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
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
    const tree_view = (page) => {
        tourFilterTmp[page]['is_click'] = !tourFilterTmp[page]['is_click'];
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


        router.push('/stay/list?adult_number=' + counterAdult + '&child_number='+ counterChild + '&room_number='+counterRoom + '&keyword=' + keyWord + '&date_start=' + moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY') + '&date_end=' + moment(dateEnd, "DD-MM-YYYY").format('DD/MM/YYYY'))
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
        
        <main>
            <div className="main_hotel" style={{ backgroundImage: "url(https://storage.googleapis.com/tripi-assets/mytour/banner/banner_flight.jpg)"  }}>
                <div className="container">
                    <h2 className="title title-h  mb-4 text-white">{textShow ? textShow.Hotel : ''}</h2>
                    <div className="menu_hotel">
                        <div className="item">
                            <div>{textShow ? textShow.Want_Go : ''}</div>
                            <input type='text' className="form-control input-stay-page"  onChange={(e) => searchKeyWord(e)}/>
                        </div> 
                        <div className="item">
                            <div>{textShow ? textShow.Check_In : ''}</div>
                            <DatePicker className="form-control" dateFormat="dd/MM/y" selected={dateStart} onChange={(date) => choose_date_start(date)} />
                        </div>                 
                        <div className="item">
                            <div>{textShow ? textShow.Check_Out : ''}</div>
                            <DatePicker className="form-control" dateFormat="dd/MM/y"  selected={dateEnd} onChange={(date) => choose_date_end(date)} />
                        </div>       
                        <div className="item">
                            <div>{textShow ? textShow.Booking_Information : ''}</div>
                            <NavDropdown title={<span>{counterAdult} {textShow ? textShow.Adult : ''}, {counterChild} {textShow ? textShow.Children : ''}, {counterRoom} {textShow ? textShow.Number_Of_Room : ''} </span>} className='form-control plane-drop' >
                                <div className="plane-drop-item">
                                    <div className="mb-2">
                                        <div>Người lớn</div>
                                        <div className="d-flex justify-content-around align-items-center">
                                            <Button id='btn_minus' className="counter-btn counter-disable text-white" onClick={() => minusNumberAdult()}><span>-</span></Button>
                                            <span className="counter-count fs-5">{counterAdult}</span>
                                            <Button id='btn_plus' className="counter-btn text-white" onClick={() => plusNumberAdult()}><span>+</span></Button>
                                        </div>
                                    
                                    </div>
                                    <div className="mb-2">
                                        <div>Trẻ em ( 2 - 11 )</div>
                                        <div className="d-flex justify-content-around align-items-center">
                                            <Button id='btn_minus' className="counter-btn counter-disable text-white" onClick={() => minusNumberChild()}><span>-</span></Button>
                                            <span className="counter-count fs-5">{counterChild}</span>
                                            <Button id='btn_plus' className="counter-btn text-white" onClick={() => plusNumberChild()}><span>+</span></Button>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div>Số phòng</div>
                                        <div className="d-flex justify-content-around align-items-center">
                                            <Button id='btn_minus' className="counter-btn counter-disable text-white" onClick={() => minusNumberRoom()}><span>-</span></Button>
                                            <span className="counter-count fs-5">{counterRoom}</span>
                                            <Button id='btn_plus' className="counter-btn text-white" onClick={() => plusNumberRoom()}><span>+</span></Button>
                                        </div>
                                    </div>
                                </div>
                            </NavDropdown>
                        </div> 
                        <div className="item  buton-submit-plane">
                            <button className="button-move btn btn-primary" onClick={() => showHotel()}>
                                <span className="MuiButton-label">
                                    <svg width="23" height="24" fill="none" className="svgFillAll" ><path d="M21.312 22.5l-4.742-4.742m2.71-7.451a8.806 8.806 0 11-17.613 0 8.806 8.806 0 0117.613 0z" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </span>
                    
                            </button>
                        </div>
                    </div>
                    {
                        !user_data  ?
                    <div className="row mt-4 pb-4">
                        <div className="col-sm-6">
                            <h2 className="title text-white ">{textShow ? textShow.Log_In_To_Receive : ''}</h2>
                            <div className="login-plane">
                                <Link href='/Auth/Login'>
                                    <button className="btn btn-primary">{textShow ? textShow.Log_In : ''}</button>
                                </Link>
                            </div>
                        </div>
                    </div>:''
                    }
                </div>
            </div>
        </main>
    )
}
const mapStateToProps = state => ({
    hotelListInfo: state.hotelListInfo,
    userInfo: state.userInfo,

});
export default connect(mapStateToProps, actions)(page);