import React, { Component } from 'react';
import * as actionTypes from '../actions/type';
import { from, of, throwError } from 'rxjs';
import { mergeMap, map, takeUntil, delay, tap, catchError, switchMap, concatMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {TOUR_DETAIL_W3} from "../actions/type";
//import {fromPromise} from 'rxjs/internal-compatibility';
let api_url = "";
let form_body = '';
let token = '';

const ajaxControl = (user_token, action) =>
    ajax({
        url: api_url,
        timeout: 5000,
        method: 'GET',
        headers: {
            "X-API-KEY": actionTypes.REST_KEY,
            'USER-TOKEN': "2BF8MD9TRK78NPQ0RHQ712WERV50QUIDK0N3QRFFZW7OL6G8E0WTMGJYHKAOOGJZA4SO23NI98SP5L1L2EL67829CS6V21QZS4WFP6K8RK8669QJ2J6QVHFTWOOZ8Y22",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: {

        }
    }).pipe(
        map(response => ({
            type: actionTypes.TOUR_DETAIL_SUCCESS_W3,
            payload: response.response
        })),
        catchError(error => {
            let data_error = {
                type: actionTypes.TOUR_DETAIL_ERROR_W3,
                payload: { connect: false }
            };
            return of(data_error);
        })
    );
const tourDetailEpic = (action$, store) => action$.pipe(
    ofType(actionTypes.TOUR_DETAIL_W3),
    concatMap(action => of('').pipe(
        map(res => {
            api_url = "https://balotour.nhanhtravel.com/api/customer/Tour/tour_detail?id=" + action.id;
        })
    ).pipe(switchMap(act => ajaxControl(token))))
);


export default tourDetailEpic;
