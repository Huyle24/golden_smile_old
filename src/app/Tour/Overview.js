import { Button, Col, Container, Row } from "react-bootstrap";
import {FaCalendarAlt,FaCarAlt,FaPhoneAlt,FaMailBulk,FaFlag,FaCar,FaMapMarkedAlt,FaHamburger,FaBuilding,FaRegClock,FaUserFriends,FaTicketAlt} from 'react-icons/fa'
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
function Overview(props){
    let overview_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';

    return (
        <div >
            {overview_detail_info ? [overview_detail_info].map((item,idx) => (
            <div className=" info_fight_content " key={idx}>
                <div>
                    <div className="">
                        <div className="d-flex flex-column">
                            <span className="mb-2 color-text fw-bold">Ngày khởi hành :<span className="text-primary">27/08/2023 - Giờ đi: 16:05</span></span>
                            <span className="mb-2 color-text fw-bold">Giờ tập trung :<span className="text-primary">12:25 ngày 27/08/2023</span></span>
                            <span className="mb-2 color-text fw-bold">Ngày về :<span className="text-success">27/08/2023 - Giờ đi: 16:05</span></span>
                            <span className="mb-2 color-text fw-bold border-bottom border-secondary ">Thời gian :<span className="text-primary text-lowercase">{item.date_type_name}</span></span>
                            {/*<span className="mb-2">Số chỗ còn nhận <span>9</span></span>*/}
                            <span className="mb-2 color-text fw-bold">Đã bán :<span className="text-danger size_number"> 20</span><span className="size_number">/40</span></span>
                            <span className="mb-2 color-text fw-bold">Giữ chỗ :<span className="text-success size_number"> 10</span></span>
                            <span className="mb-2 color-text fw-bold">Còn lại :<span className="text-primary size_number"> 10</span></span>

                        </div>
                    </div>
                </div>
                    <Row>
                        <Col md={6} xs={6} className="d-flex flex-column  mb-3">
                         <FaCar className="icon_detail_tour text-primary"/>
                         <span className="color-text fw-bold">Phương tiện di chuyển</span>
                         <span>Máy bay, xe du lịch</span>
                        </Col>

                        <Col md={6} xs={6} className="d-flex flex-column  ">
                         <FaHamburger className="icon_detail_tour text-primary"/>
                         <span className="color-text fw-bold">Ẩm thực</span>
                         <span>Buffet sáng, Theo thực đơn</span>
                        </Col>
                        <Col md={6} xs={6} className="d-flex flex-column mt-3">
                         <FaBuilding className="icon_detail_tour text-primary"/>
                         <span className="color-text fw-bold">Khách sạn</span>
                         <span>khách sạn 3 sao</span>
                        </Col>
                        <Col md={6} xs={6} className="d-flex flex-column  mt-3">
                         <FaRegClock className="icon_detail_tour text-primary"/>
                         <span className="color-text fw-bold">Thời gian lý tưởng</span>
                         <span>Quanh năm</span>
                        </Col>
                        <Col md={6} xs={6} className="d-flex flex-column  mt-3">
                         <FaUserFriends className="icon_detail_tour text-primary"/>
                         <span className="color-text fw-bold">Đối tượng thích hợp</span>
                         <span>Cặp đôi, Gia đình nhiều thế hệ, Thanh niên</span>
                        </Col>
                        <Col md={6} xs={6} className="d-flex flex-column  mt-3">
                         <FaTicketAlt className="icon_detail_tour text-primary"/>
                         <span className="color-text fw-bold">Ưu đãi</span>
                         <span>Ưu đãi trực tiếp vào giá tour</span>
                        </Col>
                        <Col md={12} className="d-flex flex-column mt-3">
                            <FaMapMarkedAlt className="icon_detail_tour text-primary"/>
                            <span className="color-text fw-bold">Điểm tham quan</span>
                            <span>Châu á 5 điểm,Nhật Bản, Tokyo, Nagoya, Kyoto, Osaka, Điểm đến du lịch cho du khách mang đến 1 sự trải nghiệm tuyệt vời</span>
                        </Col>
                    </Row>
            </div>
            )) : []}
        </div>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(Overview);