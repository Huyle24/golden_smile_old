import * as actionTypes from '../actions/type';
const initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SETUP_ADDRESS:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.SETUP_ADDRESS_SUCCESS:
            return {
                ...action.payload,
                isLoading: false,
            };
        case actionTypes.SETUP_ADDRESS_ERROR:
            return {
                ...action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}
