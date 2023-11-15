import {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Container, Row, Col, Button, Form} from "react-bootstrap";
import {FaTicketAlt, FaHeart, FaShoppingCart, FaCartPlus} from 'react-icons/fa';
import Link from 'next/link';
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {fetchTourDetailW3} from "../../../redux/actions";
import {useRouter, useSearchParams} from "next/navigation";
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE } from '../../../redux/actions/type';
import Swal from "sweetalert2";
import * as GlobalJs from "../../../js/global";

function HeadDetail(props){
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const router = useRouter();
    const searchParams = useSearchParams()

    useEffect(() => {
        props.fetchTourDetailW3(searchParams.get('id'))
    },[searchParams.get('id')])

    let header_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    };

    const handleSubmit = () =>{
        alert('Đã gửi thông tin thành công, Nhanhtravel sẽ liên hệ quý khách sớm nhất!');
        setShow(false)
    }
    const add_to_cart = async (item) => {
        let token = await GET_TOKEN();
        if(token){
            props.addToCartAction(item);
        }
        else{
            Toast.fire({
                title: "Chưa đăng nhập tài khoản",
                icon: "error"
            })
            router.push('/Auth/Login/');
        }


        // const cartItems = getCartItems();
        // cartItems.push(item);
        // localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };
    const handleShow = () => setShow(true);
    return (
        <Container >
                {header_detail_info ? ([header_detail_info].map((item,index) => (
                    <Row key={index}>

                        <Col lg="6">
                    <span className="d-flex align-items-center text-primary mb-2">
                        <FaTicketAlt className="me-2"/>
                        {item.code}
                    </span>
                            <h2 className="tour_detail_title">{item.name}</h2>
                            <div className="d-flex align-items-center">
                                <span className="me-3 tag_point">9</span>
                                <div className="d-flex flex-column me-3">
                                    <span>Tuyệt vời</span>
                                    <span>1 quan tâm</span>
                                </div>
                                <span className="px-4 py-2 border bg-white rounded-2"><FaHeart className="me-1 text-danger"/>126</span>
                            </div>
                        </Col>

                        <Col lg="6">
                            <div className="d-flex justify-content-end">
                                <div className="d-flex flex-column me-3">
                                    <span className="mb-2 text-decoration-line-through">Giá 16,490,000₫/ khách</span>
                                    <p><span className="text-danger fs-4 fw-bold">{GlobalJs.format_currency(item.price)}₫</span>/ khách</p>
                                </div>
                                <div className="d-flex flex-column">
                                        <Link href='/CartBackup' className="text-white" >
                                            <Button variant="danger" className="mb-1 px-4 d-flex align-items-center" onClick={() => add_to_cart(item)}>
                                                <FaCartPlus className="me-2"/>
                                                Đặt Ngay
                                            </Button>

                                        </Link>


                                    <Button className="bg-white text-black border-black mb-1" onClick={handleShow}>Liên hệ tư vấn</Button>
                                    <Button className="bg-info text-white border-info">Tour riêng</Button>

                                </div>

                            </div>
                        </Col>
                    </Row>
                    ))) : ''}

            <Modal show={show} onHide={handleClose} animation={false} size="md" centered>
            <Modal.Header closeButton>
            <Modal.Title className="text-primary">GỬI THÔNG TIN TƯ VẤN</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className='color-text'>Quý khách vui lòng nhập thông tin bên dưới, Nhanhtravel sẽ liên hệ lại sau ít phút.</span>
                <Form>
                    <div className="mt-2">
                        <Form.Label htmlFor="inputPassword5" className="color-text">Họ và tên *</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                    </div>
                    <div className="mt-2">
                        <Form.Label htmlFor="phone" className="color-text">Điện thoại *</Form.Label>
                        <Form.Control
                            type="phone"
                            id="phone"
                            aria-describedby="passwordHelpBlock"
                        />
                    </div>
                    <div className="mt-2">
                        <Form.Label htmlFor="email" className="color-text">Email *</Form.Label>
                        <Form.Control
                            type="email"
                            id="email"
                            aria-describedby="passwordHelpBlock"
                        />
                    </div>
                    <div className="mt-2">
                        <Form.Label className="color-text">Thông tin cần tư vấn</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </div>


                </Form>
            </Modal.Body>

            <Modal.Footer className='justify-content-center'>
                <Button variant="primary" onClick={handleSubmit}>
                    Gửi Ngay
                </Button>
            </Modal.Footer>
        </Modal>
        </Container>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(HeadDetail);
