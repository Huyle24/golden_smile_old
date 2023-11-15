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
            // 'USER-TOKEN': user_token,
            'LANG-CODE': JSON.parse(actionTypes.GET_LANG_CODE()),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: {

        }
    }).pipe(
        map(response => ({
            type: actionTypes.GOLF_LIST_SUCCESS,
            payload: response.response
        })),
        catchError(error => {
            let data_error = {
                type: actionTypes.GOLF_LIST_ERROR,
                payload: { connect: false }
            };
            return of(data_error);
        })
    );
const golfListEpic = (action$, store) => action$.pipe(
    ofType(actionTypes.GOLF_LIST),
    concatMap(action => of('').pipe(
        map(res => {

            api_url = actionTypes.BASE_URL_API + "Balotour/Golf/golfList?off=" + action.off + "&limit=" + action.limit + "&keyword=" + action.keyword +"&area=" + action.area + "&hole=" + action.hole + "&outstanding=" + action.outstanding;

        })
    ).pipe(switchMap(act => ajaxControl(token))))
);


export default golfListEpic;
