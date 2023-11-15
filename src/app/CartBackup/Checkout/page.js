"use client"
import BreadcrumbBooking from "../BreadCrumBooking";
import PaymentMethod from "./PaymentMethod";
import * as actionType from "../../../../redux/actions/type";
import axios from "axios";
import {useState,useEffect} from "react";

export default function Page({countAdult,countChild,countBaby}) {
    console.log(countChild);
    const [data,setData] = useState([]);
    const getData = () => {
        const URL = actionType.BASE_URL_API + 'customer/Order/paymentMethodList';
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
      <div className="main_showcustomer">
        <BreadcrumbBooking />
        <PaymentMethod/>
      </div>
    )
  }