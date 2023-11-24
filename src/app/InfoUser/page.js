"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as actions from "../../../redux/actions";
import { connect } from "react-redux";
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE, BASE_URL } from '../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../js/lang';
import axios from 'axios';
import $, { event } from "jquery"
import {useRouter, useSearchParams} from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment'
import Swal from 'sweetalert2';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import * as GlobalJs from "../../../js/global";
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

    const clickImage = () => {
        $(".image_avatar").trigger("click");
    }
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
            $(".txt_contact").attr("disabled", true);
            $(".update_user").addClass("hide");
            $(".edit_user").removeClass("hide");

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

    const edit_user =  async () => {
  
       $(".txt_contact").attr("disabled", false);
       $(".update_user").removeClass("hide");
       $(".edit_user").addClass("hide");
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
            setStartDate( new Date(user_data.birthday))
            setCityInput(user_data.city)
            setNationalitySelected(user_data.nationality)
            setNationalityInput(user_data.nationality)
        }

    }, [user_data])
   

    
    return (
        <main>
            <div className="main_info">
                <div className="container">
                    <h2 className='title mb-4'>Thông tin người dùng</h2>
                    <div className="row mb-4 index-info">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                            <div className="col-sm-3 menu-info">
                                <div className="text-center mb-4">
                                    <a href={void (0)} className="avatar-view" title="Đổi avatar" onClick={() => clickImage()}>
                                        <img className="img-rounded rounded txt_contact" disabled width="150" src={image ? image : 'https://vigomanager.com/assets_front/images/no_image.jpg'} alt="Avatar" />
                                    </a>
                                    <input type="file" className="hide image_avatar txt_contact" name="image" onChange={(event) => handleChangeAvatar(event)}  disabled />
                                </div>
                                <div className="mb-4 text-center">Lựa chọn thông tin cần xem</div>
                                <Nav variant="pills" className="flex-column info_history_user">
                                    <Nav.Item>
                                    <Nav.Link eventKey="first" >Thông tin cơ bản</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link className="history_buy" eventKey="second">Lịch sử mua hàng</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <div className="col-sm-9 thongtin_user">
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <div className="row position-relative">
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                <label >Họ tên <span className="text-danger">*</span></label>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 data_nguoidung">
                                                <div className="form-group ">
                                                    <input type="text" className="form-control text-left txt_contact" value={userInput} onChange={(event) => setUserInput(event.target.value)} disabled/>
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
                                                    <div className="md-radio-inline d-flex align-items-center">
                                                        <div className="md-radio d-flex align-items-center ">
                                                            <input type="radio" id="radio16" name="sex" className="md-radiobtn txt_contact" value="1" checked={parseInt(sexRadio) == 1 ? true : false} onChange={(event) => setSexRadio(event.target.value)} disabled/>
                                                            <label htmlFor="radio16">
                                                                <span className="inc"></span>
                                                                <span className="check"></span>
                                                                <span className="box"></span> &nbsp;&nbsp;Nam </label>
                                                        </div>
                                                        <div className="md-radio has-error d-flex align-items-center ">
                                                            <input type="radio" id="radio17" name="sex" className="md-radiobtn txt_contact" value="2" checked={parseInt(sexRadio) == 2 ? true : false} onChange={(event) => setSexRadio(event.target.value)} disabled/>
                                                            <label htmlFor="radio17">
                                                                <span className="inc"></span>
                                                                <span className="check"></span>
                                                                <span className="box"></span> &nbsp;&nbsp;Nữ </label>
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
                                                    <DatePicker className="form-control txt_contact " dateFormat="dd/MM/y" selected={startdate} onChange={(date) => setStartDate(date)} disabled/>
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <label>Quốc Tịch</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 data_nguoidung">
                                                <div className="form-group">
                                                    <select className="form-control txt_contact" onChange={(event) => setNationalityInput(event.target.value)} disabled>
                                                        <option value={''}>Chọn quốc tịch</option>
                                                        {
                                                            countryUser ? countryUser.map((item, index) => {

                                                                return (
                                                                    <option key={index} value={item.id} selected={parseInt(nationalitySelected) == item.id ? true : false}>{item.name}</option>
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
                                                    <input type="text" className="form-control text-left txt_contact" value={emailInput} onChange={(event) => setEmailInput(event.target.value)} disabled/>
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                <label>Phone <span className="text-danger">*</span></label>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 data_nguoidung">
                                                <div className="form-group">
                                                    <input type="text" className="form-control text-left txt_contact" value={phoneInput} onChange={(event) => setPhoneInput(event.target.value)}  disabled/>
                                                </div>
                                            </div>                                          
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <label>CMND</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 data_nguoidung">
                                                <div className="form-group">
                                                    <input type="text" className="form-control text-left txt_contact" value={identify_numberInput} onChange={(event) => setIdentify_numberInput(event.target.value)} disabled/>
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <label>Địa chỉ</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 data_nguoidung">
                                                <div className="form-group">     
                                                    <input type="text" className="form-control text-left txt_contact" value={addressInput} onChange={(event) => setAddressInput(event.target.value)} disabled/>
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                <label>Quốc gia cư trú</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 data_nguoidung">
                                                <div className="form-group">
                                                    
                                                    <select className="form-control country txt_contact" onChange={(event) => cityList(event.target.value)} disabled>
                                                        <option value={''}>Chọn quốc tịch</option>
                                                        {
                                                            countryUser ? countryUser.map((item, index) => {

                                                                return (
                                                                    <option key={index} value={item.id} selected={parseInt(countrySelected) == item.id ? true : false}>{item.name}</option>
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
                                                    <select className="form-control city txt_contact" onChange={(event) => selectedcityList(event.target.value)} disabled>

                                                        <option value={''}>Chọn Tỉnh phố</option>
                                                        {
                                                            itemCityList ? itemCityList.map((item, index) => {

                                                                return (
                                                                    <option key={index} value={item.id} selected={parseInt(citySelected) == item.id ? true : false} >{item.city_name}</option>

                                                                )
                                                            }) : null
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 edit_delete_user">
                                                <button  className="btn btn-danger btn-rounded m-r-lg edit_user" onClick={() => edit_user()}>Sửa</button>
                                                <button type="submit" className="btn btn-success btn-rounded m-r-lg hide update_user" onClick={() => update_user()}>Lưu</button>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                   
                                    <div className="table-responsive history-tab">
                                        <table className="table table-bordered text-center tbl_order tbl_padding">
                                            <thead>
                                                <tr>                                             
                                                    <th>Mã đơn hàng <br></br> Ngày Đặt</th>
                                                   
                                                    <th>Dịch vụ</th>
                                                    <th>Trạng thái</th>
                                                    <th>Tổng tiền</th>
                                                    <th>Đã thanh toán</th>
                                                    <th>Giảm giá</th>
                                                    <th>Còn lại</th>
                                                
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orderHistory ? orderHistory.map((item,index)=>{
                                                        return(
                                                            <tr className={`tr_${item.id}`} key={index}>
                                                                 <td> 

                                                                <a href={`${BASE_URL}ViewVoucher?code=${item.code}`} target="_blank" className="text-primary" >
                                                                    DH-{item.code}
                                                                </a>
                                                                 <br></br>
                                                                 <span className="text-muted font-italic">{item.date_time}</span></td>
                                                                 
                                                                 <td>
                                                                    {
                                                                        item.service_arr ? item.service_arr.map((item_service,index_service)=>{
                                                                        
                                                                        return(
                                                                            <span key={index_service}>
                                                                                {item_service}<br></br>
                                                                            </span>
                                                                        )
                                                                        
                                                                        }):null
                                                                    }
                                                                 </td>
                                                                <td>
                                                                    <span style={{color: `${item.name_status_color}`}}>{item.name_status}</span>
                                                                </td>
                                                                <td>
                                                                    <span className="text-info">{GlobalJs.format_currency(item.all_totlal)}</span>
                                                                </td>
                                                                <td>
                                                                    <span className="text-warning">{item.total_price_history_success}</span>
                                                                </td>
                                                                <td>
                                                                    <span style={{color: "#b400d4"}}>{item.discount_price}</span>
                                                                </td>
                                                                <td>
                                                                    <span className="text-success">{item.remain_total}</span>
                                                                </td>
                                                                 
                                                            </tr>
                                                        )
                                                    }):null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>

                        </Tab.Container>

                    </div>
                </div>
            </div>
        </main>
    )
}
const mapStateToProps = state => ({
    countryUserInfo: state.countryUserInfo,
    userInfo: state.userInfo,
    orderHistoryInfo: state.orderHistoryInfo,
});
export default connect(mapStateToProps, actions)(info_user)