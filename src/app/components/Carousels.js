import {Container} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import SearchBox from './SearchBox';
import * as actionType from "../../../redux/actions/type";
import axios from 'axios';
import {useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {fetchImg, fetchSlideImageList} from "../../../redux/actions";
import Link from "next/link";

function Carousels(props) {
    useEffect(() => {
        props.fetchSlideImageList();
        props.fetchImg()
    }, []);

    let slideImageInfo = props.slideImageListInfo.data && props.slideImageListInfo.isLoading === false ? props.slideImageListInfo.data.slide_header_img : '';
    let slider_list = props.fetchImgInfo.data && props.fetchImgInfo.isLoading === false ? props.fetchImgInfo.data.slider : '';

    console.log('slider_list', slider_list)
    return (
        <Container fluid className="position-relative ps-0 pe-0">
            {/*<div data-aos="fade-up"*/}
            {/*     >*/}
            <div>
                <Carousel>
                    {slider_list ? (
                        slider_list.map((item, index) => (
                            <Carousel.Item key={index}>
                                <div data-aos-anchor-placement="center-bottom">
                                    <Link href={item.url_link?item.url_link:'#'}>
                                        <img src={item.bucket_img} className='w-100 img_carousel' alt='carousel'/>
                                    </Link>
                                </div>
                            </Carousel.Item>
                        ))
                    ) : ''}
                </Carousel>
                <SearchBox/>
            </div>
        </Container>


    )
}

const mapStateToProps = state => ({
    slideImageListInfo: state.slideImageListInfo,
    fetchImgInfo: state.fetchImgInfo
});
export default connect(mapStateToProps, actions)(Carousels);