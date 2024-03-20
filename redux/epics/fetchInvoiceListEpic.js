import * as actionTypes from '../actions/type';
import {of} from 'rxjs';
import {catchError, concatMap, map, switchMap} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {ajax} from 'rxjs/ajax';
//import {fromPromise} from 'rxjs/internal-compatibility';
let api_url = "";
let form_body = '';
let token = '';
let user_token=localStorage.getItem('token');
 let USER_TOKEN1=  user_token.substring(1, user_token.length - 1)
const ajaxControl = (user_token, action) =>
    ajax({
        url: api_url,
        timeout: 5000,
        method: 'GET',
        headers: {
            "X-API-KEY": actionTypes.REST_KEY,
            'USER-TOKEN': USER_TOKEN1
        },
        body: {

        }
    }).pipe(
        map(response => ({
            type: actionTypes.FETCH_INVOICE_LIST_SUCCESS,
            payload: response.response
        })),
        catchError(error => {
            let data_error = {
                type: actionTypes.FETCH_INVOICE_LIST_ERROR,
                payload: { connect: false }
            };
            return of(data_error);
        })
    );
const fetchProductListEpic = (action$, store) => action$.pipe(
    ofType(actionTypes.FETCH_INVOICE_LIST),
    concatMap(action => of(actionTypes.GET_TOKEN()).pipe(
        map(res => {
            token = JSON.parse(res);
            api_url = actionTypes.BASE_URL_API + "website/TourInfo/getOrders?";
            console.log(api_url)
        })
    ).pipe(switchMap(act => ajaxControl(token))))
);


export default fetchProductListEpic;
