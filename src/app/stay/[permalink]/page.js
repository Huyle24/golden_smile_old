/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from "react"
import {useRouter, useSearchParams} from "next/navigation"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Modal from 'react-bootstrap/Modal';
import * as actions from "../../../../redux/actions";
import { connect } from "react-redux";
import * as GlobalJs from "../../../../js/global"
import parse from 'html-react-parser';
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE } from '../../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../../js/lang';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import {FaChevronRight} from "react-icons/fa";
function Stay(props) {
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
    const parse = require('html-react-parser');
    const router = useRouter()
    const [priceExtra, setpriceExtra] = useState(0);
    const [numberExtra, setNumberExtra] = useState(0);

    const [counter, setCounter] = useState(0);
    const [itemModel, setItemModal] = useState('');

    const [datePrice, setDatePrice] = useState(new Date());
    const [loadingPage, setLoadingPage] = useState(false);
    let [dataList, setDataList] = useState([]);
     
    const date = moment(datePrice).isoWeekday() - 1;

    const [textShow, setTextShow] = useState('');
    const searchParams = useSearchParams();

    let [arrTmp, setArrTmp] = useState(
        [
            {
                id: 1,
                char_length: 100,
                content: "123",
                is_show_more: false,
                img: ''
            },
            {
                id: 2,
                char_length: 8,
                content: "123456",
                is_show_more: false,
                img: ''
            },
            {
                id: 3,
                char_length: 250,
                content: "Được đề xuất cao, cuộc phiêu lưu tuyệt vời “xứng đáng trên instagram”! Văn hóa, lịch sử phong phú, chuyến đi tham quan và ẩm thực tất cả trong một. Hướng dẫn viên của chúng tôi, Kang và tài xế của anh ấy, May, rất hiểu biết và có sức chứa. Đây là một chuyến tham quan cả ngày (7:30 sáng đón tại khách sạn, trở lại lúc 6 giờ chiều), nhưng chúng tôi đã có thể nghỉ ngơi và ngủ trong chiếc xe tải thoải mái trong suốt chuyến đi đường trơn tru. Bữa trưa kiểu Việt Nam ngon miệng được phục vụ tại một nhà hàng ven sông. Chúng tôi yêu thích trái cây, mật ong và nếm kẹo dừa và nước dừa tươi được cung cấp sau chuyến đi kênh. Và Kang đã cho tôi một cốc bia lạnh ngay trước khi hai giờ lái xe trở về thành phố Hồ Chí Minh! Hai điểm nổi bật của chuyến đi là Địa đạo Củ Chi và Đi tàu trên kênh Mekong. Có những con đường đi bộ dọc theo những con đường đá ở ngôi làng đi về phía sau, vì vậy điều này có thể là thách thức đối với một số người. (Chúng tôi đã chia sẻ chiếc xe tải với một gia đình có con nhỏ và một đứa trẻ mới biết đi, nhưng dù sao thì họ cũng có vẻ hạnh phúc với cuộc phiêu lưu). Rất nhiều cơ hội để chụp những bức ảnh tuyệt vời.",
                is_show_more: false,
                img: [

                    'https://cdn.klook.com/user_review/product/1945688/cbd9d0f8-9bee-429a-6993-d9a205d646aa.0*250.jpeg',
                    'https://cdn.klook.com/user_review/product/1945688/cbd9d0f8-9bee-429a-6993-d9a205d646aa.0*250.jpeg',
                    'https://cdn.klook.com/user_review/product/1945688/cbd9d0f8-9bee-429a-6993-d9a205d646aa.0*250.jpeg'

                ]
            }
        ]
    )
    const [loadingMoreComment, setLoadingMoreComment] = useState(false)

    useEffect(() => {
        setArrTmp(arrTmp)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingMoreComment])


    const [hotelshow, hotelsetShow] = useState(false);
    const hotelhandleClose = () => hotelsetShow(false);
    const hotelhandleShow = (item) => {
        setItemModal(item);
        hotelsetShow(true);
    }

    const add_cart = async(item,item_hotel_price) => {
  
        let url_api = BASE_URL_API + "Balotour/ddddqdq/addCart"
        let token = await GET_TOKEN();
        if (token) {
            let fd = new FormData()
            fd.append("ref_id", item ? item.id : '')
            fd.append("hotel_id", item ? item.hotel_id : '')

            fd.append("page", 'hotel')
            fd.append("dateStart", router.query.date_start)
            fd.append("dateEnd", router.query.date_end)
            fd.append("number", router.query.adult_number)
            fd.append("number_child", router.query.child_number)
            fd.append("number_room_hotel", router.query.room_number)
            fd.append("extra_hotel", numberExtra)

            fd.append("price_1_person", item_hotel_price ? item_hotel_price.price_1  : '')
            fd.append("price_1_child", item_hotel_price ? item_hotel_price.price_bed_extra_1 :'')
         
            fd.append("total", parseInt(priceExtra) + parseInt(item_hotel_price ? item_hotel_price.price_1 : '') * parseInt(router.query.room_number) * parseInt(night_number))

           

            axios.post(url_api, fd, {
                headers: {
                    "x-api-key": "api_key",
                    'USER-TOKEN': JSON.parse(token),
                    "Content-Type": "multipart/form-data"
                }
            }).then(async function (response) {
                Toast.fire({
                    title: "Thêm giỏ hàng thành công",
                    icon: "success"
                })
                router.push('/cart/');
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            router.push('/Auth/login/');
        }
    }



    const checkNumberHotelExtra = (index, item, index_2) => {
        let number_check = 0;
        let ele = document.querySelectorAll(".check_number_hotel_extra_" + index + "_" + index_2)
        ele.forEach((_item, _index) => {
            if (_item.checked) {
                number_check += 1;
            }
        })
        let price_bed = number_check * item.price_bed_extra_1;
        dataList[index].hotel_price[index_2].price_bed_extra_1_1 = price_bed;
        setDataList(dataList)
        setLoadingPage(!loadingPage)
        setpriceExtra(price_bed)
        setNumberExtra(number_check)
    }


    useEffect(() => {
        props.fetchHotelDetail(props.params.permalink);
        props.fetchHotelPrice(props.params.permalink,searchParams.get('date_start'),searchParams.get('date_end'));
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [props.params.permalink])


    let hotel_detail = props.hotelDetailInfo.data && props.hotelDetailInfo.isLoading == false ? props.hotelDetailInfo.data : '';
    let hotel_price_room_type = props.hotelPriceInfo.data && props.hotelPriceInfo.isLoading == false ? props.hotelPriceInfo.data.hotel_room_type : '';
    let policy_arr = props.hotelDetailInfo.data && props.hotelDetailInfo.isLoading == false ? props.hotelDetailInfo.data.policy_arr : '';
    let night_number = props.hotelPriceInfo.data && props.hotelPriceInfo.isLoading == false ? props.hotelPriceInfo.data.night_number : '';
    useEffect(() => {
        setDataList(hotel_price_room_type)

    }, [hotel_price_room_type])

    useEffect(() => {
        setDataList(dataList)

    }, [loadingPage])

    useEffect(() => {
        getLangText()
       
    }, [])


    
    const add = (index, item_hotel_price, index_hotel_price) => {
        let result = [];


        for (let i = 0; i < searchParams.get('room_number') ; i++) {
            result.push(
                <div className="d-flex">
                    <input className={`check_number_hotel_extra check_number_hotel_extra_${index}_${index_hotel_price}`} type="checkbox" onChange={() => checkNumberHotelExtra(index, item_hotel_price, index_hotel_price)} />
                    <span>{textShow ? textShow.Extra_Bed_More : ''} {i + 1}</span>
                </div>


            );
        }

        return result
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
    


    return (

        <main>
            <div className="main_hotel_detail">
                <div className="container">
                    <div className="pt-4">
                        <Swiper
                            cssMode={true}
                            navigation={true}
                            slidesPerView={1}
                            modules={[Navigation]}
                            className="mySwiper"
                        >
                            {
                                hotel_detail.image ? hotel_detail.image.map((item, index) => {
                                    return (
                                        <SwiperSlide key={index}>

                                            <img className="banner-img" src={item} />

                                        </SwiperSlide>
                                    )
                                }) : null
                            }
                        </Swiper>
                    </div>
                    <div className=" pt-4">

                        <div className=" description">
                            Balotour <FaChevronRight/> {textShow ? textShow.Hotel :''} {hotel_detail.star} sao <FaChevronRight/>  {hotel_detail.city_name}
                        </div>
                        <h2 className="title"> {hotel_detail ? hotel_detail.name : ''}</h2>
                        <div className="description mb-4"><span className="star">★★★★★</span>  </div>
                        <div className=" mb-4">
                            <Tabs
                                defaultActiveKey="tab1"
                            >
                                <Tab eventKey="tab1" title={textShow ? textShow.Information : ''}>
                                    <div className='tab-pane-content'>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="item-des-tour d-flex align-center">
                                                    <img src='https://vigomanager.com/app-assets/mobile/balotour/icon/dollar.png' />
                                                    <span>{textShow ? textShow.Cancellation :''} </span>
                                                </div>
                                                <div className="item-des-tour d-flex align-center mt-3">
                                                    <img src='https://vigomanager.com/app-assets/mobile/balotour/icon/voucher.png' />
                                                    <span>{textShow ? textShow.Present_Voucher :''} </span>
                                                </div>
                                                {/* <div className="item-des-tour d-flex align-center mt-3">
                                                    <img src='https://vigomanager.com/app-assets/mobile/balotour/icon/languages.png' />
                                                    <span>{textShow ? textShow.Language_tour : ''}</span>
                                                </div> */}
                                                <div className="item-des-tour d-flex align-center mt-3">
                                                    <img src='https://vigomanager.com/app-assets/mobile/balotour/icon/car.png' />
                                                    <span>{textShow ? textShow.Pick_Up_Point_Tour : ''}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                {/* <div className="item-des-tour d-flex align-center">
                                                    <img src='https://vigomanager.com/app-assets/mobile/balotour/icon/schedule1.png' />
                                                    <span>{textShow ? textShow.Day_Ticket : ''}</span>
                                                </div> */}
                                                <div className="item-des-tour d-flex align-center mt-3">
                                                    <img src='https://vigomanager.com/app-assets/mobile/balotour/icon/clock.png' />
                                                    {/* <span>{textShow ? textShow.Time_Check : ''}: {policy_arr ? policy_arr.time_in : ''} -  {policy_arr ? policy_arr.time_out : ''}</span> */}
                                                    <span>{textShow ? textShow.Time_Check : ''}: 14:00 PM - 12:00 AM</span>
                                                 
                                                </div>
                                                <div className="item-des-tour d-flex align-center mt-3">
                                                    <img src='https://vigomanager.com/app-assets/mobile/balotour/icon/red-flag.png' />
                                                    <span>{textShow ? textShow.Address : ''}: {hotel_detail.address}</span>
                                                </div>
                                                <div className="item-des-tour d-flex align-center mt-3">
                                                    <img src='https://vigomanager.com/app-assets/mobile/balotour/icon/ancestors.png' />
                                                    <span>{textShow ? textShow.Number_People : ''}: {textShow ? textShow.Number_People_Text : ''} </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="tab2" title={textShow ? textShow.Introduction : ''}>
                                    <div className='tab-pane-content'>

                                        {
                                            hotel_detail && hotel_detail.content ?
                                                parse(hotel_detail.content) : ''
                                        }
                                    </div>
                                </Tab>
                                <Tab eventKey="tab3" title={textShow ? textShow.Policy : ''}>
                                    <div className='tab-pane-content'>

                                        {
                                            policy_arr && policy_arr.policy ?
                                                parse(policy_arr.policy) : ''
                                        }
                                    </div>
                                </Tab>
                                <Tab eventKey="tab4" title={textShow ? textShow.Regulations : ''}>
                                    <div className='tab-pane-content'>

                                        {
                                            policy_arr && policy_arr.stipulate ?
                                                parse(policy_arr.stipulate) : ''
                                        }
                                    </div>
                                </Tab>
                                <Tab eventKey="tab5" title={textShow ? textShow.Maps : ''} >
                                    <div className='tab-pane-content'>
                                        <div className="mapouter">
                                            <div className="gmap_canvas">
                                                <iframe className="gmap_iframe" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Hoiana Shores Golf Club&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>

                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                        <h2 className="mb-4">{textShow ? textShow.Service_Packages : ''}</h2>
                        <div className="room-list room-list-pc">
                            {
                                dataList ? dataList.map((item, index) => {
                                    return (
                                        <div className="room-list-item" key={index}>
                                            <div className="d-flex justify-content-between room-hotel-item">
                                                <div className="hotel-room-info">

                                                    <div className="room-imgs">
                                                        <div className="image-room">
                                                            <img src={item.avatar} />
                                                        </div>
                                                        <div className="room-imgs-count" onClick={() => hotelhandleShow(item)} >{textShow ? textShow.Image : ''} ( {item.img.length} )</div>
                                                    </div>
                                                    <div className="room-name">
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <div className="service-list">
                                                        <div className="service-item">
                                                            {
                                                                item.hotel_gadget_name ? item.hotel_gadget_name.map((item_service, index_service) => {
                                                                    return (

                                                                        <div className="service" key={index_service}>
                                                                            <span>{item_service}</span>
                                                                        </div>
                                                                    )
                                                                }) : null
                                                            }

                                                        </div>
                                                    </div>

                                                    <button className="btn btn-primary form-control see-details " onClick={() => hotelhandleShow(item)}>
                                                       {textShow ? textShow.View_room : ''}
                                                    </button>

                                                </div>
                                                <div className='hotel-rate-list'>
                                                    {
                                                        item.hotel_price ? item.hotel_price.map((item_hotel_price, index_hotel_price) => {
                                                            return (
                                                                <div className={`room-info-price ${index_hotel_price == 0 ? '' : 'mt-4'}`} key={index_hotel_price}>
                                                                    <div className="room-rate-info">
                                                                        <div className="mb-2">{item.name}</div>
                                                                        <div className="d-flex">
                                                                            <div className="number-35">
                                                                                <div className="d-flex align-items-center">
                                                                                    <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/34f5976a0369969f82cb666b17aebf99.svg' />
                                                                                    <span >{item.desc_number_room} {textShow ? textShow.Beds : ''}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="number-35">
                                                                                <div className="d-flex align-items-center">
                                                                                    <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/e/ed2587afbf72ad57cc07360a2a3cd783.svg' />
                                                                                    <span >{item.max_customer} {textShow ? textShow.Adult : ''}, {item.max_customer_child} {textShow ? textShow.Children : ''} </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="number-30 text-end">
                                                                                <span className="text-danger">({item.quantity} {textShow ? textShow.Empty_room : ''})</span>
                                                                            </div>
                                                                        </div>
                                                                        <hr></hr>
                                                                        <div className="d-flex">
                                                                            <div className="number-35">
                                                                                <div className="d-flex align-items-center">
                                                                                    <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/a5be12e728bdb331c596c7c181667dca.svg' />
                                                                                    <span>{textShow ? textShow.Not_Breakfast : ''}</span>
                                                                                </div>
                                                                                <div className="d-flex align-items-center">
                                                                                    <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/5/5a913a9638da9c963966d8a962306abd.svg' />
                                                                                    <span>{textShow ? textShow.Free_Wifi : ''}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="number-35">
                                                                                <div className="d-flex align-items-center">
                                                                                    <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b7f44a75a61d79df6226747661f37ca0.svg' />
                                                                                    <span>{textShow ? textShow.Cancellation : ''}</span>
                                                                                </div>
                                                                                <div className="cancellation-policyi">
                                                                                    <div className="d-flex align-items-center">
                                                                                        <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/93d682fb169004ee2a60c098735dd3da.svg' />
                                                                                        <span className="text-primary">{textShow ? textShow.View_Cancellation_Policy : ''}</span>
                                                                                    </div>
                                                                                    <div className="cancellation-policyi-dropdow">

                                                                                        <span>
                                                                                            {textShow ? textShow.View_Cancellation_Policy_Text_1 : ''}
                                                                                            <br />
                                                                                            {textShow ? textShow.View_Cancellation_Policy_Text_2 : ''}
                                                                                            <br />
                                                                                            {textShow ? textShow.View_Cancellation_Policy_Text_3 : ''}
                                                                                        </span>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="number-30 text-end">
                                                                                {
                                                                                    item_hotel_price.price_public_arr ? item_hotel_price.price_public_arr.map((item_price_public, index_price_public) => {
                                                                                        return (
                                                                                            <span key={index_price_public}>
                                                                                                {

                                                                                                    index_price_public == date ?
                                                                                                        <div className="dis_price" >{GlobalJs.format_currency(item_price_public * searchParams.get('room_number')  * night_number)  } VND /{night_number == 1 ? '' : night_number  } đêm </div>
                                                                                                        : null
                                                                                                }
                                                                                            </span>
                                                                                        )
                                                                                    }) : null
                                                                                }

                                                                                <div className="price" ><span className="text-danger"> {GlobalJs.format_currency((item_hotel_price.price_1 * searchParams.get('room_number') * night_number ) + item_hotel_price.price_bed_extra_1_1)} VND</span> / {night_number == 1 ? '' : night_number  }  đêm </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between">
                                                                            <div className="pay-room-included d-flex align-items-center">
                                                                                <div className="icon-pay-room">
                                                                                    <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/96621c946e5603a11ceef2c0b7850b45.svg' />
                                                                                </div>
                                                                                <div className="content-pay-room ">
                                                                                    <span className="text-primary">{textShow ? textShow.Apply_Pay_Check_In : ''}     <br />
                                                                                    {textShow ? textShow.Apply_Pay_Check_In_1 : ''}
                                                                                    </span>
                                                                                    <div className="content-pay-room-dropdow">
                                                                                        <span>
                                                                                            {textShow ? textShow.Apply_Pay_Check_In_Text_1 : ''}
                                                                                            <br />
                                                                                            {textShow ? textShow.Apply_Pay_Check_In_Text_2 : ''}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right">

                                                                                <div className="last-price">
                                                                                    <span className="text-primary">{textShow ? textShow.Last_Price : ''}</span>
                                                                                    <div className="last-price-dropdow">

                                                                                        <div className="text-last-price-dropdow">{textShow ? textShow.Room_Prices : ''}</div>

                                                                                        <div className="d-flex justify-content-between">
                                                                                            <div className="title">{textShow ? textShow.Room_Prices : ''} {night_number} {textShow ? textShow.Night : ''} </div>
                                                                                            <div className="price">{GlobalJs.format_currency((item_hotel_price.price_1 * searchParams.get('room_number') * night_number) + item_hotel_price.price_bed_extra_1_1 - (item_hotel_price.fee_company_1 * searchParams.get('room_number') * night_number) )} VND</div>
                                                                                        </div>
                                                                                        <div className="d-flex justify-content-between">
                                                                                            <div className="title">{textShow ? textShow.Company_Fee : ''} {night_number} {textShow ? textShow.Night : ''} </div>
                                                                                            <div className="price">{GlobalJs.format_currency(item_hotel_price.fee_company_1 * night_number )} VNĐ</div>
                                                                                        </div>

                                                                                        <hr></hr>
                                                                                        <div className="d-flex justify-content-between all-toltal">
                                                                                            <div className="title">{textShow ? textShow.Total_Money : ''}</div>
                                                                                            <div className="price">{GlobalJs.format_currency((item_hotel_price.price_1 * searchParams.get('room_number')  * night_number) + item_hotel_price.price_bed_extra_1_1)} VND </div>
                                                                                        </div>



                                                                                    </div>
                                                                                </div>

                                                                                <button type="button" className="btn btn-primary" onClick={()=>add_cart(item,item_hotel_price)}>
                                                                                    <span>{textShow ? textShow.Booking : ''}</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <hr></hr>
                                                                        <div >
                                                                            {add(index, item_hotel_price, index_hotel_price)}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }) : null
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        
                                    )
                                }) : null
                            }
                        </div>
                        <div className="room-list room-list-mb">
                            {
                                dataList ? dataList.map((item, index) => {
                                    return (
                                        <div className="room-list-item-mb" key={index}>
                                            <div className="hotel-room-info">
                                                <div className="room-imgs">
                                                    <div className="image-room">
                                                        <img src={item.avatar} />
                                                    </div>
                                                    <div className="room-imgs-count" onClick={() => hotelhandleShow(item)} >Thêm hình ảnh ( {item.img.length} )</div>
                                                </div>
                                                <div>

                                                    <div className="room-name">
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <div className="service-list">
                                                        <div className="service-item">
                                                            {
                                                                item.hotel_gadget_name ? item.hotel_gadget_name.map((item_service, index_service) => {
                                                                    return (

                                                                        <div className="service" key={index_service}>
                                                                            <span>{item_service}</span>
                                                                        </div>
                                                                    )
                                                                }) : null
                                                            }

                                                        </div>
                                                    </div>

                                                    <button className="btn btn-primary form-control see-details mb-3" onClick={() => hotelhandleShow(item)}>
                                                        Xem Chi Tiết Phòng
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='hotel-rate-list'>
                                                {
                                                    item.hotel_price ? item.hotel_price.map((item_hotel_price, index_hotel_price) => {

                                                        return (
                                                            <div className={`room-info-price ${index_hotel_price == 0 ? '' : 'mt-4'}`} key={index_hotel_price}>
                                                                <div className="room-rate-info">
                                                                    <div className="mb-2">{item.name}</div>
                                                                    <div className="">
                                                                        <div className="">
                                                                            <div className="d-flex align-items-center">
                                                                                <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/34f5976a0369969f82cb666b17aebf99.svg' />
                                                                                <span >{item.desc_number_room} Giường</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="">
                                                                            <div className="d-flex align-items-center">
                                                                                <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/e/ed2587afbf72ad57cc07360a2a3cd783.svg' />
                                                                                <span >{item.max_customer} người lớn, {item.max_customer_child} trẻ em </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="">
                                                                            <span className="text-danger">({item.quantity} phòng trống)</span>
                                                                        </div>
                                                                    </div>
                                                                    <hr></hr>


                                                                    <div className="d-flex align-items-center">
                                                                        <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/a5be12e728bdb331c596c7c181667dca.svg' />
                                                                        <span>Không gồm bữa sáng</span>
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/5/5a913a9638da9c963966d8a962306abd.svg' />
                                                                        <span>WiFi miễn phí</span>
                                                                    </div>


                                                                    <div className="d-flex align-items-center">
                                                                        <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b7f44a75a61d79df6226747661f37ca0.svg' />
                                                                        <span>Hủy phòng có thu phí</span>
                                                                    </div>
                                                                    <div className="cancellation-policyi">
                                                                        <div className="d-flex align-items-center">
                                                                            <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/93d682fb169004ee2a60c098735dd3da.svg' />
                                                                            <span className="text-primary">Xem Chính sách huỷ phòng</span>
                                                                        </div>
                                                                        <div className="cancellation-policyi-dropdow">

                                                                            <span>
                                                                                {textShow ? textShow.View_Cancellation_Policy_Text_1 : ''}
                                                                                <br />
                                                                                {textShow ? textShow.View_Cancellation_Policy_Text_2 : ''}
                                                                                <br />
                                                                                {textShow ? textShow.View_Cancellation_Policy_Text_3 : ''}
                                                                            </span>

                                                                        </div>
                                                                    </div>




                                                                    <div className=" d-flex align-items-center">
                                                                        <div className="icon-pay-room">
                                                                            <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/96621c946e5603a11ceef2c0b7850b45.svg' />
                                                                        </div>
                                                                        <div className="content-pay-room ">
                                                                            <span className="text-primary">Thanh toán khi nhận phòng     <br />
                                                                                Đặt KHÔNG cần thanh toán trước! Tiết kiệm cho đến khi nhận phòng!
                                                                            </span>
                                                                            <div className="content-pay-room-dropdow">
                                                                                <span>
                                                                                    {textShow ? textShow.Apply_Pay_Check_In_Text_1 : ''}
                                                                                    <br />
                                                                                    {textShow ? textShow.Apply_Pay_Check_In_Text_2 : ''}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex justify-content-between">
                                                                        <div className="">
                                                                            {
                                                                                item_hotel_price.price_public_arr ? item_hotel_price.price_public_arr.map((item_price_public, index_price_public) => {
                                                                                    return (
                                                                                        <span key={index_price_public}>
                                                                                            {

                                                                                                index_price_public == date ?
                                                                                                    <div className="dis_price" >{GlobalJs.format_currency(item_price_public * searchParams.get('room_number')  * night_number)  } VND /{night_number == 1 ? '' : night_number  } đêm </div>
                                                                                                    : null
                                                                                            }
                                                                                        </span>
                                                                                    )
                                                                                }) : null
                                                                            }
                                                                            <div className="price" ><span className="text-danger"> {GlobalJs.format_currency((item_hotel_price.price_1 * searchParams.get('room_number') * night_number ) + item_hotel_price.price_bed_extra_1_1)} VND</span> / {night_number == 1 ? '' : night_number  }  đêm </div>
                                                                        </div>
                                                                        <div className="text-right">

                                                                            <div className="last-price">
                                                                                <span className="text-primary">{textShow ? textShow.Last_Price : ''}</span>
                                                                                <div className="last-price-dropdow">

                                                                                    <div className="text-last-price-dropdow">{textShow ? textShow.Room_Prices : ''}</div>

                                                                                    <div className="d-flex justify-content-between">
                                                                                        <div className="title">{textShow ? textShow.Room_Prices : ''} {night_number} {textShow ? textShow.Night : ''} </div>
                                                                                        <div className="price">{GlobalJs.format_currency((item_hotel_price.price_1 * searchParams.get('room_number') * night_number) + item_hotel_price.price_bed_extra_1_1 - (item_hotel_price.fee_company_1 * searchParams.get('room_number') * night_number) )} VND</div>
                                                                                    </div>
                                                                                    <div className="d-flex justify-content-between">
                                                                                        <div className="title">{textShow ? textShow.Company_Fee : ''} {night_number} {textShow ? textShow.Night : ''} </div>
                                                                                        <div className="price">{GlobalJs.format_currency(item_hotel_price.fee_company_1 * night_number )} VNĐ</div>
                                                                                    </div>

                                                                                    <hr></hr>
                                                                                    <div className="d-flex justify-content-between all-toltal">
                                                                                        <div className="title">{textShow ? textShow.Total_Money : ''}</div>
                                                                                        <div className="price">{GlobalJs.format_currency((item_hotel_price.price_1 * searchParams.get('room_number') * night_number) + item_hotel_price.price_bed_extra_1_1)} VND </div>
                                                                                    </div>



                                                                                </div>
                                                                            </div>

                                                                            <button type="button" className="btn btn-primary" onClick={()=>add_cart(item,item_hotel_price)}>
                                                                                <span>{textShow ? textShow.Booking : ''}</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <hr></hr>
                                                                        <div >
                                                                            {add(index, item_hotel_price, index_hotel_price)}

                                                                        </div>

                                                                </div>
                                                            </div>
                                                        )
                                                    }) : null
                                                }
                                            </div>
                                        </div>
                                    )
                                }) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal
                show={hotelshow} onHide={hotelhandleClose}

                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modal_reviews"

            >   <Modal.Header closeButton className="main_tour_detail_header_md">

                </Modal.Header>
                <Modal.Body>
                    <div className="reviews-container">
                        <div className="reviews-container-left">

                            <Swiper
                                cssMode={true}
                                navigation={true}
                                slidesPerView={1}
                                modules={[Navigation]}
                                className="mySwiper"
                            >
                                {
                                    itemModel ? itemModel.img.map((item, index) => {
                                        return (
                                            <SwiperSlide key={index}>

                                                <img className="banner-img" src={item} />

                                            </SwiperSlide>
                                        )
                                    }) : null
                                }
                            </Swiper>
                        </div>
                        <div className="reviews-container-right">
                            <div className="detail-room">
                                <div className="detail-title-room">
                                    <div className="title-room">{textShow ? textShow.View_room : ''}</div>
                                    <div className="package-detail-content details-content-scroll">
                                        <div className="package-detail-content-of-seciton">
                                            <div className="act-side-package-detail">
                                                <div className="act-side-package-detail-title">{textShow ? textShow.About_Room : ''}</div>
                                                <div className="markdown">

                                                    <ul>
                                                        <li>{textShow ? textShow.Type_Of_Room : ''}: {itemModel.name}.</li>
                                                        <li>{textShow ? textShow.Room_Size : ''}: {itemModel.acreage} m².</li>
                                                        <li>{textShow ? textShow.Max_Adult : '' }: {itemModel.max_customer} .</li>
                                                        <li>{textShow ? textShow.Max_Children : '' }: {itemModel.max_customer_child} .</li>
                                                        <li>{textShow ? textShow.Number_Beds : '' }: {itemModel.desc_number_room}.</li>
                                                        <li>{textShow ? textShow.Type_Beds : '' }: {itemModel.hotel_bed_type_name}.</li>

                                                        <li>{itemModel.window == 1 ? `${textShow.Have_Window}` : `${textShow.Have_Not_Window}`}.</li>
                                                        <li>{itemModel.extra_bed == 1 ? `${textShow.Have_Xtra_Bed}` : `${textShow.Have_Not_Xtra_Bed}`}.</li>
                                                       


                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="act-side-package-detail">
                                                <div className="act-side-package-detail-title">{textShow ? textShow.Type_Beds : '' }</div>
                                                <div className="convenient">
                                                    <ul>
                                                        {
                                                             itemModel ? itemModel.hotel_gadget_name.map((item, index) => {
                                                                return (
                                                                    <li key={index}>{item}</li>
                                                                  
                                                                )
                                                            }) : null
                                                        }
                                                       
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="title-room-bot">
                                        <span className="price"><span className="text-danger">2,300,000 VND </span>/{textShow ? textShow.Night : ''}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </main>
    )
}
const mapStateToProps = state => ({
    hotelDetailInfo: state.hotelDetailInfo,
    hotelPriceInfo: state.hotelPriceInfo,

});
export default connect(mapStateToProps, actions)(Stay);