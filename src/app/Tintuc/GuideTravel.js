import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
export default function GuideTravel(data){
    return (
        <Container >
            <Row className="camnang">
                <div className="d-flex justify-content-between mb-3 align-items-center">
                    <h5 className="fw-bold color-text">Cẩm nang du lịch</h5>
                    <Button>Xem tất cả</Button>
                </div>
                { data.data.filter((item, idx) =>  idx < 3).map((item,index)=>(
                <Col lg="4" key={index}>
                    <div className="position-relative">
                        <Link href={"/Camnang/ArticleDetail/?id="+item.id}>
                            <img src="https://balotour.nhanhtravel.com/upload/domain/Balotour/news/20230512153801.png" alt="tin tuc du lich" className="w-100"/>
                            <div className="position-absolute bottom-0 text-white p-3">
                                <h4 className="fw-bold mt-3">{item.title}</h4>
                                <span className="fs-6">{item.created_date}</span>
                            </div>
                        </Link>

                    </div>
                </Col>
                    ))}
            </Row>
        </Container>
    )
}