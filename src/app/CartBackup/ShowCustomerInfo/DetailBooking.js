import { Container, Row, Col } from "react-bootstrap";

export default function DetailBooking(){
    return (
                    <div className="p-4 border rounded mt-4">
                        <h5 className="fw-bold text-danger border-bottom pb-3">CHI TIẾT BOOKING</h5>
                        <Row>
                            <Col lg="3" className="mb-4">
                                <span className="text-color-primary">Số booking</span>
                            </Col>
                            <Col lg="9">
                                <span className="text-danger fw-bold">230821244788</span>
                                <span className="fw-normal color-text"> (Quý khách vui lòng nhớ số booking để thuận tiện cho các giao dịch sau này)</span>
                            </Col>
                            <Col lg="3" className="mb-4">
                                <span className="text-color-primary">Trị giá booking</span>
                            </Col>
                            <Col lg="9">
                                <span className="fw-normal color-text">8,490,000₫</span>
                            </Col>
                            <Col lg="3" className="mb-4">
                                <span className="text-color-primary">Số tiền đã thanh toán</span>
                            </Col>
                            <Col lg="9">
                                <span className="fw-normal color-text">0đ</span>
                            </Col>
                            <Col lg="3" className="mb-4">
                                <span className="text-color-primary">Số tiền còn lại</span>
                            </Col>
                            <Col lg="9">
                                <span className="fw-normal color-text">8,490,000₫</span>
                            </Col>
                            <Col lg="3" className="mb-4">
                                <span className="text-color-primary">Ngày đăng ký</span>
                            </Col>
                            <Col lg="9">
                                <span className="fw-normal color-text">21/08/2023 09:07:10</span>
                            </Col>
                            <Col lg="3" className="mb-4">
                                <span className="text-color-primary">Hình thức thanh toán</span>
                            </Col>
                            <Col lg="9">
                                <span className="fw-normal color-text">Thanh toán bằng quét QRCode - Thẻ tín dụng (VISA/MASTER/JCB) Thẻ ATM - Dịch vụ của VNPay</span>
                            </Col>
                            <Col lg="3" className="mb-4">
                                <span className="text-color-primary">Tình trạng</span>
                            </Col>
                            <Col lg="9">
                                <span className="fw-normal color-text">Booking của quý khách đã được chúng tôi xác nhận thành công</span>
                            </Col>
                            <Col lg="3" className="mb-4">
                                <span className="text-color-primary">Thời hạn thanh toán</span>
                            </Col>
                            <Col lg="9">
                                <span className="text-danger fw-bold">21/08/23 10:07:10</span>
                                <span className="fw-normal color-text"> (Theo giờ Việt Nam. Booking sẽ tự động hủy nếu quá thời hạn thanh toán trên)</span>
                            </Col>
                        </Row>
                    </div>
    )
}