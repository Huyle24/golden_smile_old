import * as actionTypes from "../actions/type";

const initialState = {
    isLoading: false
};

export default function (state = initialState, action){
    switch (action.type){
        case actionTypes.COUNT_HOTEL:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.COUNT_HOTEL_SUCCESS:
            return {
                ...action.payload,
                isLoading: false
            }
        case actionTypes.COUNT_HOTEL_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
}