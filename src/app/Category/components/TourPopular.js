import { Button, Col } from "react-bootstrap";
import {FaSearch} from 'react-icons/fa';
export default function TourPopuLar(){
    return (
        <Col lg={{span: 9, offset:3}} className="mt-4">
            <h3>Các tour đang tìm phổ biến</h3>
            <Button className="search_tour me-2 text-black"><FaSearch className="me-2"/> Đà lạt</Button>
            <Button className="search_tour me-2 text-black"><FaSearch className="me-2"/> Đà lạt</Button>
            <Button className="search_tour me-2 text-black"><FaSearch className="me-2"/> Đà lạt</Button>
            <Button className="search_tour me-2 text-black"><FaSearch className="me-2"/> Đà lạt</Button>
        </Col>
    )
}