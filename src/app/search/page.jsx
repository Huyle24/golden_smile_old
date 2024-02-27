"use client"
import {Container, Row, Col} from "react-bootstrap";
import Carousels from './components/Carousels'
import SidaBarFilter from "@/app/search/components/SideBarFilter";
import ListTour from "@/app/search/components/ListTour";

export default function SearchTour() {
    return (
        <>
            <Carousels/>
            <div className={'bg-light bg-gradient'}>
                <Container fluid="lg" className="main  ">
                    <br/>
                    <Row>
                        <Col lg={4}>
                            <SidaBarFilter/>
                        </Col>
                        <Col lg={8}>
                            <ListTour/>
                        </Col>

                    </Row>
                </Container>
            </div>
        </>
    )
}