"use client"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {FaUserAlt, FaSearch, FaBars, FaCartPlus} from 'react-icons/fa';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {Button, Col, Dropdown, Offcanvas, Row} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import { GET_TOKEN,GET_LANG_CODE } from '../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../js/lang';
import {addToCartAction, deleteCartAction, getToCartAction, removeCartAction} from "../../../redux/actions";
import * as GlobalJs from "../../../js/global";
import DropdownMenu from "react-bootstrap/DropdownMenu";

function Header(props){

  const [isLogin, setIsLogin] = useState(false)
  const [textShow, setTextShow] = useState('')

  const [imageCountry, setImageCountry] = useState('')

  const [menuIcon, setMenuIcon] = useState(false)

  const [menuImage, setMenuImage] = useState(false)
  useEffect(() => {
    props.getToCartAction()
  },[])
  let listItemCart = props ? props.getToCart : '';

  const [listCart, setListCart] = useState([])
  const [tot, setTot] = useState(0)
  useEffect(() => {
    setListCart(listItemCart);
  }, [listItemCart]);

  const checkToken = async () => {
    let token = await GET_TOKEN();
    if (token) {
      setIsLogin(true)
      props.getUserInfo()
      props.fetchAddCartList()
    }
  }
  const handleLogout = async () => {
    await localStorage.removeItem('token')
    props.getUserInfo()
    window.location.replace("/")
  }
  const removeItemCart = (id) => {
    props.removeCartAction;
    let newCart = [];
    newCart = listCart.filter((item) => item.id !== id)
    setListCart(newCart);
    localStorage.setItem("cartItems",JSON.stringify(newCart));

  }

  useEffect(() => {
    let totalPrice = listCart.reduce(function (accumulator, item) {
      return accumulator + parseInt(item.total_price) ;
    }, 0);
    setListCart(listCart)
    setTot(totalPrice);
  }, [listCart]);

  const getLangText = async () => {
    let lang_code = await GET_LANG_CODE();
    let lang_text ={}
    switch (JSON.parse(lang_code)) {
      case 'vi':
        lang_text = GET_LANG_vi().header
        break;
      default:
        lang_text = GET_LANG_ko().header
        break;
    }
    setTextShow(lang_text)
  }
  useEffect(() => {
    checkToken();
    props.getUserInfo()
    props.fetchLanguage()
    props.fetchLanguageDetail()
    props.getToCartAction()
    getLangText()
    getCartItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let user_data = props.userInfo.data && props.userInfo.isLoading == false ? props.userInfo.data : '';
  let languageList = props.languageListInfo.data && props.languageListInfo.isLoading == false ? props.languageListInfo.data : '';
  let languageDetail = props.languageDetailInfo.data && props.languageDetailInfo.isLoading == false ? props.languageDetailInfo.data : '';




  let numberItem = listCart ? listCart.length : '0'
  // const cartItems = localStorage.getItem('cartItems');

  function formatToInt(str) {
    // Xóa tất cả dấu phẩy trong chuỗi
    let formattedStr = str.replace(/,/g, '');

    // Chuyển đổi chuỗi thành kiểu số nguyên
    let intValue = parseInt(formattedStr);

    return intValue;
  }
  // let totalPrice = 0;
  //
  // for (let i = 0; i < listItemCart.length; i++) {
  //   if (listItemCart[i].hasOwnProperty('price')) {
  //     totalPrice += formatToInt(listItemCart[i].price);
  //   }
  // }
  // console.log(totalPrice);

  const getCartItems = () => {
    props.getToCartAction()
  }
  const choose_country = (item) => {

    localStorage.setItem('lang', JSON.stringify(item.name_sm))
    setImageCountry(item.image)
    window.location.replace("/")
  }
  useEffect(() => {

    setImageCountry(languageDetail.image)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageDetail])

  useEffect(() => {
    getCartItems()
  },[])

  const [search, setSearch] = useState('');
  const [showNav, setShowNav] = useState(false);

  const handleCloseNav = () => setShowNav(false);
  const handleShow = () => setShowNav(true);
  const clickMenu = (item)=>{
    setMenuIcon(false)
    setMenuImage(false)

    switch (item) {
      case 'icon':
        setMenuIcon(!menuIcon)
        break;
      case 'image':
        setMenuImage(!menuImage)
        break;
    }
  }

    return (
      <>
        <div className="header-first">
          <div className="container">
            <div className="row">
              <div className="col-4 hotline_firsttop">
                <div className="area-info">
                  <div className='phone-hotline'>
                      <span className='text-hotline'>Hotline:</span>
                      <span className='num-line'>1900 2644</span>
                  </div>
                </div>
              </div>
              <div className="col-8 danhmuc_firsttop">
                <div className="menu-info">
                    <div className='muc_menu'>
                        <div className='users_images'>
                          <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/icon-login.png' alt='user_icons' />
                        </div>
                    </div>
                    <div className='line-vertical'>
                        |
                    </div>
                    <div className='muc_menu'>
                        <div className='flags_images'>
                          <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/flag_icons.png' alt='flag_icons' />
                        </div>
                        <span className='title_menu'>Ngôn ngữ</span>
                    </div>
                    <div className='line-vertical_2'>
                        |
                    </div>
                    <div className='muc_menu'>
                      <i class='bx bx-basket'></i>
                        <span className='title_menu'>Giỏ hàng</span>
                        <div className='quantity_cart'>
                            <span className='soluong_cart'>0</span>
                        </div>
                    </div>
                    <div className='muc_menu'>
                      <i class='bx bx-paper-plane'></i>
                        <span className='title_menu'>Tour đã xem</span>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className='line_stripe'>
                <div className='line_stripe_righthaft'></div>
                <div className='line_stripe_wrap'></div>
            </div>
        </div>
        <Navbar expand="lg" className="bg-body-tertiary header position-relative text-center">
            <Container fluid className='navbar_goodsmile'>
              <div className="d-flex header_moblie">
                <Link href="/" className='navbar_logo_images'>
                  <img src="https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/logo-gst-dovang-1624975291.png" style={{width: '200px'}}/>
                </Link>

                  <Navbar expand="lg" className="item_list_header">
                    <Container fluid>
                      <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                          <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                          >
                            <Nav.Link href="#action1">TRANG CHỦ</Nav.Link>
                            <Nav.Link href="#action2" className='navcha'>TOUR
                              <ul className='navcon'>
                                <li><Nav.Link>TOUR GIÁP THÌN 2024</Nav.Link></li>
                                <li><Nav.Link>TOUR NƯỚC NGOÀI
                                  <ul className='navchau'>
                                    <li><Nav.Link>DU LỊCH INDONESIA</Nav.Link></li>
                                    <li><Nav.Link>DU LỊCH LÀO</Nav.Link></li>
                                    <li><Nav.Link>DU LỊCH CHÂU ÂU</Nav.Link></li>
                                    <li><Nav.Link>DU LỊCH ÚC</Nav.Link></li>
                                    <li><Nav.Link>DU LỊCH ẤN ĐỘ</Nav.Link></li>
                                  </ul>
                                  </Nav.Link>
                                </li>
                                <li><Nav.Link>TOUR THEO YÊU CẦU
                                    <ul className='navchau'>
                                      <li><Nav.Link>TOUR GIA ĐÌNH</Nav.Link></li>
                                      <li><Nav.Link>TỔ CHỨC SỰ KIỆN</Nav.Link></li>
                                      <li><Nav.Link>TOUR NGHỈ DƯỠNG</Nav.Link></li>
                                      <li><Nav.Link>TOUR HÀNH HƯƠNG</Nav.Link></li>
                                    </ul>
                                  </Nav.Link>
                                </li>
                                <li><Nav.Link>TOUR TREKKING</Nav.Link></li>
                              </ul>
                            </Nav.Link>
                            <Nav.Link href="#action3">FLASHPACKING</Nav.Link>
                            <Nav.Link href="#action4">VISA</Nav.Link>                
                            <Nav.Link href="#action5">VÉ MÁY BAY</Nav.Link>
                            <Nav.Link href="#action6">VOUCHER - COMBO</Nav.Link>
                            <Nav.Link href="#action7" className='navcha'>NHẬT KÝ
                              <ul className='navcon'>
                                <li><Nav.Link>KHÁCH LẺ GHÉP ĐOÀN</Nav.Link></li>
                                <li><Nav.Link>BẤT ĐỘNG SẢN</Nav.Link></li>
                                <li><Nav.Link>SỨC KHỎE - BẢO HIỂM</Nav.Link></li>
                                <li><Nav.Link>CƠ QUAN NHÀ NƯỚC</Nav.Link></li>
                                <li><Nav.Link>SỨC KHỎE</Nav.Link></li>
                                <li><Nav.Link>GIẢI TRÍ - SHOWBIZ</Nav.Link></li>
                                <li><Nav.Link>CÔNG NGHỆ CAO</Nav.Link></li>
                                <li><Nav.Link>TÀI CHÍNH - NGÂN HÀNG</Nav.Link></li>
                                <li><Nav.Link>SẢN XUẤT - CHẾ BIẾN</Nav.Link></li>
                                <li><Nav.Link>THẨM MỸ - LÀM ĐẸP</Nav.Link></li>
                                <li><Nav.Link>GIA ĐÌNH - NHÓM BẠN BÈ</Nav.Link></li>
                                <li><Nav.Link>TÔN GIÁO - THIỆN NGUYỆN</Nav.Link></li>
                              </ul>
                            </Nav.Link>

                          
                            <Nav.Link href="#action8">TIN TỨC</Nav.Link>
                            <Nav.Link href="#action9">REVIEW</Nav.Link>
                          </Nav>
                        </Navbar.Collapse>
                    </Container>
                  </Navbar>
              </div>
              </Container>
        </Navbar>
      </>

    )
}


const mapStateToProps = state => ({
  userInfo: state.userInfo,
  getToCart: state.getToCart,
  languageListInfo: state.languageListInfo,
  languageDetailInfo: state.languageDetailInfo,
});
export default connect(mapStateToProps, actions)(Header);
