import Link from "next/link";
import { Row, Col, Button, Form } from "react-bootstrap";
import {FaRegCalendarMinus,FaMailBulk ,FaUsers, FaPhoneAlt} from "react-icons/fa"
import Modal from "react-bootstrap/Modal";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import * as GlobalJs from "../../../js/global";
function OverviewRight(props){


    let timeline_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';

    const [show, setShow] = useState(false);
    const [tot, setTot] = useState(0)

    const handleClose = () => {
        setShow(false)
    };

    const handleSubmit = () =>{
        alert('Đã gửi thông tin thành công, Nhanhtravel sẽ liên hệ quý khách sớm nhất!');
        setShow(false)
    }
    const handleShow = () => setShow(true);
    let moneyAdult = timeline_detail_info ? timeline_detail_info.price : 0;
    let moneyChild = timeline_detail_info ? timeline_detail_info.price_child : 0;
    let moneyBaby = 7497000;
    let Switch = document.getElementById('custom-switch');
    let valueSwitch = parseFloat(Switch ? Switch.value : "0");
    let numberAdutl = props ? props.countAdult : 0;
    let numberChild = props ? props.countChild : 0;
    let numberBaby = props ? props.countBaby : 0;
    sessionStorage.setItem('valueSwitch',valueSwitch)
    const sumMoney =  (numberAdutl * moneyAdult) + (numberChild * moneyChild) + (numberBaby * moneyBaby) + valueSwitch;

    let listCartItem = props ? props.getToCart : '';
    useEffect(()=> {
        props.getToCartAction();
    },[])
    const [listCart, setListCart] = useState([])
    useEffect(()=> {
        setListCart(listCartItem)
    },[listCartItem])
    useEffect(() => {
        let totalPrice = listCart.reduce(function (accumulator, item) {
            return accumulator + parseInt(item.total_price) ;
        }, 0);
        setTot(totalPrice);
    }, [listCart]);
    const removeItemCart = (id) => {
        let newCart = [];
        newCart = listCart.filter((item) => item.id !== id)
        setListCart(newCart);

        localStorage.setItem("cartItems",JSON.stringify(newCart));


    }
    return (
        <div className="sticky-top mb-4 overview_right">
            <div>
                <span className="text-primary">Quý khách cần hỗ trợ?</span>
                <div className="mt-1">
                    <div className="d-flex justify-content-between">
                        <Link href="tel:(+84)909991205">
                            <Button ><FaPhoneAlt className="me-2"/>Gọi miễn phí qua internet</Button>
                        </Link>
                        <Button className="bg-white text-black boder-0 rounded-end" onClick={handleShow}><FaMailBulk className="me-2"/>Gửi yêu cầu hỗ trợ ngay</Button>
                    </div>
                </div>
            </div>
                <div>
                    {listCart ? (listCart.map((item,index) =>(

                    <div className="border border-dark p-3 mt-4">
                        <span className="text-700">Tóm tắt chuyển đi</span>
                        <div key={index}>
                            <span className="card_title_tour">Tour trọn gói <span className="text-primary fs-6">(9 khách)</span></span>
                            <Row className="my-2">
                                <Col lg={3}>
                                    <img src={item.image ? item.image[0] : ''} className="w-100 rounded h-100 object-fit-cover"/>
                                </Col>
                                <Col lg={9}>
                                    <span className="title_booking color-text fw-bold">{item.name}</span>
                                </Col>
                            </Row>
                            <div className="fs-6 fw-bold color-text">Số lượng : {item.adult} người lớn, {item.child} trẻ em</div>
                            <div>
                                <div className="start d-flex">
                                    <FaRegCalendarMinus className="me-2 mt-1 text-primary"/>
                                    <div className="d-flex flex-column">
                                        <span className="text-primary">Bắt đầu chuyến đi</span>
                                        <span className="card_title_tour">T2, 28 Tháng 8, 2023</span>
                                        <span className="from"></span>
                                    </div>
                                </div>
                                <div className="end d-flex">
                                    <FaRegCalendarMinus className="me-2 mt-1 text-primary"/>
                                    <div className="d-flex flex-column">
                                        <span className="text-primary">Kết thúc chuyến đi</span>
                                        <span className="card_title_tour">T7, 2 Tháng 9, 2023</span>
                                    </div>
                                </div>
                                {/*<div className="d-flex justify-content-between align-items-center mb-3">*/}
                                {/*    <span className="card_title_tour">Hành khách</span>*/}
                                {/*    <div className="d-flex flex-column align-items-end">*/}
                                {/*        <span className="text-primary fs-4 d-flex align-items-center"><FaUsers className="icon_detail_tour me-1"/>{numberAdutl + numberChild + numberBaby} người</span>*/}
                                {/*        <span>{numberAdutl} người lớn</span>*/}
                                {/*        <span>{numberChild} trẻ em</span>*/}
                                {/*        <span>{numberBaby} em bé</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div>
                                    {/*<div className="d-flex justify-content-between mb-3">*/}
                                    {/*    <span>Người lớn</span>*/}
                                    {/*    <span className="card_title_tour">{numberAdutl} x {moneyAdult}đ</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="d-flex justify-content-between mb-3">*/}
                                    {/*    <span>Trẻ em</span>*/}
                                    {/*    <span className="card_title_tour">{numberChild} x {moneyChild}đ</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="d-flex justify-content-between mb-3">*/}
                                    {/*    <span>Em bé</span>*/}
                                    {/*    <span className="card_title_tour">{numberBaby} x {moneyBaby}đ</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="d-flex justify-content-between mb-3">*/}
                                    {/*    <span className="card_title_tour">Phụ thu phòng riêng</span>*/}
                                    {/*    <span className="card_title_tour">{valueSwitch}đ</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="d-flex justify-content-between align-items-center mb-3">*/}
                                    {/*    <span className="color-text fw-bold">Mã giảm giá</span>*/}
                                    {/*    <div>*/}
                                    {/*        <Form className="d-flex">*/}
                                    {/*            <Form.Control type="text" placeholder="Thêm mã" className="input_code_promotion"/>*/}
                                    {/*            <Button className="btn-success ms-2 text-nowrap">Áp dụng</Button>*/}
                                    {/*        </Form>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="d-flex justify-content-between align-items-center mt-3 border-top pt-2">
                                        {/*<span className="color-text fw-bold">TỔNG CỘNG</span>*/}
                                        <Button onClick={() => removeItemCart(item.id)} className="bg-danger text-white border-0 fw-bold">
                                            Xóa
                                        </Button>
                                        <span className="text-danger fs-5 fw-bold ">{item.total_price ? GlobalJs.format_currency(item.total_price) : 0}đ</span>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    ))) : ''}

                    <div className="p-4 border-black border mt-2">
                        <div className="d-flex justify-content-between align-items-center  mt-2  ">
                            <span className="color-text fw-bold">TỔNG CỘNG</span>
                            <span className="text-danger fs-3 fw-bold ">{GlobalJs.format_currency(tot)}đ</span>
                        </div>
                        <div>
                            <Link href={"/Booking/Checkout?id=305"}>
                                <Button className="w-100 btn-danger py-2 mt-3 text-uppercase">thanh toán</Button>
                            </Link>
                        </div>
                    </div>
                </div>


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
      </div>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
    getToCart: state.getToCart,
});
export default connect(mapStateToProps, actions)(OverviewRight);