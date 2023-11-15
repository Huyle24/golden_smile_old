import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {FaMailBulk, FaMinusCircle, FaPhoneAlt, FaPlusCircle, FaRegCalendarMinus} from "react-icons/fa";
import * as GlobalJs from "../../../js/global";
import Modal from "react-bootstrap/Modal";
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE } from '../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../js/lang';
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import axios from "axios";

function BookingLeft(props){
    const searchParams = useSearchParams();
    const [show, setShow] = useState(false);
    const [tot, setTot] = useState(0)
    let router = useRouter();
    const parse = require('html-react-parser');
    const [dataCartList, setdataCartList] = useState([]);
    const [allTotal, setallTotal] = useState(0);
    const [userInput, setUserInput] = useState([]);
    const [emailInput, setEmailInput] = useState([]);
    const [phoneInput, setPhoneInput] = useState([]);
    const [textShow, setTextShow] = useState('');


    const [nationalityInput, setNationalityInput] = useState([]);
    const [nationalitySelected, setNationalitySelected] = useState();

    const [typePhoneInput, setTypePhoneInput] = useState('');
    const [nameTypePhoneInput, setNameTypePhoneInput] = useState([]);

    const [phone, setPhone] = useState('');
    const [phoneCode, setPhoneCode] = useState('vn');
    const [addressStartInput, setAddressStartInput] = useState('');
    const [addressEndInput, setAddressEndInput] = useState('');

    const [requestInput, setRequestInput] = useState('');
    const [checkboxDefaul, setCheckboxDefaul] = useState(0);

    const [idAddress, setIdAddress] = useState('');

    const [checkboxOrder, setCheckboxOrder] = useState(0);
    const [phone_detail, setphone_detail] = useState('');
    const more = {

        'id_setup_address' : checkboxOrder,
        'request' :  requestInput,
    }



    const [allshow, allsetShow] = useState(false);
    const allhandleClose = () => allsetShow(false);
    const allhandleShow = () => allsetShow(true);

    const [userMoreShow, setUserMoreShow] = useState(false);
    const userMoreleClose = () => setUserMoreShow(false);
    const userMoreleShow = () => setUserMoreShow(true);

    let total_all_item = props.addCartDetailInfo.data && props.addCartDetailInfo.isLoading == false && props.addCartDetailInfo.data.cart ? props.addCartDetailInfo.data.total : '';
    let add_cart_list = props.addCartDetailInfo.data && props.addCartDetailInfo.isLoading == false && props.addCartDetailInfo.data.cart ? props.addCartDetailInfo.data.cart : '';
    let user_data = props.userInfo.data && props.userInfo.isLoading == false ? props.userInfo.data : '';
    let countryUser = props.countryUserInfo.data && props.countryUserInfo.isLoading == false ? props.countryUserInfo.data.country : '';
    let facilityUser = props.countryUserInfo.data && props.countryUserInfo.isLoading == false ? props.countryUserInfo.data.facility : '';
    let setupAddress = props.setupAddressInfo.data && props.setupAddressInfo.isLoading == false ? props.setupAddressInfo.data : '';

    const handleClose = () => {
        setShow(false)
    };

    const handleSubmit = () =>{
        alert('Đã gửi thông tin thành công, Nhanhtravel sẽ liên hệ quý khách sớm nhất!');
        setShow(false)
    }
    const handleShow = () => setShow(true);

    let listCartItem = props ? props.getToCart : '';
    useEffect(() => {
        props.fetchTourDetailW3(searchParams.get('id'))
    },[searchParams.get('id')])
    useEffect(()=> {
        props.getToCartAction();
    },[])

    const [listCart, setListCart] = useState([])


    useEffect(() => {
        let totalPrice = listCart.reduce(function (accumulator, item) {
            return accumulator + parseInt(item.total_price) ;
        }, 0);
        setTot(totalPrice);
    }, [listCart]);
    const removeItemCart = (id) => {
        let newCart = [];
        newCart = listCart.filter((item) => item.id !== id)
        setListCart(newCart);

        localStorage.setItem("cartItems",JSON.stringify(newCart));}

    const handelIncreseNumberAdult = (item, index) => {
        const updatedCartItems = [...listCart];
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
        setListCart(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };
    const handelDecreseNumberAdult = (item, index) => {
        const updatedCartItems = [...listCart];
        let cartItem = updatedCartItems[index];

        if (cartItem && cartItem.adult === 1) {
            alert('Đã tối thiểu số lượng')
            return;
        }
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
        setListCart(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }

    const handelIncreseNumberChild = (item, index) => {
        const updatedCartItems = [...listCart];
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
        setListCart(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }

    const handelDecreseNumberChild = (item, index) => {
        const updatedCartItems = [...listCart];
        let cartItem = updatedCartItems[index];

        if (cartItem && cartItem.child === 0) {
            alert('Đã tối thiểu số lượng')
            return;
        }

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
        setListCart(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    }
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

    useEffect(() => {
        props.fetchAddCartDetail(1)
        props.fetchSetupAddress()
        props.fetchCountryUser()
        getLangText()

    }, [])
    useEffect(() => {
        setdataCartList(add_cart_list)

    }, [add_cart_list])

    useEffect(() => {
        setallTotal(total_all_item)
    }, [total_all_item])
    useEffect(()=> {
        setListCart(listCartItem)
    },[listCartItem])

    useEffect(() => {
        if (user_data) {
            setUserInput(user_data.fullname)
            setEmailInput(user_data.email)
            setPhoneInput(user_data.phone)
            setNationalityInput(user_data.nationality)
            setNationalitySelected(user_data.nationality)

        }

    }, [user_data])


    const next_page = async () => {
        if (checkboxOrder == '') {
            Toast.fire({
                title: "Chưa chọn địa chỉ liên lạc",
                icon: "error"
            })
            return false
        }
        await localStorage.setItem('user_more', JSON.stringify(more))

        router.push('/CartBackup/Checkout');
    }
    const changeInput = ({phone,country}) => {

        setPhone(phone)
        setPhoneCode(country.countryCode)
    }
    const changeTypePhone = (event) =>{
        setTypePhoneInput(event.target.value);
        setNameTypePhoneInput(event.target.options[event.target.selectedIndex].text)

    }


    const add_setup_address = async () =>{

        if (typePhoneInput == '') {
            Toast.fire({
                title: "Chưa chọn phương thức liên lạc",
                icon: "error"
            })
            return false
        }

        if (phone == '') {
            Toast.fire({
                title: "Chưa có số liên lạc",
                icon: "error"
            })
            return false
        }

        if (addressStartInput == '') {
            Toast.fire({
                title: "Chưa có địa chỉ đón",
                icon: "error"
            })
            return false
        }

        if (addressEndInput == '') {
            Toast.fire({
                title: "Chưa có địa chỉ trả",
                icon: "error"
            })
            return false
        }


        let url_api = BASE_URL_API + "Balotour/Info/addSetupAddress"
        let token = await GET_TOKEN();

        let fd = new FormData()
        fd.append("uid", user_data.id)
        fd.append("type_phone", typePhoneInput  )
        fd.append("phone", phone.replace("84", 0))
        fd.append("address_start", addressStartInput)
        fd.append("address_end", addressEndInput)
        fd.append("default", checkboxDefaul)
        fd.append("id", idAddress)


        axios.post(url_api, fd, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN': JSON.parse(token),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {
            if(response.data.data.msg == 'add'){

                Toast.fire({
                    title: "Thêm địa chỉ liên lạc thành công",
                    icon: "success"
                })
            }else{
                Toast.fire({
                    title: "Sửa địa chỉ liên lạc thành công",
                    icon: "success"
                })
            }
            console.log(response);
            // window.location.reload("/")
            props.fetchSetupAddress()
            userMoreleClose()
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    const changeCheckboxDefaul = async(event)=>{
        let number_check = 0;

        if(event.target.checked == true){
            number_check = 1;
        }
        setCheckboxDefaul(number_check)
    }
    const editSetupAddress = async(id)=>{
        userMoreleShow()

        let url_api = BASE_URL_API + "Balotour/Info/editSetupAddress"
        let token = await GET_TOKEN();

        let fd = new FormData()
        fd.append("id",  id)

        axios.post(url_api, fd, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN': JSON.parse(token),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {

            setPhone(response.data.data.phone.replace("0", '84') )
            setAddressStartInput(response.data.data.address_start)
            setAddressEndInput(response.data.data.address_end)
            setCheckboxDefaul(response.data.data.default)
            setIdAddress(response.data.data.id)
        })
            .catch(function (error) {
                console.log(error);
            });

    }

    const deleteSetupAddress = async(id)=>{

        let url_api = BASE_URL_API + "Balotour/Info/deleteSetupAddress"
        let token = await GET_TOKEN();

        let fd = new FormData()
        fd.append("id",  id)

        axios.post(url_api, fd, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN': JSON.parse(token),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {
            Toast.fire({
                title: "Xóa địa chỉ liên lạc thành công",
                icon: "success"
            })
            props.fetchSetupAddress()
        })
            .catch(function (error) {
                console.log(error);
            });

    }


    useEffect(()=>{
        if(setupAddress){
            setupAddress.forEach(item => {
                if(parseInt(item.default) == 1){
                    setCheckboxOrder(item.id)
                }
            });
        }
    },[setupAddress])
    const add_address= async()=>{
        userMoreleShow()
        setPhone('')
        setAddressStartInput('')
        setAddressEndInput('')
        setCheckboxDefaul('')
        setIdAddress('')
    }

    const getLangText = async () => {
        let lang_code = await GET_LANG_CODE();
        let lang_text ={}
        switch (JSON.parse(lang_code)) {
            case 'vi':
                lang_text = GET_LANG_vi().order_summary
                break;
            default:
                lang_text = GET_LANG_ko().order_summary
                break;
        }
        setTextShow(lang_text)
    }

    let timeline_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';
    return (
        <Container >
            <Row>
                <Col lg={8}>
                    {listCart ? (listCart.map((item,idx) => (

                    <Row key = {idx} className="mt-3 bg-color">
                        <Col lg="3" className="pe-0">
                            <img src={item.image ? item.image[0] : ''} className="w-100 rounded-1 h-100 object-fit-cover" alt="tour"/>
                        </Col>
                        <Col lg="7" className="px-3 py-2 ">
                            {/*<div className="d-flex align-items-center mb-3">*/}
                            {/*    <span className="tag_point me-2">9</span>*/}
                            {/*    <span className="color-text fw-bold me-2">Rất tốt</span>*/}
                            {/*    <span>358 quan tâm</span>*/}
                            {/*</div>*/}
                            <span className="tour_detail_title">{item.name}</span>
                            <div className="mt-3">
                                Mã tour <span className="color-text fw-bold">{item.code}</span>
                            </div>
                            <div className="mt-2">
                                Khởi hành <span className="color-text fw-bold">28/08/2023</span>
                            </div>
                            <div className="mt-2">
                                Thời gian <span className="color-text fw-bold">{item.date_type_name}</span>
                            </div>
                            <div className="mt-2">
                                Nơi khởi hành <span className="color-text fw-bold">{item.city_start_name}</span>
                            </div>
                            {/*<div className="mt-2">*/}
                            {/*    Số chỗ còn nhận  <span className="color-text fw-bold">9</span>*/}
                            {/*</div>*/}
                            <div className="mt-2">
                                Dịch vụ tùy chọn  <span className="color-text fw-bold">Bay hàng không Tway Air - 4 đêm khách sạn 3 sao đia phương</span>
                            </div>
                        </Col>
                        <Col lg={2}>
                            <div className="pt-2">
                                <div>
                                    <span className="color-text fw-bold">Người lớn</span>
                                    <div className="change-number">
                                        <span className="minus icon_change">
                                          <FaMinusCircle type="button" onClick={() => handelDecreseNumberAdult(item, idx)}/>
                                        </span>
                                        <span className="mx-2">{item.adult}</span>
                                        <span className="plus icon_change">
                                            <FaPlusCircle type="button" onClick={() => handelIncreseNumberAdult(item, idx)}/>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <span className="color-text fw-bold">Trẻ em</span>
                                    <div className="change-number">
                                        <span className="minus icon_change">
                                          <FaMinusCircle type="button" onClick={() => handelDecreseNumberChild(item, idx)}/>
                                        </span>
                                        <span className="mx-2">{item.child}</span>
                                        <span className="plus icon_change">
                                            <FaPlusCircle type="button" onClick={() => handelIncreseNumberChild(item, idx)}/>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="d-flex justify-content-between align-items-center mt-3 border-top p-2">
                                {/*<span className="color-text fw-bold">TỔNG CỘNG</span>*/}
                                <div onClick={() => removeItemCart(item.id)} className="btn-delete">
                                    Xóa
                                </div>
                                <span className="text-danger fs-5 fw-bold ">{item.total_price ? GlobalJs.format_currency(item.total_price) : 0}đ</span>

                            </div>
                        </Col>
                    </Row>
                    ))) : ''}
                    <div  className="mt-5 mb-4">
                        {/*<span className="tour_detail_title">Tổng quan về chuyến đi</span>*/}
                        <div className="mt-2">
                            <Col xl={12} className="mb-2">
                                <span className="text-700">Thông tin khách hàng</span>
                                { user_data ? ([user_data].map((item, index) => (
                                    <Form className="bg-color rounded-2 mt-3 mb-3" key={index}>
                                        <Row className="p-3">
                                            <Col lg="6">
                                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                                    <Form.Label>
                                                        Họ và Tên <span className="text-danger">*</span>
                                                    </Form.Label>
                                                    <Form.Control type="text"  value={item.fullname} disabled/>
                                                </Form.Group>
                                            </Col>

                                            <Col lg="6">
                                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                                    <Form.Label>
                                                        Email <span className="text-danger">*</span>
                                                    </Form.Label>
                                                    <Form.Control type="email" value={item.email} disabled/>
                                                </Form.Group>
                                            </Col>
                                            <Col lg="6">
                                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                                    <Form.Label>
                                                        Số điện thoại <span className="text-danger">*</span>
                                                    </Form.Label>
                                                    <Form.Control type="phone" value={item.phone} disabled/>
                                                </Form.Group>
                                            </Col>
                                            <Col lg="6">
                                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                                    <Form.Label>
                                                        Quốc tịch <span className="text-danger">*</span>
                                                    </Form.Label>
                                                    <Form.Control type="text" value={item.nationality_name} disabled/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                ))):''}
                                {/*<div className="my-5">*/}
                                {/*  <Form>*/}
                                {/*    <div className="mb-3">*/}
                                {/*      <Form.Check*/}
                                {/*        label="Nhập danh sách khách hàng"*/}
                                {/*        name="group1"*/}
                                {/*        type="radio"*/}
                                {/*        id="contact1"*/}
                                {/*        // checked={selected === 'yes'} onChange={handleChange} value="yes"*/}
                                {/*      />*/}
                                {/*    </div>*/}
                                {/*    <div className="mb-3">*/}
                                {/*      <Form.Check*/}
                                {/*        label="Tôi cần được nhân viên tư vấn Nhanhtravel trợ giúp nhập thông tin đăng ký dịch vụ"*/}
                                {/*        name="group1"*/}
                                {/*        type="radio"*/}
                                {/*        id="contact"*/}
                                {/*        // checked={selected === 'no'} onChange={handleChange} value="no"*/}
                                {/*      />*/}
                                {/*    </div>*/}
                                {/*  </Form>*/}
                                {/*</div>*/}
                                <p className="text-700">Thông tin liên lạc</p>
                                <div className="payment_content_cart mb-3">
                                    {/*<div className="title_cart">{textShow ? textShow.Communications : ''}</div>*/}
                                    {/*<hr></hr>*/}
                                    {
                                        setupAddress ? setupAddress.map((item, index) => {
                                            return (

                                                <div className="cart-item mb-2" key={index}>
                                                    <div className="chosse-address d-flex justify-content-between">
                                                        <div className="d-flex align-items-center ">

                                                            <div className="">
                                                                <input className="form-check-input me-3" name="payment_method_id"
                                                                       onChange={()=> setCheckboxOrder(item.id)}
                                                                       value={item.id}  type="radio" checked={checkboxOrder == item.id ? true : false}  />
                                                            </div>

                                                            <div className="">
                                                                <div>{item.facility}: {item.phone} { item.default == 1 ?  <span className="text-primary">{textShow ? textShow.Default : ''} </span> : '' }</div>
                                                                <div>{textShow ? textShow.Pick_Up_Address : ''}: {item.address_start} </div>
                                                                <div>{textShow ? textShow.Paying_Address : ''}: {item.address_end}</div>
                                                            </div>
                                                        </div>
                                                        <div className="edit-address">

                                                            <div className="text-primary mb-2 edit" onClick={()=>editSetupAddress(item.id)}>
                                                                {textShow ? textShow.Edit : ''}
                                                            </div>
                                                            <div className="text-danger delete" onClick={()=>deleteSetupAddress(item.id)}>
                                                                {textShow ? textShow.Delete : ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : null
                                    }
                                    <div className=" mb-3 text-primary text-click" onClick={(()=>add_address())}>
                                        <span>  {textShow ? textShow.Add_Contacts : ''}</span>
                                    </div>
                                    <Modal
                                        show={userMoreShow} onHide={userMoreleClose}

                                        size="xl"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        className="modal-detail"
                                    >
                                        <Modal.Header closeButton className="main_tour_detail_header_md">
                                            <Modal.Title><div className="title">{textShow ? textShow.Communications : ''}</div></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="main_tour_detail_body_md">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <div>{textShow ? textShow.Contact_Method : ''} <span className="text-danger">*</span> </div>
                                                        <select className="form-control" onChange={(event)=>changeTypePhone(event)}>
                                                            <option value={''}>Chọn phương thức liên lạc</option>
                                                            {
                                                                facilityUser ? facilityUser.map((item,index)=>{
                                                                    return(
                                                                        <option selected={ typePhoneInput == item.id ? 'selected' : '' }  value={item.id} key={index}>{item.name}</option>

                                                                    )
                                                                }):null
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <div>{textShow ? textShow.Contact_number : ''} <span className="text-danger">*</span></div>

                                                        <PhoneInput

                                                            country={phoneCode}
                                                            onChange={(phone,country) => changeInput({ phone ,country})}
                                                            value={phone}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <div>{textShow ? textShow.Pick_Up_Address : ''} <span className="text-danger">* </span></div>
                                                        <input type="text" placeholder="VD: 2A Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình" className="form-control" value={addressStartInput} onChange={(event)=>setAddressStartInput(event.target.value)}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <div>{textShow ? textShow.Paying_Address : ''} <span className="text-danger">* </span></div>
                                                        <input type="text" placeholder="VD: 2A Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình" className="form-control" value={addressEndInput} onChange={(event)=>setAddressEndInput(event.target.value)}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <input checked={ checkboxDefaul == 1 ? 'checked' : '' } type="checkbox"  onClick={(event)=>changeCheckboxDefaul(event)} /> <label>{textShow ? textShow.Default : ''}</label>
                                                    </div>
                                                    <span className="text-danger">{textShow ? textShow.Note_Address : ''}</span>

                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer >

                                            <button type="submit" className="btn btn-success btn-rounded m-r-lg" onClick={() => add_setup_address()}>{textShow ? textShow.Save : ''}</button>

                                        </Modal.Footer>
                                    </Modal>

                                    {/*<div className="mb-2">*/}
                                    {/*  <div>{textShow ? textShow.Request : ''} </div>*/}
                                    {/*  <textarea type="text" className="form-control" onChange={(event)=>setRequestInput(event.target.value)}> </textarea>*/}
                                    {/*</div>*/}
                                </div>


                                {/*{selected == 'yes' ? <div className="info_passenger mb-3 mt-3">*/}

                                  {/*{renderDivsAdult(countAdult)}*/}
                                {/*  {renderDivsChild(countChild)}*/}
                                {/*  {renderDivsBaby(countBaby)}*/}

                                {/*</div> : '' }*/}

                                <span className="text-700">
              Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi !
            </span>
                                <div className="bg-color p-4 mt-3 rounded">
                                    <span>Ghi chú thêm</span>
                                    <Form>
                                        <FloatingLabel controlId="floatingTextarea2">
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Vui lòng nhập nội dung lời nhắn bằng tiếng Anh hoặc tiếng Việt"
                                                style={{ height: '100px' }}
                                                onChange={(event)=>setRequestInput(event.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form>
                                </div>
                            </Col>

                            {/*<Col xl={4}>*/}
                            {/*  <OverviewRight {...{countAdult, countChild, countBaby}}/>*/}
                            {/*</Col>*/}
                        </div>
                    </div>

                </Col>
                <Col lg={4}>
                    <div className="sticky-top mb-4 overview_right">
                        <div>
                            <span className="text-primary">Quý khách cần hỗ trợ?</span>
                            <div className="mt-1">
                                <div className="d-flex justify-content-between">
                                    <Link href="tel:(+84)909991205">
                                        <Button ><FaPhoneAlt className="me-2"/>Gọi miễn phí qua internet</Button>
                                    </Link>
                                    <Button className="bg-white text-black boder-0 rounded-end" onClick={handleShow}><FaMailBulk className="me-2"/>Gửi yêu cầu hỗ trợ ngay</Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            {listCart ? (listCart.map((item,index) =>(

                                <div className="border border-dark p-3 mt-4">
                                    <span className="text-700">Tóm tắt chuyển đi</span>
                                    <div key={index}>
                                        <span className="card_title_tour">Tour trọn gói <span className="text-primary fs-6">(9 khách)</span></span>
                                        <Row className="my-2">
                                            <Col lg={3}>
                                                <img src={item.image ? item.image[0] : ''} className="w-100 rounded h-100 object-fit-cover"/>
                                            </Col>
                                            <Col lg={9}>
                                                <span className="title_booking color-text fw-bold">{item.name}</span>
                                            </Col>
                                        </Row>
                                        <div className="fs-6 fw-bold color-text">Số lượng : {item.adult} người lớn, {item.child} trẻ em</div>
                                        <div>
                                            <div className="start d-flex">
                                                <FaRegCalendarMinus className="me-2 mt-1 text-primary"/>
                                                <div className="d-flex flex-column">
                                                    <span className="text-primary">Bắt đầu chuyến đi</span>
                                                    <span className="card_title_tour">T2, 28 Tháng 8, 2023</span>
                                                    <span className="from"></span>
                                                </div>
                                            </div>
                                            <div className="end d-flex">
                                                <FaRegCalendarMinus className="me-2 mt-1 text-primary"/>
                                                <div className="d-flex flex-column">
                                                    <span className="text-primary">Kết thúc chuyến đi</span>
                                                    <span className="card_title_tour">T7, 2 Tháng 9, 2023</span>
                                                </div>
                                            </div>
                                            {/*<div className="d-flex justify-content-between align-items-center mb-3">*/}
                                            {/*    <span className="card_title_tour">Hành khách</span>*/}
                                            {/*    <div className="d-flex flex-column align-items-end">*/}
                                            {/*        <span className="text-primary fs-4 d-flex align-items-center"><FaUsers className="icon_detail_tour me-1"/>{numberAdutl + numberChild + numberBaby} người</span>*/}
                                            {/*        <span>{numberAdutl} người lớn</span>*/}
                                            {/*        <span>{numberChild} trẻ em</span>*/}
                                            {/*        <span>{numberBaby} em bé</span>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            <div>
                                                {/*<div className="d-flex justify-content-between mb-3">*/}
                                                {/*    <span>Người lớn</span>*/}
                                                {/*    <span className="card_title_tour">{numberAdutl} x {moneyAdult}đ</span>*/}
                                                {/*</div>*/}
                                                {/*<div className="d-flex justify-content-between mb-3">*/}
                                                {/*    <span>Trẻ em</span>*/}
                                                {/*    <span className="card_title_tour">{numberChild} x {moneyChild}đ</span>*/}
                                                {/*</div>*/}
                                                {/*<div className="d-flex justify-content-between mb-3">*/}
                                                {/*    <span>Em bé</span>*/}
                                                {/*    <span className="card_title_tour">{numberBaby} x {moneyBaby}đ</span>*/}
                                                {/*</div>*/}
                                                {/*<div className="d-flex justify-content-between mb-3">*/}
                                                {/*    <span className="card_title_tour">Phụ thu phòng riêng</span>*/}
                                                {/*    <span className="card_title_tour">{valueSwitch}đ</span>*/}
                                                {/*</div>*/}
                                                {/*<div className="d-flex justify-content-between align-items-center mb-3">*/}
                                                {/*    <span className="color-text fw-bold">Mã giảm giá</span>*/}
                                                {/*    <div>*/}
                                                {/*        <Form className="d-flex">*/}
                                                {/*            <Form.Control type="text" placeholder="Thêm mã" className="input_code_promotion"/>*/}
                                                {/*            <Button className="btn-success ms-2 text-nowrap">Áp dụng</Button>*/}
                                                {/*        </Form>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                <div className="text-end mt-3 border-top pt-2">
                                                    {/*<span className="color-text fw-bold">TỔNG CỘNG</span>*/}
                                                    {/*<Button onClick={() => removeItemCart(item.id)} className="bg-danger text-white border-0 fw-bold">*/}
                                                    {/*    Xóa*/}
                                                    {/*</Button>*/}
                                                    <span className="text-danger fs-5 fw-bold ">{item.total_price ? GlobalJs.format_currency(item.total_price) : 0}đ</span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))) : ''}

                            <div className="p-4 border-black border mt-2">
                                <div className="d-flex justify-content-between align-items-center  mt-2  ">
                                    <span className="color-text fw-bold">TỔNG CỘNG</span>
                                    <span className="text-danger fs-3 fw-bold ">{GlobalJs.format_currency(tot)}đ</span>
                                </div>
                                <div>
                                        <Button className="w-100 btn-danger py-2 mt-3 text-uppercase" onClick={() =>next_page()}>thanh toán</Button>
                                </div>
                            </div>
                        </div>


                        <Modal show={show} onHide={handleClose} animation={false} size="md" centered>
                            <Modal.Header closeButton>
                                <Modal.Title className="text-primary">GỬI THÔNG TIN TƯ VẤN</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <span className='color-text'>Quý khách vui lòng nhập thông tin bên dưới, Nhanhtravel sẽ liên hệ lại sau ít phút.</span>
                                <Form>
                                    <div className="mt-2">
                                        <Form.Label htmlFor="inputPassword5" className="color-text">Họ và tên *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="inputPassword5"
                                            aria-describedby="passwordHelpBlock"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <Form.Label htmlFor="phone" className="color-text">Điện thoại *</Form.Label>
                                        <Form.Control
                                            type="phone"
                                            id="phone"
                                            aria-describedby="passwordHelpBlock"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <Form.Label htmlFor="email" className="color-text">Email *</Form.Label>
                                        <Form.Control
                                            type="email"
                                            id="email"
                                            aria-describedby="passwordHelpBlock"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <Form.Label className="color-text">Thông tin cần tư vấn</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
                                    </div>


                                </Form>
                            </Modal.Body>

                            <Modal.Footer className='justify-content-center'>
                                <Button variant="primary" onClick={handleSubmit}>
                                    Gửi Ngay
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                </Col>
            </Row>

        </Container>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
    getToCart: state.getToCart,
    userInfo: state.userInfo,
    addCartDetailInfo: state.addCartDetailInfo,
    countryUserInfo: state.countryUserInfo,
    setupAddressInfo: state.setupAddressInfo,
});
export default connect(mapStateToProps, actions)(BookingLeft);
