import { Col, Container, Row, Table,Button } from "react-bootstrap";
import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import * as GlobalJs from "../../../js/global";
import {GET_TOKEN} from "../../../redux/actions/type";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";

function InfoDetail(props){
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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let timeline_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';
    let tour_program = props.tourDetailInfoW3.data && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data.tour_program : '';
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
    function createMarkup(c) {
        return {__html: c};
    }
    return (
        <div className="sticky-top">
            {timeline_detail_info ? [timeline_detail_info].map((item,idx) => (
                <div key={idx} className="info_fight mt-2">
                    <div className="detail-title"><h4 className="title_page_detail">Chi tiết gói đã chọn</h4>
                        <div className="d-flex justify-content-between mb-3">
                            <div className="color-text fw-bold">Giá tour</div>
                            <div className="text-danger fw-bold">{GlobalJs.format_currency(item ? item.price : '')} VND / Khách</div>
                        </div>
                    </div>
                    <Col lg={12} className="info_content">
                        <div className="mt-2">
                            <span className="title_page_detail">Thông tin chuyến bay</span>
                            <Row>
                                <Col lg={12} className="mt-2 border-bottom border-success">
                                    <span>Ngày đi <span className="card_title_tour">28/08/2023</span></span>
                                    <div className="d-flex justify-content-between align-item-center">
                                        <span className="d-flex flex-column align-items-center">{item.city_start_name}<span>(SGN)</span></span>
                                        <img src="https://media.travel.com.vn/ImageAirlines/logo_VIETJETAIR.png" className="flight-logo mx-1"/>
                                        <span  className="d-flex flex-column align-items-center">{item.city_end_name}<span>(DYG)</span></span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>16:05</span>
                                        <span>20:30</span>
                                    </div>
                                    <div className="p-line">
                                        <span><img data-cfsrc="/Content/Theme/images/go.png" alt="image" src="https://travel.com.vn/Content/Theme/images/go.png"/></span>
                                        <span><img data-cfsrc="/Content/Theme/images/p.png" alt="image" src="https://travel.com.vn/Content/Theme/images/p.png"/></span>
                                        <span><img data-cfsrc="/Content/Theme/images/to.png" alt="image" src="https://travel.com.vn/Content/Theme/images/to.png"/></span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <span>Ký hiệu chuyến bay</span>
                                        <span className="color-text fw-bold mt-2 mb-2">VJ2552</span>
                                    </div>
                                </Col>

                                <Col lg={12} className="mt-2 border-bottom border-success">
                                    <span>Ngày về <span className="card_title_tour">28/08/2023</span></span>
                                    <div className="d-flex justify-content-between align-item-center">
                                        <span className="d-flex flex-column align-items-center">{item.city_end_name}<span>(SGN)</span></span>
                                        <img src="https://media.travel.com.vn/ImageAirlines/logo_VIETJETAIR.png" className="flight-logo mx-1"/>
                                        <span  className="d-flex flex-column align-items-center">{item.city_start_name}<span>(DYG)</span></span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>16:05</span>
                                        <span>20:30</span>
                                    </div>
                                    <div className="p-line">
                                        <span><img data-cfsrc="/Content/Theme/images/go.png" alt="image" src="https://travel.com.vn/Content/Theme/images/go.png"/></span>
                                        <span><img data-cfsrc="/Content/Theme/images/p.png" alt="image" src="https://travel.com.vn/Content/Theme/images/p.png"/></span>
                                        <span><img data-cfsrc="/Content/Theme/images/to.png" alt="image" src="https://travel.com.vn/Content/Theme/images/to.png"/></span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <span>Ký hiệu chuyến bay</span>
                                        <span className="card_title_tour mt-2">VJ2552</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="card_title_tour">Thông tin tập trung</span>
                                        <div className="d-flex justify-content-between">
                                            <span>Ngày giờ tập trung</span>
                                            <div className="d-flex flex-column text-end">
                                                <span>12:25</span>
                                                <span>28/08/2023</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Nơi tập trung</span>
                                            <span>Sân bay</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                        </div>
                        <div className="info_price mt-2 border-bottom border-success">
                            <span className="title_page_detail mt-2">Giá tour & phụ thu phòng đơn</span>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Loại Khách</th>
                                    <th>Giá tour</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Người lớn (Từ 12 tuổi trở lên)</td>
                                    <td>{item.price} đ</td>
                                </tr>
                                <tr>
                                    <td>Trẻ em (Từ 2 tuổi đến dưới 12 tuổi)</td>
                                    <td>{item.price_child} đ</td>
                                </tr>
                                <tr>
                                    <td>Em bé (Dưới 2 tuổi)</td>
                                    <td>4,947,000 đ</td>
                                </tr>
                                <tr>
                                    <td>Phụ thu phòng đơn</td>
                                    <td>0 đ</td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="info_tour_guide mt-2">
                            <span className="title_page_detail">Thông tin hướng dẫn viên</span>
                            <div className="d-flex flex-column">
                                <span>HDV dẫn đoàn</span>
                                <span>Đang cập nhật</span>
                            </div>
                            <div className="d-flex flex-column mt-4">
                                <span>HDV tiễn</span>
                                <span>Đang cập nhật</span>
                            </div>
                        </div>
                    </Col>
                    <div className="show-module">
                        <Button className="bg-danger border-0" onClick={handleShow}>
                            Xem chi tiết và đặt dịch vụ
                        </Button>
                    </div>
                    <Modal show={show} onHide={handleClose} animation={false} size="lg" >
                            <Modal.Header closeButton className="">
                                <Modal.Title className="text-danger">THÔNG TIN CHI TIẾT</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <h4 className="text-success">{item.name}</h4>
                                    <h5 className="text-success">Hãng bay: VietJet</h5>
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-bold">Ngày đi: 23/08/2023</span>
                                        <span className="fw-bold">Điểm đi: {item.city_start_name}</span>
                                        <span className="fw-bold">Thời gian: 20h30</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="fw-bold">Ngày về: 25/08/2023</span>
                                        <span className="fw-bold">Điểm đi: {item.city_end_name}</span>
                                        <span className="fw-bold">Thời gian: 06h50</span>
                                    </div>
                                </div>
                                {tour_program ? tour_program.map((item,index) => (
                                    <div key={index}>
                                        <h4 className="text-success mt-2">Lịch trình</h4>
                                        {item ? <div dangerouslySetInnerHTML={createMarkup(item.content)}></div> : ''}
                                    </div>
                                )) : []}
                                <div>
                                    <h4 className="text-success">Bao gồm</h4>
                                    {item ? <div dangerouslySetInnerHTML={createMarkup(item.include_content)}></div> : ''}
                                </div>
                                <div>
                                    <h4 className="text-success">Không bao gồm</h4>
                                    {item ? <div dangerouslySetInnerHTML={createMarkup(item.not_include_content)}></div> : ''}
                                </div>
                                <div>
                                    <h4 className="text-success">Lưu ý</h4>
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
                                <div className="text-end fw-bold">Thành tiền: <span className="text-danger fw-bold fs-4">{GlobalJs.format_currency(item.price)}đ</span></div>
                            </Modal.Body>
                            {/*<div className='d-flex justify-content-end p-3 me-3'>*/}
                            {/*    <span>Thành tiền: {item.price}đ</span>*/}
                            {/*</div>*/}
                            <Modal.Footer className='justify-content-center'>
                                <Link href='/CartBackup'>
                                    <Button variant="danger" onClick={() => add_to_cart(item)}>
                                        ĐẶT NGAY
                                    </Button>
                                </Link>
                            </Modal.Footer>

                    </Modal>

                </div>

            )) : []}
        </div>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(InfoDetail);