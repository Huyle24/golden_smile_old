import {Button, Col, Container, Row, Table, Tabs} from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import InfoDetail from "@/app/Tour/InfoDetail";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import * as GlobalJs from "../../../js/global";
import Link from "next/link";
import {useSearchParams} from "next/navigation";


// Hàm để làm sạch HTML trước khi chèn vào DOM

function TimeLine(props) {
    const searchParams = useSearchParams();

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
                    <Tabs
                        defaultActiveKey="gioithieu"
                        id="uncontrolled-tab-example"
                        className="tab_item" fill>
                        <Tab eventKey="gioithieu" title="Giới thiệu" className="highlight ">
                            <p className="title_page_detail">Điểm nhấn</p>
                            <div className="" key={index}>
                                {item ? <div dangerouslySetInnerHTML={createMarkup(item.content)}></div> : ''}

                            </div>
                        </Tab>
                        <Tab eventKey="lictrinh" title="Lịch trình" className="highlight tab_item">
                            {tour_program ? tour_program.map((item, index) => (
                                <div key={index}>
                                    <div className="color_blue fw-bold">Ngày {index + 1}</div>
                                    {item ? <div dangerouslySetInnerHTML={createMarkup(item.content)}></div> : ''}
                                </div>
                            )) : []}
                        </Tab>
                        <Tab eventKey="policy" title="Chính sách - Thủ tục " className="highlight tab_item">

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

                        </Tab>
                        <Tab eventKey="note" title="Lưu ý" className="highlight tab_item">
                            {note && (
                                <div dangerouslySetInnerHTML={createMarkup(note)}></div>
                            )}
                        </Tab>
                    </Tabs>
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
            ))}
        </>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(TimeLine);