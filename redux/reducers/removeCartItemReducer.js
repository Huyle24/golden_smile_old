import * as actionTypes from '../actions/type';
const initialState = [];
export default function (state = initialState, action){
    switch (action.type){
        case actionTypes.REMOVE_ITEM_CART:
            console.log(action);
            return state;
        default:
            return state;
    }
}
