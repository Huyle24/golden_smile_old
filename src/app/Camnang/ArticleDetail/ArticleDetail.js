import { Col, Container, Row } from "react-bootstrap";
import ArticleList from "./ArticleList";
import {connect} from "react-redux";
import {useEffect} from "react";
import * as actions from "../../../../redux/actions";
import {fetchBlogDetail} from "../../../../redux/actions";
import { useSearchParams} from "next/navigation";

function ArticleDetail(props) {
    const searchParams = useSearchParams()
    useEffect(() => {
        props.fetchBlogDetail(searchParams.get('id'))
    },[searchParams.get('id')])
    let blogDetail = props.blogDetailInfo.data && props.blogDetailInfo.isLoading === false ? props.blogDetailInfo.data.overview : '';


    function createMarkup(c) {
        return {__html: c};
    }
  return (
    <Container >
      <Row>
          {  blogDetail ? ([blogDetail].map((item,index) => (
            <Col lg="8" key={index} >
              <div className="py-5">
                <h3>
                    {item.name}
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

          ))) : ''}
        <Col lg="4">
            <ArticleList />
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => ({
    blogDetailInfo: state.blogDetailInfo,
});
export default connect(mapStateToProps, actions)(ArticleDetail);
