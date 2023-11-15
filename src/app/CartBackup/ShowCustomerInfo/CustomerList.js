import { Container, Table } from "react-bootstrap";

export default function CustomerList(){
    return (
        <Container >
            <div className="p-4 border rounded mt-4">
                <h5 className="fw-bold text-danger border-bottom pb-3">DANH SÁCH HÀNH KHÁCH</h5>
                <div className="table-list">
                    <Table className="mb-0">
                        <thead>
                            <tr className="bg-light">
                                <th>Họ tên</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Địa chỉ</th>
                                <th>Độ tuổi</th>
                                <th>Phòng đơn</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>16/08/1982</td>
                                <td>Nam</td>
                                <td></td>
                                <td>Người lớn</td>
                                <td>Có</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="text-end border-bottom py-2">
                    <span>Tổng cộng:</span>
                    <span className="text-danger fw-bold"> 8,490,000₫</span>
                </div>
            </div>
        </Container>
    )
}