"use client"
import { Container, Row } from "react-bootstrap";
import Breadcrumbs from "./components/BreadCrums";
import SidaBarFilter from "./components/SideBarFilter";
import ListTour from "./components/ListTour";
import TourPopuLar from "./components/TourPopular";
import FavoritePlace from "./components/FavoritePlace";
import NewRelate from "./components/NewRelate";

export default function Home(){
    return(
        <Container className="main_category">
            <Breadcrumbs />
            <Row>
                <SidaBarFilter />
                <ListTour />
                {/*<TourPopuLar/>*/}
                {/*<FavoritePlace />*/}
                {/*<NewRelate />*/}
            </Row>
            
        </Container>
    )
}