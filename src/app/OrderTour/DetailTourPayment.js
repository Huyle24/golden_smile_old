'use client'
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {useSearchParams} from "next/navigation";
import {CiLocationOn, CiTimer} from "react-icons/ci";
import {BsPeople} from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import PhoneInput from "react-phone-input-2";
import {setOrderData} from '../../../redux/actions';
import { InputNumber } from 'primereact/inputnumber';
import PaymentSidebar from "@/app/OrderTour/PaymentSidebar";

function DetailTourPayment(props) {

    const searchParams = useSearchParams()
    const tour_open_id = searchParams.get("tour_open_id");
    const adult_number = searchParams.get("adult_number");

    let countryUser = props.countryUserInfo.data && props.countryUserInfo.isLoading == false ? props.countryUserInfo.data.country : '';
    let facilityUser = props.countryUserInfo.data && props.countryUserInfo.isLoading == false ? props.countryUserInfo.data.facility : '';
    let tour_price_detail_info = props.tourPriceDetailInfo.data && props.tourPriceDetailInfo.isLoading === false ? props.tourPriceDetailInfo.data : '';
    let user_data = props.userInfo.data && props.userInfo.isLoading == false ? props.userInfo.data : '';

    const [show, setShow] = useState(false);
    const [userMoreShow, setUserMoreShow] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneCode, setPhoneCode] = useState('vn');
    const [addressStartInput, setAddressStartInput] = useState('');
    const [addressEndInput, setAddressEndInput] = useState('');
    const [textShow, setTextShow] = useState('');
    const [userInput, setUserInput] = useState([]);
    const [emailInput, setEmailInput] = useState([]);
    const [phoneInput, setPhoneInput] = useState([]);
    const [addressInput, setAddressInput] = useState([]);
    const [countryInput, setCountryInput] = useState([]);
    const [requestInput, setRequestInput] = useState('');
    const [checkboxDefaul, setCheckboxDefaul] = useState(0);
    const [nationalityInput, setNationalityInput] = useState([]);
    const [nationalitySelected, setNationalitySelected] = useState();
    const [countrySelected, setCountrySelected] = useState();
    const [value1, setValue1] = useState(1);
    const [childPrices, setChildPrices] = useState([]);
    console.log('childPrices')
    console.log(childPrices)
    const [idAddress, setIdAddress] = useState('');
    const [checkboxOrder, setCheckboxOrder] = useState(0);
    const orderData = {
        customer_name: userInput,
        customer_email: emailInput,
        telephone: phoneInput,
        country_id: parseInt(nationalitySelected),
        data_child: childPrices,
        adult_number: value1,
        tour_open_id: parseInt(tour_open_id)
    };

    const userMoreleClose = () => setUserMoreShow(false);
    const add_address = async () => {
        userMoreleShow()
        setPhone('')
        setAddressStartInput('')
        setAddressEndInput('')
        setCheckboxDefaul('')
        setIdAddress('')
    }
    const changeCheckboxDefaul = async (event) => {
        let number_check = 0;

        if (event.target.checked == true) {
            number_check = 1;
        }
        setCheckboxDefaul(number_check)
    }
    const changeInput = ({phone, country}) => {

        setPhone(phone)
        setPhoneCode(country.countryCode)
    }
    const userMoreleShow = () => setUserMoreShow(true);
    // console.log(adult_number)

    const handleClose = () => {
        setShow(false)
    };
    const changeTypePhone = (event) => {
        setTypePhoneInput(event.target.value);
        setNameTypePhoneInput(event.target.options[event.target.selectedIndex].text)
    }
    const handleSubmit = () => {
        alert('Đã gửi thông tin thành công, Nhanhtravel sẽ liên hệ quý khách sớm nhất!');
        setShow(false)
    }
    const handleShow = () => setShow(true);
    useEffect(() => {
        props.fetchtourPriceDetailInfo(tour_open_id, adult_number != null ? adult_number : 1)
    }, []);
    useEffect(() => {
        props.fetchCountryUser()
    }, [])
    useEffect(() => {
        if (user_data) {
            setUserInput(user_data.fullname)
            setEmailInput(user_data.email)
            setPhoneInput(user_data.phone)
            setAddressInput(user_data.address)
            setNationalitySelected(user_data.nationality)
            setNationalityInput(user_data.nationality)
            setCountrySelected(user_data.country)
        }

    }, [user_data])


    useEffect(() => {
        // Khởi tạo mảng childPrices với giá trị mặc định cho mỗi phần tử
        if (tour_price_detail_info && tour_price_detail_info.data_child_price) {
            const defaultChildPrices = tour_price_detail_info.data_child_price.map(item => ({
                child_old_start: item.child_old_start,
                child_old_end: item.child_old_end,
                child_number: 1,

            }));
            setChildPrices(defaultChildPrices);
        }
    }, [tour_price_detail_info]);
    useEffect(() => {
        props.setOrderData(orderData);
    }, [orderData]);
    console.log('tour_price_detail_info');
    console.log(tour_price_detail_info);

    return (
        <>
            <Row>
                <Col md={8}>
                    <Container className=" imgDetail mb-5">
                        <Row className={'row_tour_payment'}>
                            <Col md={4}>
                                <img className={'img_tour_payment'}
                                     src={tour_price_detail_info &&tour_price_detail_info.image !== null ? tour_price_detail_info.image : 'https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png'}
                                     alt=""/>
                            </Col>
                            <Col md={8}>
                                <div className={' tour-detail-payment'}>
                                    <div className="tour-detail-name mt-0">

                                        {tour_price_detail_info ? tour_price_detail_info.tour_name : ''}
                                    </div>
                                    <div>
                                        <span className={'code-tour'}>
                                         {tour_price_detail_info ? tour_price_detail_info.tour_open_code : ''}
                                    </span>
                                    </div>

                                    <div className={'d-flex align-items-center flex-wrap'}>
                                        <CiLocationOn/>
                                        <span className="ms-2">
                                  {tour_price_detail_info ? tour_price_detail_info.city_start : ''} - {tour_price_detail_info ? tour_price_detail_info.city_end : ''}

                                    </span>
                                    </div>
                                    <div className={'d-flex align-items-center flex-wrap'}>
                                        <CiTimer className={'me-1'}/>
                                        {tour_price_detail_info ? tour_price_detail_info.date_type_name : ''}
                                    </div>
                                    <div className={'d-flex align-items-center flex-wrap'}>
                                        <BsPeople className={'me-1 '}/>
                                        <span className={'text-danger'}>
                                        {tour_price_detail_info ? tour_price_detail_info.quantity_booked : ''}
                                            </span>
                                        /

                                        {tour_price_detail_info ? tour_price_detail_info.total_customer : ''}
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className={'cutomer-form mt-3'}>
                            <div className={'p-3 pt-0'}>
                                <div className={'header-cutomer-form'}>
                                    CHI TIẾT KHÁCH HÀNG
                                </div>
                                <div className={'content-customer'}>
                                    Khách nữ từ 55 tuổi trở lên, khách nam từ 60 tuổi trở lên đi tour một mình và khách
                                    mang
                                    thai
                                    trên 4 tháng (16 tuần) vui lòng đăng ký tour trực tiếp tại văn phòng của
                                    GoldenSmileTravel.
                                    Không áp dụng đăng ký tour online đối với khách từ 70 tuổi trở lên
                                </div>
                                <div className={'title-cutomer-form'}>
                                    1. Thông tin khách hàng
                                </div>
                                <Row>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Họ và tên</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1"
                                                   value={userInput}
                                                   aria-describedby="emailHelp" placeholder="Họ và tên" disabled required/>

                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1"
                                                   value={emailInput}
                                                   aria-describedby="emailHelp" placeholder="nguyenvanthanh@gmail.com"
                                                   disabled required/>

                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                                            <input type="number" className="form-control" id="exampleInputEmail1"
                                                   value={phoneInput}
                                                   aria-describedby="emailHelp" placeholder="0111 111 111" disabled required/>

                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Quốc tịch</label>
                                            <select className="form-control txt_contact"
                                                    onChange={(event) => setNationalityInput(event.target.value)}
                                                    disabled>
                                                <option value={''}>Chọn quốc tịch</option>
                                                {
                                                    countryUser ? countryUser.map((item, index) => {

                                                        return (
                                                            <option key={index} value={item.id}
                                                                    selected={parseInt(nationalitySelected) == item.id ? true : false}>{item.name}</option>
                                                        )
                                                    }) : null
                                                }
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <div className={'title-cutomer-form'}>
                                    2. Số lượng hành khách
                                </div>

                                <div>
                                    <Row className={'px-3'}>
                                        <Col xl={6} className={'mt-2'}>
                                            <div className={'d-flex justify-content-between  align-items-center'}>
                                                <label>Người lớn:</label>
                                                <InputNumber inputId="stacked-buttons" value={value1}
                                                             onValueChange={(e) => setValue1(e.value)} mode="decimal"
                                                             showButtons
                                                             min={0} max={100}/>
                                            </div>
                                        </Col>
                                        {
                                            tour_price_detail_info && tour_price_detail_info.data_child_price.map((item, index) => (
                                                <Col xl={6} key={index} className={'mt-2'}>
                                                    <div className={'d-flex justify-content-between align-items-center'}>
                                                        {childPrices[index] && (
                                                            <label>{`Trẻ em từ ${childPrices[index].child_old_start} đến ${childPrices[index].child_old_end} tuổi:`}</label>
                                                        )}
                                                        <InputNumber
                                                            inputId={`stacked-buttons-${index}`}
                                                            value={childPrices[index]?.child_number || 0} // Sử dụng toán tử Optional chaining và thiết lập giá trị mặc định
                                                            onValueChange={(e) => {
                                                                const newPrices = [...childPrices];
                                                                newPrices[index] = {
                                                                    ...newPrices[index],
                                                                    child_number: e.value
                                                                };
                                                                setChildPrices(newPrices);
                                                            }}
                                                            mode="decimal"
                                                            showButtons
                                                            min={0}
                                                            max={100}
                                                        />
                                                    </div>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </div>
                            </div>
                        </Row>
                        <Modal
                            show={userMoreShow} onHide={userMoreleClose}

                            size="xl"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            className="modal-detail"
                        >
                            <Modal.Header closeButton className="main_tour_detail_header_md">
                                <Modal.Title>
                                    Thêm thông tin liên lạc
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="main_tour_detail_body_md">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <div>
                                                Phương thức liên lạc
                                                <span className="text-danger">*</span></div>
                                            <selecty className="form-control"
                                                     onChange={(event) => changeTypePhone(event)}>
                                                <option value={''}>Chọn phương thức liên lạc</option>
                                                {/*{*/}
                                                {/*    facilityUser ? facilityUser.map((item,index)=>{*/}
                                                {/*        return(*/}
                                                {/*            <option selected={ typePhoneInput == item.id ? 'selected' : '' }  value={item.id} key={index}>{item.name}</option>*/}

                                                {/*        )*/}
                                                {/*    }):null*/}
                                                {/*}*/}
                                            </selecty>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <div>
                                                Số điện thoại
                                                <span className="text-danger">*</span></div>

                                            <PhoneInput

                                                country={phoneCode}
                                                onChange={(phone, country) => changeInput({phone, country})}
                                                value={phone}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <div>
                                                {/*{textShow ? textShow.Pick_Up_Address : ''} */}
                                                <span className="text-danger">* </span></div>
                                            <input type="text"
                                                   placeholder="VD: 2A Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình"
                                                   className="form-control" value={addressStartInput}
                                                   onChange={(event) => setAddressStartInput(event.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <div>
                                                {/*{textShow ? textShow.Paying_Address : ''}*/}
                                                <span className="text-danger">* </span></div>
                                            <input type="text"
                                                   placeholder="VD: 2A Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình"
                                                   className="form-control" value={addressEndInput}
                                                   onChange={(event) => setAddressEndInput(event.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input checked={checkboxDefaul == 1 ? 'checked' : ''} type="checkbox"
                                                   onClick={(event) => changeCheckboxDefaul(event)}/> <label>
                                            {/*{textShow ? textShow.Default : ''}*/}
                                        </label>
                                        </div>
                                        <span className="text-danger">
                                {/*{textShow ? textShow.Note_Address : ''}*/}
                            </span>

                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>

                                <button type="submit" className="btn btn-success btn-rounded m-r-lg"
                                        onClick={() => add_setup_address()}>
                                    {/*{textShow ? textShow.Save : ''}*/}
                                </button>

                            </Modal.Footer>
                        </Modal>
                    </Container>
                </Col>
                <Col md={4}>
                    <PaymentSidebar  orderData={orderData}/>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => ({
    tourPriceDetailInfo: state.tourPriceDetailInfo,
    countryUserInfo: state.countryUserInfo,
    userInfo: state.userInfo,
});
export default connect(mapStateToProps, actions)(DetailTourPayment);
