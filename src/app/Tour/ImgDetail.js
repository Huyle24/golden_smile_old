import {Col, Container, Form, Row} from "react-bootstrap";
import {FreeMode, Navigation, Thumbs} from "swiper/modules";

import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import Overview from "@/app/Tour/Overview";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {fetchTourDetailW3, updateTourOpenChoose} from "../../../redux/actions";
import {log} from "qrcode/lib/core/galois-field";
import TimeLine2 from "@/app/Tour/TimeLine2";
import InfoDetail from "@/app/Tour/InfoDetail";
import {useSearchParams} from "next/navigation";
import {GET_TOKEN} from "../../../redux/actions/type";
import {CiLocationOn, CiTimer} from "react-icons/ci";
import {BsPeople} from "react-icons/bs";
import Link from "next/link";
import {MdOutlineShoppingCartCheckout} from "react-icons/md";
import {FaDownload, FaPhone} from "react-icons/fa6";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import moment from 'moment';

function ImgDetail(props) {

    const searchParams = useSearchParams()
    const permalink = searchParams.get('permalink');
    const tour_type = searchParams.get('tour_type');

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0 (0 là tháng 1)
    const currentYear = currentDate.getFullYear();

    let overview_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';
    let image_detail_info = props.tourDetailInfoW3.data && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data.tour_image_list : '';

    const [selectedDate, setSelectedDate] = useState(overview_detail_info ? moment(overview_detail_info.tour_open_list[0].date_start_tour, 'DD/MM/YYYY').toDate() : "");
    const [selectDate, setSelectDate] = useState(() => {
        const initialDate = overview_detail_info && overview_detail_info.tour_open_list[0].date_start_tour;
        const parsedDate = moment(initialDate, 'DD/MM/YYYY').toDate();
        return parsedDate;
    });
    const [startDate, setStartDate] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [show, setShow] = useState(false);
    const [showContactModal, setContactModal] = useState(false);
    const [tourOpenChoose, setTourOpenChoose] = useState(overview_detail_info ? overview_detail_info.tour_open_list[0] : "")
    const [monthChoose, setMonthChoose] = useState(currentMonth);
    const [yearChoose, setYearChoose] = useState(currentYear);

    const years = [...Array(6)].map((_, index) => currentYear + index);
    const filteredList = yearChoose && overview_detail_info ?
        overview_detail_info.tour_open_list.filter((item) => parseInt(item.date_start_tour.slice(-4)) == yearChoose) :
        (overview_detail_info && overview_detail_info.tour_open_list);
    const filteredList_month = monthChoose && filteredList ?
        filteredList.filter((item) => parseInt(item.date_start_tour.split("/")[1]) == monthChoose) : (filteredList);

    console.log('monthChoose', monthChoose);
    console.log('yearChoose', yearChoose)
    const handleDateChange = (date) => {
        setSelectDate(date);
    };

    const handleMonthChange = (e) => {
        setMonthChoose(e.target.value)
    }
    const handleYearChange = (e) => {
        setYearChoose(e.target.value)
    }
    const filterDate = (date) => {
        if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
            console.error('Invalid date format:', date);
            return false; // Or handle invalid dates gracefully (e.g., display an error message)
        }

        return overview_detail_info && overview_detail_info.tour_open_list.some(
            (item) => moment(item.date_start_tour, 'DD/MM/YYYY').isSame(date, 'day')
        );
    };

    const selectableDates = overview_detail_info && overview_detail_info.tour_open_list.map(
        (item) => moment(item.date_start_tour, 'DD/MM/YYYY').toDate()
    );
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Them class active cho the span
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
    const handleShowContactModal = () => setContactModal(true);
    const handleCloseContactModal = () => setContactModal(false);
    console.log('tourOpenChoose', tourOpenChoose.id)

    useEffect(() => {
        props.fetchTourDetailW3(permalink, tour_type)
    }, [searchParams]);
    useEffect(() => {
        setTourOpenChoose(overview_detail_info ? overview_detail_info.tour_open_list[0] : "");
        setSelectedDate(overview_detail_info ? overview_detail_info.tour_open_list[0] : "");

    }, [overview_detail_info]);

    useEffect(() => {
        updateTourOpenChoose(tourOpenChoose)
    }, [tourOpenChoose]);

    return (

        <Container className="mt-3 imgDetail mb-5">
            <Row>
                <Col xl={6}>
                    <div className="listImgTourDetail">
                        <Swiper spaceBetween={10} navigation={true} thumbs={{swiper: thumbsSwiper}}
                                modules={[FreeMode, Navigation, Thumbs]} className="mySwiper2">
                            {
                                image_detail_info && image_detail_info.length > 0 ? (
                                    image_detail_info.map((item, index) => (
                                        <SwiperSlide key={index} className="swiper-slide-tour">
                                            <img
                                                src={item.bucket_img ? item.bucket_img : "https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png"}
                                                alt="and"/>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide className="swiper-slide-tour">
                                        <img

                                            src={"https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png"}
                                            alt="and"/>
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>
                        <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={"auto"} freeMode={true}
                                watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper1 pt-2">
                            {
                                image_detail_info && image_detail_info.length > 0 ? (
                                    image_detail_info.map((item, index) => (
                                        <SwiperSlide key={index} className="swiper-slide-tour">
                                            <img
                                                src={item.bucket_img ? item.bucket_img : "https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png"}
                                                alt="and"/>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide className="swiper-slide-tour">
                                        <img
                                            src={"https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png"}
                                            alt="and"/>
                                    </SwiperSlide>
                                )
                            }

                        </Swiper>
                    </div>

                </Col>
                <Col xl={6} className={'zoom-80'}>
                    <div className={'p-3  tour-detail'}>
                        <div className="tour-detail-name mt-0">
                            {overview_detail_info ? overview_detail_info.name : ''}
                        </div>
                        <div>
                <span className={'code-tour'}>
                        {tourOpenChoose ? tourOpenChoose.code : overview_detail_info ? overview_detail_info.tour_open_list[0].code : ""}

                </span>

                        </div>
                        <div className={'d-flex justify-content-between flex-wrap'}>
                            <div className={'d-flex align-items-center flex-wrap'} style={{minWidth:'350px'}}>
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


                            <div>
                                {/*<DatePicker*/}
                                {/*    selected={selectDate}*/}
                                {/*    onChange={handleDateChange}*/}
                                {/*    filterDate={filterDate}*/}
                                {/*    showIcon*/}
                                {/*    icon={*/}
                                {/*        <svg*/}
                                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                                {/*            width="1em"*/}
                                {/*            height="1em"*/}
                                {/*            viewBox="0 0 48 48"*/}
                                {/*        >*/}
                                {/*            <mask id="ipSApplication0">*/}
                                {/*                <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">*/}
                                {/*                    <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>*/}
                                {/*                    <path*/}
                                {/*                        fill="#fff"*/}
                                {/*                        d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"*/}
                                {/*                    ></path>*/}
                                {/*                </g>*/}
                                {/*            </mask>*/}
                                {/*            <path*/}
                                {/*                fill="currentColor"*/}
                                {/*                d="M0 0h48v48H0z"*/}
                                {/*                mask="url(#ipSApplication0)"*/}
                                {/*            ></path>*/}
                                {/*        </svg>*/}
                                {/*    }*/}
                                {/*    style={{*/}
                                {/*        border: '1px solid #ccc',*/}
                                {/*        borderRadius: '4px',*/}
                                {/*        padding: '10px',*/}
                                {/*    }}*/}
                                {/*/>*/}
                                <Row>
                                    <Col sm={4}>
                                        <div className={'text-secondary'}>Chọn ngày khởi hành</div>
                                    </Col>

                                    <Col sm={8} className={'d-flex justify-content-end'}>
                                        <Form.Select aria-label="Default select example"
                                                     style={{width: '102px', height: '34px', marginRight: '5px'}}
                                                     onChange={(e) => handleMonthChange(e)}>
                                            <option value=''>Tháng</option>
                                            {[...Array(12)].map((_, index) => (
                                                <option
                                                    selected={monthChoose && monthChoose == (index + 1) ? ('selected') : ''}
                                                    key={index + 1} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Select aria-label="Default select example"
                                                     style={{width: '102px', height: '34px', marginRight: '5px'}}
                                                     onChange={(e) => handleYearChange(e)}>
                                            <option value=''> Năm</option>
                                            {years.map((year, index) => (
                                                <option selected={yearChoose && yearChoose == year ? ('selected') : ''}
                                                        value={year}>{year}</option>
                                            ))}
                                        </Form.Select>

                                    </Col>

                                </Row>
                            </div>
                            <div className={'d-flex flex-wrap gap-1 calendar-start'} style={{minHeight: 30}}>
                                {filteredList_month && filteredList_month.map((item, index) => (
                                    <span key={index}
                                          className={` item_day_tour fw-bold ${selectedDate && selectedDate.id === item.id ? 'active' : ''}`}
                                          onClick={() => handleChooseDate(item)}>{item.date_start_tour.slice(0, 5)}</span>
                                ))}
                            </div>
                        </div>
                        <div className={'text-secondary mb-0'}>
                            Giá bán 1 khách:
                            Giá bán 1 khách:
                        </div>
                        <div className={'d-flex align-items-center flex-wrap'}>
                <div className={'tour-detail-price me-lg-5 me-3'}>
             {tourOpenChoose ? tourOpenChoose.price_1_person : overview_detail_info ? overview_detail_info.tour_open_list[0].price_1_person : ""} đ
                </div>
                            <div className={'tour-detail-remain-reservation-container'}>
                  <span className={'text-danger fw-bold me-1'}>
                   {tourOpenChoose ? tourOpenChoose.remain_seat : overview_detail_info ? overview_detail_info.tour_open_list[0].remain_seat : ""}
                  </span>
                  <span>
                      chỗ còn lại
                  </span>
                </div>

                        </div>
                        <div className={'d-flex'}>
                            <button className={'btn tour-detail-add-to-card me-2'}
                                    onClick={() => add_to_cart(overview_detail_info)}>
                                <i className="bx bx-heart  fs-6 me-1"></i>
                                <span>Thêm vào yêu thích</span>
                            </button>
                            <Link
                                href={'/OrderTour?tour_open_id=' + (tourOpenChoose ? tourOpenChoose.id : overview_detail_info ? overview_detail_info.tour_open_list[0].id : '')}>
                                <button className={'btn tour-detail-order-now'} onClick={handleShow}>
                                    <MdOutlineShoppingCartCheckout className={'me-1'}/> Đặt tour ngay
                                </button>
                            </Link>

                        </div>
                        <hr className={'hr-product-card'}/>
                        <div className={'mb-0 d-flex'}>
                            <button className={'btn tour-detail-contact-btn me-2'} onClick={handleShowContactModal}>
                                <FaPhone className={'icon me-2'}/> Liên hệ
                            </button>

                            <Dropdown className={'mt-0'}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic"
                                                 className={'tour-detail-download-schedule-btn'}>
                                    <FaDownload className={'icon me-2'}/> Tải chương trình tour
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {overview_detail_info && overview_detail_info.link_files.map((item, index) => (
                                        <Dropdown.Item href={item.bucket_img}
                                                       target="_blank">{item.name}</Dropdown.Item>
                                    ))}

                                </Dropdown.Menu>
                            </Dropdown>
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
                        <Modal show={showContactModal} onHide={handleCloseContactModal} animation={false} size="md"
                               centered>
                            <Modal.Header closeButton>
                                <Modal.Title className="" style={{color: "#B72028"}}>Liên hệ tư vấn</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <div className="mt-2">
                                        <i className='bx bxs-phone'></i> Vui lòng liên hệ số <span
                                        className={'fw-bolder'}>028 7100 2828 </span> để
                                        được nhân viên tư vấn !
                                    </div>


                                </Form>
                            </Modal.Body>


                        </Modal>
                    </div>
                    {/*<Overview className={'col-overview'}/>*/}
                </Col>
                <Col xl={12}>
                    <TimeLine2 className={'mt-2'} data={...tourOpenChoose}/>
                </Col>
            </Row>

        </Container>

    );
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
    tourOpenChooseInfo: state.tourOpenChooseInfo
});
export default connect(mapStateToProps, actions)(ImgDetail);
