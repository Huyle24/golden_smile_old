import { Col, Container, Row } from "react-bootstrap";

export default function TimeLine(data) {
    function createMarkup(c) {
        return {__html: c};
    }
  return (
    <Container >
        <span className="d-flex justify-content-center title_page_detail pb-5 pt-3">Lịch trình</span>

          {data.data.tour_program ? data.data.tour_program.map((item,index) => (
              <Row className="border rounded-2" key={index}>
              <Col lg={4} md={4} className="timeline_overview">
                  <div className="go-tour">
                      <div className="day day-01">
                          <div className="wrapper">
                              <span className="date-left"> Ngày </span>
                              <span className="date-center active">1</span>
                              <span className="date-right">
                  <span className="date">17/08/2023</span>
                  <span className="location">
                    SB NỘI BÀI – HÀ NỘI 02 bữa ăn: (Trưa, Chiều)
                  </span>
                </span>
                          </div>
                      </div>
                      <div className="day day-02">
                          <div className="wrapper">
                              <span className="date-left"> Ngày </span>
                              <span className="date-center active">2</span>
                              <span className="date-right">
                  <span className="date">18/08/2023</span>
                  <span className="location">
                    HÀ NỘI – HẠ LONG 03 bữa ăn: (Sáng, Trưa, Chiều)
                  </span>
                </span>
                          </div>
                      </div>
                      <div className="day day-03">
                          <div className="wrapper">
                              <span className="date-left"> Ngày </span>
                              <span className="date-center active">3</span>
                              <span className="date-right">
                  <span className="date">19/08/2023</span>
                  <span className="location">
                    HẠ LONG – NINH BÌNH 03 bữa ăn: (Sáng, Trưa, Chiều)
                  </span>
                </span>
                          </div>
                      </div>
                      <div className="day day-04">
                          <div className="wrapper">
                              <span className="date-left"> Ngày </span>
                              <span className="date-center active">4</span>
                              <span className="date-right">
                  <span className="date">20/08/2023</span>
                  <span className="location">
                    NINH BÌNH – SB NỘI BÀI 02 Bữa ăn: (Sáng, Trưa)
                  </span>
                </span>
                          </div>
                      </div>
                  </div>
                  <div className="live-video hardCode d-none">
                      <a href="#" className="video">
                          <i className="fad fa-play-circle"></i>
                          <label>Thuyết minh chương trình tour</label>
                      </a>
                  </div>
              </Col>
              <Col lg={8} md={8} className="timeline_detail">
              <div>
                  <h3 className="title_page_detail">Ngày 1 - TP.HCM - INCHENO(Nghỉ đêm trên máy bay)</h3>
                  <div className="excerpt">
                      <span className="line"></span>
                      <title></title>
                      <div>
                          {item.content && <div dangerouslySetInnerHTML={createMarkup(item.content)}></div>}
                      </div>
                  </div>
              </div>
          </Col>
              </Row>
          )) : []}


    </Container>
  );
}
