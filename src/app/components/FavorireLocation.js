import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { FavoriteLocationData } from "../data";
import {FaDAndD} from 'react-icons/fa';
import * as actionType from "../../../redux/actions/type";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";

function FavoriteLocation(props){


  useEffect(() => {
      props.fetchTourList('', '', '', '', '', '', '', '',1)

  }, []);
    let list_tour = props.privateTourListInfo.data && props.privateTourListInfo.isLoading === false ? props.privateTourListInfo.data.tour_list : '';
    return (
        <Container className="mt-4">
            <h4 className="color-text">Sự kiện - Teambuilding</h4>
            <Row className="mt-4">
                {list_tour ? (list_tour.filter((item, idx) => idx < 8).map((item) => (
                    <Col lg={3} md={6} key={item.id} >
                    <Card className="mb-3 border-0">
                        <Link href="/Category">
                            <Card className="position-relative border-0">
                                <Card.Img variant="top" src={item.img} />
                                <FaDAndD className="icon_place"/>
                                <Card.Text className="destination-item__image__overlay"></Card.Text>
                            </Card>
                        </Link>

                    <Card.Body >
                        <Link href="/Category">
                            <Card.Title className="card_title_tour">{item.name}</Card.Title>
                        </Link>
                    </Card.Body>
                    </Card>
                </Col>
                ))) : ''}
                
            </Row>
        </Container>
    )
}
const mapStateToProps = state => ({
    privateTourListInfo: state.privateTourListInfo
});
export default connect(mapStateToProps, actions)(FavoriteLocation);