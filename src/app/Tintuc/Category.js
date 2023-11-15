import { Container } from "react-bootstrap";

export default function Category(){
    return (
        <Container >
            <h4 className="text-center text-danger fw-bold">Tin tức Nhanhtravel</h4>
            <div className="d-flex justify-content-around">
                <span className="color-text fw-bold">Tin tức du lịch</span>
                <span className="color-text fw-bold">Cẩm nang du lịch</span>
                <span className="color-text fw-bold">Kinh nghiệm du lịch</span>
            </div>
        </Container>
    )
}