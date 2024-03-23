import Card from 'react-bootstrap/Card';
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {useEffect} from "react";
import {fetchInvoiceList} from "../../../redux/actions";
import listTour from "@/app/Category/components/ListTour";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";


function ListInvoice(props) {

    const formatCurrency = (amount) => {
        if (amount == null) return ''; // Handle null or undefined
        return Number(amount).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    };
    let listInvoice = props.fetchInvoiceListInfo.data ? props.fetchInvoiceListInfo.data.data_order : ""
    useEffect(() => {
        props.fetchInvoiceList()
    }, []);
    console.log('listInvoice', listInvoice)
    return (
        <Card className={'invoice-list'}>
            <Card.Body>
                <div className={'px-5'}>
                    <div className={'mb-2 title-card'}>ĐƠN HÀNG ĐÃ ĐẶT</div>
                    {listInvoice && listInvoice.length > 0 ? listInvoice.map((item, index) => (
                            <Link href={'./InvoiceDetail?order_id=' + item.order_id}>
                                <Card className={'mt-3 Card-invoice'} >
                                    <Card.Body className={'body-card-invoice'}>
                                        <Row>
                                            <Col md={3}>
                                                <img className={'image-invoice'}
                                                     src={item.tour_image ? item.tour_image : "https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png"}
                                                     alt=""/>
                                            </Col>
                                            <Col md={9}>
                                                <div className={'d-flex justify-content-between'}>
                                                    <div
                                                        className={'tour-name'}>{item.tour_name ? item.tour_name : ""}</div>
                                                    <div><span className={'status'} style={{
                                                        color: item.status_text_color,
                                                        background: item.status_bg_color
                                                    }}> {item.status_name}</span></div>
                                                </div>

                                                <div className={'mt-2'}>
                                                    <span className={'invoice_code'}> DH-{item.order_id}</span>
                                                </div>
                                                <div className={'mt-4 d-flex justify-content-between'}>
                                                    <div className={'created-date '}>{item.created_date}</div>
                                                    <div className={'total-money'}>{formatCurrency(item.tour_total)}</div>

                                                </div>

                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Link>
                        )
                    ) : "Chưa có đơn hàng nào"}

                </div>
            </Card.Body>

        </Card>
    )
}

const mapStateToProps = state => ({
    fetchInvoiceListInfo: state.fetchInvoiceListInfo,
});
export default connect(mapStateToProps, actions)(ListInvoice);