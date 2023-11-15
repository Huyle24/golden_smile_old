import {Col, Container, Row, Table} from "react-bootstrap";

export default function TableTime(){
    return(
        <Container>
            <span>Bảng giá</span>
            <Row>
                <Col xl={8}>
                    <Table bordered  size="sm">
                        <thead>
                        <tr>
                            <th>Ngày khởi hành</th>
                            <th>Giá</th>
                            <th>Tình trạng</th>
                            <th>Đặt tour</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>08/09/2023</td>
                            <td>1250000 VND</td>
                            <td>Còn chỗ</td>
                            <td>Đặt ngay</td>
                        </tr>
                        <tr>
                            <td>15/09/2023</td>
                            <td>1250000 VND</td>
                            <td>Còn chỗ</td>
                            <td>Đặt ngay</td>
                        </tr>
                        <tr>
                            <td>22/09/2023</td>
                            <td>1250000 VND</td>
                            <td>Còn chỗ</td>
                            <td>Đặt ngay</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}