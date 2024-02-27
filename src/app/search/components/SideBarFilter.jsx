import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import "./SideBarFilter.scss"

export default function SidaBarFilter() {
    return (
        <>
            <Card className="border border-0  card-filter">
                <Card.Title className="p-3 fillter mb-0">Tìm kiếm</Card.Title>
                <Form className="px-3 py-4">
                    <Card.Text className="title-filter mb-2">Kiểu tour</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Tất cả---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Dòng tour</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Tất cả---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Ngày khởi hành</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Tất cả---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Nơi khởi hành</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Tất cả---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select> <Card.Text className="title-filter mb-2">Nơi đến</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Tất cả---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Phương tiện</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Tất cả---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Giá</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Tất cả---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>


                </Form>

            </Card>
        </>
    )
}