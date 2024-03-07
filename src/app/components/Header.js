"use client"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {FaUserAlt, FaSearch, FaBars, FaCartPlus} from 'react-icons/fa';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {Button, Col, Dropdown, Offcanvas, Row} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {GET_TOKEN, GET_LANG_CODE} from '../../../redux/actions/type';
import {GET_LANG_vi, GET_LANG_ko} from '../../../js/lang';
import * as GlobalJs from "../../../js/global";
import {useRouter, useSearchParams, usePathname} from "next/navigation";
import Swal from "sweetalert2";
import {addToCartAction, deleteCartAction, getToCartAction, removeCartAction} from "../../../redux/actions";
import {Card, CardHeader, CardBody, Collapse} from "reactstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import {BrowserRouter, Router, Route, NavLink} from 'react-router';


function Header(props) {
    const pathname = usePathname()
    console.log(pathname)
    const [isLogin, setIsLogin] = useState(false)
    const [textShow, setTextShow] = useState('')
    const router = useRouter()
    const [openedCollapse, setOpenedCollapse] = React.useState("");
    const [imageCountry, setImageCountry] = useState('')

    const [menuIcon, setMenuIcon] = useState(false)
    const [menuImage, setMenuImage] = useState(false)
    useEffect(() => {
        props.getToCartAction()
    }, [])
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
        localStorage.setItem("cartItems", JSON.stringify(newCart));

    }

    useEffect(() => {
        let totalPrice = listCart.reduce(function (accumulator, item) {
            return accumulator + parseInt(item.total_price);
        }, 0);
        setListCart(listCart)
        setTot(totalPrice);
    }, [listCart]);

    const getLangText = async () => {
        let lang_code = await GET_LANG_CODE();
        let lang_text = {}
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
    }, [])

    const [search, setSearch] = useState('');
    const [showNav, setShowNav] = useState(false);

    const handleCloseNav = () => setShowNav(false);
    const handleShow = () => setShowNav(true);
    const clickMenu = (item) => {
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
                    <div className="d-flex justify-content-between header-content">
                        <div className=" hotline_firsttop">
                            <div className="area-info">
                                <div className='phone-hotline d-flex'>
                                    <span className='text-hotline'>Hotline:</span>
                                    <span className='num-line' style={{minWidth: 76}}>1900 2644</span>
                                </div>
                            </div>
                        </div>
                        <div className=" danhmuc_firsttop  ">
                            <div className="menu-info d-flex gap-1 gap-sm-3">


                                <div className='muc_menu hide-mobile'>
                                    <Link href="/TourWatched"
                                          className={'text-white d-flex align-content-center flex-wrap'}>
                                        <i className='bx bxs-paper-plane me-1 d-flex align-content-center flex-wrap'></i>
                                        <span className='title_menu'>Tour đã xem</span>
                                        <i className='bx bx-chevron-down pull-right d-flex align-content-center flex-wrap'></i>
                                    </Link>
                                </div>
                                <div className='muc_menu'>
                                    <Dropdown>
                                        <Nav.Link>
                                            <Dropdown.Toggle id="dropdown-basic"
                                                             className="bg-transparent border-0 position-relative ">
                                                <i className='bx bx-basket me-1'></i>
                                                <span className='title_menu fw-normal'>Giỏ hàng</span>
                                                <div className='quantity_cart'>
                                                    <span className='soluong_cart'>{numberItem}</span>
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown_user">
                                                <div>
                                                    <div className="cart_list">
                                                        {listCart ? (listCart.map((item, index) =>
                                                            <div
                                                                className="cart-item-header d-flex justify-content-between align-items-center"
                                                                key={index}>
                                                                <div className="d-flex">
                                                                    <div className="image me-2">
                                                                        <img src={item.image ? item.image[0] : ''}
                                                                             alt="cart"/>
                                                                    </div>
                                                                    <div className="info text-black">
                                                                        <div className="title ">{item.name}</div>
                                                                        <div>{item.name}</div>
                                                                        <div>{item.adult} Người lớn , {item.child} Trẻ
                                                                            em
                                                                        </div>
                                                                        <div
                                                                            className="text-danger">{GlobalJs.format_currency(item.total_price)} VNĐ
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div id="delete-btn">
                                                                    <span className="text-danger ps-3"
                                                                          onClick={() => removeItemCart(item.id)}>Xóa</span>
                                                                </div>
                                                            </div>
                                                        )) : []}
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="output px-4">
                                                            <div>Tổng tiền ({numberItem} items)</div>
                                                            <div
                                                                className="text-danger">{GlobalJs.format_currency(tot)} VNĐ
                                                            </div>
                                                        </div>
                                                        <div className="entry px-4">
                                                            <Link href="/CartBackup">
                                                                <span className="">Xem giỏ hàng</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Dropdown.Menu>
                                        </Nav.Link>
                                    </Dropdown>
                                </div>
                                <div className='line-vertical'>
                                    |
                                </div>
                                <div className='muc_menu'>
                                    <NavDropdown className="flat" show={menuIcon} onClick={() => clickMenu('icon')}
                                                 title={
                                                     <div className={'d-flex'}>

                                                         <div className='flags_images me-1'>
                                                             <img
                                                                 src={imageCountry ? imageCountry : 'https://vigomanager.com/app-assets/mobile/manager/image/flag_ko.png'}
                                                                 alt='flag_icons'
                                                                 style={{height: '10px', width: '100%'}}/>
                                                         </div>
                                                         <span
                                                             className='title_menu'>{textShow ? textShow.language : 'Ngôn Ngữ'}
                                                             <i className='bx bx-chevron-down'></i></span>

                                                     </div>}
                                    >

                                        {
                                            languageList ? languageList.map((item, index) => {
                                                return (
                                                    <NavDropdown.Item key={index} onClick={() => choose_country(item)}
                                                                      style={{width: 180}}>
                                                        <div className='d-flex gap-2'>
                                                            <img className="icon_country " src={item.image}/>
                                                            <span className={'text-dark'}>{item.name}</span>
                                                        </div>
                                                    </NavDropdown.Item>
                                                )
                                            }) : ''
                                        }
                                    </NavDropdown>
                                </div>
                                <div className='line-vertical_2'>
                                    |
                                </div>

                                <div className='muc_menu'>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic"
                                                         className="bg-transparent border-0 text-black ">
                                            <div className='users_images'>
                                                <img
                                                    src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/icon-login.png'
                                                    alt='user_icons'/>
                                            </div>
                                        </Dropdown.Toggle>
                                        {
                                            !user_data ?
                                                <Dropdown.Menu className="dropdown_user">
                                                    <>
                                                        <Dropdown.Item>
                                                            <div
                                                                className='d-flex justify-content-center align-items-center'>
                                                                <Link href='/Auth/Login'>
                                                                    {textShow ? textShow.Log_In : ''}
                                                                </Link>
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <div
                                                                className='d-flex justify-content-center align-items-center'>
                                                                <Link href='/Auth/Register'>
                                                                    {textShow ? textShow.Register : ''}
                                                                </Link>
                                                            </div>
                                                        </Dropdown.Item>
                                                    </>
                                                </Dropdown.Menu>
                                                :
                                                <Dropdown.Menu className='avatar' show={menuImage}
                                                               onClick={() => clickMenu('image')}
                                                               title={<img
                                                                   src={user_data ? user_data.image : 'https://vigomanager.com/assets_front/images/no_image.jpg'}
                                                                   className="img-avatar"/>}>
                                                    <>
                                                        <Dropdown.Item>
                                                            <Link href="/InfoUser" passHref>
                                                                <div
                                                                    className='d-flex  align-content-center'>
                                                                    <img className='img-info me-2 my-auto'
                                                                         src='https://vigomanager.com/app-assets/mobile/balotour/icon/profile.png'/>
                                                                    <div
                                                                        className=''>{textShow ? textShow.Information : ''}</div>
                                                                </div>
                                                            </Link>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <div
                                                                className='d-flex  log-out align-content-center'>
                                                                <img className='img-info  me-2 my-auto'
                                                                     src='https://vigomanager.com/app-assets/mobile/balotour/icon/turn-off.png'/>
                                                                <a onClick={handleLogout}>
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
                <Container fluid className='navbar_goodsmile' id="accordionExample">
                    <div className="d-flex header_moblie py-3">
                        <Link href="/" className='navbar_logo_images'>
                            <img
                                src="https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/logo-gst-dovang-1624975291.png"
                                style={{width: '200px'}}/>
                        </Link>
                        <Navbar expand="lg" className="item_list_header">

                            <Container fluid>
                                <Navbar.Collapse id="navbarScroll" className='navbar_tongsoxuong'>
                                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                                        <Nav.Link>
                                            <Link href="/"  className= {pathname === '/' ? 'header-tab active' : ''}>TRANG CHỦ</Link>
                                        </Nav.Link>
                                        <Nav.Link className='navcha'><Link
                                            href="/search" className= {pathname !== '/' ? 'header-tab active' : ''}>{textShow ? textShow.Tour : 'TOUR'}<i
                                            className='bx bx-chevron-down'></i></Link>
                                            <ul className='navcon'>
                                                <li>
                                                    <Nav.Link>
                                                        <Link href={'/search'}> TOUR GIÁP THÌN 2024</Link>
                                                    </Nav.Link>
                                                </li>
                                                <li>
                                                    <Nav.Link href={'/search'}>
                                                        <Link href={'/search'}>TOUR NƯỚC NGOÀI <i
                                                            className='bx bx-chevron-down'></i> </Link>
                                                        <ul className='navchau'>
                                                            <li>
                                                                <Nav.Link>
                                                                    <Link href={'/search'}>DU LỊCH
                                                                        INDONESIA </Link>
                                                                </Nav.Link>
                                                            </li>
                                                            <li>
                                                                <Nav.Link>
                                                                    <Link href={'/search'}> DU LỊCH
                                                                        LÀO </Link></Nav.Link></li>
                                                            <li><Nav.Link><Link href={'/search'}> DU LỊCH CHÂU
                                                                ÂU </Link></Nav.Link></li>
                                                            <li><Nav.Link><Link href={'/search'}> DU LỊCH
                                                                ÚC </Link></Nav.Link></li>
                                                            <li><Nav.Link><Link href={'/search'}> DU LỊCH ẤN
                                                                ĐỘ </Link></Nav.Link></li>
                                                        </ul>
                                                    </Nav.Link>
                                                </li>
                                                <li><Nav.Link>TOUR THEO YÊU CẦU <i className='bx bx-chevron-down'></i>
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
                                        {/*<Nav.Link><Link href="/">{textShow ? textShow.Visa : 'VISA'}</Link></Nav.Link>*/}
                                        {/*<Nav.Link><Link*/}
                                        {/*    href="/">{textShow ? textShow.Flashpacking : 'VOUCHER-COMBO'}</Link></Nav.Link>*/}
                                        <Nav.Link><Link
                                            href="/">{textShow ? textShow.tickets_plane : 'VÉ MÁY BAY'}</Link></Nav.Link>
                                        <Nav.Link><Link
                                            href="/">{textShow ? textShow.voucher_combo : 'VOUCHER-COMBO'}</Link></Nav.Link>
                                        <Nav.Link className='navcha'><Link
                                            href='/Camnang'>{textShow ? textShow.diary : 'NHẬT KÝ'} <i
                                            className='bx bx-chevron-down'></i></Link>
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


                                        <Nav.Link><Link
                                            href='/Tintuc'>{textShow ? textShow.news : 'Tin Tức'}</Link></Nav.Link>
                                        <Nav.Link><Link
                                            href='/about'>{textShow ? textShow.review : 'REVIEW'}</Link></Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>

                    {/*<Button className="menu_mobile" onClick={handleShow}>
                <FaBars/>
              </Button> */}
                    {/*<Card className='menumobile_phone'>*/}
                    {/*    <CardHeader*/}
                    {/*        id="headingOne"*/}
                    {/*        aria-expanded={openedCollapse === "collapseOne"}*/}
                    {/*    >*/}
                    {/*        <Link href="/">*/}
                    {/*            <img*/}
                    {/*                src="https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/logo-gst-dovang-1624975291.png"*/}
                    {/*                style={{width: '200px'}}/>*/}
                    {/*        </Link>*/}
                    {/*        <div className='logo_phone'>*/}
                    {/*            <label for="check" className="menu_mobile" onClick={() =>*/}
                    {/*                setOpenedCollapse(*/}
                    {/*                    openedCollapse === "collapseOne"*/}
                    {/*                        ? ""*/}
                    {/*                        : "collapseOne"*/}
                    {/*                )*/}
                    {/*            }>*/}
                    {/*                <i class='bx bx-list-ul'></i>*/}
                    {/*            </label>*/}
                    {/*        </div>*/}
                    {/*    </CardHeader>*/}
                    {/*    <Collapse*/}
                    {/*        isOpen={openedCollapse === "collapseOne"}*/}
                    {/*        aria-labelledby="headingOne"*/}
                    {/*        data-parent="#accordionExample"*/}
                    {/*        id="collapseOne"*/}
                    {/*    >*/}
                    {/*        <CardBody className="content-menu-phone opacity-8">*/}
                    {/*            <Offcanvas.Header>*/}
                    {/*                <Offcanvas.Title>*/}
                    {/*                    /!* <Link href="/">*/}
                    {/*        <img src="https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/logo-gst-dovang-1624975291.png" style={{width: '200px'}}/>*/}
                    {/*        </Link> *!/*/}
                    {/*                </Offcanvas.Title>*/}
                    {/*            </Offcanvas.Header>*/}
                    {/*            <Offcanvas.Body className="title-menuphone">*/}
                    {/*                <Nav>*/}
                    {/*                    <Nav.Link href="/" >TRANG CHỦiii</Nav.Link>*/}
                    {/*                    <NavDropdown*/}
                    {/*                        id="nav-dropdown-tour-"*/}
                    {/*                        title={<span>TOUR<i className="bx bx-chevron-down"></i></span>}>*/}
                    {/*                        <NavDropdown.Item>TOUR GIÁP THÌN</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item>TOUR NƯỚC NGOÀI</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item href="/">TOUR TREKKING</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item href="/">TOUR THEO YÊU CẦU</NavDropdown.Item>*/}
                    {/*                    </NavDropdown>*/}
                    {/*                    <Link href="/">FLASHPACKING</Link>*/}
                    {/*                    <Link href="/">VISA</Link>*/}
                    {/*                    <Link href="/">VÉ MÁY BAY -VOUCHER COMBO</Link>*/}
                    {/*                    <NavDropdown id="nav-dropdown-tour-nn" title="NHẬT KÝ">*/}
                    {/*                        <NavDropdown.Item>KHÁCH LẺ GHÉP ĐOÀN</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item>BẤT ĐỘNG SẢN</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item>SỨC KHỎE - BẢO HIỂM</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item>GIẢI TRÍ - SHOWBIZ</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item>CÔNG NGHỆ CAO</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item>TÀI CHÍNH - NGÂN HÀNG</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item>SẢN XUẤT - CHẾ BIẾN</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item>THẨM MỸ - LÀM ĐẸP</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item>GIA ĐÌNH - NHÓM BẠN BÈ</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item>TÔN GIÁO - THIỆN NGUYỆN</NavDropdown.Item>*/}
                    {/*                        <NavDropdown.Item>CƠ QUAN NHÀ NƯỚC</NavDropdown.Item>*/}
                    {/*                    </NavDropdown>*/}
                    {/*                    <Link href="/about">TIN TỨC </Link>*/}
                    {/*                    <Link href="/Contact">REVIEW</Link>*/}


                    {/*                </Nav>*/}
                    {/*            </Offcanvas.Body>*/}
                    {/*        </CardBody>*/}
                    {/*    </Collapse>*/}
                    {/*</Card>*/}

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
