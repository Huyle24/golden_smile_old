import { Container, Row, Col } from "react-bootstrap";
import Link from 'next/link';
export default function NewsTravel(data){
    return (
        <Container >


                    <Row >
                        <h5 className="color-text fw-bold">Tin tức du lịch</h5>
                        { data.data.filter((item, idx) => idx < 1).map((item,index)=>(
                        <Col lg="7" key={index}>
                            <div className="tintuc_1" >
                                <Link href={"/Camnang/ArticleDetail/?id="+item.id}>
                                    <img src='https://balotour.nhanhtravel.com/upload/domain/Balotour/news/20230512153801.png' alt="tin tuc du lich" className="w-100"/>
                                </Link>
                                <div className="p-4">
                                    <span className="text-danger fw-bold pb-3">Tin tức du lịch</span>
                                    <h2 className="color-text fw-bold mt-3">{item.title}</h2>
                                    <span className="fs-6 color-text">22/08/2023</span>
                                </div>
                            </div>
                        </Col>
                        ))}
                        <Col lg="5">
                            { data.data.filter((item, idx) =>  idx < 3).map((item,index)=>(
                            <Row className="tintuc_item" key={index}>
                                <Col lg="5">
                                    <Link href={"/Camnang/ArticleDetail/?id="+item.id}>
                                        <div className="tintuc_img">
                                            <img src="https://balotour.nhanhtravel.com/upload/domain/Balotour/news/20230512153801.png" alt="tin tuc du lich" className="w-100"/>
                                        </div>
                                    </Link>

                                </Col>
                                <Col lg="7">
                                    <div>
                                        <span className="text-danger fw-bold">Tin tức du lịch</span>
                                        <h5 className="color-text fw-bold">{item.title}</h5>
                                        <span className="fs-6 color-text">22/08/2023</span>
                                    </div>
                                </Col>
                            </Row>
                            ))}
                        </Col>
                    </Row>


        </Container>
    )
}