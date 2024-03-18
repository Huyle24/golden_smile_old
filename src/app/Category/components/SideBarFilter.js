import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import {connect} from "react-redux";
import * as actions from "../../../../redux/actions";
import {fetchDateTypeList, fetchListTypeTourism} from "../../../../redux/actions";

function SidaBarFilter(props) {
    let country_list = props.countryListInfo.data && props.countryListInfo.isLoading === false ? props.countryListInfo.data : '';
    let type_tourism_list = props.fetchListTypeTourismInfo.data && props.fetchListTypeTourismInfo.isLoading === false ? props.fetchListTypeTourismInfo.data : '';
    let date_type_list = props.fetchDateTypeInfo.data && props.fetchDateTypeInfo.isLoading === false ? props.fetchDateTypeInfo.data : '';

    const [formatTour, setFormatTour] = useState('')
    const [typeTourism, setTypeTourism] = useState('')
    const [countryStart, setCountryStart] = useState('')
    const [countryEnd, setCountryEnd] = useState('')
    const [dateType, setDateType] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const handleFormatTour = (event) => {
        setFormatTour(event.target.value);

    }
    const handleTypeTourism = (event) => {
        setTypeTourism(event.target.value)
    }
    const handleCountryStart = (event) => {
        setCountryStart(event.target.value)
    }
    const handleCountryEnd = (event) => {
        setCountryEnd(event.target.value)
    }
    const handleDateType = (event) => {
        setDateType(event.target.value)
    }
    const handleDateStart=(event)=>{
        setDateStart(event.target.value)
    }
    const handleDateEnd=(event)=>{
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
    }, [])

    return (
        <Col lg="3" className="ps-0">
            <Card className="border border-0 bg-secondary-subtle">
                <Card.Title className="p-3 fillter">Tìm kiếm</Card.Title>
                <Form className="px-3 py-4">
                    <Card.Text className="title-filter mb-2">Hình thức</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={handleFormatTour}>
                        <option>---Tất cả---</option>
                        <option value="1">Inbound</option>
                        <option value="2">Outbound</option>


                        <option value="3">Nội địa</option>
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Loại hình tour</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={handleTypeTourism}>
                        <option>---Tất cả---</option>
                        {type_tourism_list && type_tourism_list.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}

                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Quốc gia</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={handleCountryStart}>
                        <option>---Tất cả---</option>
                        {country_list && country_list.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Điểm đến</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={handleCountryEnd}>
                        <option>---Tất cả---</option>
                        {country_list && country_list.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </Form.Select>
                    <Card.Text className="title-filter mb-2">Số ngày của tour</Card.Text>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={handleDateType}>
                        <option>---Tất cả---</option>
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
    fetchDateTypeInfo: state.fetchDateTypeInfo

});
export default connect(mapStateToProps, actions)(SidaBarFilter);