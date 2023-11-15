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
            type: actionTypes.HOTEL_LIST_SUCCESS,
            payload: response.response
        })),
        catchError(error => {
            let data_error = {
                type: actionTypes.HOTEL_LIST_ERROR,
                payload: { connect: false }
            };
            return of(data_error);
        })
    );
const hotelListEpic = (action$, store) => action$.pipe(
    ofType(actionTypes.HOTEL_LIST),
    concatMap(action => of('').pipe(
        map(res => {

            api_url = actionTypes.BASE_URL_API + "Balotour/Hotel/find_hotel_point?adult_number=" + action.adult_number + "&child_number=" + action.child_number +"&room_number=" + action.room_number + "&keyword=" + action.keyword + 
            "&date_start=" + action.date_start + "&date_end=" + action.date_end + "&off=" + action.off + "&limit=" + action.limit + "&area=" + action.area + "&start=" + action.start ;

        })
    ).pipe(switchMap(act => ajaxControl(token))))
);


export default hotelListEpic;
