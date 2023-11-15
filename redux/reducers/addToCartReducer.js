import * as actionTypes from '../actions/type';
import Swal from "sweetalert2";
const initialState = [];

export default function (state = initialState, action){
    switch (action.type){
        case actionTypes.ADD_TO_CART:
            const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
            let item_apply = action.item;
            const existingItem = cartItems.find(item => item.id === item_apply.id);
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            if (!existingItem) {
                item_apply.adult = 1;
                item_apply.child = 0;
                cartItems.push(item_apply);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                Toast.fire({
                    title: "Đã thêm vào giỏ hàng",
                    icon: "success"
                })
            }
            else {
                Toast.fire({
                    title: "Đơn hàng đã tồn tại",
                    icon: "error"
                })
            }
            return cartItems;
        case actionTypes.GET_TO_CART:
            const cartItem = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
            return cartItem;
        default:
            return state;
    }
}