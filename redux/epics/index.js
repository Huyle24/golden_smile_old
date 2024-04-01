import {combineEpics} from 'redux-observable';
import fetchBrandListEpic from './fetchBrandListEpic';
import fetchCategoryListEpic from './fetchCategoryListEpic';
import fetchProductListEpic from './fetchProductListEpic';
import tourPrivateListEpic from './tourPrivateListEpic';
import tourJointListEpic from "./tourJointListEpic";
import userInfoEpic from "./userInfoEpic";
import golfListEpic from './golfListEpic';
import tourDetailEpic from './tourDetailEpic';
import addCartListEpic from './addCartListEpic';
import addCartDetailEpic from './addCartDetailEpic';
import golfDetailEpic from './golfDetailEpic';
import nameScorecardEpic from './nameScorecardEpic';
import countryUserEpic from './countryUserEpic';
import slideImageListEpic from './slideImageListEpic';
import newListEpic from './newListEpic';
import newDetailEpic from './newDetailEpic';
import allNewListEpic from './allNewListEpic';
import golfPackageListEpic from './golfPackageListEpic';
import golfPackageDetailEpic from './golfPackageDetailEpic'
import golfPackagePriceEpic from './golfPackagePriceEpic'
import golfPriceEpic from './golfPriceEpic'
import hotelListEpic from './hotelListEpic'
import hotelDetailEpic from './hotelDetailEpic'
import hotelPriceEpic from './hotelPriceEpic'
import languageListEpic from './languageListEpic'
import languageDetailEpic from './languageDetailEpic'
import orderViewDetailEpic from './orderViewDetailEpic'
import setupAddressEpic from './setupAddressEpic'

import cityListEpic from './cityListEpic'
import setupAddressDetailEpic from './setupAddressDetailEpic'
import fetchTourDetailW3Epic from "./fetchTourDetailW3Epic";
import orderHistoryEpic from './orderHistoryEpic'
import tourInboundListEpic from "./tourInboundListEpic";
import tourPriceDetailEpic from "./tourPriceDetailEpic";
import {fetchCountryList} from "../actions";
import fetchCountryListEpic from "./fetchCountryListEpic";
import fetchListTypeTourismEpic from "./fetchListTypeTourismEpic";
import fetchDateTypeListReducer from "../reducers/fetchDateTypeListReducer";
import fetchDateTypeListEpic from "./fetchDateTypeListEpic";
import fetchInvoiceListEpic from "./fetchInvoiceListEpic";
import tourOutboundListEpic from "./tourOutboundListEpic";
import fetchCityByLocationEpic from "./fetchCityByLocationEpic";
import invoiceDetailEpic from "./invoiceDetailEpic";
import fetchFormatTourEpic from "./fetchFormatTourEpic";
import fetchImgEpic from "./fetchImgEpic";


export default combineEpics(
    userInfoEpic,
    fetchCategoryListEpic,
    fetchBrandListEpic,
    fetchProductListEpic,
    tourPrivateListEpic,
    tourJointListEpic,
    golfListEpic,
    golfDetailEpic,
    golfPriceEpic,
    tourDetailEpic,
    addCartListEpic,
    addCartDetailEpic,
    nameScorecardEpic,
    countryUserEpic,
    slideImageListEpic,
    newListEpic,
    newDetailEpic,
    allNewListEpic,
    golfPackageListEpic,
    golfPackageDetailEpic,
    golfPackagePriceEpic,
    hotelListEpic,
    hotelDetailEpic,
    hotelPriceEpic,
    languageListEpic,
    languageDetailEpic,
    cityListEpic,
    orderViewDetailEpic,
    setupAddressEpic,
    setupAddressDetailEpic,
    fetchTourDetailW3Epic,
    orderHistoryEpic,
    tourInboundListEpic,
    tourPriceDetailEpic,
    fetchCountryListEpic,
    fetchListTypeTourismEpic,
    fetchDateTypeListEpic,
    fetchInvoiceListEpic,
    tourOutboundListEpic,
    fetchCityByLocationEpic,
    invoiceDetailEpic,
    fetchFormatTourEpic,
    fetchImgEpic
)

