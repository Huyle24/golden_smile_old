import { Col, Row } from "react-bootstrap";
import { FavoriteTour } from "../ListTourData";
export default function FavoritePlace(){
    return (
        <Col lg={{span: 9, offset:3}} className="mt-4">
            <h3>Các tour đang tìm phổ biến</h3>
            <Row>
                {FavoriteTour.map((item) => (
                    <Col lg="3" key={item.id}>
                        <img src={item.img} className="img_favorite"/>
                        <h4 className="p-3">{item.place}</h4>
                    </Col>
                ))}
                
                
            </Row>
        </Col>
    )
}