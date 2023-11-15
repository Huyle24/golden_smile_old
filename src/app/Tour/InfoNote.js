import { Container, Row, Col } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import {FaAngleDown} from "react-icons/fa"
export default function InfoNote(data){
    function createMarkup(c) {
        return {__html: c};
    }
    return (
        <Container >
            <span className="title_page_detail d-flex justify-content-center mt-4 mb-3">Những thông tin cần lưu ý</span>
            {/*<Row>*/}
            {/*    <Col lg={6} className="mb-2">*/}
            {/*        <article className="note_item">*/}
            {/*            <span className="d-flex justify-content-between align-items-center title_page_detail">Giá Tour bao gồm<FaAngleDown/></span>*/}
            {/*            <div>*/}
            {/*                <span className="d-none">Đặc biệt, Nhanhtravel tặng cho tất cả du khách (đến dưới 80 tuổi) phí Bảo hiểm du lịch với mức bồi thường tối đa lên đến 460.000.000 VND cho nhân mạng và lên đến 30.000.000 VND cho hành lý.</span>*/}
            {/*            </div>*/}
            {/*        </article>*/}
            {/*    </Col>*/}
            {/*    <Col lg={6}>*/}
            {/*        <article className="note_item">*/}
            {/*            <span className="d-flex justify-content-between align-items-center title_page_detail">Giá Tour bao gồm<FaAngleDown/></span>*/}
            {/*            <div>*/}
            {/*                <span className="d-none">Đặc biệt, Nhanhtravel tặng cho tất cả du khách (đến dưới 80 tuổi) phí Bảo hiểm du lịch với mức bồi thường tối đa lên đến 460.000.000 VND cho nhân mạng và lên đến 30.000.000 VND cho hành lý.</span>*/}
            {/*            </div>*/}
            {/*        </article>*/}
            {/*    </Col>*/}
            {/*    <Col lg={6} className="mb-2">*/}
            {/*        <article className="note_item">*/}
            {/*            <span className="d-flex justify-content-between align-items-center title_page_detail">Giá Tour bao gồm<FaAngleDown/></span>*/}
            {/*            <div>*/}
            {/*                <span className="d-none">Đặc biệt, Nhanhtravel tặng cho tất cả du khách (đến dưới 80 tuổi) phí Bảo hiểm du lịch với mức bồi thường tối đa lên đến 460.000.000 VND cho nhân mạng và lên đến 30.000.000 VND cho hành lý.</span>*/}
            {/*            </div>*/}
            {/*        </article>*/}
            {/*    </Col>*/}
            {/*    <Col lg={6}>*/}
            {/*        <article className="note_item">*/}
            {/*            <span className="d-flex justify-content-between align-items-center title_page_detail">Giá Tour bao gồm<FaAngleDown/></span>*/}
            {/*            <div>*/}
            {/*                <span className="d-none">Đặc biệt, Nhanhtravel tặng cho tất cả du khách (đến dưới 80 tuổi) phí Bảo hiểm du lịch với mức bồi thường tối đa lên đến 460.000.000 VND cho nhân mạng và lên đến 30.000.000 VND cho hành lý.</span>*/}
            {/*            </div>*/}
            {/*        </article>*/}
            {/*    </Col>*/}
            {/*</Row>*/}

                    <Accordion >
                        {[data.data].map((item,index)=>(
                            <Row key={index}>
                                <Col lg="6" className="mt-3">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Giá tour bao gồm</Accordion.Header>
                                        <Accordion.Body>
                                            {item.include_content && <div dangerouslySetInnerHTML={createMarkup(item.include_content)}></div>}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Col>
                                <Col lg="6" className="mt-3">
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Lưu ý khi chuyển/hủy tour</Accordion.Header>
                                        <Accordion.Body>
                                            {item.policy_cancel_content && <div dangerouslySetInnerHTML={createMarkup(item.policy_cancel_content)}></div>}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Col>

                                <Col lg="6" className="mt-3">
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Giá tour không bao gồm</Accordion.Header>
                                        <Accordion.Body>
                                            {item.not_include_content && <div dangerouslySetInnerHTML={createMarkup(item.not_include_content)}></div>}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Col><Col lg="6" className="mt-3">
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Chính sách</Accordion.Header>
                                    <Accordion.Body>
                                        {item.not_include_content && <div dangerouslySetInnerHTML={createMarkup(item.not_include_content)}></div>}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Col>

                            </Row>
                        ))}


                    </Accordion>

        </Container>
    )
}