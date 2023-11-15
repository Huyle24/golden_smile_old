import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.LANGUAGE_DETAIL:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.LANGUAGE_DETAIL_SUCCESS:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.LANGUAGE_DETAIL_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}
