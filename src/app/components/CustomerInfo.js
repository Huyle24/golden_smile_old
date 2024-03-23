import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import Card from 'react-bootstrap/Card';
import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React, {useEffect} from "react";
import {FaRegEye} from "react-icons/fa";

function CustomerInfo(props) {
    let pathname = usePathname()
    console.log('pathname',pathname)
    let customer_info = props.fetchInvoiceListInfo.data ? props.fetchInvoiceListInfo.data : "";
    console.log('customer_info', customer_info);

    useEffect(() => {
        props.fetchInvoiceList()
    }, []);
    return (
        <Card className={'customer_info'}>
            <Card.Header>THÔNG TIN TÀI KHOẢN</Card.Header>
            <Card.Body>
                <Row>
                    <Col md={'3'}>
                        <img className={'avatar'}
                             src={customer_info.customer_image ? customer_info.customer_image : "https://demo.nhanhtravel.com/assets_front/images/no_image.jpg"}
                             alt=""/>
                    </Col>
                    <Col md={'9'}>
                        <div
                            className={'customer_name'}> {customer_info.customer_name ? customer_info.customer_name : ""}</div>
                        <div>{customer_info.email ? customer_info.email : ""}</div>
                    </Col>
                </Row>
                <div className={`my-1 tab_customer_info${pathname === '/InfoUser' ? ' selected' : ''}`}>
                    <Link href={'./InfoUser'}>
                        <i className='bx bx-user me-2'></i> Thông tin cá nhân
                    </Link>
                </div>
                <div className={`my-1 tab_tourWatched${pathname === '/TourWatched' ? ' selected' : ''}`}>
                    <Link href={'./TourWatched'}>
                        <i className="bx bx-paper-plane me-2"></i> Tour đã xem
                    </Link>
                </div>
                <div className={`my-1 tab_invoice${pathname === '/Invoice' ||pathname === '/InvoiceDetail'  ? ' selected' : ''}`}>
                    <Link href={'./Invoice'}>
                        <i class='bx bx-cart-alt me-2'></i> Đơn hàng
                    </Link>
                </div>
                <button className={'logout-button btn w-100 mt-2'}>
                    <i className='bx bx-log-out me-2'></i>
                    <span>Đăng xuất</span>

                </button>

            </Card.Body>
        </Card>
    )
}

const mapStateToProps = state => ({
    fetchInvoiceListInfo: state.fetchInvoiceListInfo,
});
export default connect(mapStateToProps, actions)(CustomerInfo);