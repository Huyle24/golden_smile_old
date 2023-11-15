"use client"
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import {useRouter, useSearchParams} from "next/navigation"
import Link from 'next/link'
import * as actions from "../../../../redux/actions";
import { connect } from "react-redux";
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE } from '../../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../../js/lang';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startTransition } from "react";
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import * as GlobalJs from "../../../../js/global"
// import permalink from "@/app/stay/list/[permalink]";
import Swal from 'sweetalert2';
import {Button} from "react-bootstrap";
const OFF_DEFAULT = 5
function page(props) {
    const [limit, setLimit] = useState(0)

    const [seeMore, setSeemore] = useState(false)
    const [hotelList, setHotelList] = useState([])
    const [datePrice, setDatePrice] = useState(new Date());
    const date = moment(datePrice).isoWeekday() - 1;

    const [today, setToday] = useState(new Date());
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    const [counterAdult, setCounterAdult] = useState(1);
    const [counterChild, setCounterChild] = useState(0);
    const [counterRoom, setCounterRoom] = useState(1);
    const [keyWord, setKeyWord] = useState('');
    const router = useRouter()
    const [textShow, setTextShow] = useState('');

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
    const [dateInput, setDateInput] = useState(new Date());
    const [checkboxOrder, setCheckboxOrder] = useState('');
    const [checkboxStar, setCheckboxStar] = useState('');
    const [allshow, allsetShow] = useState(false);
    const allhandleClose = () => allsetShow(false);
    const allhandleShow = () => allsetShow(true);
    // const [checkboxTypeDate, setCheckboxTypeDate] = useState('');
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
    const choose_date = (date) => {
        setDateInput(date)

    }
    const searchParams = useSearchParams();
    const getTourmore = async ()=>{
        let limit_new = limit + OFF_DEFAULT
        let url_api = BASE_URL_API + "Balotour/Hotel/find_hotel_point?off="+OFF_DEFAULT+"&limit="+limit_new;
        let token = await GET_TOKEN();
        axios.get(url_api, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN':JSON.parse(token),
                'LANG-CODE': JSON.parse(GET_LANG_CODE()),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {
            let daaa= hotel_list.concat(response.data.data.hotel_price_list)
            setHotelList(daaa)
            setLimit(limit_new)

            if (response.data.data.hotel_price_list == '' || response.data.data.hotel_price_list.length < OFF_DEFAULT){
                setSeemore(true)
            }


        })
        .catch(function (error) {
            console.log(error);
        });
    }





    useEffect(() => {
        props.fetchHotelList(searchParams.get('adult_number'),searchParams.get('child_number'),searchParams.get('room_number'),searchParams.get('keyword'),searchParams.get('date_start'),searchParams.get('date_end'),5,5,'','');
        getLangText()
    },[searchParams.get('adult_number'),searchParams.get('child_number'),searchParams.get('room_number'),searchParams.get('keyword'),searchParams.get('date_start'),searchParams.get('date_end')])

    let hotel_list_num_row = props.hotelListInfo.data && props.hotelListInfo.data.num_row &&   props.hotelListInfo.isLoading==false? props.hotelListInfo.data.num_row : '';
    let hotel_list = props.hotelListInfo.data && props.hotelListInfo.data.hotel_price_list &&   props.hotelListInfo.isLoading==false? props.hotelListInfo.data.hotel_price_list : '';
    let area_list = props.hotelListInfo.data && props.hotelListInfo.data.area_list &&   props.hotelListInfo.isLoading==false? props.hotelListInfo.data.area_list : '';

    let data_search  = props.hotelListInfo.data && props.hotelListInfo.data.data_search &&   props.hotelListInfo.isLoading==false? props.hotelListInfo.data.data_search : '';
    console.log(hotel_list)


    useEffect(() => {
        if(data_search){

            setKeyWord(data_search.keyword)
            setCounterAdult(data_search.adult_number)
            setCounterChild(data_search.child_number)
            setCounterRoom(data_search.room_number)
            setDateStart(new Date(data_search.date_start))
            setDateEnd( new Date(data_search.date_end))
        }


    },[data_search])

    useEffect(() => {
        setHotelList(hotel_list)

    }, [hotel_list])


    useEffect(()=>{
        if(hotel_list_num_row > OFF_DEFAULT){
            setSeemore(false)
        }else{
            setSeemore(true)
        }


    },[hotel_list_num_row])
    const change_area = (type)=>{
        setCheckboxOrder(type)
        getStayList(type,checkboxStar,keyWord)
    }
    const change_star_hotel = (startHotel)=>{
        setCheckboxStar(startHotel)
        getStayList(checkboxOrder,startHotel,keyWord)

    }
    const getStayList =async (area,star,keyWord)=>{
        let url_api = BASE_URL_API + "Balotour/Hotel/find_hotel_point?off=9&limit=0&area="+area+"&star="+star+"&keyword="+keyWord;
        let token = await GET_TOKEN();
        axios.get(url_api, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN':JSON.parse(token),
                'LANG-CODE': JSON.parse(GET_LANG_CODE()),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {

            setHotelList(response.data.data.hotel_price_list)
            if (response.data.data.hotel_price_list == '' || response.data.data.hotel_price_list.length < OFF_DEFAULT){
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
    const choose_date_start = (date) => {
        let date_start =  new Date(date)
        setDateStart(date_start)

    }
    const choose_date_end = (date) => {
        let date_end =  new Date(date)
        setDateEnd(date_end)

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
        // props.fetchHotelList(counterAdult, counterChild, counterRoom, keyWord, moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY'), moment(dateEnd, "DD-MM-YYYY").format('DD/MM/YYYY'), 4, limit);


        if(moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY') < moment(today, "DD-MM-YYYY").format('DD/MM/YYYY')){

            Toast.fire({
                title: "Chọn sai ngày nhận phòng",
                icon: "error"
            })
            return false
        }
        if(moment(dateEnd, "DD-MM-YYYY").format('YYYY-MM-DD') < moment(dateStart, "DD-MM-YYYY").format('YYYY-MM-DD')){
            Toast.fire({
                title: "Chọn sai ngày trả phòng",
                icon: "error"
            })
            return false

        }

        router.push('/stay/list?adult_number=' + counterAdult + '&child_number='+ counterChild + '&room_number='+counterRoom + '&keyword=' + keyWord + '&date_start=' + moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY') + '&date_end=' + moment(dateEnd, "DD-MM-YYYY").format('DD/MM/YYYY'))
          Toast.fire({
            title: "Thay đổi thành công",
            icon: "success"
        })
    }
    return (

        <main>
            <div className="main_hotel_list">
                <div className="container">
                    <h2 className="pt-4 mb-4">{textShow ? textShow.Hotel_Services : ''}</h2>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 mb-4">
                            <div className="menu_hotel">
                                <div className="item">
                                    <div>{textShow ? textShow.Want_Go : ''}</div>
                                    <input type='text' className="form-control input-stay-page"  onChange={(e) => searchKeyWord(e)} value={keyWord} />
                                </div>
                                <div className="item">
                                    <div>{textShow ? textShow.Check_In : ''}</div>
                                    <DatePicker className="form-control " dateFormat="dd/MM/y" selected={dateStart} onChange={(date) => choose_date_start(date)}  />
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
                        </div>
                        <div className="col-sm-3 col-md-12 col-lg-3">
                            <div className="tour-filter">
                                <div >
                                    <div className="title">{textShow ? textShow.Filter : ''}</div>

                                </div>
                                <hr></hr>
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value=''    checked={checkboxOrder == '' ? true : false}    onChange={()=> change_area('')}/>
                                    <span>{textShow ? textShow.All : ''}</span>
                                </div>
                                {
                                    area_list ? area_list.map((item,page)=>{
                                    return(
                                        <div className="d-flex align-items-center mb-2" key={page}>
                                        <input className="filter_radio" type="radio" value={item.id}    checked={checkboxOrder == item.id ? true : false}    onChange={()=> change_area(item.id)}/>
                                        <span>{item.name}</span>
                                        </div>
                                    )
                                    }):null
                                }
                                <hr></hr>
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value='' checked={checkboxStar == '' ? true : false}   onChange={()=> change_star_hotel('')} />
                                    <span>{textShow ? textShow.All : ''}</span>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value='1' checked={checkboxStar == 1 ? true : false}   onChange={()=> change_star_hotel(1)} />
                                    <span>{textShow ? textShow.Start_1 : ''}</span>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value='2' checked={checkboxStar == 2 ? true : false}   onChange={()=> change_star_hotel(2)} />
                                    <span>{textShow ? textShow.Start_2 : ''}</span>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value='3' checked={checkboxStar == 3 ? true : false}  onChange={()=> change_star_hotel(3)} />
                                    <span>{textShow ? textShow.Start_3 : ''}</span>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value='4' checked={checkboxStar == 4 ? true : false}   onChange={()=> change_star_hotel(4)} />
                                    <span>{textShow ? textShow.Start_4 : ''}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="filter_radio" type="radio" value='5' checked={checkboxStar == 5 ? true : false}   onChange={()=> change_star_hotel(5)} />
                                    <span>{textShow ? textShow.Start_5 : ''}</span>
                                </div>
                            </div>
                            <div className=" mb-2 filter-mb">
                                <button type="button" className="btn btn-primary" onClick={allhandleShow}>{textShow ? textShow.Filter : ''}</button>
                            </div>
                            <Modal
                                show={allshow} onHide={allhandleClose}

                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                className="modal-detail"
                            >
                                <Modal.Header closeButton className="main_tour_detail_header_md">
                                    <Modal.Title><h4 className="title">{textShow ? textShow.Filter : ''}</h4></Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="">
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value='' checked={checkboxOrder == '' ? true : false}    onChange={()=> change_area('')}/>
                                    <span>{textShow ? textShow.All : ''}</span>
                                </div>
                                {
                                    area_list ? area_list.map((item,page)=>{
                                    return(
                                        <div className="d-flex align-items-center mb-2" key={page}>
                                        <input className="filter_radio" type="radio" value={item.id}    checked={checkboxOrder == item.id ? true : false}    onChange={()=> change_area(item.id)}/>
                                        <span>{item.name}</span>
                                        </div>
                                    )
                                    }):null
                                }
                                <hr></hr>
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value='' checked={checkboxStar == '' ? true : false}   onChange={()=> change_star_hotel('')} />
                                    <span>{textShow ? textShow.All : ''}</span>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value='1' checked={checkboxStar == 1 ? true : false}   onChange={()=> change_star_hotel(1)} />
                                    <span>{textShow ? textShow.Start_1 : ''}</span>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value='2' checked={checkboxStar == 2 ? true : false}   onChange={()=> change_star_hotel(2)} />
                                    <span>{textShow ? textShow.Start_2 : ''}</span>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value='3' checked={checkboxStar == 3 ? true : false}  onChange={()=> change_star_hotel(3)} />
                                    <span>{textShow ? textShow.Start_3 : ''}</span>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <input className="filter_radio" type="radio" value='4' checked={checkboxStar == 4 ? true : false}   onChange={()=> change_star_hotel(4)} />
                                    <span>{textShow ? textShow.Start_4 : ''}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="filter_radio" type="radio" value='5' checked={checkboxStar == 5 ? true : false}   onChange={()=> change_star_hotel(5)} />
                                    <span>{textShow ? textShow.Start_5 : ''}</span>
                                </div>

                                </Modal.Body>
                            </Modal>

                        </div>
                        <div className="col-sm-9 col-md-12 col-lg-9">
                            <div className="hotel-list-pc">
                                <div className="row ">

                                    {
                                        hotelList ? hotelList.map((item,page)=>{
                                            const permalink =  item.info_hotel.permalink;
                                            return(
                                                <div className="col-sm-12" key={page}>
                                                    {/*<Link  href={{*/}
                                                    {/*    pathname: '/stay/[permalink]',*/}
                                                    {/*    query: { */}
                                                    {/*        permalink: item.info_hotel.permalink,*/}
                                                    {/*        adult_number : router.query.adult_number,*/}
                                                    {/*        child_number : router.query.child_number,*/}
                                                    {/*        room_number : router.query.room_number,*/}
                                                    {/*        date_start : router.query.date_start,*/}
                                                    {/*        date_end : router.query.date_end,*/}

                                                    {/*        },*/}
                                                    {/*}}>*/}

                                                        <Link href={'/stay/'+ permalink + '?adult_number=' + counterAdult + '&child_number='+ counterChild + '&room_number='+counterRoom + '&keyword=' + keyWord + '&date_start=' + moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY') + '&date_end=' + moment(dateEnd, "DD-MM-YYYY").format('DD/MM/YYYY')}
                                                        >

                                                        <div className="form-group mb-3" >
                                                            <div className="card-item card-item-hotel " >

                                                                        <div className='card-item-img-hotel' >
                                                                        <div className="img" style={{ backgroundImage: "url(" + item.avatar + ")"  }}></div>
                                                                        </div>


                                                                        <div className="card-item-content card-item-content-hotel">
                                                                            <div className="item-content">

                                                                                <div className="description">{textShow ? textShow.Hotel : ''} • {item.city_detail}</div>
                                                                                <div className="title">{item.info_hotel.name}</div>
                                                                                <div className="description ">
                                                                                    <span className="star">★★★★★</span>
                                                                                </div>
                                                                                <div className="card-item-tag ">
                                                                                    <span>{textShow ? textShow.Hotel : ''} {item.area_detail}</span>
                                                                                    <span>{textShow ? textShow.Hotel : ''} {item.info_hotel.star} sao</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                        <div className="price-hotel">

                                                                            <div className="d-flex  justify-content-between item-price ">
                                                                                <span>{textShow ? textShow.Room_Prices : ''}</span>
                                                                                <div>

                                                                                    {

                                                                                        item.price ? item.price.map((item,page)=>{
                                                                                            return(

                                                                                                    <div className="price" key={page}>
                                                                                                        {
                                                                                                            page == date ?
                                                                                                            <div> <span className="text-danger">{item} VND</span> <span>/ {textShow ? textShow.People : ''}</span></div> : null
                                                                                                        }

                                                                                                    </div>

                                                                                            );
                                                                                        }):null
                                                                                    }
                                                                                </div>



                                                                            </div>
                                                                        </div>


                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        }):null
                                    }
                                </div>
                                {
                                seeMore == false ?
                                <div className="see-more text-center pb-4 mt-4" onClick={() => getTourmore()}>
                                    <button>Xem tất cả</button>
                                </div>
                                :''
                               }
                            </div>
                            <div className="hotel-list-mb">
                                <div className="row ">
                                    {
                                        hotelList ? hotelList.map((item,page)=>{

                                            const permalink =  item.info_hotel.permalink;
                                            return (
                                                <div className="col-sm-4 col-md-6 col-lg-4 mb-3" key={page}>
                                                    <Link href={'/stay/'+ permalink + '?adult_number=' + counterAdult + '&child_number='+ counterChild + '&room_number='+counterRoom + '&keyword=' + keyWord + '&date_start=' + moment(dateStart, "DD-MM-YYYY").format('DD/MM/YYYY') + '&date_end=' + moment(dateEnd, "DD-MM-YYYY").format('DD/MM/YYYY')}
                                                    >
                                                        <div className="form-group">
                                                            <div className='card-item'>
                                                                <div className="card-item-img" style={{ backgroundImage: "url(" + item.avatar + ")" }}></div>
                                                                <div className='card-item-information'>
                                                                    <div className='card-item-content'>

                                                                        <div className='description'>Khách sạn • {item.city_detail}</div>
                                                                        <div className='title'>{item.info_hotel.name}</div>
                                                                        <div className='description mt-2'><span className='star'>★★★★★</span> (44)  •  600+  Đã được đặt  </div>
                                                                        <div className='card-item-tag mt-2'>
                                                                            <span>Khách sạn {item.area_detail}</span>
                                                                            <span>Khách sạn {item.info_hotel.star} sao</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='card-item-price'>
                                                                        <div className="d-flex justify-content-between">
                                                                            <span>Giá Tour</span>

                                                                            <div>

                                                                                    {

                                                                                        item.price ? item.price.map((item,page)=>{
                                                                                            return(

                                                                                                    <div className="price" key={page}>
                                                                                                        {
                                                                                                            page == date ?
                                                                                                            <div> <span className="text-danger">{item} VND</span> <span>/ người</span></div> : null
                                                                                                        }

                                                                                                    </div>

                                                                                            );
                                                                                        }):null
                                                                                    }
                                                                                </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>

                                            )

                                        }) : null
                                    }
                                </div>
                                {
                                seeMore == false ?
                                <div className="see-more text-center pb-4 mt-4" onClick={() => getTourmore()}>
                                    <button>Xem tất cả</button>
                                </div>
                                :''
                               }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
const mapStateToProps = state => ({
    hotelListInfo: state.hotelListInfo,

});
export default connect(mapStateToProps, actions)(page);
