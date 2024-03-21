import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import Link from "next/link";
import {fetchCitybyLocationEpic} from "../../../redux/actions";

function InfoDetail(props) {
    let country_list = props.countryListInfo.data && props.countryListInfo.isLoading === false ? props.countryListInfo.data : '';
    let city_list = props.cityByLocationInfo.data && props.cityByLocationInfo.isLoading === false ? props.cityByLocationInfo.data : '';
    useEffect(() => {
        props.fetchCountryListBalotour()
        props.fetchCitybyLocation('', '', 1)
    }, [])
    console.log('country_list', country_list)
    console.log('city_list', city_list)
    return (
        <div>

            <div className={'bg-white'}>
                <Container className={'pt-4'}>
                    <Row className={'px-2'}>
                        <Col sm={6} className={'d-flex justify-content-center'}>
                            <div className="card tour_inboud">

                                <h2 className="title text-uppercase">tour trong nước</h2>
                                <div className="tour_inboud-card-body  ">
                                    <Row>
                                        {city_list && city_list.slice(0, 18).map((item, index) =>
                                            (<Col md={4} className={'text-center my-2'}>
                                                <Link href={'./Category?country=1&city=' + item.id}>
                                                    {item.city_name}
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>

                                </div>

                            </div>
                        </Col>
                        <Col sm={6} className={'d-flex justify-content-center'}>
                            <div className="card tour_outbound">

                                <h2 className="title text-uppercase">Tour nước ngoài</h2>
                                <div className="tour_inboud-card-body  ">
                                    <Row>
                                        {country_list && country_list.slice(1, 19).map((item, index) => (
                                            <Col md={4} className={'text-center my-2'}>
                                                <Link href={'./Category?country=' + item.id}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>

                                </div>

                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    countryListInfo: state.countryListInfo,
    cityByLocationInfo: state.cityByLocationInfo
});
export default connect(mapStateToProps, actions)(InfoDetail);