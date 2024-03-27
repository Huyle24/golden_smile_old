'use client'
import {Col, Container, Row} from "react-bootstrap";

import {useEffect} from "react";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {useSearchParams} from "next/navigation";
import InfoDetail from "@/app/OrderTour/InfoDetail";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
function PaymentSidebar(props) {
    const router = useRouter();
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const handlePayment = () => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/Checkout');
        } else {
            Toast.fire({
                title: "Bạn chưa đăng nhập tài khoản",
                icon: "error"
            })
            router.push('/Auth/Login/');
        }
    };
    const { orderData } = props;
    const searchParams = useSearchParams()
    const tour_open_id = searchParams.get("tour_open_id");
    const adult_number = searchParams.get("adult_number");
    let tour_price_detail_info = props.tourPriceDetailInfo.data && props.tourPriceDetailInfo.isLoading === false ? props.tourPriceDetailInfo.data : '';
    const adultTotal =
        orderData? orderData.adult_number * tour_price_detail_info.price_sell_adult:0;

    console.log(' tour_price_detail_info.price_sell_adultr', parseFloat(tour_price_detail_info.price_sell_adult))
    // Tính tổng số tiền của trẻ em
    let childTotal = 0;
    if (orderData && orderData.data_child &&tour_price_detail_info&&tour_price_detail_info.data_child_price) {
        orderData.data_child.forEach((item, index) => {
            childTotal += item.child_number *   tour_price_detail_info.data_child_price[index].child_price;
        });
    }

    // Tính tổng cộng
    const total = adultTotal + childTotal;
    const total_formated=parseFloat(total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    console.log('orderData',orderData)
    console.log('tour_price_detail_info',tour_price_detail_info)
    return (
        <>
            <InfoDetail data={tour_price_detail_info} />
            <div className="col-overview p-2 tour-info mt-3">
                <div className={'tour-info-header'}>
                    CHI TIẾT GIÁ
                </div>
                <div className={'p-1 tour-info-body'}>
                    <div className={'d-flex justify-content-between'}>
                        <div>Người lớn:</div>
                        <div>
                            {orderData.adult_number} x {tour_price_detail_info.price_sell_adult_formated}đ

                        </div>
                    </div>
                    {orderData&&orderData.data_child.map((item,index)=> (
                        <div className={'d-flex justify-content-between'}>
                            <div>Trẻ em từ {item.child_old_start} đến {item.child_old_end} tuổi</div>
                            <div>
                                {item.child_number} x  {  tour_price_detail_info.data_child_price?  tour_price_detail_info.data_child_price[index].child_price_formated:''}đ
                            </div>
                        </div>
                    ))}

                    <div className={'d-flex justify-content-between'}>
                        <div className={'fw-bold '}>TỔNG CỘNG:</div>
                        <div className={'fw-bold text-danger'}>
                            {total_formated}
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <button onClick={handlePayment} className="btn payment-order-tour w-100">Thanh toán</button>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    tourPriceDetailInfo: state.tourPriceDetailInfo,
});
export default connect(mapStateToProps, actions)(PaymentSidebar);
