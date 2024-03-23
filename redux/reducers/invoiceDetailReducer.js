import * as actionTypes from '../actions/type';
import {INBOUND_TOUR_LIST, INBOUND_TOUR_LIST_ERROR, INBOUND_TOUR_LIST_SUCCESS} from "../actions/type";

const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.INVOICE_DETAIL:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.INVOICE_DETAIL_SUCCESS:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.INVOICE_DETAIL_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}
