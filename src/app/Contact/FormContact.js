import { Container, Form, Row, Col, Button} from "react-bootstrap";
import {FaTelegramPlane} from "react-icons/fa"
import Branch from "./Branch";
export default function FormContact(){
    return (
        <Container >
            <Row className="py-3">
                <div className="py-3 px-5">
                    <h4 className="text-danger fw-bold">LIÊN HỆ</h4>
                    <span className="color-text">Để có thể đáp ứng được các yêu cầu và các ý kiến đóng góp của quý vị một cách nhanh chóng xin vui lòng liên hệ0</span>
                </div>
                <Col lg="7">
                    <div>
                        <div>
                            <h5 className="fw-bold text-danger mb-3">Gửi thông tin</h5>
                            <Form>
                                <Row>
                                    <Col lg="4">
                                        <Form.Label className="color-text">Họ tên (*)</Form.Label>
                                        <Form.Select className="mb-3">
                                            <option value="1">Du lịch</option>
                                            <option value="2">Chăm sóc khách hàng</option>
                                            <option value="3">Liên hệ thông tin khác</option>
                                        </Form.Select>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="color-text">Họ tên (*)</Form.Label>
                                            <Form.Control type="text" required/>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="color-text">Email (*)</Form.Label>
                                            <Form.Control type="email"/>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="color-text">Điện thoại(*)</Form.Label>
                                            <Form.Control type="phone"/>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="color-text">Tên công ty</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="color-text">Số khách</Form.Label>
                                            <Form.Control type="number"/>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="12">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="color-text">Địa chỉ</Form.Label>
                                            <Form.Control type="text"/>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="12">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="color-text">Tiêu đề (*)</Form.Label>
                                            <Form.Control type="text"/>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="12">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="color-text">Nội dung (*)</Form.Label>
                                            <Form.Control as="textarea" rows={3} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div><iframe title="reCAPTCHA" src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LcezicTAAAAAIbBsNL6IS14WAowVVhd_iL0hVNf&amp;co=aHR0cHM6Ly90cmF2ZWwuY29tLnZuOjQ0Mw..&amp;hl=vi&amp;v=x19joXI_IeQnFJ7YnfDapSZq&amp;theme=light&amp;size=normal&amp;cb=rf4y5iei93r5" width="304" height="78" role="presentation" name="a-32uhcnfr3hqf" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"></iframe></div>
                                <div className="d-flex justify-content-center ">
                                    <Button className="bg-danger border-0">Gửi đi<FaTelegramPlane className="ms-2"/></Button>
                                    
                                </div>
                                
                            </Form>
                        </div>
                    </div>
                </Col>
                <Col lg="5">
                    <Branch />
                </Col>
            </Row>
        </Container>
    )
}