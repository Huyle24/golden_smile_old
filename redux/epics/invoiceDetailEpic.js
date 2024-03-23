import * as actionTypes from '../actions/type';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';

let api_url = "";
let token = '';

// Check if localStorage is available before accessing it
let user_token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
console.log('user_token', user_token);

let USER_TOKEN1 = user_token ? user_token.substring(1, user_token.length - 1) : '';

const ajaxControl = (user_token, action) =>
    ajax({
        url: api_url,
        timeout: 5000,
        method: 'GET',
        headers: {
            "X-API-KEY": actionTypes.REST_KEY,
            'USER-TOKEN': USER_TOKEN1
        },
        body: {}
    }).pipe(
        map(response => ({
            type: actionTypes.INVOICE_DETAIL_SUCCESS,
            payload: response.response
        })),
        catchError(error => {
            let data_error = {
                type: actionTypes.INVOICE_DETAIL_ERROR,
                payload: { connect: false }
            };
            return of(data_error);
        })
    );

const fetchProductListEpic = (action$, store) => action$.pipe(
    ofType(actionTypes.INVOICE_DETAIL),
    concatMap(action => of(actionTypes.GET_TOKEN()).pipe(
        map(res => {
            token = JSON.parse(res);
            api_url = actionTypes.BASE_URL_API + "website/TourInfo/orderDetail?order_id=" +action.order_id;
            console.log(api_url);
        })
    ).pipe(switchMap(act => ajaxControl(token))))
);

export default fetchProductListEpic;
