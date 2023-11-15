import { Col, Row, Container, Table } from "react-bootstrap";
import {FaFighterJet} from 'react-icons/fa'
export default function InfoBottom() {
  return (
    <div className="fixed-bottom">
      <div className="top-bar d-none d-lg-block">
        <i className="icon icon--chevron-up"></i>
      </div>
      <div className="wrapper1">
        <Container  className="text-white">
          <Row className="short-sumary">
            <Col lg="8">
              <span
                className="title"
                title="Hàn Quốc: Seoul- Jeju - Bảo Tàng Ánh Sáng - Đảo Nami - Công viên Everland | Trải nghiệm mặc hanbok &amp; làm kimchi | Lễ 2/9"
              >
                Hàn Quốc: Seoul- Jeju - Bảo Tàng Ánh Sáng - Đảo Nami - Công viên
                Everland ...
              </span>
              <span className="info">
                28 Tháng Tám 2023 | 6 ngày 5 đêm | Máy bay
              </span>
            </Col>
            <Col lg="4" >
              <div className="price">
                <div className="price-left"></div>
                <div className="price-right">
                  <div className="price-total">Giá : 22,990,000₫</div>
                </div>
              </div>
              <div className="price-detail d-lg-none">
                <span>
                  <i className="icon icon--chevron-up"></i>
                </span>
              </div>
              <div className="btn-book">
                <a
                  href="#"
                  data-toggle="modal"
                  className="btn btn-primary">
                  Đặt ngay
                </a>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col lg="8">
              <Row className=" item-l1">
                <Col  lg="2" className="item-icon text-center">
                  <FaFighterJet/>
                </Col>
                <Col lg="10" className="item-flight">
                  <div className="detail-tour">
                    <div className="detail-tour-inner goto">
                      <div className="date">
                        <span>Ngày đi -</span> <b>28/08/2023 </b>
                      </div>
                      <div className="p-line">
                        <span>
                          <img src="/Content/Theme/images/go.png" alt="image" />
                        </span>
                        <span>
                          <img src="/Content/Theme/images/p.png" alt="image" />
                        </span>
                        <span>
                          <img src="/Content/Theme/images/to.png" alt="image" />
                        </span>
                      </div>
                      <div className="time">
                        <h4>22:35</h4>
                        <span>Bay thẳng</span>
                        <h4>06:05</h4>
                      </div>
                    </div>
                    <div className="detail-tour-inner comeback">
                      <div className="date">
                        <span>Ngày về -</span> <b>02/09/2023</b>
                      </div>
                      <div className="p-line">
                        <span>
                          <img src="/Content/Theme/images/go.png" alt="image" />
                        </span>
                        <span>
                          <img src="/Content/Theme/images/p.png" alt="image" />
                        </span>
                        <span>
                          <img src="/Content/Theme/images/to.png" alt="image" />
                        </span>
                      </div>
                      <div className="time">
                        <h4>18:00</h4>
                        <span>Bay thẳng</span>
                        <h4>21:35</h4>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg="4">
              <Table>
                <tbody>
                  <tr>
                    <td>Giá Người lớn</td>
                    <td>
                      <label>22,990,000</label>₫
                    </td>
                  </tr>
                  <tr>
                    <td>Giá trẻ em</td>
                    <td>
                      <label>22,491,000</label>₫
                    </td>
                  </tr>
                  <tr>
                    <td>Giá trẻ nhỏ</td>
                    <td>
                      <label>7,497,000</label>₫
                    </td>
                  </tr>
                  <tr>
                    <td>Giá em bé</td>
                    <td>
                      <label>7,497,000</label>₫
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
