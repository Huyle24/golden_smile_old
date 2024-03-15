import {Button, Form} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {CiLocationOn, CiTimer} from "react-icons/ci";
import {BsPeople} from "react-icons/bs";
import {MdOutlineShoppingCart, MdOutlineShoppingCartCheckout} from "react-icons/md";
import {FaDownload, FaPhone} from "react-icons/fa6";
import {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {GET_TOKEN} from "../../../redux/actions/type";
import {useSearchParams} from 'next/navigation'
import {fetchTourDetailW3} from "../../../redux/actions";
import Link from "next/link";
import TimeLine2 from "@/app/Tour/TimeLine";
import InfoDetail from "@/app/Tour/InfoDetail";
import {log} from "qrcode/lib/core/galois-field";


function Overview(props) {

    const searchParams = useSearchParams()

    const permalink = searchParams.get('permalink');
    const tour_type = searchParams.get('tour_type');

    let overview_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';
    console.log('overview_detail_info')
    console.log(overview_detail_info)
    const [show, setShow] = useState(false);
    const [showContactModal, setContactModal] = useState(false);
    const [tourOpenChoose, setTourOpenChoose] = useState(overview_detail_info ? overview_detail_info.tour_open_list[0] : "")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Them class active cho the span
    const [selectedDate, setSelectedDate] = useState(overview_detail_info ? overview_detail_info.tour_open_list[0] : "");
    const add_to_cart = async (item) => {
        let token = await GET_TOKEN();
        if (token) {
            props.addToCartAction(item);
        } else {
            Toast.fire({
                title: "Chưa đăng nhập tài khoản",
                icon: "error"
            })
            router.push('/Auth/Login/');
        }

    };
    const handleChooseDate = (item) => {
        setTourOpenChoose(item)
        setSelectedDate(item);
    }
    console.log('tourOpenChoose',tourOpenChoose.id)
    useEffect(() => {
        props.fetchTourDetailW3(permalink, tour_type)
    }, []);
    useEffect(() => {
        setTourOpenChoose(overview_detail_info ? overview_detail_info.tour_open_list[0] : "");
        setSelectedDate(overview_detail_info ? overview_detail_info.tour_open_list[0] : "");

    }, [overview_detail_info]);
    const handleShowContactModal = () => setContactModal(true);
    const handleCloseContactModal = () => setContactModal(false);

    // console.log(tourOpenChoose)
    return (
        <>
            <div className={'p-3  tour-detail'}>
                <div className="tour-detail-name mt-0">
                    {overview_detail_info ? overview_detail_info.name : ''}
                </div>
                <div>
                <span className={'code-tour'}>
                        {tourOpenChoose ? tourOpenChoose.code : overview_detail_info ? overview_detail_info.tour_open_list[0].code : ""}

                </span>

                </div>
                <div className={'d-flex justify-content-between'}>
                    <div className={'d-flex align-items-center flex-wrap'}>
                        <CiLocationOn/>
                        <span className="ms-2">
                 {overview_detail_info ? overview_detail_info.city_start_name : ''} - {overview_detail_info ? overview_detail_info.city_end_name : ''}
                    </span>
                    </div>
                    <div className={'d-flex align-items-center flex-wrap'}>
                        <CiTimer className={'me-1'}/>
                        <span>{overview_detail_info ? overview_detail_info.date_type_name : ''} </span>
                    </div>
                    {overview_detail_info && overview_detail_info.tour_type == 2 && (
                        <div className={'d-flex align-items-center flex-wrap'}>
                            <BsPeople/>
                            <span>
                        <span className={'text-danger fw-bold ms-2 remain-seat'}>
                        {tourOpenChoose ? tourOpenChoose.count_order_tour : overview_detail_info ? overview_detail_info.tour_open_list[0].count_order_tour : ""}
                        </span>
                        /24
                    </span>
                        </div>)
                    }
                </div>
                <hr className={'hr-product-card'}/>
                <div>
                    <div className={'text-secondary'}> Chọn ngày khởi hành</div>
                    <div className={'d-flex flex-wrap gap-1 calendar-start'} style={{minHeight: 30}}>
                        {overview_detail_info && overview_detail_info.tour_type == 2 && overview_detail_info.tour_open_list && (
                            overview_detail_info.tour_open_list.map((item, index) => (
                                <span key={index}
                                      className={`px-2 py-1 item_day_tour fw-bold ${selectedDate && selectedDate.id === item.id ? 'active' : ''}`}
                                      onClick={() => handleChooseDate(item)}>{item.date_start_tour.slice(0, 5)}</span>
                            ))
                        )}
                    </div>
                </div>
                <div className={'text-secondary mb-0'}>
                    Giá bán 1 khách:
                </div>
                <div>
                <span className={'tour-detail-price me-5'}>
             {tourOpenChoose ? tourOpenChoose.price_1_person : overview_detail_info ? overview_detail_info.tour_open_list[0].price_1_person : ""} đ
                </span>
                    <span className={'tour-detail-remain-reservation-container'}>
                  <span className={'text-danger fw-bold me-1'}>
                   {tourOpenChoose ? tourOpenChoose.remain_seat : overview_detail_info ? overview_detail_info.tour_open_list[0].remain_seat : ""}
                  </span>
                  <span>
                      chỗ còn lại
                  </span>
                </span>

                </div>
                <div>
                    <button className={'btn tour-detail-add-to-card me-2'}
                            onClick={() => add_to_cart(overview_detail_info)}>
                        <MdOutlineShoppingCart/> Thêm vào giỏ hàng
                    </button>
                    <Link
                        href={'/OrderTour?tour_open_id=' + (tourOpenChoose ? tourOpenChoose.id :  overview_detail_info?  overview_detail_info.tour_open_list[0].id:'')}>
                        <button className={'btn tour-detail-order-now'} onClick={handleShow}>
                            <MdOutlineShoppingCartCheckout/> Đặt tour ngay
                        </button>
                    </Link>

                </div>
                <hr className={'hr-product-card'}/>
                <div className={'mb-0'}>
                    <button className={'btn tour-detail-contact-btn me-2'} onClick={handleShowContactModal}>
                        <FaPhone className={'icon me-2'}/> Liên hệ
                    </button>
                    <Button variant="primary" className={'tour-detail-download-schedule-btn'}>
                        <FaDownload className={'icon me-2'}/> Tải chương trình tour
                    </Button>

                </div>

                {/*<Modal show={show} onHide={handleClose} animation={false} size="lg" className={'modal-tour-confirm'}*/}
                {/*       centered>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title className={'text-danger text-center'}>THÔNG TIN CHI TIẾT </Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>*/}

                {/*        <div className={'modal-tour-confirm-tour-name'}>*/}
                {/*            CHECK OUT {overview_detail_info ? overview_detail_info.name : ''}*/}
                {/*        </div>*/}
                {/*        <div className={'modal-tour-confirm-tour-title'}> Loại xe: 45 cho</div>*/}
                {/*        <div className={'d-flex justify-content-between'}>*/}
                {/*            <span>Ngày đi: 20/11/2022</span>*/}
                {/*            <span>Điểm đi: 20/11/2022</span>*/}
                {/*            <span>Thời gian: 3:20</span>*/}
                {/*        </div>*/}
                {/*        <div className={'d-flex justify-content-between'}>*/}
                {/*            <span>Ngày về: 20/11/2022</span>*/}
                {/*            <span>Điểm về: 20/11/2022</span>*/}
                {/*            <span>Thời gian: 3:20</span>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <div className={'modal-tour-confirm-tour-title'}>Bao gồm</div>*/}
                {/*            <div>*/}

                {/*                Xe vận chuyển đời mới*/}
                {/*                Lưu trú 1 đêm khách sạn tại trung tâm thành phố*/}
                {/*                Ăn uống 5 bữa ăn*/}
                {/*                HDV nhiệt tình, nón, nước, khăn lạnh theo chỉ tiêu ngày*/}
                {/*                Vé tham quan các điểm, chèo ghe xuồng tại KDL*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <div className={'modal-tour-confirm-tour-title'}>Không bao gồm</div>*/}
                {/*            <div>*/}
                {/*                Phí VAT*/}
                {/*                Chi phí phát sinh ngoài chương trình du lịch*/}
                {/*                Phí xe điện tại làng hoa Sa Đéc*/}
                {/*                Chi phí cá nhân, vui chơi giải trí*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <div className={'modal-tour-confirm-tour-title'}> Chính sách</div>*/}
                {/*            <div>*/}
                {/*                <div style={{fontWeight: 500}}>*/}
                {/*                    Chính sách trẻ em*/}
                {/*                </div>*/}
                {/*                <div> Hành lý gọn nhẹ, trang phục không bắt buộc, nhưng đến những nơi tôn nghiêm như*/}
                {/*                    đình, chùa, miếu cần ăn mặt lịch sự. Giấy tờ tùy thân cần mang theo lúc đi tour :*/}
                {/*                    CMND, passport, hoặc các giấy tờ tùy thân khác có giá trị thay thế để đang ký lưu*/}
                {/*                    trú khi nghỉ tại khách sạn trong chương trình.*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <div style={{fontWeight: 500}}>*/}
                {/*                    Thủ tục ViSA*/}
                {/*                </div>*/}
                {/*                <div>*/}

                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*    </Modal.Body>*/}
                {/*    <Modal.Footer className={'justify-content-center d-flex'}>*/}
                {/*        <Link*/}
                {/*            href={'/OrderTour?tour_open_id=' + (overview_detail_info ? overview_detail_info.tour_open_list[0].id : '')}>*/}
                {/*            <Button variant="danger">*/}
                {/*                ĐẶT NGAY*/}
                {/*            </Button>*/}
                {/*        </Link>*/}

                {/*    </Modal.Footer>*/}
                {/*</Modal>*/}
                {/*<Modal show={showContactModal} onHide={handleCloseContactModal} animation={false} size="md" centered>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title className="text-primary">GỬI THÔNG TIN TƯ VẤN</Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>*/}
                {/*        <span className='color-text'>Quý khách vui lòng nhập thông tin bên dưới, Nhanhtravel sẽ liên hệ lại sau ít phút.</span>*/}
                {/*        <Form>*/}
                {/*            <div className="mt-2">*/}
                {/*                <Form.Label htmlFor="inputPassword5" className="color-text">Họ và tên *</Form.Label>*/}
                {/*                <Form.Control*/}
                {/*                    type="text"*/}
                {/*                    id="inputPassword5"*/}
                {/*                    aria-describedby="passwordHelpBlock"*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            <div className="mt-2">*/}
                {/*                <Form.Label htmlFor="phone" className="color-text">Điện thoại *</Form.Label>*/}
                {/*                <Form.Control*/}
                {/*                    type="phone"*/}
                {/*                    id="phone"*/}
                {/*                    aria-describedby="passwordHelpBlock"*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            <div className="mt-2">*/}
                {/*                <Form.Label htmlFor="email" className="color-text">Email *</Form.Label>*/}
                {/*                <Form.Control*/}
                {/*                    type="email"*/}
                {/*                    id="email"*/}
                {/*                    aria-describedby="passwordHelpBlock"*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            <div className="mt-2">*/}
                {/*                <Form.Label className="color-text">Thông tin cần tư vấn</Form.Label>*/}
                {/*                <Form.Control as="textarea" rows={3}/>*/}
                {/*            </div>*/}


                {/*        </Form>*/}
                {/*    </Modal.Body>*/}

                {/*    <Modal.Footer className='justify-content-center'>*/}
                {/*        <Button variant="primary">*/}
                {/*            Gửi Ngay*/}
                {/*        </Button>*/}
                {/*    </Modal.Footer>*/}
                {/*</Modal>*/}
            </div>
            <div className={'mt-3'}>
                <InfoDetail data={...tourOpenChoose}/>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(Overview);