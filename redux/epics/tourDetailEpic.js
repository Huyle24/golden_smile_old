import React, { Component } from 'react';
import * as actionTypes from '../actions/type';
import { from, of, throwError } from 'rxjs';
import { mergeMap, map, takeUntil, delay, tap, catchError, switchMap, concatMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
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
            'USER-TOKEN': user_token,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: {

        }
    }).pipe(
        map(response => ({
            type: actionTypes.TOUR_DETAIL_SUCCESS,
            payload: response.response
        })),
        catchError(error => {
            let data_error = {
                type: actionTypes.TOUR_DETAIL_ERROR,
                payload: { connect: false }
            };
            return of(data_error);
        })
    );
const tourDetailEpic = (action$, store) => action$.pipe(
    ofType(actionTypes.TOUR_DETAIL),
    concatMap(action => of('').pipe(
        map(res => {
            api_url = actionTypes.BASE_URL_API + "Balotour/Tour/tour_detail?permalink=" + action.permalink + "&customer_number=" + action.customer_number +
                "&child_number=" + action.child_number;

        })
    ).pipe(switchMap(act => ajaxControl(token))))
);


export default tourDetailEpic;
