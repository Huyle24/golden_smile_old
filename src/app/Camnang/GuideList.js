import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

export default function GuideList(data){
    return(
        <Container  className="mt-4">
            { data.data.filter((item, idx) =>  idx < 10).map((item,index)=>(
                <div className="border-top" key={index}>
                <Row className="camnang_item py-3 ">
                    <Col lg="4">
                        <Link href={"/Camnang/ArticleDetail/?id="+item.id}>
                            <img src="https://wiki-travel.com.vn/uploads/post/camnhi-234422034427-dia-diem-du-lich-mua-thu-tai-trung-quoc.jpg" className="w-100"/>
                        </Link>
                    </Col>
                    <Col lg="8">
                        <Link href={"/Camnang/ArticleDetail/?id="+item.id}>
                            <h4 className="color-text fw-bold">{item.title}</h4>
                        </Link>
                        <span className="text-danger">Cẩm nang du lịch</span> - <span className="color-text"> {item.created_date}</span>
                        <p className="color-text mt-3">{item.desc}</p>
                    </Col>
                </Row>
            </div>
            ))}
        </Container>
    )
}