import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";


function InfoDetail(data) {
    console.log('data')
    console.log(data.data)

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
                            {data.data ? data.data.time_takeoff_start : ''}
                        </div>
                        <div>
                            {data.data ? data.data.date_start_tour : ''}
                        </div>
                        <div>
                            {data.data ? data.data.city_start : ''}
                        </div>

                        <div>
                            {data.data && data.data.data_guide.map((item, index) => {
                                return (
                                    <span key={index}>
                                        {item.guide_name + ' '}
                                    </span>
                                );
                            })}
                        </div>

                        <div>
                            {data.data && data.data.data_car.map((item, index) => {
                                return (

                                    <div key={index}>

                                        {item}

                                    </div>
                                );
                            })}

                        </div>
                        <div></div>

                    </Col>
                    {data.data && data.data.airline_start_name && (
                        <div className={'start_flight'}>
                            <div className={'d-flex justify-content-between'}>
                                <div className={'col-start'}>
                                    <img className={'airline_start_img'} src={data.data.airline_start_img} alt=""/>
                                    <div >{data.data.time_takeoff_start}</div>
                                </div>
                                <div className={'col-center'}>
                                    <div>Ngày đi {data.data.date_start_flight}</div>
                                </div>
                                <div className={'col-end'}>
                                    <div>
                                        <div>{data.data.airline_start_name}</div>
                                        <div>{data.data.time_landing_start}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                    {data.data && data.data.airline_end_name && (
                        <div className={'airline_end'}>
                            <div>Ngày về {data.data.date_end_flight}</div>
                            <div className={'d-flex justify-content-between'}>
                                <div className={'landing_start'}>
                                    <div className={'airline_end_name'}>{data.data.airline_end_name}</div>
                                    <div className={'time_landing_start'}>{data.data.time_takeoff_end}</div>
                                </div>
                                <div>
                                    <img src={data.data.airline_end_img} className={'airline_end_img'} alt=""/>
                                </div>
                                <div className={'landing_end'}>
                                    <div className={'airline_end_name'}>{data.data.airline_end_name}</div>
                                    <div className={'time_landing_end'}>{data.data.time_landing_end}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </Row>

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(InfoDetail);