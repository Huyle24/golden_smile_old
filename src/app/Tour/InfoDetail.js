import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";


function InfoDetail(data) {
    // console.log('data')
    // console.log(data.data)

    function createMarkup(c) {
        return {__html: c};
    }

    return (
        <div className="col-overview p-2 tour-info ">
            <div className={'tour-info-header'}>
                CHI TIẾT TOUR
            </div>
            <div className={'p-1 tour-info-body'}>
                <Row>
                    <Col md={6}>
                        <div>Giờ khởi hành:</div>
                        <div>Ngày khởi hành:</div>
                        <div>Địa điểm khởi hành:</div>
                        <div>Hướng dẫn viên:</div>
                        <div>Xe:</div>
                        <div>Máy bay:</div>
                    </Col>
                    <Col md={6}>
                        <div>
                            {data.data ?data.data.time_start:''}
                        </div>
                        <div>
                            {data.data ?data.data.date_start_tour:''}
                        </div>
                        <div>
                            TP. Hồ Chí Minh
                        </div>
                        <div>
                            {data.data && data.data.guide.map((item, index) => {
                                return (
                                    <span key={index}>
                                        {item.guide_name + ' '}
                                    </span>
                                );
                            })}
                        </div>
                        <div>   {data.data && data.data.vehicles.map((item, index) => {
                            return (

                                <div key={index}>

                                    {item}

                                </div>
                            );
                        })}

                        </div>

                    </Col>
                </Row>

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(InfoDetail);