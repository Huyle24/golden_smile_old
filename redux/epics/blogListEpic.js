import React, { Component } from 'react';
import * as actionTypes from '../actions/type';
import { from, of, throwError } from 'rxjs';
import { mergeMap, map, takeUntil, delay, tap, catchError, switchMap, concatMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {BLOG_LIST_SUCCESS} from "../actions/type";
//import {fromPromise} from 'rxjs/internal-compatibility';
let api_url = "";
let form_body = '';
let token = '';

const ajaxControl = (action) =>
    ajax({
        url: api_url,
        timeout: 5000,
        method: 'GET',
        headers: {
            "X-API-KEY": actionTypes.REST_KEY,
            'USER-TOKEN': "2BF8MD9TRK78NPQ0RHQ712WERV50QUIDK0N3QRFFZW7OL6G8E0WTMGJYHKAOOGJZA4SO23NI98SP5L1L2EL67829CS6V21QZS4WFP6K8RK8669QJ2J6QVHFTWOOZ8Y22",
        },
        body: {

        }
    }).pipe(
        map(response => ({
            type: actionTypes.BLOG_LIST_SUCCESS,
            payload: response.response
        })),
        catchError(error => {
            let data_error = {
                type: actionTypes.BLOG_LIST_ERROR,
                payload: { connect: false }
            };
            return of(data_error);
        })
    );
const blogListEpic = (action$, store) => action$.pipe(
    ofType(actionTypes.BLOG_LIST),
    concatMap(action => of('').pipe(
        map(res => {
            let keyword='';
            api_url = actionTypes.BASE_URL_API + "customer/News/list";
        })
    ).pipe(switchMap(act => ajaxControl())))
);


export default blogListEpic;
