'use client'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FaMailBulk, FaPhoneAlt} from "react-icons/fa";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import { setOrderData } from "../../../redux/actions";
import {BASE_URL_API} from "../../../redux/actions/type";
import axios from "axios";
import Swal from "sweetalert2";
import InfoDetail from "@/app/OrderTour/InfoDetail"
import PaymentSidebar from "@/app/Checkout/PaymentSidebar";
import {useRouter} from "next/navigation";
function PaymentMethod(props){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const [agree, setAgree] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    let payment_method_list = props.addCartDetailInfo.data && props.addCartDetailInfo.isLoading == false ? props.addCartDetailInfo.data.payment_method_list : '';
    const orderData = props.orderDataInfo.orderData ;
    const newElement = {
        payment_method: activeIndex
    };

    const handleInputChange = (index) => {
        setActiveIndex(index);
    };
    const updatedOrderData = {
        ...orderData, // Spread the existing properties of orderData
        ...newElement // Add the new property
    };
    const router = useRouter();
    const handleOrder = async () => {

        let url_api = BASE_URL_API + "website/TourInfo/saveOrderTourOpen"
        let fd = new FormData()
        fd.append('adult_number', updatedOrderData.adult_number);
        fd.append('tour_open_id', updatedOrderData.tour_open_id);
        fd.append('telephone', updatedOrderData.telephone);
        fd.append('customer_email', updatedOrderData.customer_email);
        fd.append('customer_name', updatedOrderData.customer_name);
        fd.append('payment_method', updatedOrderData.payment_method);
        fd.append('data_child', JSON.stringify(updatedOrderData.data_child));
        fd.append('tour_open_id', updatedOrderData.tour_open_id);

        console.log('JSON.stringify(updatedOrderData.data_child)',JSON.stringify(updatedOrderData.data_child))

        if (activeIndex == null) {
            Toast.fire({
                title: "Vui lòng chọn phương thức thanh toán",
                icon: "error"
            })
            return false
        }

        axios.post(url_api, fd, {
            headers: {
                "X-API-KEY": "api_key",
            }
        }).then(async function (response) {


            console.log('response', response)
            Toast.fire({
                title: "Tạo đơn hàng thành công",
                icon: "success"
            })
            router.push('/');

            // }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        props.fetchAddCartDetail(1)
    }, [])
    console.log('orderData');
    console.log(orderData);
    console.log('updatedOrderData');
    console.log(updatedOrderData);
    return(
        <Container  className="mt-3 mb-4">
            <span className="tour_detail_title">Thanh Toán</span>
            <div className="mt-3">
                <span className="text-700">Các hình thức thanh toán</span>
                <Row className="mt-2">
                    <Col xl={8} className="mb-4">
                        <Row className="mt-2">
                            {payment_method_list ? (payment_method_list.map((item,index) => (
                                <Col lg={2} xs={6} key={index}>
                                    <div className={`payments d-flex flex-column align-items-center ${index === activeIndex ? 'active' : ''}`}>
                                        <div className="icon-payment">
                                            <img src={item.img}  alt="tienmat"/>
                                        </div>
                                        <span>{item.name}</span>
                                        <input name="ckb" type="radio" className="momo-payment" value={item.id} checked={index === activeIndex} onChange={() => handleInputChange(index)} onClick={(e) => setPaymentMethod(e.target.value)}/>
                                    </div>
                                </Col>
                            ))) : ''}

                        </Row>
                        <div className="mt-4">
              <span className="text-700">
                Điều khoản bắt buộc khi đăng ký online
              </span>
                            <div className="term_content mt-3">
                                <div className="mb-3"><strong>Chính sách hủy</strong><p>Từ ngày chuyển khoản
                                    thanh toán đến trước 8 ngày khởi hành chịu phí 20% tổng đơn hàng.</p>
                                    <p>Từ 7 đến trước 2 ngày khởi hành chịu phí 50% tổng đơn hàng.</p>
                                    <p>Trước ngày khởi hành 1 ngày chịu phí 100% tổng đơn hàng.</p>
                                    <p>Hủy ngay ngày khởi hành, không tham gia tour chịu phí hủy 100% tổng đơn
                                        hàng.</p>
                                    <p>** Nếu chuyến đi bị hủy do thiên tai,thời tiết, điều kiện bất khả kháng
                                        sẽ hoàn 100%</p>
                                    <p>&nbsp;</p>
                                    <p>Balotour với tư cách là đại lý du lịch đặt các dịch vụ như vé máy bay,
                                        tour du lịch…nếu lịch trình có thay đổi và điều chỉnh thời gian do tình
                                        hình thời tiết, thiên tai, nội chiến, điều kiện hàng không… thì chúng
                                        tôi cam kết sẽ cố gắng giải quyết mọi trường hợp chậm trễ không theo
                                        lịch trình dự kiến cho quý khách hàng nhưng không có trách nhiệm bồi
                                        thường.</p></div>
                                <div className="mb-3"><strong>Chính sách thanh toán</strong><p>Sau khi đăng ký
                                    tour, Quý khách đặt cọc 50%.</p>
                                    <p>Phần còn lại vui lòng thanh toán trước 07 ngày khởi hành.</p>
                                    <p>Quý khách đăng ký tour trong vòng 7 ngày so với ngày khởi hành, vui lòng
                                        thanh toán toàn bộ tiền tour.</p></div>
                                <div className="mb-3"><strong>Chính sách trẻ em</strong><p>Miễn phí cho trẻ em 4
                                    tuổi, trẻ em từ 5 đến 7 tuổi tính 75% giá của người lớn, còn từ 8 tuổi trở
                                    lên thì tính theo giá của người lớn.</p></div>

                            </div>
                            <Form>
                                <Form.Check
                                    inline
                                    label="Tôi đồng ý với các điều kiện trên"
                                    name="group1"
                                    type="checkbox"
                                    id="checkbox1"
                                    className="text-primary"
                                    onChange={() => setAgree(!agree)}
                                />
                            </Form>
                        </div>
                    </Col>

                    <Col xl={4}>
                        <div>
                            <PaymentSidebar orderData={orderData}/>
                            <div>
                                <Button className="w-100 btn-danger py-2 mt-3" onClick={handleOrder} >THANH TOÁN NGAY</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
        )

}
const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
    getToCart: state.getToCart,
    userInfo: state.userInfo,
    addCartDetailInfo: state.addCartDetailInfo,
    setupAddressDetailInfo:state.setupAddressDetailInfo,
    orderDataInfo: state.orderDataInfo,
});

export default connect(mapStateToProps, actions)(PaymentMethod);