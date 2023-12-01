import { Container} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import SearchBox from './SearchBox';
import * as actionType from "../../../redux/actions/type";
import axios from 'axios';
import { useEffect, useState } from 'react';
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {fetchSlideImageList} from "../../../redux/actions";
function Carousels(props){
    useEffect(() => {
        props.fetchSlideImageList();
    }, []);

    let slideImageInfo = props.slideImageListInfo.data && props.slideImageListInfo.isLoading === false ? props.slideImageListInfo.data.slide_header_img : '';

    return (
        <Container fluid className="position-relative ps-0 pe-0">
            <Carousel>
                
                {slideImageInfo ? (slideImageInfo.map((item, index) =>
                    
                        <Carousel.Item key = {index}>
                            <div data-aos="fade-up"
                                 data-aos-anchor-placement="center-bottom">
                                <img src={item} className='w-100 img_carousel' alt='carousel'/>
                            </div>
                        </Carousel.Item>
                    
                )) : ''}
               
            </Carousel>
            <SearchBox />
        </Container>
        
        
    )
}

const mapStateToProps = state => ({
    slideImageListInfo: state.slideImageListInfo,
});
export default connect(mapStateToProps, actions)(Carousels);