import * as actionTypes from '../actions/type';
import {FETCH_CITY_LIST} from "../actions/type";
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_CITY_LIST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_CITY_LIST_SUCCESS:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.FETCH_CITY_LIST_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}
