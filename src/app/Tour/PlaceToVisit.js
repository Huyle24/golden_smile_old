import { Container, Row, Col } from "react-bootstrap";

export default function PlaceToVisit(data){
    return (
        <Container  className="mt-5">
            <span className="d-flex justify-content-center title_page_detail">Những địa điểm tham quan</span>
            <Row className="mt-4">
                {data.data.image ? data.data.image.filter((item,idx) => idx < 6).map((item,index) =>(
                    <Col lg={2} key={index}>
                        <img src={item} className="img_place_to_visit"/>
                    </Col>
                )) : [] }

            </Row>
        </Container>
    )
}