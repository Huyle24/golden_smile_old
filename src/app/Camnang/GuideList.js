import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions"
import {useEffect} from "react";
import {fetchBlogList} from "../../../redux/actions";
function GuideList(props){

    useEffect(() => {
      props.fetchBlogList()
    },[])
    let listBlog = props.blogListInfo && props.blogListInfo.isLoading === false ? props.blogListInfo.data : '';

    console.log(listBlog)
    return(
        <Container  className="mt-4">
            {  listBlog ? (listBlog.map((item,index) => (

                <div className="border-top" key={index}>
                    <Row className="camnang_item py-3 ">
                        <Col lg="4">
                            <Link href={"/Camnang/ArticleDetail/?id=" + item.id}>
                                <img src="https://i.pinimg.com/564x/e4/2d/79/e42d796a832f4cc563b7b86aba2ebb2e.jpg" className="w-100" alt="and"/>
                            </Link>
                        </Col>
                        <Col lg="8">
                            <Link href={"/Camnang/ArticleDetail/?id="+item.id}>
                                <h4 className="color-text fw-bold">{item.title}</h4>
                            </Link>
                            <span className="text-danger">Cẩm nang du lịch</span> - <span className="color-text"> {item.created_date}</span>
                            <p className="color-text mt-3">{item.desc}</p>
                        </Col>
                    </Row>
                </div>
            ))) : ''}
        </Container>
    )
}

const mapStateToProps = state => ({
    blogListInfo: state.blogListInfo,

});
export default connect(mapStateToProps, actions)(GuideList);
