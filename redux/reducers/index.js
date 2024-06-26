import { combineReducers } from 'redux';
import userInfoReducer from "./userInfoReducer";
import fetchCategoryListReducer from "./fetchCategoryListReducer";
import fetchBrandListReducer from './fetchBrandListReducer';
import fetchProductListReducer from './fetchProductListReducer';
import tourPrivateListReducer from './tourPrivateListReducer';
import tourJointListReducer from './tourJointListReducer';

import tourDetailReducer from './tourDetailReducer';
import golfDetailReducer from './golfDetailReducer';
import golfListReducer from './golfListReducer';
import addCartListReducer from './addCartListReducer';
import nameScorecardReducer from './nameScorecardReducer';
import countryUserReducer from './countryUserReducer';
import slideImageListReducer from './slideImageListReducer';
import newListReducer from './newListReducer';
import newDetailReducer from './newDetailReducer';
import allNewListReducer from './allNewListReducer';
import golfPackageListReducer from './golfPackageListReducer';
import golfPackageDetailReducer from './golfPackageDetailReducer';
import golfPackagePriceReducer from './golfPackagePriceReducer';
import golfPriceReducer from './golfPriceReducer';
import hotelListReducer from './hotelListReducer';
import hotelDetailReducer from './hotelDetailReducer';
import hotelPriceReducer from './hotelPriceReducer';
import languageListReducer from './languageListReducer';
import tourDetailW3Reducer from "./tourDetailW3Reducer";
import languageDetailReducer from './languageDetailReducer';
import addCartDetailReducer from './addCartDetailReducer';
import orderViewDetailReducer from './orderViewDetailReducer';
import setupAddressReducer from './setupAddressReducer';
import cityListReducer from './cityListReducer';
import setupAddressDetailReducer from './setupAddressDetailReducer';
import orderHistoryReducer from './orderHistoryReducer';
import addToCartReducer from "./addToCartReducer";
import addProductWatchedReducer from './addProductWatchedReducer';
import tourInboundListReducer from "./tourInboundListReducer";
import tourPriceDetailReducer from "./tourPriceDetailReducer";
import orderDataReducer from "./orderDataReducer";
import fetchCountryListReducer from "./fetchCountryListReducer"
import fetchListTypeTourismReducer from "./fetchListTypeTourismReducer";
import fetchDateTypeListReducer from "./fetchDateTypeListReducer";
import updateFilterValuesReducer from "./updateFilterValuesReducer";
import fetchInvoiceListReducer from "./fetchInvoiceListReducer";
import outboundListReducer from "./outboundListReducer";
import fetchCityByLocationReducer from "./fetchCityByLocationReducer";
import invoiceDetailReducer from "./invoiceDetailReducer";
import fetchFormatTourReducer from "./fetchFormatTourReducer";
import updatetourOpenChooseReducer from "./updatetourOpenChooseReducer";
import fetchImgReducer from "./fetchImgReducer";


export default combineReducers({
    userInfo: userInfoReducer,
    categoryListInfo: fetchCategoryListReducer,
    brandListInfo: fetchBrandListReducer,
    productListInfo: fetchProductListReducer,
    privateTourListInfo: tourPrivateListReducer,
    jointTourListInfo: tourJointListReducer,
    tourInboundListInfo: tourInboundListReducer,
    tourDetailInfo: tourDetailReducer,
    tourPriceDetailInfo:tourPriceDetailReducer,
    golfDetailInfo: golfDetailReducer,
    golfListInfo: golfListReducer,
    addCartInfo : addCartListReducer,
    addCartDetailInfo : addCartDetailReducer,
    nameScorecardInfo:nameScorecardReducer,
    countryUserInfo:countryUserReducer,
    slideImageListInfo:slideImageListReducer,
    newListInfo:newListReducer,
    newDetailInfo:newDetailReducer,
    allNewListInfo:allNewListReducer,
    golfPackageListInfo:golfPackageListReducer,
    golfPackageDetailInfo:golfPackageDetailReducer,
    golfPackagePriceInfo:golfPackagePriceReducer,
    golfPriceInfo:golfPriceReducer,
    hotelListInfo:hotelListReducer,
    hotelDetailInfo:hotelDetailReducer,
    hotelPriceInfo:hotelPriceReducer,
    languageListInfo:languageListReducer,
    languageDetailInfo:languageDetailReducer,
    cityListInfo:cityListReducer,
    orderViewDetailInfo:orderViewDetailReducer,
    setupAddressInfo:setupAddressReducer,
    tourDetailInfoW3: tourDetailW3Reducer,
    setupAddressDetailInfo:setupAddressDetailReducer,
    orderHistoryInfo:orderHistoryReducer,
    getToCart: addToCartReducer,
    getToProductWatch: addProductWatchedReducer,
    orderDataInfo:orderDataReducer,
    countryListInfo :fetchCountryListReducer,
    fetchListTypeTourismInfo:fetchListTypeTourismReducer,
    fetchDateTypeInfo:fetchDateTypeListReducer,
    updateFilterValuesInfo:updateFilterValuesReducer,
    fetchInvoiceListInfo:fetchInvoiceListReducer,
    outboundListInfo:outboundListReducer,
    cityByLocationInfo: fetchCityByLocationReducer,
    invoiceDetailInfo:invoiceDetailReducer,
    tourFormatListInfo: fetchFormatTourReducer,
    tourOpenChooseInfo:updatetourOpenChooseReducer,
    fetchImgInfo:fetchImgReducer,
});
