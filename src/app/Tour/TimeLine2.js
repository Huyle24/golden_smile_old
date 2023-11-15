import {Button, Col, Container, Row, Table, Tabs} from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import InfoDetail from "@/app/Tour/InfoDetail";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import * as GlobalJs from "../../../js/global";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

function TimeLine(props) {
    const searchParams = useSearchParams();
    function createMarkup(c) {
        return {__html: c};
    }
    let timeline_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';
    let tour_program = props.tourDetailInfoW3.data && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data.tour_program : '';

    return (
        <Container className="mt-5">
            <Row>
                {[timeline_detail_info].map((item,index) =>(

                <Col xl={8} key={index}>
                    <Tabs
                        defaultActiveKey="gioithieu"
                        id="uncontrolled-tab-example"
                        className="tab_item"
                        fill
                    >
                        <Tab eventKey="gioithieu" title="Giới thiệu" className="highlight ">
                            <p className="title_page_detail">Điểm nhấn</p>
                                <div className="" key={index}>
                                    {item ? <div dangerouslySetInnerHTML={createMarkup(item.content) }></div> : ''}

                                </div>
                        </Tab>
                        <Tab eventKey="lictrinh" title="Lịch trình" className="highlight tab_item">
                            {tour_program ? tour_program.map((item,index) => (
                                <div key={index}>
                                    <div className="color_blue fw-bold">Ngày {index + 1}</div>
                                    {item ? <div dangerouslySetInnerHTML={createMarkup(item.content)}></div> : ''}
                                </div>
                            )) : []}
                        </Tab>
                        <Tab eventKey="note" title="Lưu ý" className="highlight tab_item">
                            {[timeline_detail_info].map((item,index) =>(
                                <div className="" key={index}>
                                        <div className="mb-3"><strong>Chính sách hủy</strong><p>Từ ngày chuyển khoản
                                            thanh toán đến trước 8 ngày khởi hành chịu phí 20% tổng đơn hàng.</p>
                                            <p>Từ 7 đến trước 2 ngày khởi hành chịu phí 50% tổng đơn hàng.</p>
                                            <p>Trước ngày khởi hành 1 ngày chịu phí 100% tổng đơn hàng.</p>
                                            <p>Hủy ngay ngày khởi hành, không tham gia tour chịu phí hủy 100% tổng đơn
                                                hàng.</p>
                                            <p>** Nếu chuyến đi bị hủy do thiên tai,thời tiết, điều kiện bất khả kháng
                                                sẽ hoàn 100%</p>
                                            <p>&nbsp;</p>
                                            <p>Balotour với tư cách là đại lý du lịch đặt các dịch vụ như vé máy bay,
                                                tour du lịch…nếu lịch trình có thay đổi và điều chỉnh thời gian do tình
                                                hình thời tiết, thiên tai, nội chiến, điều kiện hàng không… thì chúng
                                                tôi cam kết sẽ cố gắng giải quyết mọi trường hợp chậm trễ không theo
                                                lịch trình dự kiến cho quý khách hàng nhưng không có trách nhiệm bồi
                                                thường.</p></div>
                                        <div className="mb-3"><strong>Chính sách thanh toán</strong><p>Sau khi đăng ký
                                            tour, Quý khách đặt cọc 50%.</p>
                                            <p>Phần còn lại vui lòng thanh toán trước 07 ngày khởi hành.</p>
                                            <p>Quý khách đăng ký tour trong vòng 7 ngày so với ngày khởi hành, vui lòng
                                                thanh toán toàn bộ tiền tour.</p></div>
                                        <div className="mb-3"><strong>Chính sách trẻ em</strong><p>Miễn phí cho trẻ em 4
                                            tuổi, trẻ em từ 5 đến 7 tuổi tính 75% giá của người lớn, còn từ 8 tuổi trở
                                            lên thì tính theo giá của người lớn.</p></div>
                                </div>
                            ))}
                        </Tab>
                    </Tabs>
                    <div className="mt-3">
                        <span className="title_page_detail">Bảng giá</span>
                        <Table bordered   className="mt-2 text-center table_time">
                            <thead>
                            <tr>
                                <th>Ngày khởi hành</th>
                                <th>Giá</th>
                                <th>Tình trạng</th>
                                <th>Đặt tour</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>08/09/2023
                                    {/*<div>{item ? item.name : ''}</div>*/}
                                    <div>Hãng bay: <span className="fw-bold color-vna">VietNam Airlines</span></div>
                                </td>
                                <td className="text-danger fw-bold">{GlobalJs.format_currency(item ? item.price : '')} VND</td>
                                <td>Còn chỗ</td>
                                <td>
                                    <Link href={`/Tour?id=${searchParams.get('id')}`}>
                                        <Button>Đặt ngay</Button>
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>15/09/2023
                                    <div>Hãng bay: <span className="fw-bold text-danger">VietJet</span></div>
                                </td>
                                <td className="text-danger fw-bold">{GlobalJs.format_currency(item ? item.price : '')} VND</td>
                                <td>Còn chỗ</td>
                                <td>
                                    <Link href={`/Tour?id=${searchParams.get('id')}`}>
                                        <Button>Đặt ngay</Button>
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>22/09/2023
                                    <div>Hãng bay: <span className="fw-bold text-success">Bamboo</span></div>
                                </td>
                                <td className="text-danger fw-bold">{GlobalJs.format_currency(item ? item.price : '')} VND</td>
                                <td>Còn chỗ</td>
                                <td>
                                    <Link href={`/Tour?id=${searchParams.get('id')}`}>
                                        <Button>Đặt ngay</Button>
                                    </Link>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
                ))}

                <Col xl="4" >
                    <InfoDetail/>
                </Col>

            </Row>

        </Container>
    )
}

const mapStateToProps = state => ({
    tourDetailInfoW3: state.tourDetailInfoW3,
});
export default connect(mapStateToProps, actions)(TimeLine);