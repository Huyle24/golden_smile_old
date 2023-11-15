import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOUR_DETAIL_W3:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.TOUR_DETAIL_SUCCESS_W3:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.TOUR_DETAIL_ERROR_W3:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}
