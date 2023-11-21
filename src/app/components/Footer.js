"use client"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Link from 'next/link';
import {
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
  } from "reactstrap";
  

export default function Footer(){
    return (
        <div className="footer">
            {/* <Container >
                <Row className="text-white">
                    <Col lg={4} md={12}>
                        <ul>
                            <li className="mb-4">
                                <img src="https://nhanhtravel.com/wp-content/uploads/elementor/thumbs/A__2_-removebg-preview-1-3-e1674009239198-q0tndleazc0zdspzovdapjdg12pdz06i75ixcx0nea.png" alt="logo"/>
                            </li>
                            <li className="mb-2">CÔNG TY CP ĐẦU TƯ PHÁT TRIỂN VIGO</li>
                            <li className="mb-3">1.07 và 1.08, Tầng Trệt + Lửng, Tòa nhà Ruby Garden, 2A Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình, Thành phố Hồ Chí Minh, Việt Nam</li>
                            <li>Hotline: (+84) 90 999 1205</li>
                            <li className="mb-2">Email: balotourquocte@gmail.com</li>
                            <li >Lĩnh vực kinh doanh chính: Lữ hành quốc tế - Tổ chức sự kiện - Golf - Tổ chức giải đấu Golf - Booking các dịch vụ liên quan đến du lịch trong và ngoài nước</li>
                            <li className="mt-2">
                                <img src="https://www.balotour.net/image/da_thong_bao.png" alt="bct" style={{height:'44px'}}/>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={4} md={8}>

                        <Row className="ft_partner">
                            <Col md={6} xs={6}>
                                <h6>ĐỐI TÁC</h6>
                                <ul>
                                    <li>Về chúng tôi</li>
                                    <li>Đăng ký nhà cung cấp</li>
                                    <li>Đối tác đăng nhập</li>
                                    <li>Đối tác liên kết</li>
                                    <li>Chương trình người nổi tiếng</li>
                                    <li>Chương trình cho đại lý</li>
                                    <li>Hợp tác Marketing và phân phối</li>
                                </ul>
                            </Col>
                            <Col md={6} xs={6}>
                                <h6>ĐIỀU KHOẢN SỬ DỤNG</h6>
                                <ul>
                                    <li>Điều khoản sử dụng</li>
                                    <li>Chính sách bảo mật</li>
                                    <li>Chính sách cookie</li>
                                    <li>Tải ứng dụng tại đây</li>
                                    <li>Chính sách quy định</li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>

                    <Col md={4}>
                        <h6 className="mb-4">TẢI ỨNG DỤNG TẠI ĐÂY</h6>
                        <div className="mb-4">
                            <img src="https://nhanhtravel.com/wp-content/uploads/2022/11/GG.png" alt="gg" className="me-2 mb-2" style={{height:'40px'}} />
                            <img src="https://nhanhtravel.com/wp-content/uploads/2022/11/ios.png" alt="ios" style={{height:'40px'}} className="mb-2"/>
                        </div>
                        <h6>KẾT NỐI VỚI CHÚNG TÔI</h6>
                        <div>
                            <img src="https://nhanhtravel.com/wp-content/uploads/2022/12/TS-FB-Icon1-e1670787566310.png" alt="social" style={{width:'30px'}} className="me-2"/>
                            <img src="https://nhanhtravel.com/wp-content/uploads/2022/12/youtube.png" alt="social" style={{width:'30px'}} className="me-2"/>
                            <img src="https://nhanhtravel.com/wp-content/uploads/2022/12/Artboard-1.png" alt="social" style={{width:'30px'}} className="me-2"/>
                            <img src="https://nhanhtravel.com/wp-content/uploads/2022/12/instagram.png" alt="social" style={{width:'30px'}} className="me-2"/>
                            <img src="https://nhanhtravel.com/wp-content/uploads/2022/12/iconzalo.png" alt="social" style={{width:'30px'}} className="me-2"/>
                        </div>
                        <div className="mt-4">
                            <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/z4664595165981_f694d7adb914ca0dd4f91eac8427d42b.jpg" alt="app" className="logo_qr me-3"/>
                            <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/z4664595165981_f694d7adb914ca0dd4f91eac8427d42b.jpg" alt="app" className="logo_qr"/>
                        </div>
                    </Col>

                    <Col lg={3} md={6} xs={6}>
                        <div>
                            <span className="fw-bold fs-5">Du lịch trong nước</span>
                        </div>
                        <Row>
                            <Col lg={6}>
                                <ul className="menu">
                                    <li>Hà Nội</li>
                                    <li>Hạ Long</li>
                                    <li>Huế</li>
                                    <li>Quảng Bình</li>
                                    <li>Đà Nẵng</li>
                                    <li>Quảng Nam</li>
                                    <li>Nha Trang</li>
                                </ul>
                            </Col>
                            <Col lg={6}>
                                <ul className="menu">
                                    <li>Phan Thiết</li>
                                    <li>Bà Rịa - Vũng Tàu</li>
                                    <li>Phú Quốc</li>
                                    <li>Cần Thơ</li>
                                    <li>Bắc Kạn</li>
                                    <li>Hà Giang</li>
                                    <li>Côn Đảo</li>
                                </ul>
                            </Col>
                        </Row>

                    </Col>
                    <Col lg={3} md={6} xs={6}>
                        <span className="fw-bold fs-5">Du lịch nước ngoài</span>
                        <Row>
                            <Col lg={6} mb={6}>
                                <ul className="menu">
                                    <li>Thái Lan</li>
                                    <li>Trung Quốc</li>
                                    <li>Malaysia</li>
                                    <li>Singapore</li>
                                    <li>Hàn Quốc</li>
                                    <li>Mỹ - Hoa Kỳ</li>
                                    <li>Nhật Bản</li>
                                </ul>
                            </Col>
                            <Col lg={6} md={6}>
                                <ul className="menu">
                                    <li>Ấn Độ</li>
                                    <li>Philippines</li>
                                    <li>Maldives</li>
                                    <li>Na Uy</li>
                                    <li>Tây Ban Nha</li>
                                    <li>Hà Lan</li>
                                    <li>Đức</li>
                                </ul>
                            </Col>
                        </Row>

                    </Col>
                    <Col lg={3}>
                        <span className="fw-bold fs-5">Dòng tour</span>
                                <ul className="menu">
                                    <li>Cao cấp</li>
                                    <li>Tiêu chuẩn</li>
                                    <li>Tiết kiệm</li>
                                    <li>Giá tốt</li>
                                </ul>

                    </Col>
                </Row>
                <div className="copy_right text-white d-flex justify-content-center">
                    <div className="d-flex flex-column text-center">
                        <span className="mb-1">Số giấy phép ĐKKD: 0312469580 sở kế hoạch đầu tư - cấp ngày 20/09/2013</span>
                        <span className="mb-1">Số Giấy phép lữ hành quốc tế: 79-734/2017/TCDL-GP LHQT cấp ngày 17/05/2017</span>
                        <span className="mb-1">Copyright © 2022 - CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN VIGO</span>
                        <span className="fs-6">Power by Nhanh Travel chuyển đổi số du lịch</span>
                    </div>
                </div>
            </Container> */}

            <Row className='mb-6'>
                <div className='col-xs-12 col-md-3'>
                    <h4 className='info_contact'>Liên hệ</h4>
                    <div className='footer_address_info'>
                        <Link href={''} className='footer-hotline'><i class='bx bx-phone'></i>0852903412</Link>
                        <Link href={''} className='footer-hotline'><i class='bx bx-phone'></i>23452341221</Link>
                        <div className='address_contact'>
                            <Link href={''}><i class='bx bx-home-alt-2'></i>23 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình, Thành Phố Hồ Chí Minh</Link>
                        </div>
                        <Link href={''} className='footer-hotline'><i class='bx bx-envelope' ></i>goodensmile@gmail.com</Link>
                    </div>
                    <h4 className='thongtin_chung'>Thông tin chung</h4>
                    <ul className='info-chung'>
                        <li className='info-item-chung'><Link href={''}>Hướng dẫn đặt tour</Link></li>
                        <li className='info-item-chung'><Link href={''}>Điều khoản thanh toán</Link></li>
                        <li className='info-item-chung'><Link href={''}>Thỏa thuận sử dụng</Link></li>
                        <li className='info-item-chung'><Link href={''}>Chính sách riêng tư</Link></li>
                    </ul>
                </div>
                <div className='col-xs-12 col-md-9'>
                    <Row className='info_first'>
                        <div className='col-xs-12 col-md-4'>
                            <h4 className='footer_title_about'>Về chúng tôi</h4>
                            <ul className='list_item_about'>
                                <li className='listitem_vechungtoi'><Link href={''} className='ilabouus'>Giới thiệu chung</Link></li>
                                <li className='listitem_vechungtoi'><Link href={''} className='ilabouus'>Tin tức về chúng tôi</Link></li>
                                <li className='listitem_vechungtoi'><Link href={''} className='ilabouus'>Hồ sơ năng lực</Link></li>
                                <li className='listitem_vechungtoi'><Link href={''} className='ilabouus'>Báo chí nói về chúng tôi</Link></li>
                            </ul>
                        </div>
                        <div className='col-xs-12 col-md-4'>
                            <h4 className='footer_title_about'>Góp ý tour</h4>
                            <Form className='fomr_tong_info'>
                                <Input type="text"></Input>
                                <div className='input_icons'>
                                    <button className='btn_icons_tour'>
                                        <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/icon_email.png' alt='' />
                                    </button>
                                </div>
                            </Form>
                            <h4 className='footer_title_about'>Đăng ký nhận tin</h4>
                            <Form className='fomr_tong_info'>
                                <Input type="text"></Input>
                                <div className='input_icons'>
                                    <button className='btn_icons_tour'>
                                        <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/icon_subscriber.png' alt='' />
                                    </button>
                                </div>
                            </Form>
                        </div>
                        <div className='col-xs-12 col-md-4'>
                            <h4 className='footer_title_about'>Mạng xã hội</h4>
                            <ul className='list_socials'>
                                <li className='socials_items'>
                                    <Link href={''}><img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/icon_fb.png' alt='Facebook'/></Link>
                                </li>
                                <li className='socials_items'>
                                    <Link href={''}><img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/logo-zalo.jpg' alt='Zalo'/></Link>
                                </li>
                                <li className='socials_items'>
                                    <Link href={''}><img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/icon_youtube.png' alt='Youtube'/></Link>
                                </li>
                            </ul>
                            <h4 className='footer_title_about'>Chấp nhận thanh toán</h4>
                            <ul className='list_payment'>
                                <div className='thanhtoan_list'>
                                    <i className='images-123pay'></i>
                                </div>
                                <div className='thanhtoan_list'>
                                    <i className='images-visa'></i>
                                </div>
                                <div className='thanhtoan_list'>
                                    <i className='images-mastercard'></i>
                                </div>
                            </ul>
                        </div>
                    </Row>

                    <Row>
                        <div className='col-xs-12 col-md-6 footer_address_details'>
                            <h4 className='title_address_f'>Trụ Sở Chính</h4>
                            <div className='address_general'>
                                <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/home_black3.png' alt='địa chỉ'/>
                                <Link href={''}>34 Hoa Lan, Phường 02, Quận Phú Nhuận, Tp.HCM</Link>
                            </div>
                        </div>
                        <div className='col-xs-12 col-md-6 footer_address_details'>
                            <h4 className='title_address_f'>Trụ Sở Chính</h4>
                            <div className='address_general'>
                                <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/home_black3.png' alt='địa chỉ'/>
                                <Link href={''}>34 Hoa Lan, Phường 02, Quận Phú Nhuận, Tp.HCM</Link>
                            </div>
                        </div>
                        <div className='col-xs-12 col-md-6 footer_address_details'>
                            <h4 className='title_address_f'>Trụ Sở Chính</h4>
                            <div className='address_general'>
                                <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/home_black3.png' alt='địa chỉ'/>
                                <Link href={''}>34 Hoa Lan, Phường 02, Quận Phú Nhuận, Tp.HCM</Link>
                            </div>
                        </div>
                        <div className='col-xs-12 col-md-6 footer_address_details'>
                            <h4 className='title_address_f'>Trụ Sở Chính</h4>
                            <div className='address_general'>
                                <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/home_black3.png' alt='địa chỉ'/>
                                <Link href={''}>34 Hoa Lan, Phường 02, Quận Phú Nhuận, Tp.HCM</Link>
                            </div>
                        </div>
                        <div className='col-xs-12 col-md-6 footer_address_details'>
                            <h4 className='title_address_f'>Trụ Sở Chính</h4>
                            <div className='address_general'>
                                <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/home_black3.png' alt='địa chỉ'/>
                                <Link href={''}>34 Hoa Lan, Phường 02, Quận Phú Nhuận, Tp.HCM</Link>
                            </div>
                        </div>
                        <div className='col-xs-12 col-md-6 footer_address_details'>
                            <h4 className='title_address_f'>Trụ Sở Chính</h4>
                            <div className='address_general'>
                                <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/home_black3.png' alt='địa chỉ'/>
                                <Link href={''}>34 Hoa Lan, Phường 02, Quận Phú Nhuận, Tp.HCM</Link>
                            </div>
                        </div>
                    </Row>
                    <div className='lineway-footer'></div>
                    <Row>
                    <div className='col-xs-12 col-md-12'>
                            <h4 className='footer_title_cetefication'>Chứng nhận</h4>
                            <div className='images_bochungnhan'>
                                <div className='footer_images_congthuong'>
                                    <Link href={''}>
                                        <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/logo_bocongthuong_red.png' className='chungnhan' alt='chứng nhận' />
                                    </Link>
                                    <Link href={''}>
                                        <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/chungnhan.png' className='bocongthuong' alt='chứng nhận' />
                                    </Link>
                                </div>
                            </div>
                    </div>
                    </Row>
                </div>
            </Row>
        </div>

    )
}