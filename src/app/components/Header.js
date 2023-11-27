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
import * as GlobalJs from "../../../js/global";
import {useRouter, useSearchParams} from "next/navigation";
import Swal from "sweetalert2";
import {addToCartAction, deleteCartAction, getToCartAction, removeCartAction} from "../../../redux/actions";

import DropdownMenu from "react-bootstrap/DropdownMenu";

function Header(props){

  const [isLogin, setIsLogin] = useState(false)
  const [textShow, setTextShow] = useState('')
  const router =useRouter()

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

  const toggle = () => {
    setDropdownOpen(prevState => !prevState);
  };

    const handleDropdownItemClick = () => {
        checkToken();
        if (isLogin) {
            setDropdownOpen(prevState => !prevState);
            router.push('/cart/');
        } else {
            setDropdownOpen(prevState => !prevState);
            router.push('/Auth/login/');
        }

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
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic" className="bg-transparent border-0 text-black ">
                          <div className='users_images'>
                            <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/icon-login.png' alt='user_icons' />
                          </div>
                          </Dropdown.Toggle>
                          {
                    !user_data  ?
                      <Dropdown.Menu className="dropdown_user">
                          <>
                            <Dropdown.Item>
                              <div className='d-flex justify-content-center align-items-center'>
                                <Link href='/Auth/Login'>
                                  {textShow ? textShow.Log_In : ''}
                                </Link>
                              </div>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <div className='d-flex justify-content-center align-items-center'>
                                <Link href='/Auth/Register'>
                                  {textShow ? textShow.Register : ''}
                                </Link>
                              </div>
                              </Dropdown.Item>
                          </>
                      </Dropdown.Menu>
                       :
                      <Dropdown.Menu className='avatar' show={menuImage} onClick={()=>clickMenu('image')}
                      title={<img src={ user_data ? user_data.image : 'https://vigomanager.com/assets_front/images/no_image.jpg'} className="img-avatar" />}> 
                        <>
                          <Dropdown.Item>
                            <Link href="/InfoUser" passHref>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <img className='img-info' src='https://vigomanager.com/app-assets/mobile/balotour/icon/profile.png'  />
                                    <div className=''>{textShow ? textShow.Information : ''}</div>
                                </div>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <div className='d-flex justify-content-center align-items-center log-out'>
                              <img className='img-info' src='https://vigomanager.com/app-assets/mobile/balotour/icon/turn-off.png'  />
                              <a onClick={handleLogout} >
                                  <span>{textShow ? textShow.Log_Out : ''}</span>
                              </a>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link href="/TourWatched">
                                Các Tour đã xem qua
                            </Link>
                          </Dropdown.Item>
                        </>
                      </Dropdown.Menu>
                }
                  
                </Dropdown>
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
                      <Nav.Link  onClick={(event)=>{
                        event.preventDefault()
                        router.push('/CartBackup')
                      }}>
                        <i class='bx bx-basket'></i>
                          <span className='title_menu'>Giỏ hàng</span>
                          <div className='quantity_cart'>
                              <span className='soluong_cart'>{numberItem}</span>
                          </div>
                      </Nav.Link>
                    </div>
                      <div className='muc_menu'>
                        <Link href="/TourWatched">
                          <i class='bx bx-paper-plane'></i>
                          <span className='title_menu'>Tour đã xem</span>
                        </Link>
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
                        <Navbar.Collapse id="navbarScroll" className='navbar_tongsoxuong'>
                            <Nav
                            className="me-auto my-2 my-lg-0"
                            navbarScroll
                          >
                            <Nav.Link>
                              <Link href="/">TRANG CHỦ</Link>
                            </Nav.Link>
                            <Nav.Link className='navcha'><Link  href="/" >TOUR</Link>
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
                            <Nav.Link><Link href="/">FLASHPACKING</Link></Nav.Link>
                            <Nav.Link><Link href="/">VISA</Link></Nav.Link>                
                            <Nav.Link><Link href="/">VÉ MÁY BAY</Link></Nav.Link>
                            <Nav.Link><Link href="/">VOUCHER - COMBO</Link></Nav.Link>
                            <Nav.Link className='navcha'><Link href='/Camnang'>NHẬT KÝ</Link>
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

                          
                            <Nav.Link><Link href='/Tintuc'>TIN TỨC</Link></Nav.Link>
                            <Nav.Link><Link href='/about'>REVIEW</Link></Nav.Link>
                          </Nav>
                        </Navbar.Collapse>
                    </Container>
                  </Navbar>
              </div>

              <Button className="menu_mobile" onClick={handleShow}>
                <FaBars/>
              </Button>
              <Offcanvas show={showNav} onHide={handleCloseNav} placement="top" className="menu_mobile_canva">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>
                    <Link href="/">
                    <img src="https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/logo-gst-dovang-1624975291.png" style={{width: '200px'}}/>
                    </Link>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav>
                    <Nav.Link href="/">TRANG CHỦ</Nav.Link>
                    <NavDropdown
                        id="nav-dropdown-tour-"
                        title="TOUR"

                    >
                      <NavDropdown.Item>TOUR GIÁP THÌN</NavDropdown.Item>
                      <NavDropdown.Item>TOUR NƯỚC NGOÀI</NavDropdown.Item>
                      <NavDropdown.Item href="/">TOUR TREKKING</NavDropdown.Item>
                      <NavDropdown.Item href="/">TOUR THEO YÊU CẦU</NavDropdown.Item>
                    </NavDropdown>
                    <Link href="/">FLASHPACKING</Link>
                    <Link href="/">VISA</Link>
                    <Link href="/">VÉ MÁY BAY -VOUCHER COMBO</Link>
                    <NavDropdown id="nav-dropdown-tour-nn" title="NHẬT KÝ">
                      <NavDropdown.Item>KHÁCH LẺ GHÉP ĐOÀN</NavDropdown.Item>
                      <NavDropdown.Item>BẤT ĐỘNG SẢN</NavDropdown.Item>
                      <NavDropdown.Item>SỨC KHỎE - BẢO HIỂM</NavDropdown.Item>
                      <NavDropdown.Item>GIẢI TRÍ - SHOWBIZ</NavDropdown.Item>
                        <NavDropdown.Item>CÔNG NGHỆ CAO</NavDropdown.Item>
                        <NavDropdown.Item>TÀI CHÍNH - NGÂN HÀNG</NavDropdown.Item>
                       <NavDropdown.Item>SẢN XUẤT - CHẾ BIẾN</NavDropdown.Item>
                       <NavDropdown.Item>THẨM MỸ - LÀM ĐẸP</NavDropdown.Item>
                       <NavDropdown.Item>GIA ĐÌNH - NHÓM BẠN BÈ</NavDropdown.Item>
                      <NavDropdown.Item>TÔN GIÁO - THIỆN NGUYỆN</NavDropdown.Item>
                      <NavDropdown.Item>CƠ QUAN NHÀ NƯỚC</NavDropdown.Item>
                    </NavDropdown>
                    <Link href="/about">TIN TỨC </Link>
                    <Link href="/Contact">REVIEW</Link>


                  </Nav>
                </Offcanvas.Body>
              </Offcanvas>
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
