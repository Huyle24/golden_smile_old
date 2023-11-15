import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.GOLF_SCORECARD:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.GOLF_SCORECARD_SUCCESS:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.GOLF_SCORECARD_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}
