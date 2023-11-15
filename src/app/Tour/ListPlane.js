import {Container, Row, Col, Form} from "react-bootstrap";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import {AccordionPaymentData} from '../../app/data'
import {useState} from "react";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
function ListPlane(props){
    let list_plane_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';

    function createMarkup(c) {
        return {__html: c};
    }
    const [selected, setSelected] = useState('yes');

    const handleChange = event => {
        // console.log(event.target.value);
        setSelected(event.target.value);
    };
    return (
        <Container>
            <Form>
                {list_plane_detail_info ? ([list_plane_detail_info].map((item,index) =>(
                    <Row key={index}>
                        <Col lg="4">
                            <Form.Check type="radio" id="VJT" value="yes" checked={selected === 'yes'} onChange={handleChange}>
                                <Form.Check.Input type="radio" isValid name="group1" checked={selected === 'yes'} onChange={handleChange} value="yes"/>
                                <Form.Check.Label className="fw-bold color_blue">
                                    {item.name}
                                    <p className="mb-0">Hãng bay: VietJet</p>
                                </Form.Check.Label>

                                <Form.Control.Feedback type="valid" className="fw-bold fs-6 color_blue">
                                    Thành tiền: {item.price}đ / Khách
                                </Form.Control.Feedback>
                            </Form.Check>
                        </Col>
                        <Col lg="4">
                            <Form.Check type="radio" id="VNA" value="no" onChange={handleChange} checked={selected === 'no'}>
                                <Form.Check.Input type="radio" isValid name="group1"  onChange={handleChange} checked={selected === 'no'} value="no"/>
                                <Form.Check.Label className="fw-bold color_blue">{item.name}
                                    <p className="mb-0">Hãng bay: VietNamAirline</p></Form.Check.Label>
                                <Form.Control.Feedback type="valid" className="fw-bold fs-6 color_blue">
                                    Thành tiền: {item.price}đ / Khách
                                </Form.Control.Feedback>
                            </Form.Check>
                        </Col>
                        <Col lg="4">
                            <Form.Check type="radio" id="BAM" value="maybe" onChange={handleChange} checked={selected === 'maybe'}>
                                <Form.Check.Input type="radio" isValid name="group1"  onChange={handleChange} checked={selected === 'maybe'} value="maybe"/>
                                <Form.Check.Label className="fw-bold color_blue">{item.name}
                                    <p className="mb-0">Hãng bay: BamBoo</p>
                                </Form.Check.Label>
                                <Form.Control.Feedback type="valid" className="fw-bold fs-6 color_blue">
                                    Thành tiền: {item.price}đ / Khách
                                </Form.Control.Feedback>
                            </Form.Check>
                        </Col>

                    </Row>

                ))) : ''}
            </Form>
        </Container>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(ListPlane);