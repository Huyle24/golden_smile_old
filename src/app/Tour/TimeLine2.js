import {Button, Col, Container, Row, Table, Tabs} from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import InfoDetail from "@/app/Tour/InfoDetail";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import * as GlobalJs from "../../../js/global";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {TfiLineDashed} from "react-icons/tfi";
import {FaPlane} from "react-icons/fa";
import {Anchor, ConfigProvider} from "antd";


// Hàm để làm sạch HTML trước khi chèn vào DOM

function TimeLine(props) {
    const searchParams = useSearchParams();
    const data = props.data
    console.log('data', data)

    function createMarkup(c) {
        return {__html: c};
    }

    let timeline_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';
    let tour_program = props.tourDetailInfoW3.data && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data.tour_program : '';
    let policy_children = props.tourDetailInfoW3.data && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data.policy_children : '';
    let policy_cancel = props.tourDetailInfoW3.data && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data.policy_cancel : '';
    let policy_payment = props.tourDetailInfoW3.data && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data.policy_payment : '';
    let note = props.tourDetailInfoW3.data && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data.note : '';
    let policy_visa = props.tourDetailInfoW3.data && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data.policy_visa : '';
    return (
        <>
            {[timeline_detail_info].map((item, index) => (
                    <div className={'mt-4'}>
                        {/*<Tabs*/}
                        {/*    defaultActiveKey="tourdetail"*/}
                        {/*    id="uncontrolled-tab-example"*/}
                        {/*    className="tab_item" fill>*/}
                        {/*    <Tab eventKey="tourdetail" title="Chi tiết tour" className="highlight tab_item  tourdetail">*/}
                        {/*        <Row>*/}
                        {/*            <Col md={3}>*/}
                        {/*                <div className={'py-1'}>Giờ khởi hành:</div>*/}
                        {/*                <div className={'py-1'}>Ngày khởi hành:</div>*/}
                        {/*                <div className={'py-1'}>Địa điểm khởi hành:</div>*/}
                        {/*                <div className={'py-1'}>Hướng dẫn viên:</div>*/}
                        {/*                <div className={'py-1'}>Xe:</div>*/}

                        {/*            </Col>*/}
                        {/*            <Col md={3}>*/}
                        {/*                <div className={'py-1 min-height-div'}>*/}
                        {/*                    {data ? data.time_start : ''}*/}
                        {/*                </div>*/}
                        {/*                <div className={'py-1 min-height-div'}>*/}
                        {/*                    {data ? data.date_start_tour : ''}*/}
                        {/*                </div>*/}
                        {/*                <div className={'py-1 min-height-div'}>*/}
                        {/*                    TP. Hồ Chí Minh*/}
                        {/*                </div>*/}
                        {/*                <div className={'py-1 min-height-div'}>*/}
                        {/*                    {data && data.guide.map((item, index) => {*/}
                        {/*                        return (*/}
                        {/*                            <span key={index}>*/}
                        {/*                {item.guide_name + ' '}*/}
                        {/*            </span>*/}
                        {/*                        );*/}
                        {/*                    })}*/}
                        {/*                </div>*/}
                        {/*                <div*/}
                        {/*                    className={'py-1 min-height-div'}>   {data && data.vehicles.map((item, index) => {*/}
                        {/*                    return (*/}

                        {/*                        <div key={index}>*/}

                        {/*                            {item}*/}

                        {/*                        </div>*/}
                        {/*                    );*/}
                        {/*                })}*/}

                        {/*                </div>*/}

                        {/*            </Col>*/}
                        {/*            <Col md={6}>*/}
                        {/*                <div>Máy bay:</div>*/}
                        {/*                {data && data.airline_start_name && (*/}
                        {/*                    <div className={'start_flight'}>*/}
                        {/*                        <div className={'d-flex justify-content-between'}>*/}
                        {/*                            <div className={'col-start'}>*/}
                        {/*                                <img className={'airline_start_img'}*/}
                        {/*                                     src={data.airline_start_img ? data.airline_start_img : "https://vigomanager.com/app-assets/mobile/img-huy/taking-off-plane-logo-2RC5DTJ.jpg"}*/}
                        {/*                                     alt=""/>*/}
                        {/*                                <div className={'time'}>{data.time_takeoff_start}</div>*/}
                        {/*                            </div>*/}
                        {/*                            <div className={'col-center'}>*/}
                        {/*                                <div><span*/}
                        {/*                                    className={'text-danger fw-bold'}> Ngày đi </span> {data.date_start_flight}*/}
                        {/*                                </div>*/}
                        {/*                                <div className={'d-flex justify-content-center align-items-center'}>*/}
                        {/*                                    <TfiLineDashed className={'me-1'}/><TfiLineDashed*/}
                        {/*                                    className={'me-1'}/> <span*/}
                        {/*                                    className={'round-plane'}><FaPlane/></span><TfiLineDashed*/}
                        {/*                                    className={'ms-1'}/><TfiLineDashed className={'ms-1'}/></div>*/}
                        {/*                            </div>*/}
                        {/*                            <div className={'col-end'}>*/}
                        {/*                                <div>*/}
                        {/*                                    <div className={'code-plane-start'}>{data.code_start}</div>*/}
                        {/*                                    <div className={'time'}>{data.time_landing_start}</div>*/}
                        {/*                                </div>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}

                        {/*                )}*/}
                        {/*                {data && data.airline_end_name && (*/}
                        {/*                    <div className={'airline_end'}>*/}

                        {/*                        <div className={'d-flex justify-content-between'}>*/}
                        {/*                            <div className={'col-start'}>*/}
                        {/*                                <img className={'airline_end_img'}*/}
                        {/*                                     src={data.airline_end_img ? data.airline_end_img : "https://vigomanager.com/app-assets/mobile/img-huy/taking-off-plane-logo-2RC5DTJ.jpg"}*/}
                        {/*                                     alt=""/>*/}
                        {/*                                <div className={'time'}>{data.time_landing_end}</div>*/}
                        {/*                            </div>*/}
                        {/*                            <div className={'col-center'}>*/}
                        {/*                                <div><span*/}
                        {/*                                    className={'text-primary fw-bold'}> Ngày về </span> {data.date_end_flight}*/}
                        {/*                                </div>*/}
                        {/*                                <div className={'d-flex justify-content-center align-items-center'}>*/}
                        {/*                                    <TfiLineDashed*/}
                        {/*                                        className={'me-1'}/><TfiLineDashed className={'me-1'}/>*/}
                        {/*                                    <span*/}
                        {/*                                        className={'round-plane'}><FaPlane*/}
                        {/*                                        className={'rotate-180'}/></span> <TfiLineDashed*/}
                        {/*                                    className={'ms-1'}/><TfiLineDashed className={'ms-1'}/></div>*/}
                        {/*                            </div>*/}
                        {/*                            <div className={'col-end'}>*/}
                        {/*                                <div>*/}
                        {/*                                    <div className={'code-plane-start'}>{data.code_end}</div>*/}
                        {/*                                    <div className={'time'}>{data.time_takeoff_end}</div>*/}
                        {/*                                </div>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                )}*/}
                        {/*            </Col>*/}
                        {/*        </Row>*/}

                        {/*    </Tab>*/}
                        {/*    <Tab eventKey="gioithieu" title="Giới thiệu" className="highlight tab_item">*/}
                        {/*        <p className="title_page_detail">Điểm nhấn</p>*/}
                        {/*        <div className="" key={index}>*/}
                        {/*            {item ? <div dangerouslySetInnerHTML={createMarkup(item.content)}></div> : ''}*/}

                        {/*        </div>*/}
                        {/*    </Tab>*/}
                        {/*    <Tab eventKey="lictrinh" title="Lịch trình" className="highlight tab_item">*/}
                        {/*        {tour_program ? tour_program.map((item, index) => (*/}
                        {/*            <div key={index}>*/}
                        {/*                <div className="color_blue fw-bold">Ngày {index + 1}</div>*/}
                        {/*                {item ? <div dangerouslySetInnerHTML={createMarkup(item.content)}></div> : ''}*/}
                        {/*            </div>*/}
                        {/*        )) : []}*/}
                        {/*    </Tab>*/}
                        {/*    <Tab eventKey="policy" title="Chính sách - Thủ tục " className="highlight tab_item">*/}

                        {/*        {policy_children && (*/}
                        {/*            <div>*/}
                        {/*                <div className={'fw-bold'}>Chính sách trẻ em</div>*/}
                        {/*                <div dangerouslySetInnerHTML={createMarkup(policy_children)}></div>*/}
                        {/*            </div>*/}
                        {/*        )}*/}


                        {/*        {policy_cancel && (*/}
                        {/*            <div>*/}
                        {/*                <div className={'fw-bold'}> Chính sách hủy</div>*/}
                        {/*                <div dangerouslySetInnerHTML={createMarkup(policy_cancel)}></div>*/}
                        {/*            </div>*/}
                        {/*        )}*/}


                        {/*        {policy_payment && (*/}
                        {/*            <div>*/}
                        {/*                <div className={'fw-bold'}> Chính sách thanh toán</div>*/}
                        {/*                <div dangerouslySetInnerHTML={createMarkup(policy_payment)}></div>*/}
                        {/*            </div>*/}
                        {/*        )}*/}

                        {/*        {policy_visa && (*/}
                        {/*            <div>*/}
                        {/*                <div className={'fw-bold'}> Thủ tục Visa</div>*/}
                        {/*                <div dangerouslySetInnerHTML={createMarkup(policy_visa)}></div>*/}
                        {/*            </div>*/}
                        {/*        )}*/}

                        {/*    </Tab>*/}
                        {/*    <Tab eventKey="note" title="Lưu ý" className="highlight tab_item">*/}
                        {/*        {note && (*/}
                        {/*            <div dangerouslySetInnerHTML={createMarkup(note)}></div>*/}
                        {/*        )}*/}
                        {/*    </Tab>*/}
                        {/*</Tabs>*/}


                        <ConfigProvider class
                                        theme={{
                                            token: {
                                                // Seed Token
                                                colorPrimary: '#F5222D',
                                                borderRadius: 2,

                                                // Alias Token
                                                colorBgContainer: '#f6ffed',
                                            },
                                        }}
                        >
                            <Anchor direction="horizontal" items={[
                                {
                                    key: 'part-1',
                                    href: '#part-1',
                                    title: 'Chi tiết tour',
                                },
                                {
                                    key: 'part-2',
                                    href: '#part-2',
                                    title: 'Giới thiệu',
                                },
                                {
                                    key: 'part-3',
                                    href: '#part-3',
                                    title: 'Lịch trình',
                                },
                                {
                                    key: 'part-4',
                                    href: '#part-4',
                                    title: 'Chính sách - Thủ tục',
                                },
                                {
                                    key: 'part-5',
                                    href: '#part-5',
                                    title: 'Lưu ý',
                                },
                            ]}>

                            </Anchor>

                        </ConfigProvider>


                        <div>

                            <div
                                id="part-1"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    textAlign: 'left',
                                    background: '#f9f9f9',
                                    padding: '20px'

                                }}
                            >
                                <Row>
                                    <Col md={3}>
                                        <div className={'py-1'}>Giờ khởi hành:</div>
                                        <div className={'py-1'}>Ngày khởi hành:</div>
                                        <div className={'py-1'}>Địa điểm khởi hành:</div>
                                        <div className={'py-1'}>Hướng dẫn viên:</div>
                                        <div className={'py-1'}>Xe:</div>

                                    </Col>
                                    <Col md={3}>
                                        <div className={'py-1 min-height-div'}>
                                            {data ? data.time_start : ''}
                                        </div>
                                        <div className={'py-1 min-height-div'}>
                                            {data ? data.date_start_tour : ''}
                                        </div>
                                        <div className={'py-1 min-height-div'}>
                                            TP. Hồ Chí Minh
                                        </div>
                                        <div className={'py-1 min-height-div'}>
                                            {data && data.guide.map((item, index) => {
                                                return (
                                                    <span key={index}>
                                        {item.guide_name + ' '}
                                    </span>
                                                );
                                            })}
                                        </div>
                                        <div
                                            className={'py-1 min-height-div'}>   {data && data.vehicles.map((item, index) => {
                                            return (

                                                <div key={index}>

                                                    {item}

                                                </div>
                                            );
                                        })}

                                        </div>

                                    </Col>
                                    <Col md={6}>
                                        <div>Máy bay:</div>
                                        {data && data.airline_start_name && (
                                            <div className={'start_flight'}>
                                                <div className={'d-flex justify-content-between'}>
                                                    <div className={'col-start'}>
                                                        <img className={'airline_start_img'}
                                                             src={data.airline_start_img ? data.airline_start_img : "https://vigomanager.com/app-assets/mobile/img-huy/taking-off-plane-logo-2RC5DTJ.jpg"}
                                                             alt=""/>
                                                        <div className={'time'}>{data.time_takeoff_start}</div>
                                                    </div>
                                                    <div className={'col-center'}>
                                                        <div><span
                                                            className={'text-danger fw-bold'}> Ngày đi </span> {data.date_start_flight}
                                                        </div>
                                                        <div
                                                            className={'d-flex justify-content-center align-items-center'}>
                                                            <TfiLineDashed className={'me-1'}/><TfiLineDashed
                                                            className={'me-1'}/> <span
                                                            className={'round-plane'}><FaPlane/></span><TfiLineDashed
                                                            className={'ms-1'}/><TfiLineDashed className={'ms-1'}/>
                                                        </div>
                                                    </div>
                                                    <div className={'col-end'}>
                                                        <div>
                                                            <div className={'code-plane-start'}>{data.code_start}</div>
                                                            <div className={'time'}>{data.time_landing_start}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        )}
                                        {data && data.airline_end_name && (
                                            <div className={'airline_end'}>

                                                <div className={'d-flex justify-content-between'}>
                                                    <div className={'col-start'}>
                                                        <img className={'airline_end_img'}
                                                             src={data.airline_end_img ? data.airline_end_img : "https://vigomanager.com/app-assets/mobile/img-huy/taking-off-plane-logo-2RC5DTJ.jpg"}
                                                             alt=""/>
                                                        <div className={'time'}>{data.time_landing_end}</div>
                                                    </div>
                                                    <div className={'col-center'}>
                                                        <div><span
                                                            className={'text-primary fw-bold'}> Ngày về </span> {data.date_end_flight}
                                                        </div>
                                                        <div
                                                            className={'d-flex justify-content-center align-items-center'}>
                                                            <TfiLineDashed
                                                                className={'me-1'}/><TfiLineDashed className={'me-1'}/>
                                                            <span
                                                                className={'round-plane'}><FaPlane
                                                                className={'rotate-180'}/></span> <TfiLineDashed
                                                            className={'ms-1'}/><TfiLineDashed className={'ms-1'}/>
                                                        </div>
                                                    </div>
                                                    <div className={'col-end'}>
                                                        <div>
                                                            <div className={'code-plane-start'}>{data.code_end}</div>
                                                            <div className={'time'}>{data.time_takeoff_end}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                                <div className="line-row row">
                                    <div className="line-bottom"></div>
                                </div>
                            </div>
                            {[timeline_detail_info].map((item, index) => (
                                <>
                                    <div id="part-2" style={{
                                        width: '100%',
                                        height: '100%',
                                        textAlign: 'left',
                                        padding: '40px 20px',
                                        borderLeft: '1px solid rgb(240, 240, 240)',
                                        borderRight: '1px solid rgb(240, 240, 240)'
                                    }}>
                                        <div className="" key={index}>
                                            {item ?
                                                <div dangerouslySetInnerHTML={createMarkup(item.content)}></div> : ''}

                                        </div>
                                        <div className="line-row row">
                                            <div className="line-bottom"></div>
                                        </div>
                                    </div>
                                    <div
                                        id="part-3"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            textAlign: 'left',
                                            background: '#f9f9f9',
                                            padding: '40px 20px'
                                        }}>
                                        {tour_program ? tour_program.map((item, index) => (
                                            <div key={index}>
                                                <div className="color_blue fw-bold">Ngày {index + 1}</div>
                                                {item ? <div
                                                    dangerouslySetInnerHTML={createMarkup(item.content)}></div> : ''}
                                            </div>
                                        )) : []}
                                        <div className="line-row row">
                                            <div className="line-bottom"></div>
                                        </div>
                                    </div>
                                    <div
                                        id="part-4"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            textAlign: 'left',
                                            padding: '40px 20px',
                                            borderLeft: '1px solid rgb(240, 240, 240)',
                                            borderRight: '1px solid rgb(240, 240, 240)'
                                        }}
                                    >

                                        {policy_children && (
                                            <div>
                                                <div className={'fw-bold'}>Chính sách trẻ em</div>
                                                <div dangerouslySetInnerHTML={createMarkup(policy_children)}></div>
                                            </div>
                                        )}


                                        {policy_cancel && (
                                            <div>
                                                <div className={'fw-bold'}> Chính sách hủy</div>
                                                <div dangerouslySetInnerHTML={createMarkup(policy_cancel)}></div>
                                            </div>
                                        )}


                                        {policy_payment && (
                                            <div>
                                                <div className={'fw-bold'}> Chính sách thanh toán</div>
                                                <div dangerouslySetInnerHTML={createMarkup(policy_payment)}></div>
                                            </div>
                                        )}

                                        {policy_visa && (
                                            <div>
                                                <div className={'fw-bold'}> Thủ tục Visa</div>
                                                <div dangerouslySetInnerHTML={createMarkup(policy_visa)}></div>
                                            </div>
                                        )}
                                        <div className="line-bottom"></div>
                                    </div>
                                    <div
                                        id="part-5"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            textAlign: 'left',
                                            background: '#f9f9f9',
                                            padding: '40px 20px'
                                        }}
                                    >
                                        {note && (
                                            <div dangerouslySetInnerHTML={createMarkup(note)}></div>
                                        )}
                                        <div className="line-row row">
                                            <div className="line-bottom"></div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>

                        {/*<div className="mt-3">*/}
                        {/*    <span className="title_page_detail">Bảng giá</span>*/}
                        {/*    <Table bordered className="mt-2 text-center table_time">*/}
                        {/*        <thead>*/}
                        {/*        <tr>*/}
                        {/*            <th>Ngày khởi hành</th>*/}
                        {/*            <th>Giá</th>*/}
                        {/*            <th>Tình trạng</th>*/}
                        {/*            <th>Đặt tour</th>*/}
                        {/*        </tr>*/}
                        {/*        </thead>*/}
                        {/*        <tbody>*/}
                        {/*        <tr>*/}
                        {/*            <td>08/09/2023*/}
                        {/*                /!*<div>{item ? item.name : ''}</div>*!/*/}
                        {/*                <div>Hãng bay: <span className="fw-bold color-vna">VietNam Airlines</span></div>*/}
                        {/*            </td>*/}
                        {/*            <td className="text-danger fw-bold">{GlobalJs.format_currency(item ? item.price : '')} VND</td>*/}
                        {/*            <td>Còn chỗ</td>*/}
                        {/*            <td>*/}
                        {/*                <Link href={`/Tour?id=${searchParams.get('id')}`}>*/}
                        {/*                    <Button>Đặt ngay</Button>*/}
                        {/*                </Link>*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}
                        {/*        <tr>*/}
                        {/*            <td>15/09/2023*/}
                        {/*                <div>Hãng bay: <span className="fw-bold text-danger">VietJet</span></div>*/}
                        {/*            </td>*/}
                        {/*            <td className="text-danger fw-bold">{GlobalJs.format_currency(item ? item.price : '')} VND</td>*/}
                        {/*            <td>Còn chỗ</td>*/}
                        {/*            <td>*/}
                        {/*                <Link href={`/Tour?id=${searchParams.get('id')}`}>*/}
                        {/*                    <Button>Đặt ngay</Button>*/}
                        {/*                </Link>*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}
                        {/*        <tr>*/}
                        {/*            <td>22/09/2023*/}
                        {/*                <div>Hãng bay: <span className="fw-bold text-success">Bamboo</span></div>*/}
                        {/*            </td>*/}
                        {/*            <td className="text-danger fw-bold">{GlobalJs.format_currency(item ? item.price : '')} VND</td>*/}
                        {/*            <td>Còn chỗ</td>*/}
                        {/*            <td>*/}
                        {/*                <Link href={`/Tour?id=${searchParams.get('id')}`}>*/}
                        {/*                    <Button>Đặt ngay</Button>*/}
                        {/*                </Link>*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}
                        {/*        </tbody>*/}
                        {/*    </Table>*/}
                        {/*</div>*/}
                    </div>
                )
            )}
        </>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(TimeLine);