"use client";
import React, {useEffect, useState} from "react"
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import {BASE_URL_API, GET_TOKEN} from '../../../redux/actions/type';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment'
import Swal from 'sweetalert2';
import Tab from 'react-bootstrap/Tab';
import {Col, Row} from "react-bootstrap";
import CustomerInfo from "@/app/components/CustomerInfo";
import Card from 'react-bootstrap/Card';

// function CustomerInfo(props) {
//     return null;
// }
//
// CustomerInfo.propTypes = {
//     id: PropTypes.string,
//     defaultActiveKey: PropTypes.string,
//     children: PropTypes.node
// };

function info_user(props) {

    const [image, setImage] = useState()
    const [itemCityList, setItemCityList] = useState([])
    const [startdate, setStartDate] = useState(new Date());
    const [userInput, setUserInput] = useState([]);
    const [emailInput, setEmailInput] = useState([]);
    const [phoneInput, setPhoneInput] = useState([]);
    const [identify_numberInput, setIdentify_numberInput] = useState([]);
    const [addressInput, setAddressInput] = useState([]);
    const [countryInput, setCountryInput] = useState([]);
    const [cityInput, setCityInput] = useState([]);
    const [imageInput, setImageInput] = useState([]);
    const [sexRadio, setSexRadio] = useState();

    const [countrySelected, setCountrySelected] = useState();
    const [citySelected, setCitySelected] = useState();


    const [nationalityInput, setNationalityInput] = useState([]);
    const [nationalitySelected, setNationalitySelected] = useState();


    const handleChangeAvatar = (event) => {
        let file = event.target.files[0];

        let url_tmp = URL.createObjectURL(file)
        setImageInput(file)
        setImage(url_tmp)

    }


    let user_data = props.userInfo.data && props.userInfo.isLoading == false ? props.userInfo.data : '';
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
    const update_user = async () => {

        let url_api = BASE_URL_API + "Balotour/Info/updateUser"
        let token = await GET_TOKEN();

        let fd = new FormData()
        fd.append("id", user_data.id)
        fd.append("name", userInput)
        fd.append("email", emailInput)
        fd.append("phone", phoneInput)
        fd.append("identify_number", identify_numberInput)
        fd.append("address", addressInput)
        fd.append("country", countryInput)
        fd.append("city", cityInput)
        fd.append("sex", sexRadio)
        fd.append("nationality", nationalityInput)


        if (imageInput.length != 0) {
            fd.append("image", imageInput)
        }
        fd.append("birthday", moment(startdate).format("YYYY-MM-DD"))
        axios.post(url_api, fd, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN': JSON.parse(token),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {
            Toast.fire({
                title: "Thay đổi thông tin thành công",
                icon: "success"
            })


        })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        props.fetchCountryUser()
        props.fetchOrderHistory()
    }, [])


    let countryUser = props.countryUserInfo.data && props.countryUserInfo.isLoading == false ? props.countryUserInfo.data.country : '';
    let orderHistory = props.orderHistoryInfo.data && props.orderHistoryInfo.isLoading == false ? props.orderHistoryInfo.data : '';

    const cityList = async (country_id) => {
        setCountryInput(country_id)
        let url_api = BASE_URL_API + "Balotour/Info/countryUser?country_id=" + country_id
        let token = await GET_TOKEN();
        axios.get(url_api, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN': JSON.parse(token),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {
            setItemCityList(response.data.data.city)

        })
            .catch(function (error) {
                console.log(error);
            });


    };
    const selectedcityList = async (city_id) => {
        setCityInput(city_id)

    }

    const edit_user = async () => {

    }


    useEffect(() => {
        if (user_data) {
            setUserInput(user_data.fullname)
            setEmailInput(user_data.email)
            setPhoneInput(user_data.phone)
            setIdentify_numberInput(user_data.identify_number)
            setAddressInput(user_data.address)
            setCountrySelected(user_data.country)
            cityList(user_data.country)
            setCitySelected(user_data.city)
            setSexRadio(user_data.sex)
            setImage(user_data.image)
            setStartDate(new Date(user_data.birthday))
            setCityInput(user_data.city)
            setNationalitySelected(user_data.nationality)
            setNationalityInput(user_data.nationality)
        }

    }, [user_data])


    return (
        <main>
            <div className="container mt-3">

                <Row className={'mb-4 index-info'}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Col md={4}> <CustomerInfo/></Col>
                        <Col md={8}>
                            <Card>
                                <Card.Body>
                                    <div className="row position-relative px-5">
                                        <div className={'title-card mb-4'}>THÔNG TIN KHÁCH HÀNG</div>
                                        <div className="col-sm-2">
                                            <div className="form-group">
                                                <label>Họ tên <span className="text-danger">*</span></label>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 data_nguoidung">
                                            <div className="form-group ">
                                                <input type="text"
                                                       className="form-control text-left txt_contact"
                                                       value={userInput}
                                                       onChange={(event) => setUserInput(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="form-group">
                                                <label>Giới tính</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 data_nguoidung">
                                            <div className="form-group gender">

                                                {/* <div className="clearfix"></div> */}
                                                <div className="md-radio-inline d-flex align-items-center gap-4">
                                                    <div className="md-radio d-flex align-items-center ">
                                                        <input type="radio" id="radio16" name="sex"
                                                               className="md-radiobtn txt_contact" value="1"
                                                               checked={parseInt(sexRadio) == 1 ? true : false}
                                                               onChange={(event) => setSexRadio(event.target.value)}
                                                        />
                                                        <label htmlFor="radio16">
                                                            <span className="inc"></span>
                                                            <span className="check"></span>
                                                            <span className="box"></span> &nbsp;&nbsp;Nam
                                                        </label>
                                                    </div>
                                                    <div
                                                        className="md-radio has-error d-flex align-items-center ">
                                                        <input type="radio" id="radio17" name="sex"
                                                               className="md-radiobtn txt_contact" value="2"
                                                               checked={parseInt(sexRadio) == 2 ? true : false}
                                                               onChange={(event) => setSexRadio(event.target.value)}
                                                        />
                                                        <label htmlFor="radio17">
                                                            <span className="inc"></span>
                                                            <span className="check"></span>
                                                            <span className="box"></span> &nbsp;&nbsp;Nữ
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="form-group">
                                                <label>Ngày sinh</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 data_nguoidung">
                                            <div className="form-group">
                                                <DatePicker className="form-control txt_contact "
                                                            dateFormat="dd/MM/y" selected={startdate}
                                                            onChange={(date) => setStartDate(date)}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="form-group">
                                                <label>Quốc Tịch</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 data_nguoidung">
                                            <div className="form-group">
                                                <select className="form-control txt_contact"
                                                        onChange={(event) => setNationalityInput(event.target.value)}
                                                >
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
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="form-group">
                                                <label>Email <span className="text-danger">*</span></label>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 data_nguoidung">
                                            <div className="form-group">
                                                <input type="text"
                                                       className="form-control text-left txt_contact"
                                                       value={emailInput}
                                                       onChange={(event) => setEmailInput(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="form-group">
                                                <label>Phone <span className="text-danger">*</span></label>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 data_nguoidung">
                                            <div className="form-group">
                                                <input type="text"
                                                       className="form-control text-left txt_contact"
                                                       value={phoneInput}
                                                       onChange={(event) => setPhoneInput(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="form-group">
                                                <label>CMND</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 data_nguoidung">
                                            <div className="form-group">
                                                <input type="text"
                                                       className="form-control text-left txt_contact"
                                                       value={identify_numberInput}
                                                       onChange={(event) => setIdentify_numberInput(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="form-group">
                                                <label>Địa chỉ</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 data_nguoidung">
                                            <div className="form-group">
                                                <input type="text"
                                                       className="form-control text-left txt_contact"
                                                       value={addressInput}
                                                       onChange={(event) => setAddressInput(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="form-group">
                                                <label>Quốc gia cư trú</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 data_nguoidung">
                                            <div className="form-group">

                                                <select className="form-control country txt_contact"
                                                        onChange={(event) => cityList(event.target.value)}
                                                >
                                                    <option value={''}>Chọn quốc tịch</option>
                                                    {
                                                        countryUser ? countryUser.map((item, index) => {

                                                            return (
                                                                <option key={index} value={item.id}
                                                                        selected={parseInt(countrySelected) == item.id ? true : false}>{item.name}</option>
                                                            )
                                                        }) : null
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="form-group">
                                                <label>Tỉnh thành</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 data_nguoidung">
                                            <div className="form-group">
                                                <select className="form-control city txt_contact"
                                                        onChange={(event) => selectedcityList(event.target.value)}
                                                >

                                                    <option value={''}>Chọn Tỉnh phố</option>
                                                    {
                                                        itemCityList ? itemCityList.map((item, index) => {

                                                            return (
                                                                <option key={index} value={item.id}
                                                                        selected={parseInt(citySelected) == item.id ? true : false}>{item.city_name}</option>

                                                            )
                                                        }) : null
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 d-flex justify-content-end edit_delete_user">
                                            <button type="submit"
                                                    className="btn btn-success btn-rounded m-r-lg  update_user"
                                                    onClick={() => update_user()}>Lưu
                                            </button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>


                    </Tab.Container>
                </Row>


            </div>
        </main>
    )
}

const mapStateToProps = state => ({
    countryUserInfo: state.countryUserInfo,
    userInfo: state.userInfo,
    orderHistoryInfo: state.orderHistoryInfo,
    fetchInvoiceListInfo: state.fetchInvoiceListInfo,
});
export default connect(mapStateToProps, actions)(info_user)