import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.HOTEL_PRICE:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.HOTEL_PRICE_SUCCESS:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.HOTEL_PRICE_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}
