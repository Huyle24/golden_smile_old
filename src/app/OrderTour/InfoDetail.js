import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import { FaPlane } from "react-icons/fa";
import { TfiLineDashed } from "react-icons/tfi";

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
                                    <img className={'airline_start_img'} src={data.data.airline_start_img ?data.data.airline_start_img:"https://vigomanager.com/app-assets/mobile/img-huy/taking-off-plane-logo-2RC5DTJ.jpg" } alt=""/>
                                    <div className={'time'} >{data.data.time_takeoff_start}</div>
                                </div>
                                <div className={'col-center'}>
                                    <div><span className={'text-danger fw-bold'}> Ngày đi </span> {data.data.date_start_flight}</div>
                                    <div className={'d-flex justify-content-center align-items-center'} ><TfiLineDashed  className={'me-1'}/><TfiLineDashed  className={'me-1'}/>  <span className={'round-plane'} ><FaPlane   /></span><TfiLineDashed className={'ms-1'} /><TfiLineDashed className={'ms-1'} /> </div>
                                </div>
                                <div className={'col-end'}>
                                    <div>
                                        <div className={'code-plane-start'}>{data.data.code_start}</div>
                                        <div className={'time'}>{data.data.time_landing_start}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                    {data.data && data.data.airline_end_name && (
                        <div className={'airline_end'}>

                            <div className={'d-flex justify-content-between'}>
                                <div className={'col-start'}>
                                    <img className={'airline_end_img'} src={data.data.airline_end_img ?data.data.airline_end_img:"https://vigomanager.com/app-assets/mobile/img-huy/taking-off-plane-logo-2RC5DTJ.jpg"} alt=""/>
                                    <div className={'time'}>{data.data.time_landing_end}</div>
                                </div>
                                <div className={'col-center'}>
                                    <div><span
                                        className={'text-primary fw-bold'}> Ngày về </span> {data.data.date_end_flight}
                                    </div>
                                    <div className={'d-flex justify-content-center align-items-center'}><TfiLineDashed
                                        className={'me-1'}/><TfiLineDashed className={'me-1'}/> <span
                                        className={'round-plane'}><FaPlane className={'rotate-180'} /></span>  <TfiLineDashed
                                        className={'ms-1'}/><TfiLineDashed className={'ms-1'}/></div>
                                </div>
                                <div className={'col-end'}>
                                    <div>
                                        <div className={'code-plane-start'}>{data.data.code_end}</div>
                                        <div className={'time'}>{data.data.time_takeoff_end}</div>
                                    </div>
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