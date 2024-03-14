
import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_ORDER_DATA':
            return {
                ...state,
                orderData: action.payload,
            };
        default:
            return state;
    }
}