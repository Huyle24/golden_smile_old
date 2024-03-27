import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_FORMAT_TOUR:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_FORMAT_TOUR_SUCCESS:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.FETCH_FORMAT_TOUR_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}