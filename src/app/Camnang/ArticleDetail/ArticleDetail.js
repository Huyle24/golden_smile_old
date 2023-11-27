import { Col, Container, Row } from "react-bootstrap";
import ArticleList from "./ArticleList";

export default function ArticleDetail(data) {
    function createMarkup(c) {
        return {__html: c};
    }
  return (
    <Container >
      <Row>
        {[data].map((item,index) => (
            <Col lg="8" key={index}>
              <div className="py-5">
                <h3>
                    {item.title}
                </h3>
                <div className="d-flex">
                  <span className="color-text fw-bold">Cẩm nang du lịch</span>
                  <span className="ms-2"> {item.created_date}</span>
                  <span className="ms-2 text-secondary fw-bold">
                {" "}
                    - Trần Thị Cẩm Nhi (WikiTravel)
              </span>
                </div>
              </div>
              <div className="article">
                <p>
                    {item.desc}
                </p>
                <p>{item.content && <div dangerouslySetInnerHTML={createMarkup(item.content)} />}</p>
              </div>
            </Col>
        ))}

        <Col lg="4">
            <ArticleList />
        </Col>
      </Row>
    </Container>
  );
}
