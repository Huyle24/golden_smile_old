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

const ajaxControl = (action) =>
    ajax({
        url: api_url,
        timeout: 5000,
        method: 'GET',
        headers: {
            "X-API-KEY": actionTypes.REST_KEY,
            'USER-TOKEN': "IUEDKJAHKSB69A8MF378MPXG71L4RDWEB1I6VIH66LOGLJ2YI03QXAQ69H5YHCLZRL5DXQ9UFQKNQP740QT6MBFWB1EZP3V9KVKR6KX18G1P2T49XYM500LTHTW81OGF",
        },
        body: {

        }
    }).pipe(
        map(response => ({
            type: actionTypes.BLOG_DETAIL_SUCCESS,
            payload: response.response
        })),
        catchError(error => {
            let data_error = {
                type: actionTypes.BLOG_DETAIL_ERROR,
                payload: { connect: false }
            };
            return of(data_error);
        })
    );
const blogDetailEpic = (action$, store) => action$.pipe(
    ofType(actionTypes.BLOG_DETAIL),
    concatMap(action => of('').pipe(
        map(res => {
            api_url = "https://vigomanager.com/api/customer/Golf/details?id=" + action.id;

        })
    ).pipe(switchMap(act => ajaxControl())))
);


export default blogDetailEpic;
