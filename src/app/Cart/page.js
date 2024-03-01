/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper";
import { Steps, useSteps } from "react-step-builder";
import Link from 'next/link'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Modal from 'react-bootstrap/Modal';
import * as actions from "../../../redux/actions";
import { connect } from "react-redux";
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE } from '../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../js/lang';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as GlobalJs from "../../../js/global"
import {Button} from "react-bootstrap";
import {removeCartAction} from "../../../redux/actions";
import {convertToInteger} from "../../../js/global";
function Index(props) {
    let [dataCartList, setdataCartList] = useState([]);

    const [textShow, setTextShow] = useState('');
    const [pageStep, setPageStep] = useState(1)
    const [allTotal, setallTotal] = useState(0);

    const [totalItem, setTotalItem] = useState(0);



    const [loadingPage, setLoadingPage] = useState(false)
    const [loadingAdult, setLoadingAdult] = useState(false)
    const [loadingChild, setLoadingChild] = useState(false)

    const [loadingRoom, setLoadingRoom] = useState(false)
    const [loadingExtra, setLoadingExtra] = useState(false)

    const [loadingInput, setLoadingInput] = useState(false)

    const [totalTour, setTotalTour] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [carChoose, setCarChoose] = useState(2);
    const addCustomerModel = () => setAddCustomerModel(true);

    const [lenghtItem, setLenghtItem] = useState('')
    const [show, setShow] = useState(false);
    const [numberAdult, setNumberAdult] = useState(1);
    const [numberChild, setNumberChild] = useState(0);
    const [checkedItem, setCheckedItem] = useState(true)
    const [tot, setTot] = useState(0)


    useEffect(() => {
        props.getToCartAction()
    },[])

    let listItemCart = props ? props.getToCart : '';
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        setCartItems(listItemCart)
    },[listItemCart])

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + parseInt(item.total_price) ;
        }, 0);
        setCartItems(cartItems);
        setTot(totalPrice);
    }, [cartItems]);
    console.log(cartItems)
    const removeItemCart = (id) => {
        let newCart = [];
        newCart = cartItems.filter((item) => item.id !== id)
        setCartItems(newCart);

        localStorage.setItem("cartItems",JSON.stringify(newCart));


    }
    // useEffect(() => {
    //     const storedCartItems = localStorage.getItem('cartItems');
    //     if (storedCartItems) {
    //         setCartItems(JSON.parse(storedCartItems));
    //     }
    // }, []);

    const handelIncreseNumberAdult = (item, index) => {
        const updatedCartItems = [...cartItems];
        let cartItem = updatedCartItems[index];

        if (cartItem) {
            cartItem.adult += 1;
            cartItem.total_price = cartItem.adult * cartItem.price + cartItem.child * cartItem.price_child;
        } else {
            cartItem = {
                ...item,
                adult: 0,
            };
            updatedCartItems.push(cartItem);
        }
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };


    const handelDecreseNumberAdult = (item, index) => {
        const updatedCartItems = [...cartItems];
        let cartItem = updatedCartItems[index];

        if (cartItem) {
            cartItem.adult -= 1;
            cartItem.total_price = cartItem.adult * cartItem.price + cartItem.child * cartItem.price_child;
        } else {
            cartItem = {
                ...item,
                adult: 0,
            };
            updatedCartItems.push(cartItem);
        }
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));


    }
    const handelIncreseNumberChild = (item, index) => {
        const updatedCartItems = [...cartItems];
        let cartItem = updatedCartItems[index];

        if (cartItem) {
            cartItem.child += 1;
            cartItem.total_price = cartItem.adult * cartItem.price + cartItem.child * cartItem.price_child;
        } else {
            cartItem = {
                ...item,
                child: 0,
            };
            updatedCartItems.push(cartItem);
        }
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
    const handelDecreseNumberChild = (item, index) => {
        const updatedCartItems = [...cartItems];
        let cartItem = updatedCartItems[index];

        if (cartItem) {
            cartItem.child -= 1;
            cartItem.total_price = cartItem.adult * cartItem.price + cartItem.child * cartItem.price_child;
        } else {
            cartItem = {
                ...item,
                child: 0,
            };
            updatedCartItems.push(cartItem);
        }
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    }
    let moneyRequest = 6000000;
    // const sum_all = () => {
    //     let total = 0;
    //     dataCartList.forEach((item, index) => {
    //         if (item.type_check) {
    //             total += parseInt(item.price)
    //         }
    //     });
    //     setTot(total)
    // }


    // let number_Adult_ss =  parseInt(sessionStorage.getItem("numberAdult"));
    // let number_Child_ss = parseInt(sessionStorage.getItem("numberChild"));

    const handleClose = () => setShow(false);
    const handleShow = async (item, index) => {
        setShow(true);

    }


    let [inputModal, setInputModal] = useState([{
        name: '',
        phone: '',
    }])
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

    const pay_cart = async () => {

        if (allTotal == 0) {
            Toast.fire({
                title: "Chưa chọn đơn hàng thanh toán",
                icon: "error"
            })
            return false
        }
        if (paymentMethod == '') {
            Toast.fire({
                title: "Chưa chọn phương thức thanh toán",
                icon: "error"
            })
            return false
        }

        let url_api = BASE_URL_API + "Balotour/Cart/add_golf_package_tour"
        let token = await GET_TOKEN();

        let fd = new FormData()

        fd.append("cart_json", dataCartList ? JSON.stringify(dataCartList) : '')
        fd.append("price_tour_total", totalTour ? totalTour : '')
        fd.append("total_bill", allTotal ? allTotal : '')
        fd.append("payment_method_id", paymentMethod ? paymentMethod : '')


        axios.post(url_api, fd, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN': JSON.parse(token),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {
            console.log(response.data.data.code)
            Toast.fire({
                title: "Thanh toán thành công",
                icon: "success"
            })
            window.location.replace(BASE_URL + 'ViewVoucher?code=' + response.data.data.code);
        })
            .catch(function (error) {
                console.log(error);
            });

    };

    const delete_cart = async (item, index) => {

        let url_api = BASE_URL_API + "Balotour/Cart/deleteCart"
        let token = await GET_TOKEN();

        let fd = new FormData()
        fd.append("id", item.id)

        axios.post(url_api, fd, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN': JSON.parse(token),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {

            Toast.fire({
                title: "Xóa dịch vụ thành công",
                icon: "success"
            })

            window.location.reload("/")


        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const chooseCar = async (item, index, e) => {
        let price_car = parseInt(item.car * item.price_1_car)
        let total_right = 0;
        if (parseInt(e.target.value) == 1) {
            total_right = parseInt(allTotal) - parseInt(price_car);
        } else {
            total_right = parseInt(allTotal) + parseInt(price_car);

        }
        if (document.getElementById("check_input_cart_" + item.id).type_check) {
            setallTotal(total_right)
        }

        let total_adult = item.number * (item.price_1_person)
        let total_child = item.number * (item.price_1_child)

        if (item['page'] == 'golf') {
            if (parseInt(e.target.value) == 2) {
                if (item.number > 2) {
                    let total_new = (total_adult + total_child + parseInt(item.price_1_car * 2))
                    dataCartList[index].total = total_new

                } else {
                    let total_new = (total_adult + total_child + parseInt(item.price_1_car))
                    dataCartList[index].total = total_new
                }
            } else {
                let total_new = (total_adult + total_child)
                dataCartList[index].total = total_new
            }
        }
        setCarChoose(e.target.value)
    }

    const sum_all_total = () => {
        // let total = 0;
        // dataCartList.forEach((item, index) => {
        //     if (item.type_check) {
        //         total += parseInt(item.total)
        //     }
        // });
        // setallTotal(total)
    }


    const plusNumber = (item, index) => {
        let number_new = parseInt(item.number) + 1;
        let number_new_child = parseInt(item.number_child);

        if (item.page == 'tour') {
            if (item.number == item.tour.max_customer) {
                Toast.fire({

                    title: "Số người tối đa đã đủ",
                    icon: "error"
                })
                return false
            }
        }
        if (item.page == 'golf_package') {
            if (item.number == item.golf_package.max_customer) {
                Toast.fire({

                    title: "Số người tối đa đã đủ",
                    icon: "error"
                })
                return false
            }
        }
        if (item.page == 'golf') {
            if (item.number == 4) {
                Toast.fire({

                    title: "Số người tối đa đã đủ",
                    icon: "error"
                })
                return false
            }
        }

        dataCartList[index].number = number_new
        dataCartList[index].car = parseInt(number_new) >= 3 ? 2 : 1
        setLoadingAdult(!loadingAdult)
        let value_detail = {
            id: item.id,
            number: number_new,
            number_child: number_new_child,
            carChoose: carChoose,
        }
        editCart(value_detail, 'adult', index)
    }

    const minusNumber = (item, index) => {

        let number_new = parseInt(item.number) - 1;
        let number_new_child = parseInt(item.number_child);

        if (item.page == 'tour') {
            if (item.number == item.tour.min_customer) {
                Toast.fire({
                    title: "Số người tối thiểu đã đủ",
                    icon: "error"
                })
                return false
            }
        }
        if (item.page == 'golf_package') {
            if (item.number == item.golf_package.min_customer) {
                Toast.fire({
                    title: "Số người tối thiểu đã đủ",
                    icon: "error"
                })
                return false
            }
        }
        if (item.page == 'golf') {

            if (number_new < 1) {
                Toast.fire({
                    title: "Số người tối thiểu đã đủ",
                    icon: "error"
                })
                return false
            }
        }
        if (item.page == 'hotel') {

            if (number_new < 1) {
                Toast.fire({
                    title: "Số người tối thiểu đã đủ",
                    icon: "error"
                })
                return false
            }
        }
        dataCartList[index].number = number_new
        dataCartList[index].car = parseInt(number_new) >= 3 ? 2 : 1
        setLoadingAdult(!loadingAdult)
        let value_detail = {
            id: item.id,
            number: number_new,
            number_child: number_new_child,
        }
        editCart(value_detail, 'adult', index)

    }

    const plusNumber_child = (item, index) => {

        let number_new = parseInt(item.number_child) + 1;
        let number_new_adult = parseInt(item.number);

        if (item.page == 'tour') {
            if (item.number_child == item.tour.max_customer) {
                Toast.fire({
                    title: "Số trẻ em tối đa đã đủ",
                    icon: "error"
                })
                return false
            }
        }
        if (item.page == 'golf_package') {
            if (item.number_child == item.golf_package.max_customer) {
                Toast.fire({
                    title: "Số trẻ em tối đa đã đủ",
                    icon: "error"
                })
                return false
            }
        }
        if (item.page == 'hotel') {
            if (item.number_child == item.hotel.max_customer_child) {
                Toast.fire({
                    title: "Số trẻ em tối đa đã đủ",
                    icon: "error"
                })
                return false
            }
        }
        dataCartList[index].number_child = number_new
        setLoadingChild(!loadingChild)
        let value_detail = {
            id: item.id,
            number: number_new_adult,
            number_child: number_new,
        }
        editCart(value_detail, 'child', index)
    }

    const minusNumber_child = (item, index) => {
        let number_new = parseInt(item.number_child) - 1;
        let number_new_adult = parseInt(item.number);
        if (number_new < 0) {
            Toast.fire({
                title: "Số trẻ em tối thiểu đã đủ",
                icon: "error"
            })
            return false
        }
        dataCartList[index].number_child = number_new
        setLoadingChild(!loadingChild)
        let value_detail = {
            id: item.id,
            number: number_new_adult,
            number_child: number_new,
        }
        editCart(value_detail, 'child', index)

    }

    const plusNumber_room = (item, index) => {

        let number_new_room = parseInt(item.number_room_hotel) + 1;
        let number_new_extra = parseInt(item.number_extra_hotel);
        dataCartList[index].number_room_hotel = number_new_room

        setLoadingRoom(!loadingRoom)
        let value_detail = {
            id: item.id,
            room: number_new_room,
            extra: number_new_extra,
            carChoose: carChoose,
        }
        editCart(value_detail, 'room', index)
    }
    const minusNumber_room = (item, index) => {

        let number_new_room = parseInt(item.number_room_hotel) - 1;

        let number_new_extra = parseInt(item.number_extra_hotel);
        if (number_new_room < number_new_extra) {

            number_new_extra = number_new_extra - 1;
        }
        if (number_new_room < 1) {
            Toast.fire({
                title: "Số phòng tối thiểu đã đủ",
                icon: "error"
            })
            return false
        }
        dataCartList[index].number_room_hotel = number_new_room
        dataCartList[index].number_extra_hotel = number_new_extra

        setLoadingRoom(!loadingRoom)
        let value_detail = {
            id: item.id,
            room: number_new_room,
            extra: number_new_extra,
            carChoose: carChoose,
        }
        editCart(value_detail, 'room', index)

    }
    const plusNumber_extra = (item, index) => {

        let number_new_extra = parseInt(item.number_extra_hotel) + 1;
        let number_new_room = parseInt(item.number_room_hotel);
        if (number_new_extra > item.number_room_hotel) {
            Toast.fire({
                title: "Số giường phụ tối đa đã đủ",
                icon: "error"
            })
            return false
        }
        dataCartList[index].number_extra_hotel = number_new_extra

        setLoadingExtra(!loadingExtra)
        let value_detail = {
            id: item.id,
            room: number_new_room,
            extra: number_new_extra,
            carChoose: carChoose,
        }
        editCart(value_detail, 'extra', index)
    }
    const minusNumber_extra = (item, index) => {

        let number_new_extra = parseInt(item.number_extra_hotel) - 1;
        let number_new_room = parseInt(item.number_room_hotel);
        if (number_new_extra < 0) {
            Toast.fire({
                title: "Số giường phụ tối thiểu đã đủ",
                icon: "error"
            })
            return false
        }
        dataCartList[index].number_extra_hotel = number_new_extra

        setLoadingExtra(!loadingExtra)
        let value_detail = {
            id: item.id,
            room: number_new_room,
            extra: number_new_extra,
            carChoose: carChoose,
        }
        editCart(value_detail, 'extra', index)
    }
    const editCart = async (value_detail, type, index) => {

        let url_api = BASE_URL_API + "Balotour/Cart/updateCart"
        let token = await GET_TOKEN();

        let fd = new FormData()
        fd.append("id", value_detail.id)
        fd.append("number", value_detail.number)
        fd.append("number_child", value_detail.number_child)
        fd.append("room", value_detail.room)
        fd.append("extra", value_detail.extra)
        fd.append("type", type)
        fd.append("carchoose", carChoose)

        axios.post(url_api, fd, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN': JSON.parse(token),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {

            dataCartList[index].total = response.data.data.total
            dataCartList[index].tour_price_details_id = response.data.data.tour_price_details_id
            setLoadingPage(!loadingPage)
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const checkItem = (typeCheck) => {
        props.removeCartAction(typeCheck)
        setCheckedItem(!checkedItem)

    }

    // const checkCartItemInfo = (item, index) => {
    //     if(document.getElementById("check_input_cart_" + item.id).checked){
    //         let total = 0;
    //         cartItems.forEach((item, index) => {
    //                 total += parseInt(item.total_price);
    //         });
    //         console.log(total)
    //
    //     }
    //     else {
    //         console.log("tru ra" + item.id)
    //     }
    // }

    const checkCardItem = async (item, index) => {
        let total_right = 0;
        // dataCartList[index].actionCheck = !dataCartList[index].actionCheck
        if (document.getElementById("check_input_cart_" + item.id).checked) {
            total_right = parseInt(item.total) + parseInt(allTotal)
            setLenghtItem(parseInt(lenghtItem) + 1)
        }
        else {
            total_right = parseInt(allTotal) - parseInt(item.total)
            setLenghtItem(lenghtItem - 1)

        }
        setLoadingPage(!loadingPage)
        setallTotal(total_right)
        // let url_api = BASE_URL_API + "Balotour/Cart/checkCardItem"
        // let token = await GET_TOKEN();
        //
        // let fd = new FormData()
        //
        // fd.append("id", item.id)
        //
        //
        //
        // axios.post(url_api, fd, {
        //     headers: {
        //         "x-api-key": "api_key",
        //         'USER-TOKEN': JSON.parse(token),
        //         "Content-Type": "multipart/form-data"
        //     }
        // }).then(async function (response) {
        //     console.log(response)
            // Toast.fire({
            //     title: "Thanh toán thành công",
            //     icon: "success"
            // })

        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }

    const addRowInput = () => {
        let row_input = {
            name: '',
            phone: '',
        }
        inputModal.push(row_input)
        setInputModal(inputModal)
        setLoadingInput(!loadingInput)
    }
    useEffect(() => {
        props.fetchTourList('', '', '', '', '', '', '', 1);
        props.fetchGolfList('', '', 1)
        props.fetchAddCartList()
        props.getToCartAction()
        getLangText()
    }, [])
    const getLangText = async () => {
        let lang_code = await GET_LANG_CODE();
        let lang_text ={}
        switch (JSON.parse(lang_code)) {



            case 'vi':
                lang_text = GET_LANG_vi().cart
                break;
            default:
                lang_text = GET_LANG_ko().cart
                break;
        }
        setTextShow(lang_text)
    }

    let add_cart_list = props.addCartInfo.data && props.addCartInfo.isLoading == false && props.addCartInfo.data.cart ? props.addCartInfo.data.cart : '';
    let lenght= props.addCartInfo.data && props.addCartInfo.isLoading == false && props.addCartInfo.data.cart ? props.addCartInfo.data.lenght : '';
    let payment_method_list = props.addCartInfo.data && props.addCartInfo.isLoading == false && props.addCartInfo.data.cart ? props.addCartInfo.data.payment_method_list : '';
    let total_all_item = props.addCartInfo.data && props.addCartInfo.isLoading == false && props.addCartInfo.data.cart ? props.addCartInfo.data.total : '';
    let tour_list = props.privateTourListInfo.data && props.privateTourListInfo.isLoading == false ? props.privateTourListInfo.data : '';
    let count_tour = tour_list.length;
    let number_silde_tour = Math.ceil(count_tour / 4)
    var data_tour_arr = [];
    for (var i = 1; i <= number_silde_tour; i++) {
        let off = (i - 1) * 4;
        let limit = i * 4;
        let sliceData = tour_list.slice(off, limit);
        data_tour_arr.push(sliceData);
    }


    let golf_list = props.golfListInfo.data && props.golfListInfo.isLoading == false ? props.golfListInfo.data : '';
    let count_golf = golf_list.length;
    let number_silde_golf = Math.ceil(count_golf / 4)
    var data_golf_arr = [];
    for (var i = 1; i <= number_silde_golf; i++) {
        let off = (i - 1) * 4;
        let limit = i * 4;
        let sliceData = golf_list.slice(off, limit);
        data_golf_arr.push(sliceData);
    }



    useEffect(() => {
        setdataCartList(dataCartList)
        sum_all_total()
    }, [loadingAdult, loadingPage])

    useEffect(() => {
        setdataCartList(dataCartList)
        sum_all_total()
    }, [loadingChild])

    useEffect(() => {
        setdataCartList(dataCartList)
        sum_all_total()
    }, [loadingRoom, loadingPage])

    useEffect(() => {
        setdataCartList(dataCartList)
        sum_all_total()
    }, [loadingExtra])

    useEffect(() => {
        setInputModal(inputModal)
    }, [loadingInput])

    useEffect(() => {
        setallTotal(total_all_item)
    }, [total_all_item])

    useEffect(() => {
        setdataCartList(add_cart_list)
        setLenghtItem(lenght)
    }, [add_cart_list])

    const addName = async (e, index) => {
        inputModal[index].name = e.target.value
        setInputModal(inputModal)
        setLoadingInput(!loadingInput)
    }
    const addPhone = async (e, index) => {
        inputModal[index].phone = e.target.value
        setInputModal(inputModal)
        setLoadingInput(!loadingInput)
    }


    return (
        <main>
            <div className="main_cart">
                <div className="container page_cart">
                    <h2 className="header_title pt-4 mb-4">{textShow ? textShow.Cart : ''}</h2>
                    <div className="row">
                        <div className="col-sm-9 col-md-12 col-xl-9">
                            {

                                cartItems ? cartItems.map((item, index) => {
                                    return (
                                        <div className="cart-item mb-4" key={index} >
                                            <div className="row">
                                                {/*<div className="col-sm-1">*/}
                                                {/*    <div>*/}
                                                {/*        <input defaultChecked={checkedItem} onChange={() => checkItem(checkedItem)} className="form-check-input" id={`check_input_cart_${item.id}`} type="checkbox" onClick={() => checkCartItemInfo(item, index)} />*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                <div className="col-sm-3">
                                                    <div >
                                                        <img src={item.image ? item.image[0] : ''} className="image_cart " />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 col-md-3 col-xl-4">
                                                    <div className="mb-2 title_cart">
                                                        {item.name}
                                                    </div>
                                                    <div className="mb-2">
                                                        {item.page == 'golf' ? `${textShow ? textShow.Golf_Services : ''}` : ''}
                                                        {item.page == 'tour' ? `${textShow ? textShow.Tour_Services : ''}` : ''}
                                                        {item.page == 'golf_package' ? `${textShow ? textShow.Golf_Package_Service : ''}` : ''}
                                                        {item.page == 'hotel' ? `${textShow ? textShow.Hotel_Services : ''}` : ''}


                                                    </div>
                                                    <div className="mb-2">

                                                        {   item.page == 'golf' ?
                                                            <span>
                                                                {item.number}  {textShow ? textShow.Adult : ''}, {textShow ? textShow.Area : ''} {item.ground_name}, {item.hole} {textShow ? textShow.Holes : ''}
                                                            </span>
                                                            :   ''
                                                        }
                                                        {
                                                            item.page == 'golf_package' ?
                                                                <span>
                                                             {item.number} {textShow ? textShow.Adult : ''}, {item.number_child} {textShow ? textShow.Children : ''}, {item.type_room == 2 ? `${textShow.P2r1}` : `${textShow.P1r1}`}
                                                            </span>
                                                                : ''
                                                        }
                                                        {
                                                            item.page == 'tour'?
                                                                <span>
                                                            {item.number} {textShow ? textShow.Adult : ''}, {item.number_child} {textShow ? textShow.Children : ''},  {item.tour.tour_type == 1 ? `${textShow.Private_Tour}` : item.tour.tour_type == 2 ? `${textShow.Compound_Tour}` : `${textShow.Car_Tour}`}
                                                            </span>
                                                                :''
                                                        }
                                                        {
                                                            item.page == 'hotel'?
                                                                <span>
                                                            {item.number} {textShow ? textShow.Adult : ''}, {item.number_child} {textShow ? textShow.Children : ''}, {item.number_room_hotel} {textShow ? textShow.Room : ''}, {item.number_extra_hotel} {textShow ? textShow.Extra_Bed : ''}
                                                            </span>
                                                                :''
                                                        }

                                                    </div>
                                                </div>
                                                <div className="col-sm-2">

                                                    {
                                                        item.page == 'golf' ?
                                                            <div>
                                                                <div className="mb-2 "><div>{textShow ? textShow.Golf_day : ''}: {item.date} </div></div>
                                                                <div className=""><div>{textShow ? textShow.Time : ''}: {item.time} </div></div>
                                                            </div>


                                                            : ''
                                                    }
                                                    {
                                                        item.page == 'tour' ?
                                                            <div>

                                                                <div className="mb-2 "><div>{textShow ? textShow.Go : ''}: {item.date} </div></div>
                                                                <div className="mb-2 "><div>{textShow ? textShow.Back_Go : ''}: {item.date_end} </div></div>
                                                                <div className=" "><div>{textShow ? textShow.Time : ''}: {item.time} </div></div>
                                                            </div>


                                                            : ''
                                                    }
                                                    {
                                                        item.page == 'golf_package' ?
                                                            <div >

                                                                <div className="mb-2 "><div>{textShow ? textShow.Go : ''}: {item.date} </div></div>
                                                                <div className="mb-2 "><div>{textShow ? textShow.Back_Go : ''}: {item.date_end} </div></div>
                                                                <div className=""><div>{textShow ? textShow.Time : ''}: {item.time} </div></div>
                                                            </div>


                                                            : ''
                                                    }
                                                    {
                                                        item.page == 'hotel' ?
                                                            <div className="">

                                                                <div className="mb-2 "><div>{textShow ? textShow.Check_In_Date_Hotel : ''}: {item.date} </div></div>
                                                                <div className=""><div>{textShow ? textShow.Check_Out_Date_Hotel : ''}: {item.date_end} </div></div>

                                                            </div>


                                                            : ''
                                                    }


                                                </div>
                                                <div className="col-sm-2  col-md-3 col-xl-2">
                                                    {
                                                        item.page != 'hotel' ?
                                                            <div className="d-flex  couter_cart ">
                                                                <div className="mb-2">
                                                                    <div>{textShow ? textShow.Adult : ''}</div>
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <Button id='btn_minus' className="counter-btn " onClick={() => handelDecreseNumberAdult(item, index)}><span>-</span></Button>
                                                                        <span className="counter-count px-3">{item.adult}</span>
                                                                        <Button id='btn_plus' className="counter-btn" onClick={() => handelIncreseNumberAdult(item, index)}><span>+</span></Button>
                                                                    </div>
                                                                </div>
                                                            </div> : ''
                                                    }

                                                    {
                                                        item.page != 'golf' && item.page != 'hotel' ?
                                                            <div className="d-flex couter_cart ">
                                                                <div className="mb-2">
                                                                    <div>{textShow ? textShow.Children : ''}</div>
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <Button id='btn_minus' className="counter-btn" onClick={() => handelDecreseNumberChild(item, index)}><span>-</span></Button>
                                                                        <span className="counter-count px-3">{item.child}</span>
                                                                        <Button id='btn_plus' className="counter-btn" onClick={() => handelIncreseNumberChild(item, index)}><span>+</span></Button>
                                                                    </div>
                                                                </div>
                                                            </div> : ''
                                                    }
                                                    {
                                                        item.page == 'hotel' ?
                                                            <div className="d-flex couter_cart ">
                                                                <div>
                                                                    <div>{textShow ? textShow.Room : ''}</div>
                                                                    <div className="d-flex ">
                                                                        <button id='btn_minus' className="counter-btn" onClick={() => minusNumber_room(item, index)}><span>-</span></button>
                                                                        <span className="counter-count">{item.number_room_hotel}</span>
                                                                        <button id='btn_plus' className="counter-btn" onClick={() => plusNumber_room(item, index)}><span>+</span></button>
                                                                    </div>
                                                                </div>
                                                            </div> : ''
                                                    }
                                                    {
                                                        item.page == 'hotel' ?
                                                            <div className="d-flex couter_cart ">
                                                                <div>
                                                                    <div>{textShow ? textShow.Extra_Bed : ''}</div>
                                                                    <div className="d-flex ">
                                                                        <button id='btn_minus' className="counter-btn" onClick={() => minusNumber_extra(item, index)}><span>-</span></button>
                                                                        <span className="counter-count">{item.number_extra_hotel}</span>
                                                                        <button id='btn_plus' className="counter-btn" onClick={() => plusNumber_extra(item, index)}><span>+</span></button>
                                                                    </div>
                                                                </div>
                                                            </div> : ''
                                                    }

                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="d-flex justify-content-between price_cart_list pt-2 mt-4">
                                                        <div>
                                                            <a className="delete_cart text-primary" onClick={() => removeItemCart(item.id)}>{textShow ? textShow.Delete : ''}</a>
                                                        </div>
                                                        <div>
                                                            <span className="price_cart text-danger" >{GlobalJs.format_currency(item.total_price)} VNĐ</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : null
                            }
                        </div>
                        <div className="col-sm-3 col-md-6 col-xl-3">
                            <div className="payment_content_cart mb-3">
                                <div className=" mb-2">{textShow ? textShow.Total : ''} ( <span className="text-primary ">{lenghtItem}</span> {textShow ? textShow.Unit : ''} )</div>
                                <div className="total_amount_cart text-danger  mb-2">
                                    <span>{GlobalJs.format_currency(tot)} VNĐ</span>
                                </div>
                                {/* <div className="payment_method_cart mb-2">
                                    <label>Phương thức thanh toán</label>
                                    <select className="form-control" onChange={(e) => setPaymentMethod(e.target.value)}>
                                        <option value="">Chọn phương thức thanh toán</option>
                                        {
                                            payment_method_list ? payment_method_list.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={index} >{item.name}</option>
                                                )
                                            }) : null
                                        }
                                    </select>
                                </div> */}
                                {/* <div className="button-pay">
                                    <button type="button" className="text-white payment_add_cart" onClick={() => pay_cart()}>
                                        <span>Thanh toán ngay </span>
                                    </button>
                                </div> */}
                                {   cartItems != '' ?
                                    (<Link href="/Booking?id=305">
                                        <button type="button" className="text-white btn btn-primary form-control" >
                                            <span>{textShow ? textShow.Next : ''}</span>
                                        </button>
                                    </Link>) : ''
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
    userInfo: state.userInfo,
    addCartInfo: state.addCartInfo,
    privateTourListInfo: state.privateTourListInfo,
    golfListInfo: state.golfListInfo,
    getToCart: state.getToCart,
});
export default connect(mapStateToProps, actions)(Index);
