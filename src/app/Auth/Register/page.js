"use client"
import {Button, Container, Form} from "react-bootstrap";

export default function Home(){
    return (
        <div className="bg_login">
            <Container className="page_login">
                <div>
                    <div className="form_login">
                        <span className="color-text fw-bold">Đăng ký</span>
                        <Form className="mt-4">
                            <div>
                                <Form.Label htmlFor="inputPassword5">Số điện thoại</Form.Label>
                                <Form.Control
                                    type="phone" className="mb-3"
                                />
                            </div>
                            <div>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email" className="mb-3"
                                />
                            </div>
                            <div>
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password" className="mb-3"
                                />
                            </div>

                            <Button className="w-100">Đăng ký</Button>
                        </Form>
                    </div>

                </div>

            </Container>

        </div>
    )
}