import { Container, Row, Col, Button } from "react-bootstrap";

export default function Experience(){
    return (

        <Container className="mb-4">
            <Row className="camnang mt-4">
                <div className="d-flex justify-content-between mb-3 align-items-center">
                    <h5 className="fw-bold color-text">Cẩm nang du lịch</h5>
                    <Button>Xem tất cả</Button>
                </div>
                <Col lg="4">
                    <div >
                            <img src="https://balotour.nhanhtravel.com/upload/domain/Balotour/news/20230512153801.png" alt="tin tuc du lich" className="w-100"/>
                            <div className="my-4">
                                <span className="text-danger fw-blod">Kinh nghiệm du lịch</span>
                                <h4 className="fw-bold mt-3 color-text">Du lịch Thái Lan</h4>
                            </div>
                    </div>
                </Col>
                <Col lg="4">
                    <div >
                            <img src="https://balotour.nhanhtravel.com/upload/domain/Balotour/news/20230512153801.png" alt="tin tuc du lich" className="w-100"/>
                            <div className="my-4">
                                <span className="text-danger fw-blod">Kinh nghiệm du lịch</span>
                                <h4 className="fw-bold mt-3 color-text">Du lịch Thái Lan</h4>
                            </div>
                    </div>
                </Col>
                <Col lg="4">
                    <div >
                            <img src="https://balotour.nhanhtravel.com/upload/domain/Balotour/news/20230512153801.png" alt="tin tuc du lich" className="w-100"/>
                            <div className="my-4">
                                <span className="text-danger fw-blod">Kinh nghiệm du lịch</span>
                                <h4 className="fw-bold mt-3 color-text">Du lịch Thái Lan</h4>
                            </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}