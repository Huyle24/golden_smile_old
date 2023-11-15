import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import ConfirmCard from "./ConfirmCard";
import DetailBooking from "./DetailBooking";
import {connect} from "react-redux";
import * as actions from "../../../../redux/actions";
import {GET_TOKEN} from "../../../../redux/actions/type";
import {useEffect, useState} from "react";
import * as GlobalJs from "../../../../js/global";
import {useSearchParams} from "next/navigation";
import QRCode from "qrcode";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Link from "next/link";

function InfoCustomer(props){
    const [isLogin, setIsLogin] = useState(false)
    const [show, setShow] = useState(false);
    const [userMore, setUserMore] = useState([]);
    const [tot, setTot] = useState(0)
    const searchParams = useSearchParams()
    const [src, setSrc] =useState('')
    const [qrPay, setQrPay] = useState('')
    const [prPayDN, setQRPayDN] = useState('')


    let order_view = props.orderViewDetailInfo.data && props.orderViewDetailInfo.isLoading == false ? props.orderViewDetailInfo.data : '';

    const generate = () => {
        QRCode.toDataURL('https://balotour.nhanhtravel.com/ViewVoucher?code=' + searchParams.get('order_code'))
            .then(url => {
                setSrc(url);
            })
            .catch(err => {
                console.error(err)
            })
    }
    useEffect(() => {
        props.fetchOrderView(searchParams.get('order_code'))
        // setOderCode(searchParams.get('order_code'))

    },[searchParams.get('order_code')])

    const get_user_more =async () => {

        let user_more = await localStorage.getItem("user_more");
        if(user_more){
            setUserMore(JSON.parse(user_more))
        }

    }
    useEffect(() => {
        props.getToCartAction()
        get_user_more()
    },[])

    let listItemCart = props ? props.getToCart : '';
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        setCartItems(listItemCart)
    },[listItemCart])

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + parseInt(item.total_price) ;
        }, 0);
        setTot(totalPrice);
    }, [cartItems]);
    const handleClose = () => setShow(false);
    const requestData = {
        accountNo: '491688888',
        accountName: 'VANG THI MY NANG',
        acqId: '970416',
        addInfo: order_view.code,
        amount: order_view.price_total,
        format: "text",
        template: 'compact'
    };

    const requestDataDN = {
        accountNo: '0441000650930',
        accountName: 'CTY CO PHAN DAU TU PHAT TRIEN VIGO',
        acqId: '970436',
        addInfo: order_view.code,
        amount: order_view.price_total,
        format: "text",
        template: 'compact'
    }

    const renderQRPayDN = () => {
        axios.post('https://api.vietqr.io/v2/generate', requestDataDN, {
            'x-client-id': '4d9c162e-8d5d-4687-bf01-6579e51b7683',
            'x-api-key': '504011bd-107f-4f22-9295-0837cb83fc58',
            'Content-Type': 'application/json'
        }).then(res =>{
            console.log(res)
            setQRPayDN(res.data.data.qrDataURL)
        })
            .catch(error => {
                console.error(error)
            })
    }

    const renderQRPay = () => {
        axios.post('https://api.vietqr.io/v2/generate', requestData, {
            'x-client-id': '4d9c162e-8d5d-4687-bf01-6579e51b7683',
            'x-api-key': '504011bd-107f-4f22-9295-0837cb83fc58',
            'Content-Type': 'application/json'
        }).then(res =>{
            setQrPay(res.data.data.qrDataURL)
        })
            .catch(error => {
                console.error(error)
            })
    }
    const handleShow = () => {

        setShow(true);
    }
    const [checkTT, setCheckTT] = useState(false);

    const handleCheck = () => setCheckTT(!checkTT);

    const checkToken = async () => {
        let token = await GET_TOKEN();
        if (token) {
            setIsLogin(true)
            props.getUserInfo()
        }
    }

    useEffect(() => {
        generate()
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        renderQRPayDN();
        renderQRPay();
    },[searchParams.get("order_code")])
    useEffect(() => {
        props.fetchSetupAddressDetail(userMore.id_setup_address)
    }, [userMore.id_setup_address])

    let setup_address_detail = props.setupAddressDetailInfo.data && props.setupAddressDetailInfo.isLoading == false ? props.setupAddressDetailInfo.data : '';
    let user_data = props.userInfo.data && props.userInfo.isLoading == false ? props.userInfo.data : '';

    function formatString(number){
        return (number.substring(0, 3) + '***' + number.substring(6));
    }

    return(
        <Container  className="main_showcustomer">
                <Row>
                    <Col lg="8" >
                        <div className="p-4 border rounded">
                            <h5 className="fw-bold text-danger border-bottom pb-3">THÔNG TIN LIÊN LẠC</h5>
                            {setup_address_detail ? ([setup_address_detail].map((item,index) => (
                                <Row key={index}>
                                    <Col lg="6">
                                        <span className="text-secondary">Phương thức liên lạc</span>
                                        <p className="text-color-primary">{item ? item.facility : ''}</p>
                                    </Col>
                                    <Col lg="6">
                                        <span className="text-secondary">Điện thoại</span>
                                        <p className="text-color-primary">{formatString(item.phone)}</p>
                                    </Col>
                                    <Col lg="6">
                                        <span className="text-secondary">Địa điểm đón: </span>
                                        <p className="text-color-primary">{item.address_start}</p>
                                    </Col>
                                    <Col lg="6">
                                        <span className="text-secondary">Địa điểm trả</span>
                                        <p className="text-color-primary">{item.address_end}</p>
                                    </Col>
                                    <Col lg="12">
                                        <span className="text-secondary">Ghi chú</span>
                                        <p className="text-color-primary">{userMore ? userMore.request : ''}</p>
                                    </Col>
                                </Row>
                            ))) : ''}
                        </div>
                        <div className="p-4 border rounded mt-4">
                            <h5 className="fw-bold text-danger border-bottom pb-3">CHI TIẾT BOOKING</h5>
                            <Row>
                                <Col lg="3" className="mb-4">
                                    <span className="text-color-primary">Số booking</span>
                                </Col>
                                <Col lg="9">
                                    <span className="text-danger fw-bold">{order_view.code}</span>
                                    <span className="fw-normal color-text"> (Quý khách vui lòng nhớ số booking để thuận tiện cho các giao dịch sau này)</span>
                                </Col>
                                <Col lg="3" className="mb-4">
                                    <span className="text-color-primary">Trị giá booking</span>
                                </Col>
                                <Col lg="9">
                                    <span className="fw-normal color-text">{GlobalJs.format_currency(order_view.price_total)}₫</span>
                                </Col>
                                <Col lg="3" className="mb-4">
                                    <span className="text-color-primary">Số tiền đã thanh toán</span>
                                </Col>
                                <Col lg="9">
                                    <span className="fw-normal color-text">0đ</span>
                                </Col>
                                <Col lg="3" className="mb-4">
                                    <span className="text-color-primary">Số tiền còn lại</span>
                                </Col>
                                <Col lg="9">
                                    <span className="fw-normal color-text">{GlobalJs.format_currency(order_view.price_total)}₫</span>
                                </Col>
                                <Col lg="3" className="mb-4">
                                    <span className="text-color-primary">Ngày đăng ký</span>
                                </Col>
                                <Col lg="9">
                                    <span className="fw-normal color-text">{order_view.created_date}</span>
                                </Col>
                                <Col lg="3" className="mb-4">
                                    <span className="text-color-primary">Hình thức thanh toán</span>
                                </Col>
                                <Col lg="9">
                                    <span className="fw-normal color-text">Thanh toán bằng {order_view.payment_method}</span>
                                </Col>
                                <Col lg="3" className="mb-4">
                                    <span className="text-color-primary">Tình trạng thanh toán</span>
                                </Col>
                                <Col lg="9">
                                    <span className="fw-normal color-text">{order_view.staus_name}</span>
                                </Col>
                                {/*<Col lg="3" className="mb-4">*/}
                                {/*    <span className="text-color-primary">Thời hạn thanh toán</span>*/}
                                {/*</Col>*/}
                                {/*<Col lg="9">*/}
                                {/*    <span className="text-danger fw-bold">21/08/23 10:07:10</span>*/}
                                {/*    <span className="fw-normal color-text"> (Theo giờ Việt Nam. Booking sẽ tự động hủy nếu quá thời hạn thanh toán trên)</span>*/}
                                {/*</Col>*/}
                            </Row>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="p-4 border rounded ">
                            <h5 className="fw-bold text-danger border-bottom pb-3">
                                PHIẾU XÁC NHẬN BOOKING
                            </h5>
                            <div className="border-bottom pb-3">
                                {cartItems ? (cartItems.map((item,index) => (
                                    <Row key={index}>
                                        <Col lg={3} className="mt-2">
                                            <img src={item ? item.image[0] : ''} className="w-100 h-100 object-fit-cover rounded"/>
                                        </Col>
                                        <Col lg={9}>
                                            <p className="text-color-primary">
                                                {item.name}
                                            </p>
                                        </Col>
                                    </Row>

                                ))): ''}
                                <div className="mt-2">
                                    <span className="color-text">Số booking: </span>
                                    <span className="fw-bold text-danger">{order_view.code}</span>
                                </div>

                            </div>
                            <div className="d-flex justify-content-center">
                                {src ? (
                                    <div className="img_prcode">
                                    <img src={src}
                                         className="w-100"
                                    />
                                </div>) : ''}

                            </div>
                            <div>
                                <Link href={ `https://demo.nhanhtravel.com/ViewVoucher?code=${searchParams.get('order_code')}`} target="_blank">
                                    <p>Xem thông tin chi tiết </p>
                                </Link>
                                <p className="color-text">
                                    Để xem thông tin chương trình tour mới nhất Quý khách có thể dùng
                                    điện thoại để quét mã QR bên cạnh để truy cập vào website.
                                </p>
                                <p className="color-text">
                                    Để cài phần mềm quét mã QR Code quý khách có thể tìm trong kho ứng
                                    dụng của điện thoại với từ khóa sau: QRCode Scanner, QRCode
                                    Reader,..
                                </p>
                            </div>
                            <Button className="bg-danger w-100 border-0" onClick={() => handleShow()}>
                                Thanh toán
                            </Button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>THÔNG TIN THANH TOÁN ONLINE</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Tabs
                                    defaultActiveKey="tk_canhan"
                                    id="uncontrolled-tab-example"
                                    className="mb-3 border-bottom-0 d-flex justify-content-center"
                                >
                                    <Tab eventKey="tk_canhan" title="Cá Nhân">
                                        <div className="d-flex justify-content-center">
                                            <div className="img_qrpay d-flex">
                                                <img src={qrPay} alt="qr"/>
                                            </div>
                                        </div>
                                        <div className="px-5">
                                            <div className="d-flex flex-column text-center">
                                                <span className="text-primary fw-bold">VANG THI MY NANG</span>
                                                <span className="text-primary">491688888</span>

                                            </div>
                                            {/*<div className="d-flex justify-content-between mt-2">*/}
                                            {/*    <span>Số tài khoản:</span>*/}
                                            {/*</div>*/}
                                        </div>
                                    </Tab>
                                    <Tab eventKey="tk_company" title="Doanh Nghiệp">
                                        <div className="d-flex justify-content-center">
                                            <div className="img_qrpay d-flex">
                                                <img src={prPayDN} alt="qr"/>
                                            </div>
                                        </div>
                                        <div className="px-5">
                                            <div className="d-flex flex-column text-center">
                                                {/*<span>Tên tài khoản:</span>*/}
                                                <span className="text-primary fw-bold">CTY CO PHAN DAU TU PHAT TRIEN VIGO</span>
                                                <span className="text-primary">0441000650930</span>
                                                <span className="text-primary"> Vietcombank Chi nhánh Tân Bình</span>

                                            </div>
                                            {/*<div className="d-flex justify-content-between mt-2">*/}
                                            {/*    <span>Số tài khoản:</span>*/}
                                            {/*</div>*/}
                                            {/*<div className="d-flex justify-content-between mt-2">*/}
                                            {/*    <span>Chi nhánh:</span>*/}
                                            {/*</div>*/}
                                        </div>
                                    </Tab>

                                </Tabs>

                                <div className="mt-2">
                                    <span>Để đảm bảo quyền lợi, khách hàng cần lưu ý</span>
                                    <p>Yêu cầu quý khách chuyển đúng số tiền thì booking được xác nhận ngay.
                                        Khi chuyển khoản, trong phần nội dung thanh toán, bạn vui lòng ghi rõ như sau: “<span className="fw-bold text-primary">{order_view.code}</span>“.
                                        Đây là mã đơn hàng chứa các dịch vụ của bạn vừa đặt.</p>
                                    <p className="text-danger">Nếu bạn ghi sai cú pháp này, Nhanhtravel hoàn toàn không chịu trách nhiệm trong trường hợp dịch vụ không được đăng kí hoặc gia hạn kịp thời.</p>
                                </div>

                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    getToCart: state.getToCart,
    setupAddressDetailInfo:state.setupAddressDetailInfo,
    orderViewDetailInfo: state.orderViewDetailInfo,
});
export default connect(mapStateToProps, actions)(InfoCustomer);
