import * as actionTypes from '../actions/type';

const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.JOINT_TOUR_LIST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.JOINT_TOUR_LIST_SUCCESS:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.JOINT_TOUR_LIST_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}
