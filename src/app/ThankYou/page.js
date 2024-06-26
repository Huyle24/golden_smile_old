"use client"
import BreadCrums from '../Category/components/BreadCrums'
import DetailTourPayment from "@/app/OrderTour/DetailTourPayment";
import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import Link from "next/link";
import {BASE_URL} from "../../../redux/actions/type";

function ThankYou(props) {
    const formatCurrency = (amount) => {
        if (amount == null) return ''; // Handle null or undefined
        return Number(amount).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    };
    const searchParams = useSearchParams()
    const orderIdParam = searchParams.get('order_id');
    let invoice_detail = props.invoiceDetailInfo.data ? props.invoiceDetailInfo.data : "";
    useEffect(() => {
        props.fetchInvoiceDetail(orderIdParam ? orderIdParam : '')
    }, []);
    console.log(
        'invoice_detail', invoice_detail
    )
    return (
        <>

            <div className="container main_showcustomer">
                <Row>
                    <Col xl={8}>
                        <Card className={'card-thankpage'}>
                            <div className={'background-thankpage'}>

                                <div className={'congratulation'}>
                                    <i className='bx bx-check-circle me-2'></i>
                                    <span> Chúc mừng, bạn đã đặt tour thành công!</span>
                                </div>
                            </div>
                            <div className={'container'}>
                                <div className={'d-flex justify-content-between mt-4'}>
                                    <div>
                                        Phương thức thanh toán:
                                    </div>
                                    <div>
                                        {invoice_detail.payment_method_name ? invoice_detail.payment_method_name : ''}
                                    </div>
                                </div>
                                {invoice_detail.payment_method_cash && invoice_detail.payment_method_cash == 1 && (
                                    <>
                                        <div className={'d-flex justify-content-center mt-2'}>
                                            <img
                                                src={`${BASE_URL}upload/payment_method/${invoice_detail.payment_method_qr_img ? invoice_detail.payment_method_qr_img : ''}`}
                                                style={{height: '200px'}} alt=""/>
                                        </div>
                                        <div className={'mt-2'}>
                                            Vui lòng điền vào phần nội dung chuyển tiền cú pháp: <span
                                            className={'order-code'}>  DH-{invoice_detail.order_id ? invoice_detail.order_id : ''}</span>
                                        </div>
                                    </>
                                )
                                }
                                {invoice_detail.payment_method_cash && invoice_detail.payment_method_cash == 2 && (
                                    <>
                                        <div className={' mt-2'}>

                                            <div>
                                                <i className='bx bxs-bank'></i> {invoice_detail.payment_method_content ? invoice_detail.payment_method_content : ''}
                                            </div>
                                        </div>
                                        <div className={'mt-2'}>
                                            Vui lòng đến trực tiếp Chi nhánh của Golden Smile Travel và thanh toán trực tiếp cho đơn hàng: <span
                                            className={'order-code'}>  DH-{invoice_detail.order_id ? invoice_detail.order_id : ''}</span>
                                        </div>
                                    </>
                                )
                                }
                                {/*<div className={'text-center mt-2'}>*/}
                                {/*    <div className={'mt-1'}>TEN TAI KHOAN</div>*/}
                                {/*    <div className={'mt-1 fw-bolder'}>1234567890</div>*/}

                                {/*</div>*/}

                                <hr/>
                                <div className={'d-flex justify-content-between mt-2 my-4'}>
                                    <div className={'fw-bolder'}>
                                        TỔNG CỘNG:
                                    </div>
                                    <div className={'total-price'}>
                                        {invoice_detail.price_total ? formatCurrency(invoice_detail.price_total) : ''}
                                    </div>
                                </div>
                            </div>


                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card className={'tour-info-thankpage'}>
                            <Card.Header>
                                THÔNG TIN ĐẶT TOUR

                            </Card.Header>
                            <Card.Body>

                                <Row>
                                    <Col xl={4}>
                                        <img className={'tour_image'} src={invoice_detail.tour_image} alt=""/>
                                    </Col>
                                    <Col xl={8}>
                                        <div className={'tour-name'}> ĐÀ NẴNG CITY TOUR 1 NGÀY</div>
                                        <div className={'mt-1'}>Mã đơn hàng <span
                                            className={'tour-name '}>DH-{invoice_detail.order_id ? invoice_detail.order_id : ''}</span>
                                        </div>
                                        <Link href={`/InvoiceDetail?order_id=${invoice_detail.order_id}`}>
                                            <div>Xem chi tiết đơn hàng</div>
                                        </Link>

                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                        <div className={'policy-thankpage'}>
                            <div className={'title my-3'}>
                                Để đảm bảo quyền lợi, khách hàng cần lưu ý:
                            </div>
                            <ul className={'policy px-3'}>
                                <li>
                                    Yêu cầu quý khách chuyển đúng số tiền thì booking được xác nhận ngay.
                                </li>

                                <li>
                                    Nếu bạn ghi sai cú pháp này, Golden Smile Travel hoàn toàn không chịu trách nhiệm
                                    trong trường hợp dịch vụ không được đăng kí hoặc gia hạn kịp thời.
                                </li>
                            </ul>


                        </div>
                        <Link href={'./'}>
                            <button className={'button-comeback-home btn w-100'}>
                                Quay về trang chủ
                            </button>
                        </Link>
                    </Col>
                </Row>

            </div>
        </>
    )
}

const mapStateToProps = state => ({
    invoiceDetailInfo: state.invoiceDetailInfo
});

export default connect(mapStateToProps, actions)(ThankYou);