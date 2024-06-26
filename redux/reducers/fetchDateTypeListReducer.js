import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_LIST_DATE_TYPE:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_LIST_DATE_TYPE_SUCCESS:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.FETCH_LIST_DATE_TYPE_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}