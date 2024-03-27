
import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_TOUR_OPEN_CHOOSE':
            return {
                ...state,
                TourOpenValues: action.payload,
            };
        default:
            return state;
    }
}