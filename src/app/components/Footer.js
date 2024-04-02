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
    const foot_info = [
        {
            branch: "Trụ Sở Chính",
            diachi: "34 Hoa Lan, Phường 02, Quận Phú Nhuận, Tp.HCM"
        },
        {
            branch: "Văn Phòng Du Lịch",
            diachi: "631 Nguyễn Kiệm, Phường 9, Quận Phú Nhuận, Tp.HCM"
        },
        {
            branch: "Chi nhánh Quận 1",
            diachi: "43 Lê Thị Hồng Gấm, P.Nguyễn Thái Bình, Quận 1, Tp.HCM"
        },
        {
            branch: "Văn phòng Đại diện Phước Long",
            diachi: "Huỳnh Thúc Kháng, KP.5, P. Long Phước, TX. Phước Long, Bình Phước"
        },
        {
            branch: "Chi Nhánh Long An",
            diachi: "227A Nguyễn Văn Rành, P.7, TP Tân An, Long An"
        },
        {
            branch: "Chi nhánh Đông Nam Bộ",
            diachi: " 369 Đại Lộ Bình Dương, P. Chánh Nghĩa, TP.Thủ Dầu Một, Bình Dương"
        }
    ]
    return (
 
            <div className="footer">
                <Row className={'line-row'}>
                    <div className={'line-bottom'}></div>
                </Row>
                <Row className='mb-6 info_first'>
                    <div className='col-xs-12 col-md-4 text-center-mobile'>
                        <img className={'logo-web-footer'} src="https://vigomanager.com/app-assets/mobile/img-huy/1-%20Ngang.png" alt=""/>
                        <h4 className='footer_title_about mt-1'>Về chúng tôi</h4>
                        <ul className='list_item_about'>
                            <li className='listitem_vechungtoi'><Link href={'/about'} className='ilabouus'>Giới thiệu
                                chung</Link></li>
                            <li className='listitem_vechungtoi'><Link href={'/about'} className='ilabouus'>Tin tức về
                                chúng tôi</Link></li>
                            <li className='listitem_vechungtoi'><Link href={'/about'} className='ilabouus'>Hồ sơ năng
                                lực</Link></li>
                            <li className='listitem_vechungtoi'><Link href={'/about'} className='ilabouus'>Báo chí nói
                                về chúng tôi</Link></li>
                        </ul>
                        <h4 className='info_contact'>Liên hệ</h4>
                        <div className='footer_address_info'>
                            <Link href={''} className='footer-hotline'><i className='bx bx-phone'></i>0852903412</Link>
                            <Link href={''} className='footer-hotline'><i className='bx bx-phone'></i>23452341221</Link>
                            <div className='address_contact'>
                                <Link href={''}><i className='bx bx-home-alt-2'></i>23 Nguyễn Sỹ Sách, Phường
                                    15, Quận Tân Bình, Thành Phố Hồ Chí Minh</Link>
                            </div>
                            <Link href={''} className='footer-hotline'><i className='bx bx-envelope'></i>goodensmile@gmail.com</Link>
                        </div>
                    </div>

                    <div className='col-xs-12 col-md-8'>

                        <Row className='info_first'>
                            <div className='col-xs-12 col-md-6 text-center-mobile'>

                                <h4 className='thongtin_chung'>Thông tin chung</h4>
                                <ul className='info-chung'>
                                    <li className='info-item-chung'><Link href={''}>Hướng dẫn đặt tour</Link></li>
                                    <li className='info-item-chung'><Link href={''}>Điều khoản thanh toán</Link></li>
                                    <li className='info-item-chung'><Link href={''}>Thỏa thuận sử dụng</Link></li>
                                    <li className='info-item-chung'><Link href={''}>Chính sách riêng tư</Link></li>
                                </ul>
                            </div>
                            <div className='col-xs-12 col-md-6 text-center-mobile'>
                                <h4 className='footer_title_about mt-3 '>Mạng xã hội</h4>
                                <ul className='list_socials'>
                                    <li className='socials_items'>
                                        <Link href={''}><img
                                            src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/icon_fb.png'
                                            alt='Facebook'/></Link>
                                    </li>
                                    <li className='socials_items'>
                                        <Link href={''}><img
                                            src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/logo-zalo.jpg'
                                            alt='Zalo'/></Link>
                                    </li>
                                    <li className='socials_items'>
                                        <Link href={''}><img
                                            src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/icon_youtube.png'
                                            alt='Youtube'/></Link>
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

                        <Row className={'mt-3'}>

                            {foot_info ? (foot_info.map((item, index) =>
                            <div className='col-xs-12 col-md-6 footer_address_details text-center-mobile'>
                                <h4 className='title_address_f'>{item.branch}</h4>
                                <div className='address_general'>
                                    <img src='https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/home_black3.png' alt='địa chỉ'/>
                                    <Link href={''}>{item.diachi}</Link>
                                </div>
                            </div>
                            )) : ''}
                        </Row>
                        <div className='lineway-footer'></div>
                        <Row>
                        <div className='col-xs-12 col-md-12 text-center-mobile'>
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