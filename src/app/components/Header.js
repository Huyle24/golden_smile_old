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
       //<div className="header_fixed">
        //   <Navbar expand="lg" className="bg-body-tertiary header position-relative">
        //     <Container fluid className=''>
        //       <div className="d-flex header_moblie">
        //         <Link href="/">
        //           <img src="https://demo.nhanhtravel.com/upload/company/20230729124433.png" style={{width: '200px'}}/>
        //         </Link>

        //         <Navbar.Collapse id="basic-navbar-nav" className="item_list_header">
        //           <Nav className="me-auto">
        //             <div className="hover_menu">
        //               <NavDropdown title={textShow ? textShow.Tourism : ''} id="basic-nav-dropdown" className="item_mega_menu">
        //               </NavDropdown>
        //               <div className="mega_menu">
        //                 <Container>
        //                   <Row>
        //                     <Col lg={3} className="list_tour">
        //                       <span className="color_blue fw-bold list_tour_title position-relative">TOUR MIỀN BẮC</span>
        //                       <ul>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Hà Nội</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Hạ Long</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Bắc Ninh</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Phú Thọ</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Ninh Bình</li>
        //                         <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
        //                       </ul>
        //                     </Col>
        //                     <Col lg={3} className="list_tour">
        //                       <span className="color_blue fw-bold list_tour_title position-relative">TOUR MIỀN TRUNG</span>
        //                       <ul>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Huế</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Đà Nẵng</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Quảng Nam</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Quảng Trị</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Quảng Bình</li>
        //                         <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
        //                       </ul>
        //                     </Col>
        //                     <Col lg={3} className="list_tour">
        //                       <span className="color_blue fw-bold list_tour_title position-relative">TOUR MIỀN NAM</span>
        //                       <ul>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Hồ Chí Minh</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Bà Rịa - Vũng Tàu</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Tây Ninh</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Côn Đảo</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Đồng Nai</li>
        //                         <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
        //                       </ul>
        //                     </Col>
        //                     <Col lg={3} className="list_tour">
        //                       <span className="color_blue fw-bold list_tour_title position-relative">TOUR MIỀN TÂY</span>
        //                       <ul>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Bến Tre</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Cà Mau</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Cần Thơ</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Kiên Giang</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch An Giang</li>
        //                         <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
        //                       </ul>
        //                     </Col>
        //                   </Row>
        //                   <Row className="mt-4">
        //                     <Col lg={3} className="list_tour">
        //                       <span className="color_blue fw-bold list_tour_title position-relative">TOUR CHÂU Á</span>
        //                       <ul>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Thái Lan</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Campuchia</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Hồng Kông - MaCau</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Malaysia</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Trung Quốc</li>
        //                         <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
        //                       </ul>
        //                     </Col>
        //                     <Col lg={3} className="list_tour">
        //                       <span className="color_blue fw-bold list_tour_title position-relative">TOUR CHÂU PHI</span>
        //                       <ul>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Ai Cập</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Kenya</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Madagascar</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Ma-rốc</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Namibia</li>
        //                         <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
        //                       </ul>
        //                     </Col>
        //                     <Col lg={3} className="list_tour">
        //                       <span className="color_blue fw-bold list_tour_title position-relative">TOUR CHÂU ÂU</span>
        //                       <ul>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Pháp</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Ý</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Tây Ban Nha</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Đức</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch LonDon</li>
        //                         <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
        //                       </ul>
        //                     </Col>
        //                     <Col lg={3} className="list_tour">
        //                       <span className="color_blue fw-bold list_tour_title position-relative">TOUR CHÂU MỸ</span>
        //                       <ul>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Mỹ</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Canada</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Mexico</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Cuba</li>
        //                         <li className="color_blue mt-2 fs-6">Du lịch Panama</li>
        //                         <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
        //                       </ul>
        //                     </Col>
        //                   </Row>
        //                 </Container>
        //               </div>
        //             </div>

        //             <NavDropdown title={textShow ? textShow.Lodging : ''} id="basic-nav-dropdown">
        //               <NavDropdown.Item href="/stay">{textShow ? textShow.Hotel : ''}</NavDropdown.Item>
        //             </NavDropdown>
        //             <Nav.Link href="">{textShow ? textShow.Transport : ''}</Nav.Link>
        //             <NavDropdown title={textShow ? textShow.Blog : ''} id="basic-nav-dropdown">
        //               <NavDropdown.Item href="#action/3.1">
        //                 <Link href="/Tintuc">
        //                   Tin tức mới
        //                 </Link>
        //               </NavDropdown.Item>
        //               <NavDropdown.Item href="#action/3.2">
        //                 <Link href="/Camnang">
        //                   Cẩm nang du lịch
        //                 </Link>
        //               </NavDropdown.Item>
        //             </NavDropdown>

        //             <Nav.Link href="/about">{textShow ? textShow.Company_Introduction : ''}</Nav.Link>
        //             <Nav.Link href="">{textShow ? textShow.Promotion : ''}</Nav.Link>
        //             <Nav.Link href="">{textShow ? textShow.Gift_Certificate : ''}</Nav.Link>
        //             <Nav.Link href="/Contact" className="d-flex text-center">{textShow ? textShow.Contact : ''}</Nav.Link>
        //           </Nav>
        //         </Navbar.Collapse>
        //       </div>
        //       <div className='d-flex align-items-center justify-content-between user_search'>
        //         <NavDropdown
        //             title={
        //               <img className="icon_country_header" src={imageCountry ? imageCountry : 'https://vigomanager.com/app-assets/mobile/manager/image/flag_ko.png'}/>
        //             }
        //             id="basic-nav-dropdown " show={menuIcon} onClick={()=>clickMenu('icon')} className="flat" >
        //           {
        //             languageList ? languageList.map((item,index)=>{
        //               return (


        //                   <NavDropdown.Item key={index} onClick={()=> choose_country(item)}>
        //                     <div className='d-flex ' >
        //                       <img className="icon_country " src={item.image} />
        //                       <span>{item.name}</span>
        //                     </div>
        //                   </NavDropdown.Item>
        //               )
        //             }):null
        //           }

        //         </NavDropdown>
        //         <Dropdown>

        //           <Dropdown.Toggle id="dropdown-basic" className="bg-transparent border-0 text-black position-relative ms-2" >
        //             <FaCartPlus className="text-black icon_change" onClick={() => getCartItems()}/>
        //             <div className="text-black position-absolute px-2  bg-primary fs-6 top-0 start-0 text-white number_cart">{numberItem}</div>

        //           </Dropdown.Toggle>
        //             <Dropdown.Menu className="dropdown_user">
        //               <div>
        //                 <div className="cart_list">
        //                   {listCart ? (listCart.map((item,index) =>
        //                       <div className="cart-item-header d-flex justify-content-between align-items-center" key={index}>
        //                         <div className="d-flex">
        //                           <div className="image">
        //                             <img src={item.image ? item.image[0] : ''} alt="cart"/>
        //                           </div>
        //                           <div className="info text-black">
        //                             <div className="title ">{item.name}</div>
        //                             <div>{item.name}</div>
        //                             <div>{item.adult} Người lớn , {item.child} Trẻ em</div>
        //                             <div className="text-danger">{GlobalJs.format_currency(item.total_price)} VNĐ</div>
        //                           </div>
        //                         </div>

        //                         <div id="delete-btn">
        //                           <span  className="text-danger ps-3" onClick={() => removeItemCart(item.id)}>Xóa</span>
        //                         </div>
        //                       </div>

        //                   )) : []}
        //                 </div>
        //                 <div className="d-flex justify-content-between">
        //                   <div className="output px-4">
        //                     <div>Tổng tiền ({numberItem} items)</div>
        //                     <div className="text-danger">{GlobalJs.format_currency(tot)} VNĐ</div>
        //                   </div>
        //                   <div className="entry px-4">
        //                     <Link href="/CartBackup">
        //                       <span className="">Xem giỏ hàng</span>
        //                     </Link>
        //                   </div>
        //                 </div>
        //               </div>
        //             </Dropdown.Menu>

        //         </Dropdown>
        //         {user_data ? [user_data].map((item,index)=>(
        //                 <Dropdown key={index}>
        //                   <Dropdown.Toggle id="dropdown-basic" className="bg-transparent border-0 text-black d-flex align-items-center">
        //                     <img src={
        //                       item ? item.image : 'https://vigomanager.com/assets_front/images/no_image.jpg'
        //                     } alt="anh dai dien" style={{width: "24px"}} className="rounded-circle me-1"/>
        //                     <span className="text-primary">{user_data.fullname}</span>
        //                 </Dropdown.Toggle>

        //                   <Dropdown.Menu className="dropdown_user">
        //                     <Dropdown.Item>
        //                       <Link href="/info">
        //                         Tài Khoản Của Tôi
        //                       </Link>
        //                     </Dropdown.Item>
        //                     <Dropdown.Item>
        //                       <Link href="https://demo.nhanhtravel.com/">
        //                         Đăng Nhập Hệ Thống
        //                       </Link>
        //                     </Dropdown.Item>
        //                     <Dropdown.Item>
        //                       <div onClick={() =>handleLogout()} className="text-primary">
        //                         Đăng xuất
        //                       </div>
        //                     </Dropdown.Item>
        //                   </Dropdown.Menu>
        //                 </Dropdown>
        //              )) :
        //             <div className="d-flex align-items-center">
        //               <Link href="/Auth/Register" className="me-2">
        //                 <span>Đăng ký</span>
        //               </Link>
        //               <Link href="/Auth/Login">
        //                 <Button className="rounded-pill">Đăng nhập</Button>
        //               </Link>
        //             </div>}
        //       </div>
        //       <Button className="menu_mobile" onClick={handleShow}>
        //         <FaBars/>
        //       </Button>
        //       <Offcanvas show={showNav} onHide={handleCloseNav} placement="end" className="menu_mobile_canva">
        //         <Offcanvas.Header closeButton>
        //           <Offcanvas.Title>
        //             <Link href="/">
        //               <img src="https://demo.nhanhtravel.com/upload/company/20230729124433.png" style={{width: '200px'}}/>
        //             </Link>
        //           </Offcanvas.Title>
        //         </Offcanvas.Header>
        //         <Offcanvas.Body>
        //           <Nav>
        //             <NavDropdown
        //                 id="nav-dropdown-tour-"
        //                 title="Tour trong nước"
        //                 menuVariant="dark"
        //             >
        //               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        //               <NavDropdown.Item href="#action/3.2">
        //                 Another action
        //               </NavDropdown.Item>
        //               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //               <NavDropdown.Divider />
        //               <NavDropdown.Item href="#action/3.4">
        //                 Separated link
        //               </NavDropdown.Item>
        //             </NavDropdown>
        //             <NavDropdown
        //                 id="nav-dropdown-tour-nn"
        //                 title="Tour nước ngoài"
        //                 menuVariant="dark"
        //             >
        //               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        //               <NavDropdown.Item href="#action/3.2">
        //                 Another action
        //               </NavDropdown.Item>
        //               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //               <NavDropdown.Divider />
        //               <NavDropdown.Item href="#action/3.4">
        //                 Separated link
        //               </NavDropdown.Item>
        //             </NavDropdown>
        //             <NavDropdown
        //                 id="nav-dropdown-bai-viet"
        //                 title="Blog"
        //                 menuVariant="dark"
        //             >
        //               <NavDropdown.Item href="/Tintuc">Tin tức mới</NavDropdown.Item>
        //               <NavDropdown.Item href="/Camnang">
        //                 Cẩm nang du lịch
        //               </NavDropdown.Item>
        //             </NavDropdown>
        //             <NavDropdown
        //                 id="nav-dropdown-lien-he"
        //                 title="Lưu trú"
        //                 menuVariant="dark"
        //             >
        //               <NavDropdown.Item href="/stay">Khách sạn</NavDropdown.Item>
        //             </NavDropdown>
        //             <Nav.Link href="/about">Về chúng tôi</Nav.Link>
        //             <Nav.Link href="/Contact">Liên hệ</Nav.Link>
        //             <Nav.Link href="/Auth/Login">Đăng nhập</Nav.Link>


        //           </Nav>
        //         </Offcanvas.Body>
        //       </Offcanvas>
        //     </Container>
        //   </Navbar>

        // </div>
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
                      <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                      <Navbar.Toggle aria-controls="navbarScroll" />
                      <Navbar.Collapse id="navbarScroll">
                        <Nav
                          className="me-auto my-2 my-lg-0"
                          style={{ maxHeight: '100px' }}
                          navbarScroll
                        >
                          <Nav.Link href="#action1">Home</Nav.Link>
                          <Nav.Link href="#action2">Link</Nav.Link>
                          <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                              Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                              Something else here
                            </NavDropdown.Item>
                          </NavDropdown>
                          <Nav.Link href="#" disabled>
                            Link
                          </Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                          <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                          />
                          <Button variant="outline-success">Search</Button>
                        </Form>
                      </Navbar.Collapse>
                    </Container>
                  </Navbar>

                {/* <Navbar.Collapse className="item_list_header">
                  <Nav className="me-auto">
                    <div className="hover_menu">
                      <NavDropdown title="TRANG CHỦ" className="item_mega_menu">
                      </NavDropdown>
                      <div className="mega_menu">
                        <Container>
                          <Row>
                            <Col lg={3} className="list_tour">
                              <span className="color_blue fw-bold list_tour_title position-relative">TOUR MIỀN BẮC</span>
                              <ul>
                                <li className="color_blue mt-2 fs-6">Du lịch Hà Nội</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Hạ Long</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Bắc Ninh</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Phú Thọ</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Ninh Bình</li>
                                <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
                              </ul>
                            </Col>
                            <Col lg={3} className="list_tour">
                              <span className="color_blue fw-bold list_tour_title position-relative">TOUR MIỀN TRUNG</span>
                              <ul>
                                <li className="color_blue mt-2 fs-6">Du lịch Huế</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Đà Nẵng</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Quảng Nam</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Quảng Trị</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Quảng Bình</li>
                                <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
                              </ul>
                            </Col>
                            <Col lg={3} className="list_tour">
                              <span className="color_blue fw-bold list_tour_title position-relative">TOUR MIỀN NAM</span>
                              <ul>
                                <li className="color_blue mt-2 fs-6">Du lịch Hồ Chí Minh</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Bà Rịa - Vũng Tàu</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Tây Ninh</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Côn Đảo</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Đồng Nai</li>
                                <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
                              </ul>
                            </Col>
                            <Col lg={3} className="list_tour">
                              <span className="color_blue fw-bold list_tour_title position-relative">TOUR MIỀN TÂY</span>
                              <ul>
                                <li className="color_blue mt-2 fs-6">Du lịch Bến Tre</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Cà Mau</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Cần Thơ</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Kiên Giang</li>
                                <li className="color_blue mt-2 fs-6">Du lịch An Giang</li>
                                <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
                              </ul>
                            </Col>
                          </Row>
                          <Row className="mt-4">
                            <Col lg={3} className="list_tour">
                              <span className="color_blue fw-bold list_tour_title position-relative">TOUR CHÂU Á</span>
                              <ul>
                                <li className="color_blue mt-2 fs-6">Du lịch Thái Lan</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Campuchia</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Hồng Kông - MaCau</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Malaysia</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Trung Quốc</li>
                                <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
                              </ul>
                            </Col>
                            <Col lg={3} className="list_tour">
                              <span className="color_blue fw-bold list_tour_title position-relative">TOUR CHÂU PHI</span>
                              <ul>
                                <li className="color_blue mt-2 fs-6">Du lịch Ai Cập</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Kenya</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Madagascar</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Ma-rốc</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Namibia</li>
                                <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
                              </ul>
                            </Col>
                            <Col lg={3} className="list_tour">
                              <span className="color_blue fw-bold list_tour_title position-relative">TOUR CHÂU ÂU</span>
                              <ul>
                                <li className="color_blue mt-2 fs-6">Du lịch Pháp</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Ý</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Tây Ban Nha</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Đức</li>
                                <li className="color_blue mt-2 fs-6">Du lịch LonDon</li>
                                <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
                              </ul>
                            </Col>
                            <Col lg={3} className="list_tour">
                              <span className="color_blue fw-bold list_tour_title position-relative">TOUR CHÂU MỸ</span>
                              <ul>
                                <li className="color_blue mt-2 fs-6">Du lịch Mỹ</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Canada</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Mexico</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Cuba</li>
                                <li className="color_blue mt-2 fs-6">Du lịch Panama</li>
                                <li className="color_blue mt-2 fw-bold">Xem tất cả</li>
                              </ul>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </div>
                      <NavDropdown
                          id="nav-dropdown-lien-he"
                          title="TOUR"
                          menuVariant="dark"
                      >
                        <NavDropdown.Item>
                          <Link href="/stay">Khách sạn</Link>
                        </NavDropdown.Item>
                      </NavDropdown>

                <Nav.Link>VÉ MÁY BAY</Nav.Link>

                    <NavDropdown title="VOUCHER - COMBO" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <Link href="/Tintuc">
                          Tin tức mới
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link href="/Camnang">
                          Cẩm nang du lịch
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link onClick={(event)=>{
                      event.preventDefault()
                      router.push('/about')
                    }}>NHÂT KÝ
                    </Nav.Link>

                    <Nav.Link onClick={(event)=>{
                      event.preventDefault()
                      router.push('/')
                    }}>TIN TỨC</Nav.Link>

                    <Nav.Link onClick={(event)=>{
                      event.preventDefault()
                      router.push('/')
                    }}>REVIEW</Nav.Link>
                    
                  </Nav>
                </Navbar.Collapse> */}


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
