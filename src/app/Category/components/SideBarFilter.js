import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import {connect} from "react-redux";
import * as actions from "../../../../redux/actions";

import {useSearchParams} from 'next/navigation'
import {fetchCitybyLocation} from "../../../../redux/actions";

function SidaBarFilter(props) {

    const searchParams = useSearchParams()
    const formatTourParam = searchParams.get('formatTour');
    const countryParam = searchParams.get('country');
    const cityParam = searchParams.get('city');
    const dateStartParam = searchParams.get('dateStart');
    const typeTourismParam = searchParams.get('type_tourism_id');
    let country_list = props.countryListInfo.data && props.countryListInfo.isLoading === false ? props.countryListInfo.data : '';
    let type_tourism_list = props.fetchListTypeTourismInfo.data && props.fetchListTypeTourismInfo.isLoading === false ? props.fetchListTypeTourismInfo.data : '';
    let date_type_list = props.fetchDateTypeInfo.data && props.fetchDateTypeInfo.isLoading === false ? props.fetchDateTypeInfo.data : '';
    let city_list = props.cityByLocationInfo.data && props.cityByLocationInfo.isLoading === false ? props.cityByLocationInfo.data : '';


    const [formatTour, setFormatTour] = useState(formatTourParam ? formatTourParam : '')
    const [typeTourism, setTypeTourism] = useState(typeTourismParam?typeTourismParam:'')
    const [countryStart, setCountryStart] = useState(countryParam ? countryParam : '')
    const [cityStart, setCityStart] = useState(cityParam ? cityParam : '')
    const [countryEnd, setCountryEnd] = useState('')
    const [dateType, setDateType] = useState('')
    const [dateStart, setDateStart] = useState(dateStartParam?dateStartParam:'')
    const [dateEnd, setDateEnd] = useState('')
    const handleFormatTour = (event) => {
        setFormatTour(event.target.value);

    }
    const handleTypeTourism = (event) => {
        setTypeTourism(event.target.value)
    }
    const handleCountryStart = (event) => {
        setCountryStart(event.target.value)
        props.fetchCitybyLocation('', '', event.target.value)
    }
    const handleCityStart = (event) => {
        setCityStart(event.target.value)
    }
    const handleCountryEnd = (event) => {
        setCountryEnd(event.target.value)
    }
    const handleDateType = (event) => {
        setDateType(event.target.value)
    }
    const handleDateStart = (event) => {
        setDateStart(event.target.value)
    }
    const handleDateEnd = (event) => {
        setDateEnd(event.target.value)
    }

    console.log('formatTour:', formatTour);
    console.log('typeTourism:', typeTourism);
    console.log('countryStart:', countryStart);
    console.log('countryEnd:', countryEnd);
    console.log('dateType:', dateType);
    console.log('dateStart:', dateStart);
    console.log('dateEnd:', dateEnd);

    useEffect(() => {
        props.fetchCountryListBalotour()
        props.fetchListTypeTourism()
        props.fetchDateTypeList()
        props.fetchCitybyLocation('', '', 1)

    }, [])

    // const updateFilterValues = () => {
    //     const newFilterValues = {
    //         formatTour: formatTour,
    //         typeTourism: typeTourism,
    //         countryStart: countryStart,
    //         countryEnd: countryEnd,
    //         dateType: dateType,
    //         dateStart: dateStart,
    //         dateEnd: dateEnd
    //     };
    //     props.updateFilterValues(newFilterValues);
    // };

    const newFilterValues = {
        formatTour: formatTour,
        typeTourism: typeTourism,
        countryStart: countryStart,
        cityStart: cityStart,
        countryEnd: countryEnd,
        dateType: dateType,
        dateStart: dateStart,
        dateEnd: dateEnd
    };
    console.log('newFilterValues', newFilterValues)
    useEffect(() => {
        props.updateFilterValues(newFilterValues);
    }, [formatTour, typeTourism, countryStart, cityStart, countryEnd, dateType, dateStart, dateEnd]); // This useEffect will run whenever any of these values change

    return (
        <Col lg="3" className="ps-0">
            <Card className=" filter-sidebar ">
                <Card.Title className="p-3 fillter">Tìm kiếm</Card.Title>
                <Form className="px-3 py-4">
                    <Card.Text className="title-filter mb-2">Hình thức</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={handleFormatTour}>
                        <option value="">---Tất cả---</option>
                        <option selected={formatTourParam == 0} value="0">Inbound</option>
                        <option selected={formatTourParam == 1} value="1">Outbound</option>
                        <option selected={formatTourParam == 2} value="2">Nội địa</option>
                    </Form.Select>

                    <Card.Text className="title-filter mb-2">Loại hình tour</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={handleTypeTourism}>
                        <option value="">---Tất cả---</option>
                        {type_tourism_list && type_tourism_list.map((item, index) => (
                            <option key={index} value={item.id} selected={typeTourismParam ==item.id } >{item.name}</option>
                        ))}

                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Quốc gia </Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={handleCountryStart}>
                        <option value="">---Tất cả---</option>
                        {country_list && country_list.map((item, index) => (
                            <option key={index} value={item.id} selected={countryParam == item.id}>{item.name}</option>
                        ))}
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Tỉnh thành</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={handleCityStart}>
                        <option value="">---Tất cả---</option>
                        {city_list && city_list.map((item, index) => (
                            <option key={index} value={item.id}
                                    selected={cityParam == item.id}>{item.city_name}</option>
                        ))}
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Điểm đến</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={handleCountryEnd}>
                        <option value="">---Tất cả---</option>
                        {country_list && country_list.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Số ngày của tour</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={handleDateType}>
                        <option value="">---Tất cả---</option>
                        {date_type_list && date_type_list.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Ngày đi</Card.Text>
                    <Form.Control
                        type="date"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        className="mb-3"
                        value={dateStart?dateStart:""}
                        onChange={handleDateStart}
                    />
                    <Card.Text className="title-filter mb-2">Ngày về</Card.Text>
                    <Form.Control
                        type="date"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        className="mb-3"
                        onChange={handleDateEnd}
                    />
                    {/*<Card.Text className="title-filter mb-2">SỐ NGƯỜI</Card.Text>*/}
                    {/*<Row className="g-2 mb-3">*/}
                    {/*    <Col lg="6">*/}
                    {/*        <Button className='w-100 bg-white border text-black'>1 người</Button>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg="6">*/}
                    {/*        <Button className='w-100 bg-white border text-black'>2 người</Button>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg="6">*/}
                    {/*        <Button className='w-100 bg-white border text-black'>3-5 người</Button>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg="6">*/}
                    {/*        <Button className='w-100 bg-white border text-black'>5+ người</Button>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}

                    {/*<Card.Text className="title-filter mb-2">Ngân sách của quý khách</Card.Text>*/}
                    {/*<Form.Range min={0} max={20000000}/>*/}
                    {/*<Card.Text className="bg-white">2000000đ-20000000đ</Card.Text>*/}

                </Form>

            </Card>
        </Col>
    )
}

const mapStateToProps = state => ({

    countryListInfo: state.countryListInfo,
    fetchListTypeTourismInfo: state.fetchListTypeTourismInfo,
    fetchDateTypeInfo: state.fetchDateTypeInfo,
    updateFilterValuesInfo: state.updateFilterValuesInfo,
    cityByLocationInfo: state.cityByLocationInfo
});
export default connect(mapStateToProps, actions)(SidaBarFilter);