
import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_FILTER_VALUES':
            return {
                ...state,
                FilterValues: action.payload,
            };
        default:
            return state;
    }
}