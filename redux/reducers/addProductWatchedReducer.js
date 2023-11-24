import * as actionTypes from '../actions/type';
import Swal from "sweetalert2";
const initialState = [];

export default function (state = initialState, action){
    switch (action.type){
        case actionTypes.ADD_PRODUCT_WATCHED:
            const productWatchedItems = localStorage.getItem('productWatched') ? JSON.parse(localStorage.getItem('productWatched')) : [];
            let item_clicked = action.item;
            console.log(action);
            const existingProduct = productWatchedItems.find(item => item.id === item_clicked.id);
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
            if (!existingProduct) {
                item_clicked.adult = 0;
                item_clicked.child = 0;
                productWatchedItems.push(item_clicked);
                localStorage.setItem('productWatched', JSON.stringify(productWatchedItems));

                Toast.fire({
                    title: "Bạn vừa xem sản phẩm này lần đầu",
                    icon: "success"
                })
            }
            else {
                Toast.fire({
                    title: "Bạn đã xem sản phẩm này trước đó",
                    icon: "warning"
                })
            }
            return productWatchedItems;
        case actionTypes.GET_PRODUCT_WATCHED:
            const watchItem = localStorage.getItem('productWatched') ? JSON.parse(localStorage.getItem('productWatched')) : [];
            console.log(watchItem);
            return watchItem;
        default:
            return state;
    }
}