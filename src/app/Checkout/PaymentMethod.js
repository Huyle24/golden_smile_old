'use client'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FaMailBulk, FaPhoneAlt} from "react-icons/fa";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {setOrderData} from "../../../redux/actions";
import {BASE_URL_API} from "../../../redux/actions/type";
import axios from "axios";
import Swal from "sweetalert2";
import InfoDetail from "@/app/OrderTour/InfoDetail"
import PaymentSidebar from "@/app/Checkout/PaymentSidebar";
import {useRouter} from "next/navigation";
import Card from "react-bootstrap/Card"
import {compileString} from "sass";

function PaymentMethod(props) {
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
    const [numCards, setNumCards] = useState(1);
    const [formData, setFormData] = useState([]);
    const [dataCustomer, setdataCustomer] = useState({});
    const [dataListCustomer, setDataListCustomer] = useState({});
    const [newOrderId, setOrderId]=useState();
    const [errors, setErrors] = useState({});
    let payment_method_list = props.addCartDetailInfo.data && props.addCartDetailInfo.isLoading == false ? props.addCartDetailInfo.data.payment_method_list : '';
    let country_list = props.countryListInfo.data && props.countryListInfo.isLoading === false ? props.countryListInfo.data : '';
    const orderData = props.orderDataInfo.orderData;
    const newElement = {
        payment_method: activeIndex
    };

    const handleInputChange = (index) => {
        setActiveIndex(index);
    };
    const updatedOrderData = {
        ...orderData,
        ...newElement
    };
    const addCard = () => {
        setNumCards(prevNumCards => prevNumCards + 1);
        setFormData(prevFormData => [...prevFormData, {}]);
    };
    const removeCard = (index) => {
        setNumCards(prevNumCards => prevNumCards - 1);
        const newFormData = [...formData];
        newFormData.splice(index, 1);
        setFormData(newFormData);
    };

    const handleInput = (e, field) => {
        const value = e.target.value;
        const newDataCustomer = {...dataCustomer};
        newDataCustomer[field] = value;
        setdataCustomer(newDataCustomer);
        // Validate field
        const newErrors = {...errors};
        if (!value.trim()) {
            newErrors[field] = 'Vui lòng nhập giá trị';
        } else {
            delete newErrors[field];
        }
        setErrors(newErrors);
    };
    console.log('dataCustomer', dataCustomer)
    const handleChange = (e, index, field) => {
        const value = e.target.value;
        const newFormData = [...formData];
        newFormData[index] = {...newFormData[index], [field]: value};
        setFormData(newFormData);
    };
    console.log('formData', formData)
    useEffect(() => {
        const newDataCustomer = {...dataCustomer};
        newDataCustomer.tour_open_id = orderData?orderData.tour_open_id:'';
        newDataCustomer.customer_arr = [...formData];
        setDataListCustomer(newDataCustomer);

    }, [formData, dataCustomer]);
    useEffect(() => {
        props.fetchCountryListBalotour()
    }, []);
    console.log('dataListCustomer', dataListCustomer)
    const renderCards = () => {
        let cards = [];
        for (let i = 0; i < numCards; i++) {
            cards.push(
                <Card key={i} className={'card-customer-info-list mt-3'}>
                    <Card.Header>
                        <div className={'d-flex justify-content-between'}><span>Khách hàng {i + 1}</span>
                            <span className={'text-danger '} onClick={() => removeCard(i)}><i
                                className='bx bx-minus-circle icon-delete-customer-card'></i></span></div>

                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Form.Group as={Col} xl={4} controlId={`fullname-${i}`}>
                                <Form.Label>Họ tên</Form.Label>
                                <Form.Control type="text" required onChange={(e) => handleChange(e, i, 'fullname')}/>
                            </Form.Group>
                            <Form.Group as={Col} xl={2} controlId={`sex-${i}`}>
                                <Form.Label> Giới tính</Form.Label>
                                <Form.Select aria-label="Giới tính" onChange={(e) => handleChange(e, i, 'sex')}>
                                    <option value="">--Giới tính--</option>
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} xl={3} controlId={`birthday-${i}`}>
                                <Form.Label>Ngày sinh </Form.Label>
                                <Form.Control type="date" required onChange={(e) => handleChange(e, i, 'birthday')}/>
                            </Form.Group>
                            <Form.Group as={Col} xl={3} controlId={`country_id-${i}`}>
                                <Form.Label>Quốc tịch </Form.Label>
                                <Form.Select aria-label="Quốc tịch"
                                             onChange={(e) => handleChange(e, i, 'country_id')}>
                                    <option value="">---Tất cả---</option>
                                    {country_list&&country_list.map((item,index)=> (

                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Col xl={4}>
                                <Form.Group className="mb-3" controlId={`email-${i}`}>
                                    <Form.Label> Email</Form.Label>
                                    <Form.Control type="email"  onChange={(e) => handleChange(e, i, 'email')}/>

                                </Form.Group>
                            </Col>
                            <Col xl={4}>
                                <Form.Group className="mb-3" controlId={`telephone-${i}`}>
                                    <Form.Label> Số điện thoại

                                    </Form.Label>
                                    <Form.Control type="number"
                                                  onChange={(e) => handleChange(e, i, 'telephone')}/>

                                </Form.Group>
                            </Col>
                            <Col xl={4}>
                                <Form.Label>Loại giấy tờ</Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => handleChange(e, i, 'type_identification')}>
                                    <option value="" selected="">Chọn loại giấy tờ</option>
                                    <option value={1}>CMND/CCCD</option>
                                    <option value={2}>Hộ chiếu</option>
                                    <option value={3}>Visa</option>
                                    <option value={4}>Gplx</option>

                                </Form.Select>
                            </Col>
                            <Col xl={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail"
                                            onChange={(e) => handleChange(e, i, 'cmnd')}>
                                    <Form.Label> Số giấy tờ</Form.Label>
                                    <Form.Control type="number"/>
                                </Form.Group>
                            </Col>
                            <Col xl={4}>
                                <Form.Label>Ngày cấp</Form.Label>
                                <Form.Control
                                    type="date"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    className="mb-3"
                                    onChange={(e) => handleChange(e, i, 'date_start_cmnd')}
                                />
                            </Col>
                            <Col xl={4}>
                                <Form.Label>Ngày hết hạn</Form.Label>
                                <Form.Control
                                    type="date"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    className="mb-3"
                                    onChange={(e) => handleChange(e, i, 'date_end_cmnd')}
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            );
        }
        return cards;
    };
    const router = useRouter();

    let user_token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    console.log('user_token', user_token);

    let USER_TOKEN1 = user_token ? user_token.substring(1, user_token.length - 1) : '';
    const handleOrder = async () => {
        let url_api = BASE_URL_API + "website/TourInfo/saveOrderTourOpen";
        let fd = new FormData();
        fd.append('adult_number', updatedOrderData.adult_number);
        fd.append('tour_open_id', updatedOrderData.tour_open_id);
        fd.append('telephone', updatedOrderData.telephone);
        fd.append('customer_email', updatedOrderData.customer_email);
        fd.append('customer_name', updatedOrderData.customer_name);
        fd.append('payment_method', updatedOrderData.payment_method);
        fd.append('data_child', JSON.stringify(updatedOrderData.data_child));
        fd.append('tour_open_id', updatedOrderData.tour_open_id);

        console.log('JSON.stringify(updatedOrderData.data_child)', JSON.stringify(updatedOrderData.data_child));

        if (activeIndex == null) {
            Toast.fire({
                title: "Vui lòng chọn phương thức thanh toán",
                icon: "error"
            });
            return false;
        }

        if (agree == false) {
            Toast.fire({
                title: "Bạn chưa đồng ý điều khoản bắt buộc",
                icon: "error"
            });
            return false;
        }

        try {
            const response = await axios.post(url_api, fd, {
                headers: {
                    "X-API-KEY": "api_key",

                }
            });

            console.log('First API response', response);
            Toast.fire({
                title: "Tạo đơn hàng thành công",
                icon: "success"
            });

            let dataListCustomerUpdated={...dataListCustomer}


            dataListCustomerUpdated.order_id=response.data.data.order_id;
            setDataListCustomer(dataListCustomerUpdated)

            console.log('dataListCustomerUpdated', dataListCustomerUpdated.customer_arr)

            // Gọi API thứ hai ở đây
            const second_url_api = BASE_URL_API + "website/TourInfo/saveGroupList";
            const second_fd = new FormData();
            // Thiết lập dữ liệu cho API thứ hai nếu cần
            second_fd.append('data_customer', JSON.stringify( dataListCustomerUpdated));


            const second_response = await axios.post(second_url_api, second_fd, {
                headers: {
                    "X-API-KEY": "api_key",
                    'USER-TOKEN': USER_TOKEN1
                }
            });
            console.log('Second API response', second_response);

            // Xử lý phản hồi của API thứ hai
            router.push(`./ThankYou?order_id=${response.data.data.order_id}`);
        } catch (error) {
            console.log('API error', error);
        }
    };

    useEffect(() => {
        props.fetchAddCartDetail(1)
    }, [])
    console.log('orderData');
    console.log(orderData);
    console.log('updatedOrderData');
    console.log(updatedOrderData);
    return (
        <Container className="mt-3 mb-4">
            {/*<span className="tour_detail_title">Thanh Toán</span>*/}
            <div className="mt-3">
                <span className={'label-payment-method-page'}>Các hình thức thanh toán</span>
                <Row className="mt-2">
                    <Col xl={8} className="mb-4">
                        <Row>
                            {payment_method_list ? (payment_method_list.map((item, index) => (
                                <Col md={6}>
                                    <Card className={`payments mt-2 p-0 ${index === activeIndex ? 'active' : ''}`}>
                                        <Card.Body>
                                            <div
                                                className={'d-flex justify-content-between align-items-center flex-wrap'}>
                                                <span className={'d-flex  align-items-center flex-wrap'}><input
                                                    name="ckb" type="radio" className="momo-payment me-2"
                                                    value={item.id}
                                                    checked={index === activeIndex}
                                                    onChange={() => handleInputChange(index)}
                                                    onClick={(e) => setPaymentMethod(e.target.value)}/> {item.name}</span>
                                                <img src={item.img} className={'logo-payment'} alt="tienmat"/>
                                            </div>


                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))) : ''}
                        </Row>
                        <div className="mt-4">
                            <span
                                className={'label-payment-method-page'}>Thông tin danh sách đoàn</span>
                            <div>

                                <Form>
                                    <Row>
                                        <Col xl={6}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label> Điểm đón </Form.Label>
                                                <Form.Control type="text" required
                                                              isInvalid={!!errors['placeStart']}
                                                              onChange={(e) => handleInput(e, 'place_start')}/>

                                            </Form.Group>
                                        </Col>
                                        <Col xl={6}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Điểm trả </Form.Label>
                                                <Form.Control type="text" required
                                                              isInvalid={!!errors['place_end']}
                                                              onChange={(e) => handleInput(e, 'place_end')}/>
                                            </Form.Group>
                                        </Col>
                                        <Col xl={6}>
                                            <Form.Label>Thời gian đón</Form.Label>

                                            <Form.Control
                                                type="time"
                                                id="inputPassword5"
                                                aria-describedby="passwordHelpBlock"
                                                className="mb-3"
                                                required
                                                isInvalid={!!errors['time_start_group']}
                                                onChange={(e) => handleInput(e, 'time_start_group')}
                                            />
                                        </Col>

                                    </Row>
                                    <div className={'info-age-customer px-3'}>
                                        <Row>
                                            <Col xl={6}>
                                                <div>
                                                    Người lớn sinh từ: 21/03/1951 đến 21/03/2009
                                                </div>
                                                <div>
                                                    Trẻ em sinh từ: 22/03/2009 đến 21/03/2016
                                                </div>
                                            </Col>
                                            <Col xl={6}>
                                                <div>
                                                    Trẻ nhỏ sinh từ: 22/03/2016 đến 21/03/2019
                                                </div>
                                                <div>
                                                    Em bé sinh từ: 22/03/2019 đến 16/03/2021
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                </Form>

                                <div>
                                    {renderCards()}
                                    <div className={'d-flex justify-content-center'}>
                                        <button className={'button-add-customer btn mt-3 '}
                                                onClick={addCard}>Thêm khách hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                                <span
                                    className={'label-payment-method-page'}> Điều khoản bắt buộc khi đăng ký online</span>
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
                                    <Button className="w-100 btn-danger py-2 mt-3"  onClick={handleOrder}>THANH
                                        TOÁN
                                        NGAY</Button>

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
    setupAddressDetailInfo: state.setupAddressDetailInfo,
    orderDataInfo: state.orderDataInfo,
    countryListInfo: state.countryListInfo,
});

export default connect(mapStateToProps, actions)(PaymentMethod);