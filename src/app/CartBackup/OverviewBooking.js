import { Col, Container, Form, Row, FloatingLabel, Button} from "react-bootstrap";
import {FaMinusCircle, FaPlusCircle, FaUserFriends,FaChild, FaPhoneAlt,FaMailBulk,FaRegCalendarMinus,FaUsers } from "react-icons/fa"
import OverviewRight from "./OverviewRight";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Modal from 'react-bootstrap/Modal';
import * as actions from "../../../redux/actions";
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE } from '../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../js/lang';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as GlobalJs from "../../../js/global"
function OverviewBooking(props){

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
  // let router = useRouter();
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




  // let phone_post = phone.replace("84", 0)



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

  useEffect(() => {
    props.fetchAddCartDetail(1)
    props.fetchSetupAddress()

  }, [])
  useEffect(() => {
    setdataCartList(add_cart_list)

  }, [add_cart_list])

  useEffect(() => {
    setallTotal(total_all_item)
  }, [total_all_item])

  useEffect(() => {
    if (user_data) {
      setUserInput(user_data.fullname)
      setEmailInput(user_data.email)
      setPhoneInput(user_data.phone)
      setNationalityInput(user_data.nationality)
      setNationalitySelected(user_data.nationality)

    }

  }, [user_data])
  useEffect(() => {
    props.fetchCountryUser()
    getLangText()
  }, [])

  const update_user = async () => {


    let url_api = BASE_URL_API + "Balotour/Info/updateUserCart"
    let token = await GET_TOKEN();

    let fd = new FormData()
    fd.append("id", user_data.id)
    fd.append("name", userInput)
    fd.append("email", emailInput)
    fd.append("phone", phoneInput)
    fd.append("nationality", nationalityInput)
    axios.post(url_api, fd, {
      headers: {
        "x-api-key": "api_key",
        'USER-TOKEN': JSON.parse(token),
        "Content-Type": "multipart/form-data"
      }
    }).then(async function (response) {
      props.getUserInfo();
      Toast.fire({
        title: "Thay đổi thông tin thành công",
        icon: "success"
      })
      console.log(response);
      // window.location.reload("/")
      allhandleClose()
    })
        .catch(function (error) {
          console.log(error);
        });
  }

  const next_page = async () => {
    if (checkboxOrder == '') {
      Toast.fire({
        title: "Chưa chọn địa chỉ liên lạc",
        icon: "error"
      })
      return false
    }
    await localStorage.setItem('user_more', JSON.stringify(more))

    router.push('/cart/payment_method');
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
    return (
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

            {/*  {renderDivsAdult(countAdult)}*/}
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
    );
}

const mapStateToProps = state => ({
  tourDetailInfoW3: state.tourDetailInfoW3,
  userInfo: state.userInfo,
  addCartDetailInfo: state.addCartDetailInfo,
  countryUserInfo: state.countryUserInfo,
  setupAddressInfo: state.setupAddressInfo,
});
export default connect(mapStateToProps, actions)(OverviewBooking);