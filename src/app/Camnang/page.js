"use client"
import Breadcrumbs from "../Category/components/BreadCrums";
import Paginate from "../Category/components/Paginate";
import Category from "../Tintuc/Category";
import GuideList from "./GuideList";
import {useEffect, useState} from "react";
import * as actionType from "../../../redux/actions/type";
import axios from "axios";
import "./Camnang.css";
export default function Home(){
    const [data,setData] = useState([]);
    const getData = () => {
        const URL = actionType.BASE_URL_API + 'customer/News/list';
        axios.get(URL, {
            headers: {
                "x-api-key": "api_key",
                "USER-TOKEN": "2BF8MD9TRK78NPQ0RHQ712WERV50QUIDK0N3QRFFZW7OL6G8E0WTMGJYHKAOOGJZA4SO23NI98SP5L1L2EL67829CS6V21QZS4WFP6K8RK8669QJ2J6QVHFTWOOZ8Y22",
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
            .then(function(res){
                // console.log(res.data.data);
                setData(res.data.data);
            })
            .catch(function(err){
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <main className="main_camnang">
            <Breadcrumbs />
            <Category />
            <GuideList data={data}/>
            <Paginate />
        </main>
    )
}