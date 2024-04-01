import * as actionTypes from '../actions/type';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';

let api_url = "";
let token = '';

// Check if localStorage is available before accessing it


const ajaxControl = (user_token, action) =>
    ajax({
        url: api_url,
        timeout: 5000,
        method: 'GET',
        headers: {
            "X-API-KEY": actionTypes.REST_KEY,

        },
        body: {}
    }).pipe(
        map(response => ({
            type: actionTypes.FETCH_IMG_SUCCESS,
            payload: response.response
        })),
        catchError(error => {
            let data_error = {
                type: actionTypes.FETCH_IMG_ERROR,
                payload: { connect: false }
            };
            return of(data_error);
        })
    );

const fetchImgEpic = (action$, store) => action$.pipe(
    ofType(actionTypes.FETCH_IMG),
    concatMap(action => of(actionTypes.GET_TOKEN()).pipe(
        map(res => {
            token = JSON.parse(res);
            api_url = actionTypes.BASE_URL_API + "Balotour/WebsiteGoldenSmileImg/ImageData";
            console.log(api_url);
        })
    ).pipe(switchMap(act => ajaxControl(token))))
);

export default fetchImgEpic;
