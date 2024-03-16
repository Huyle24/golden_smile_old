import React, { Component } from 'react';
import * as actionTypes from '../actions/type';
import { from, of, throwError } from 'rxjs';
import { mergeMap, map, takeUntil, delay, tap, catchError, switchMap, concatMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {JOINT_TOUR_LIST, JOINT_TOUR_LIST_ERROR, JOINT_TOUR_LIST_SUCCESS} from "../actions/type";
//import {fromPromise} from 'rxjs/internal-compatibility';
let api_url = "";
let form_body = '';
let token = '';

const ajaxControl = (user_token, action) =>
    ajax({
        url: api_url,
        timeout: 20000,
        method:'GET',
        headers: {
            "X-API-KEY": actionTypes.REST_KEY,
            'USER-TOKEN': user_token,
            'LANG-CODE': JSON.parse(actionTypes.GET_LANG_CODE()),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: {

        }
    }).pipe(
        map(response => ({
            type: actionTypes.JOINT_TOUR_LIST_SUCCESS,
            payload: response.response
        })),
        catchError(error => {
            let data_error = {
                type: actionTypes.JOINT_TOUR_LIST_ERROR,
                payload: { connect: false }
            };
            return of(data_error);
        })
    );
const tourPrivateListEpic = (action$, store) => action$.pipe(
    ofType(actionTypes.JOINT_TOUR_LIST),
    concatMap(action => of('').pipe(
        map(res => {
            let keyword='';
            api_url = actionTypes.BASE_URL_API + "Balotour/TourOpen/TourOpen?off=" + action.off+
            "&limit=" + action.limit+
            "&keyword=" + action.keyword+
            "&number_customer_filter=" + action.number_customer_filter +
            "&country_start_id=" + action.country_start_id+
            "&country_end_id=" + action.country_end_id+
            "&city_start_id=" + action.city_start_id+
            "&city_end_id=" + action.city_end_id +
            "&date_start_tour=" + action.date_start_tour+
            "&date_end_tour=" + action.date_end_tour+
            "&tour_type=" + action.tour_type  +
            "&outstanding=" + action.outstanding+
            "&typedate=" + action.typedate+
            "&format_tour"+ action.format_tour+
            "&type_tourism_id"+ action.type_tourism_id;



            console.log(api_url)
        })
    ).pipe(switchMap(act => ajaxControl(token))))
);


export default tourPrivateListEpic;
