import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import Card from "react-bootstrap/Card";
import {Col, Row} from "react-bootstrap";
import {useEffect} from "react";
import {fetchInvoiceDetail} from "../../../redux/actions";
import {useSearchParams} from "next/navigation";

function InvoiceDetail(props) {
    const searchParams = useSearchParams()
    const orderIdParam = searchParams.get('order_id');
    let invoice_detail = props.invoiceDetailInfo.data ? props.invoiceDetailInfo.data : "";
    const formatCurrency = (amount) => {
        if (amount == null) return ''; // Handle null or undefined
        return Number(amount).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    };
    useEffect(() => {
        props.fetchInvoiceDetail(orderIdParam ? orderIdParam : '')
    }, []);
    console.log('invoice_detail', invoice_detail)
    return (
        <>
            <Card className={'invoice-list'}>
                <Card.Header>
                    THÔNG TIN ĐẶT TOUR
                </Card.Header>
                <Card.Body className={'body-card-invoice'}>
                    <Row>
                        <Col md={3} className={'d-flex justify-content-center'}>
                            <img className={'image-invoice'}
                                 src={invoice_detail.tour_image ? invoice_detail.tour_image : "https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png"}
                                 alt=""/>
                        </Col>
                        <Col md={9} className={'px-4 px-lg-2'}>
                            <div className={'d-flex justify-content-between'}>
                                <div
                                    className={'tour-name-detail'}>{invoice_detail.tour_name ? invoice_detail.tour_name : ""}</div>

                            </div>

                            <div className={'mt-2'}>
                                <span className={'invoice_code'}>DH-{invoice_detail.order_id}</span>
                            </div>
                            <div className={'mt-4 d-flex justify-content-between'}>
                                <div className={'created-date '}>{invoice_detail.created_date}</div>


                            </div>

                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={'mt-3 booking-card'}>
                <Card.Header> CHI TIẾT BOOKING</Card.Header>
                <Card.Body>
                    <div className={'label-booking-card'}>
                        <div className={'line-content'}>
                            <div style={{maxWidth: '50%'}}>Số booking</div>
                            <div style={{maxWidth: '50%'}}><span
                                className={'order-id'}>{invoice_detail.order_id}</span>
                            </div>

                        </div>
                        <div className={'line-content  text-center text-secondary justify-content-center'}>
                              <span className={'text-danger'}>*</span> Quý khách vui lòng nhớ số booking để thuận tiện giao dịch

                        </div>
                        <div className={'line-content'}>
                            <div style={{maxWidth: '50%'}}>Trị giá booking</div>
                            <div className={'fw-bold'} style={{maxWidth: '50%'}}>{formatCurrency(invoice_detail.price_total)}
                            </div>

                        </div>
                        <div className={'line-content'}>
                            <div style={{maxWidth: '50%'}}>Số tiền đã thanh toán</div>
                            <div className={'fw-bold'}
                                style={{maxWidth: '50%'}}>{formatCurrency(invoice_detail.total_paid ? invoice_detail.total_paid : '')}
                            </div>

                        </div>
                        <div className={'line-content'}>
                            <div style={{maxWidth: '50%'}}> Số tiền còn lại</div>
                            <div className={'fw-bold'} style={{maxWidth: '50%'}}>{formatCurrency(invoice_detail.remain)}
                            </div>

                        </div>
                        <div className={'line-content'}>
                            <div style={{maxWidth: '50%'}}>Hình thức thanh toán</div>
                            <div className={'fw-bold'} style={{maxWidth: '50%'}}>{invoice_detail.payment_method_name}
                            </div>

                        </div>
                        <div className={'line-content'}>
                            <div style={{maxWidth: '50%'}}>Tình trạng thanh toán</div>
                            <div className={'fw-bold'} style={{maxWidth: '50%'}}>{invoice_detail.status}
                            </div>

                        </div>
                    </div>

                </Card.Body>
            </Card>
        </>
    )
}

const mapStateToProps = state => ({
    fetchInvoiceListInfo: state.fetchInvoiceListInfo,
    invoiceDetailInfo: state.invoiceDetailInfo
});
export default connect(mapStateToProps, actions)(InvoiceDetail);