import { Col, Container, Row } from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import OverviewBooking from "@/app/CartBackup/OverviewBooking";
import OverviewRight from "@/app/CartBackup/OverviewRight";

function ProductBooking(props){
    const searchParams = useSearchParams();
    let listCartItem = props ? props.getToCart : '';
    useEffect(() => {
        props.fetchTourDetailW3(searchParams.get('id'))
    },[searchParams.get('id')])
    useEffect(()=> {
       props.getToCartAction();
    },[])

    const [listCart, setListCart] = useState([])
    console.log(props)
    useEffect(()=> {
        setListCart(listCartItem)
    },[listCartItem])
    let timeline_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';
    return (
        <Container >
            {listCart ? (listCart.map((item,idx) => (
                <Row className="mt-4" key={idx}>
                    <Col lg={8}>
                        <Row>
                            <Col lg="4" className="pe-0">
                                <img src={item.image ? item.image[0] : ''} className="w-100 rounded-1 h-100 object-fit-cover" alt="tour"/>
                            </Col>
                            <Col lg="8" className="px-3 py-2 bg-color">
                                <div className="d-flex align-items-center mb-3">
                                    <span className="tag_point me-2">9</span>
                                    <span className="color-text fw-bold me-2">Rất tốt</span>
                                    <span>358 quan tâm</span>
                                </div>
                                <span className="tour_detail_title">{item.name}</span>
                                <div className="mt-3">
                                    Mã tour <span className="color-text fw-bold">{item.code}</span>
                                </div>
                                <div className="mt-2">
                                    Khởi hành <span className="color-text fw-bold">28/08/2023</span>
                                </div>
                                <div className="mt-2">
                                    Thời gian <span className="color-text fw-bold">{item.date_type_name}</span>
                                </div>
                                <div className="mt-2">
                                    Nơi khởi hành <span className="color-text fw-bold">{item.city_start_name}</span>
                                </div>
                                <div className="mt-2">
                                    Số chỗ còn nhận  <span className="color-text fw-bold">9</span>
                                </div>
                                <div className="mt-2">
                                    Dịch vụ tùy chọn  <span className="color-text fw-bold">Bay hàng không Tway Air - 4 đêm khách sạn 3 sao đia phương</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <OverviewRight />
                    </Col>
                </Row>
                ))) : ''}

        </Container>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
    getToCart: state.getToCart,
});
export default connect(mapStateToProps, actions)(ProductBooking);