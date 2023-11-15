import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ORDER_HISTORY:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ORDER_HISTORY_SUCCESS:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.ORDER_HISTORY_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}
