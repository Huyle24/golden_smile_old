"use client"
import Breadcrumbs from "@/app/Category/components/BreadCrums";
import ArticleDetail from "./ArticleDetail";
import {useEffect, useState} from "react";
import * as actionType from "../../../../redux/actions/type";
import axios from "axios";
import {useSearchParams} from "next/navigation";

export default function Home(){
    const [data,setData] = useState([]);
    const searchParams = useSearchParams();
    const getData = (id) => {
        const URL = actionType.BASE_URL_API + 'customer/News/details?id='+id;
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
        getData(searchParams.get('id'));
    }, [searchParams]);
    return (
        <main className="main_blogs_detail">
            <Breadcrumbs/>
            <ArticleDetail {...data}/>
        </main>
    )
}