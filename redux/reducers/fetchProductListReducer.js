import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_FILTER_VALUES:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.UPDATE_FILTER_VALUES_SUCCESS:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.UPDATE_FILTER_VALUES_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}
