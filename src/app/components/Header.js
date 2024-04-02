"use client"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {Button, Col, Dropdown, Row} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {GET_LANG_CODE, GET_TOKEN} from '../../../redux/actions/type';
import {GET_LANG_ko, GET_LANG_vi} from '../../../js/lang';
import {usePathname, useRouter} from "next/navigation";
import {CiLocationOn, CiTimer} from "react-icons/ci";
import {FaBars, FaRegEye} from "react-icons/fa";
import {fetchFormatTourList} from "../../../redux/actions";

import Tab from "react-bootstrap/Tab";
import {ConfigProvider, Radio, Space, Tabs} from "antd";
import Card from "react-bootstrap/Card";
import {CardHeader,Offcanvas,CardBody} from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
function Header(props) {
    const pathname = usePathname()
    console.log(pathname)
    const [tabPosition, setTabPosition] = useState('left');
    const changeTabPosition = (e) => {
        setTabPosition(e.target.value);
    };
    const [isLogin, setIsLogin] = useState(false)
    const [textShow, setTextShow] = useState('')
    const router = useRouter()
    const [openedCollapse, setOpenedCollapse] = useState("");
    const [imageCountry, setImageCountry] = useState('')
    const [key, setKey] = useState('tab1');
    const [menuIcon, setMenuIcon] = useState(false)
    const [menuImage, setMenuImage] = useState(false)
    const [search, setSearch] = useState('');
    const [showNav, setShowNav] = useState(false);
    const [listCart, setListCart] = useState([])
    const [tot, setTot] = useState(0)
    const [open, setOpen] = useState(false);

    let listItemCart = props ? props.getToCart : '';
    let city_list = props.cityByLocationInfo.data && props.cityByLocationInfo.isLoading === false ? props.cityByLocationInfo.data : '';
    let user_data = props.userInfo.data && props.userInfo.isLoading == false ? props.userInfo.data : '';
    let languageList = props.languageListInfo.data && props.languageListInfo.isLoading == false ? props.languageListInfo.data : '';
    let languageDetail = props.languageDetailInfo.data && props.languageDetailInfo.isLoading == false ? props.languageDetailInfo.data : '';
    let type_tourism_list = props.fetchListTypeTourismInfo.data && props.fetchListTypeTourismInfo.isLoading === false ? props.fetchListTypeTourismInfo.data : '';
    let tourFormatList = props.tourFormatListInfo.data && props.tourFormatListInfo.isLoading === false ? props.tourFormatListInfo.data : '';
    let country_list = props.countryListInfo.data && props.countryListInfo.isLoading === false ? props.countryListInfo.data : '';
    console.log('country_list', country_list)
    let numberItem = listCart ? listCart.length : '0'

    const handleCloseNav = () => setShowNav(false);
    const handleShow = () => setShowNav(true);
    const handleCollapseToggle = () => {
        setOpenedCollapse(openedCollapse === "collapseOne" ? "" : "collapseOne");
    };
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
    const renderInbound = () => {
        return (
            <div className={'row header-tab-tour'}>
                <div className="col-3">
                    <div className={'text-red'}>Miền Bắc</div>
                    {city_list && city_list.filter(item => item.area_id == 1).slice(0, 8).map((item, index) => (
                        <div className={'py-1'}><Link
                            href={`/Category?formatTour=0&city=${item.id}`}> {item.city_name} </Link></div>
                    ))}
                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>
                <div className="col-3">
                    <div className={'text-red'}>Miền Trung</div>
                    {city_list && city_list.filter(item => item.area_id == 3).slice(0, 8).map((item, index) => (
                        <div className={'py-1'}><Link
                            href={`/Category?formatTour=0&city=${item.id}`}>{item.city_name}</Link></div>
                    ))}
                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>
                <div className="col-3">
                    <div className={'text-red'}>Miền Nam</div>
                    {city_list && city_list.filter(item => item.area_id == 2).slice(0, 8).map((item, index) => (
                        <div className={'py-1'}><Link
                            href={`/Category?formatTour=0&city=${item.id}`}>{item.city_name}</Link></div>
                    ))}
                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>
                <div className="col-3">
                    <div className={'text-red'}>Miền Tây</div>
                    {city_list && city_list.slice(-8).map((item, index) => (
                        <div className={'py-1'}><Link
                            href={`/Category?formatTour=0&city=${item.id}`}>{item.city_name}</Link></div>
                    ))}
                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>

            </div>
        );
    }
    const renderOutbound = () => {
        return (
            <div className={'row header-tab-tour'}>
                <div className="col-3">
                    <div className={'text-red'}> Châu Á</div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=2`}> Hàn Quốc</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=4`}> Nhật Bản</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=5`}> Trung Quốc</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=9`}> Singapore</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=26`}> Thái Lan</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=38`}> Philippines</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=39`}> Indonesia</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=40`}> Campuchia</Link></div>
                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>
                <div className="col-3">
                    <div className={'text-red'}>Châu Âu</div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=7`}> Tây Ban Nha</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=12`}> Italy</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=14`}> Đức</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=15`}> Pháp</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=25`}> Anh</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=28`}> Bồ Đào Nha</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=30`}> Hà Lan</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=33`}> Bỉ</Link></div>
                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>
                <div className="col-3">
                    <div className={'text-red'}>Châu Mỹ</div>

                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=3`}> Mỹ</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=35`}> Cộng Hòa Dominica</Link></div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=6`}> Canada</Link></div>

                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>
                <div className="col-3">
                    <div className={'text-red'}>Châu Phi</div>
                    <div className={'py-1'}><Link href={`/Category?formatTour=1&country=27`}> Nam Phi</Link></div>

                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>

            </div>
        );
    }

    const renderNoidia = () => {
        return (
            <div className={'row header-tab-tour'}>
                <div className="col-3">
                    <div className={'text-red'}>Miền Bắc</div>
                    {city_list && city_list.filter(item => item.area_id == 1).slice(0, 8).map((item, index) => (
                        <div className={'py-1'}><Link
                            href={`/Category?formatTour=2&city=${item.id}`}> {item.city_name} </Link></div>
                    ))}
                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>
                <div className="col-3">
                    <div className={'text-red'}>Miền Trung</div>
                    {city_list && city_list.filter(item => item.area_id == 3).slice(0, 8).map((item, index) => (
                        <div className={'py-1'}><Link
                            href={`/Category?formatTour=2&city=${item.id}`}>{item.city_name}</Link></div>
                    ))}
                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>
                <div className="col-3">
                    <div className={'text-red'}>Miền Nam</div>
                    {city_list && city_list.filter(item => item.area_id == 2).slice(0, 8).map((item, index) => (
                        <div className={'py-1'}><Link
                            href={`/Category?formatTour=2&city=${item.id}`}>{item.city_name}</Link></div>
                    ))}
                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>
                <div className="col-3">
                    <div className={'text-red'}>Miền Tây</div>
                    {city_list && city_list.slice(-8).map((item, index) => (
                        <div className={'py-1'}><Link
                            href={`/Category?formatTour=2&city=${item.id}`}>{item.city_name}</Link></div>
                    ))}
                    <div><Link href={`/Category?`}> <b><u>Xem tất cả</u> </b> </Link></div>
                </div>

            </div>
        );
    }
    const tabTourType = [
        {label: 'Tour Inbound', key: '0', content: renderInbound()},
        {label: 'Tour Outbound', key: '1', content: renderOutbound()},
        {label: 'Tour Nội địa', key: '2', content: renderNoidia()}
    ];

    // const cartItems = localStorage.getItem('cartItems');

    function formatToInt(str) {
        let formattedStr = str.replace(/,/g, '');
        let intValue = parseInt(formattedStr);

        return intValue;
    }

    const getCartItems = () => {
        props.getToCartAction()
    }
    const choose_country = (item) => {
        localStorage.setItem('lang', JSON.stringify(item.name_sm))
        setImageCountry(item.image)
    }
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
    useEffect(() => {
        let totalPrice = listCart.reduce(function (accumulator, item) {
            return accumulator + parseInt(item.total_price);
        }, 0);
        setListCart(listCart)
        setTot(totalPrice);
    }, [listCart]);
    useEffect(() => {
        setListCart(listItemCart);
    }, [listItemCart]);

    useEffect(() => {
        props.getToCartAction()
    }, [])
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
    useEffect(() => {

        setImageCountry(languageDetail.image)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageDetail])

    useEffect(() => {
        getCartItems()
    }, [])
    useEffect(() => {
        props.fetchListTypeTourism()
        props.fetchFormatTourList()
        props.fetchCountryListBalotour()
        props.fetchCitybyLocation('', '', 1)
    }, [])
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
                                                <i className='bx bx-heart mt-1 fs-6'></i>
                                                <span className='title_menu fw-normal'>Yêu thích</span>
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
                                                                <Link
                                                                    href={"/Tour?tour_type=2&permalink=" + item.permalink}>
                                                                    <div className="d-flex gap-3">

                                                                        <img className={'img_tour_cart'}
                                                                             src={item.bucket_img ? item.bucket_img : ''}
                                                                             alt="cart"/>

                                                                        <div className="info text-black">
                                                                            <div className="title ">{item.name}</div>
                                                                            <div className={'info_tour_cart'}>
                                                                                <CiLocationOn/> {item.city_start_name} - {item.city_end_name}
                                                                            </div>

                                                                            <div
                                                                                className="text-danger info_tour_cart">
                                                                                <CiTimer/> {item.date_type_name}
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                                <div id="delete-btn">
                                                                    <span className="text-danger ps-3"
                                                                          onClick={() => removeItemCart(item.id)}><i
                                                                        class='bx bx-trash'></i></span>
                                                                </div>

                                                            </div>
                                                        )) : []}
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="output px-4">
                                                            <div>Tổng tour ({numberItem} )</div>
                                                            {/*<div*/}
                                                            {/*    className="text-danger">{GlobalJs.format_currency(tot)} VNĐ*/}
                                                            {/*</div>*/}
                                                        </div>
                                                        {/*<div className="entry px-4">*/}
                                                        {/*    <Link href="/CartBackup">*/}
                                                        {/*        <span className="">Xem giỏ hàng</span>*/}
                                                        {/*    </Link>*/}
                                                        {/*</div>*/}
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

                                        {languageList ? languageList.slice(1, 2).map((item, index) => {
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
                                                                    {/*<img className='img-info me-2 my-auto'*/}
                                                                    {/*     src='https://vigomanager.com/app-assets/mobile/balotour/icon/profile.png'/>*/}

                                                                    <div
                                                                        className=''>
                                                                        <i className='bx bx-user me-2'></i> {textShow ? textShow.Information : ''}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </Dropdown.Item>

                                                        <Dropdown.Item>
                                                            <Link href="/TourWatched">
                                                                <i className="bx bx-paper-plane me-2"></i> Các Tour đã
                                                                xem qua
                                                            </Link>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <Link href="/Invoice">
                                                                <i className='bx bx-cart-alt me-2'></i> Đơn hàng đã đặt
                                                            </Link>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <div
                                                                className='d-flex  log-out align-content-center'>
                                                                <a onClick={handleLogout}>
                                                                    <span style={{color: "#db2131"}}> <i
                                                                        className='bx bx-log-out me-2'></i> {textShow ? textShow.Log_Out : ''}</span>
                                                                </a>
                                                            </div>
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
                                            <Link href="/" className={pathname === '/' ? 'header-tab active' : ''}>TRANG
                                                CHỦ</Link>
                                        </Nav.Link>
                                        <Nav.Link className='navcha'><Link
                                            href={"/Category"}
                                            className={pathname === '/Category' ? 'header-tab active' : ''}>{textShow ? textShow.Tour : 'TOUR'}<i
                                            className='bx bx-chevron-down'></i></Link>
                                            <div className='navcon'>
                                                <Row>
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                colorPrimary: '#B72028',
                                                                borderRadius: 2,
                                                                colorBgContainer: '#f6ffed',
                                                            },
                                                        }}
                                                    >
                                                        <Tabs
                                                            tabPosition={'left'}

                                                            items={tabTourType.map((item, index) => {
                                                                const id = String(index + 1);
                                                                return {
                                                                    label: item.label,
                                                                    key: item.key,
                                                                    children: item.content
                                                                    ,
                                                                };
                                                            })}
                                                        />
                                                    </ConfigProvider>


                                                </Row>

                                            </div>

                                        </Nav.Link>
                                        {/*<Nav.Link><Link href="/">{textShow ? textShow.Visa : 'VISA'}</Link></Nav.Link>*/}
                                        {/*<Nav.Link><Link*/}
                                        {/*    href="/">{textShow ? textShow.Flashpacking : 'VOUCHER-COMBO'}</Link></Nav.Link>*/}
                                        {/*<Nav.Link><Link*/}
                                        {/*    href="/">{textShow ? textShow.tickets_plane : 'VÉ MÁY BAY'}</Link></Nav.Link>*/}
                                        {/*<Nav.Link><Link*/}
                                        {/*    href="/">{textShow ? textShow.voucher_combo : 'VOUCHER-COMBO'}</Link></Nav.Link>*/}
                                        <Nav.Link className='navcha'><Link className={pathname === '/Camnang' ? 'header-tab active' : ''}
                                            href='/Camnang'>{textShow ? textShow.diary : 'NHẬT KÝ'} </Link>
                                            {/*<ul className='navcon'>*/}
                                            {/*    <li><Nav.Link>KHÁCH LẺ GHÉP ĐOÀN</Nav.Link></li>*/}
                                            {/*    <li><Nav.Link>BẤT ĐỘNG SẢN</Nav.Link></li>*/}
                                            {/*    <li><Nav.Link>SỨC KHỎE - BẢO HIỂM</Nav.Link></li>*/}
                                            {/*    <li><Nav.Link>CƠ QUAN NHÀ NƯỚC</Nav.Link></li>*/}
                                            {/*    <li><Nav.Link>SỨC KHỎE</Nav.Link></li>*/}
                                            {/*    <li><Nav.Link>GIẢI TRÍ - SHOWBIZ</Nav.Link></li>*/}
                                            {/*    <li><Nav.Link>CÔNG NGHỆ CAO</Nav.Link></li>*/}
                                            {/*    <li><Nav.Link>TÀI CHÍNH - NGÂN HÀNG</Nav.Link></li>*/}
                                            {/*    <li><Nav.Link>SẢN XUẤT - CHẾ BIẾN</Nav.Link></li>*/}
                                            {/*    <li><Nav.Link>THẨM MỸ - LÀM ĐẸP</Nav.Link></li>*/}
                                            {/*    <li><Nav.Link>GIA ĐÌNH - NHÓM BẠN BÈ</Nav.Link></li>*/}
                                            {/*    <li><Nav.Link>TÔN GIÁO - THIỆN NGUYỆN</Nav.Link></li>*/}
                                            {/*</ul>*/}
                                        </Nav.Link>


                                        <Nav.Link><Link className={pathname === '/Tintuc' ? 'header-tab active' : ''}
                                            href='/Tintuc'>{textShow ? textShow.news : 'Tin Tức'}</Link></Nav.Link>
                                        <Nav.Link><Link className={pathname === '/about' ? 'header-tab active' : ''}
                                            href='/about'>{textShow ? textShow.review : 'REVIEW'}</Link></Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>

              {/*      <Button className="menu_mobile" onClick={handleShow}>*/}
              {/*  <FaBars/>*/}
              {/*</Button>*/}
                    <Card className='menumobile_phone'>
                        <CardHeader
                            id="headingOne"
                            aria-expanded={openedCollapse === "collapseOne"}
                        >
                            <Link href="/">
                                <img
                                    src="https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/logo-gst-dovang-1624975291.png"
                                    style={{width: '200px'}}/>
                            </Link>

                            <Button className="menu_mobile me-0"
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                            ><i class='bx bx-list-ul'></i>
                            </Button>
                        </CardHeader>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
                                <CardBody className="content-menu-phone opacity-8">
                                    <Offcanvas.Header>
                                        <Offcanvas.Title>
                                            {/* <Link href="/">
                            <img src="https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/logo-gst-dovang-1624975291.png" style={{width: '200px'}}/>
                            </Link> */}
                                        </Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body className="title-menuphone">
                                        <Nav>
                                            <Nav.Link href="/" >TRANG CHỦ</Nav.Link>
                                            <NavDropdown
                                                id="nav-dropdown-tour-"
                                                title={<span>TOUR</span>}>
                                                {type_tourism_list&&type_tourism_list.map((item,index)=>(
                                                    <NavDropdown.Item> <Link href={`/Category?type_tourism_id=${item.id}`}>{item.name}</Link></NavDropdown.Item>

                                                ))}

                                            </NavDropdown>
                                            {/*<Nav.Link href="/" >VÉ MÁY BAY</Nav.Link>*/}
                                            {/*<Nav.Link href="/" >VOUCHER-COMBO</Nav.Link>*/}
                                            <Nav.Link href="/Camnang" >NHẬT KÝ</Nav.Link>
                                            <Nav.Link href="/Tintuc" >TIN TỨC</Nav.Link>
                                            <Nav.Link href="/about" >REVIEW</Nav.Link>



                                        </Nav>
                                    </Offcanvas.Body>
                                </CardBody>
                            </div>
                        </Collapse>

                    </Card>

                </Container>

            </Navbar>
        </>

    )
}


const mapStateToProps = state => ({
    userInfo: state.userInfo,
    getToCart:
    state.getToCart,
    languageListInfo:
    state.languageListInfo,
    languageDetailInfo:
    state.languageDetailInfo,
    fetchListTypeTourismInfo: state.fetchListTypeTourismInfo,
    tourFormatListInfo: state.tourFormatListInfo,
    cityByLocationInfo: state.cityByLocationInfo,
    countryListInfo: state.countryListInfo,
});
export default connect(mapStateToProps, actions)(Header);
