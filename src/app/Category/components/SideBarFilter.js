import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

export default function SidaBarFilter() {
    return (
        <Col lg="3" className="ps-0">
            <Card className="border border-0 bg-secondary-subtle">
                <Card.Title className="p-3 fillter">Tìm kiếm</Card.Title>
                <Form className="px-3 py-4">
                    <Card.Text className="title-filter mb-2">Hình thức</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Tất cả---</option>
                        <option value="1">Tour ri</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Loại hình tour</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Điểm đi---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Quốc gia</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Điểm đến---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Điểm đến</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Điểm đến---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Số ngày của tour</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3">
                        <option>---Điểm đến---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Ngày đi</Card.Text>
                    <Form.Control
                        type="date"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        className="mb-3"
                    />
                    <Card.Text className="title-filter mb-2">Ngày về</Card.Text>
                    <Form.Control
                        type="date"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        className="mb-3"
                    />
                    {/*<Card.Text className="title-filter mb-2">SỐ NGƯỜI</Card.Text>*/}
                    {/*<Row className="g-2 mb-3">*/}
                    {/*    <Col lg="6">*/}
                    {/*        <Button className='w-100 bg-white border text-black'>1 người</Button>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg="6">*/}
                    {/*        <Button className='w-100 bg-white border text-black'>2 người</Button>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg="6">*/}
                    {/*        <Button className='w-100 bg-white border text-black'>3-5 người</Button>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg="6">*/}
                    {/*        <Button className='w-100 bg-white border text-black'>5+ người</Button>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}

                    <Card.Text className="title-filter mb-2">Ngân sách của quý khách</Card.Text>
                    <Form.Range min={0} max={20000000}/>
                    <Card.Text className="bg-white">2000000đ-20000000đ</Card.Text>

                </Form>

            </Card>
        </Col>
    )
}