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

function ThankYou(props) {
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
                                <div className={'d-flex justify-content-center mt-2'}>
                                    <img src="https://vigomanager.com/app-assets/mobile/img-huy/image%2030.png" alt=""/>
                                </div>
                                <div className={'text-center mt-2'}>
                                    <div className={'mt-1'}>TEN TAI KHOAN</div>
                                    <div className={'mt-1 fw-bolder'}>1234567890</div>

                                </div>
                                <div className={'mt-2'}>
                                    Vui lòng điền vào phần nội dung chuyển tiền cú pháp: <span
                                    className={'order-code'}>  {invoice_detail.order_id_encode ? invoice_detail.order_id_encode : ''}</span>
                                </div>
                                <hr/>
                                <div className={'d-flex justify-content-between mt-2 my-4'}>
                                    <div className={'fw-bolder'}>
                                        TỔNG CỘNG:
                                    </div>
                                    <div className={'total-price'}>
                                        40,000,000 VNĐ
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
                                        <div className={'mt-2'}>Mã đơn hàng <span
                                            className={'tour-name '}> {invoice_detail.order_id_encode ? invoice_detail.order_id_encode : ''}</span></div>
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