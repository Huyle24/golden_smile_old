import * as actionTypes from './type';
import { BASE_URL_API } from "./type";


export const getUserInfo = () => {
    return { type: actionTypes.FETCH_USER_INFO };
};

export const fetchCategoryList = () => {
    return { type: actionTypes.FETCH_CATEGORY_LIST };
};

export const fetchBrandList = () => {
    return { type: actionTypes.FETCH_BRAND_LIST };
};

export const fetchProductList = (off = '', limit = '', q = '', brand_id = '', category_id = '') => {
    return { type: actionTypes.FETCH_PRODUCT_LIST, off: off, limit: limit, q: q, brand_id: brand_id, category_id: category_id };
};

export const fetchTourList = (off = '', limit = '', keyword = '', city_id = '', tour_type = '',typedate = '', date_start = '', date_end = '', outstanding = '') => {
    return { type: actionTypes.TOUR_LIST, off: off, limit: limit, keyword: keyword, city_id: city_id, tour_type: tour_type,typedate: typedate, date_start: date_start, date_end: date_end, outstanding: outstanding };
};

export const fetchTourDetail = (permalink = '', customer_number = '', child_number = '') => {
    return { type: actionTypes.TOUR_DETAIL, permalink: permalink, customer_number: customer_number, child_number: child_number };
};

export const fetchGolfList = (off = '', limit = '',  keyword = '', area = '',hole = '',outstanding = '' ) => {
    return { type: actionTypes.GOLF_LIST, off: off, limit: limit,  keyword: keyword, area:area,hole:hole ,outstanding: outstanding };
};

export const fetchGolfDetail = (permalink = '') => {
    return { type: actionTypes.GOLF_DETAIL, permalink: permalink };
};

export const fetchGolfPrice = (date = '', hole = '', id = '', session_day = '') => {
    return { type: actionTypes.GOLF_PRICE, date: date, hole: hole, id: id, session_day: session_day };
};

export const fetchScorecardDetail = (permalink = '') => {
    return { type: actionTypes.GOLF_SCORECARD, permalink: permalink };
};

export const fetchAddCartList = () => {
    return { type: actionTypes.ADD_CART_LIST };
};

export const fetchAddCartDetail = (type_check = '') => {
    return { type: actionTypes.ADD_CART_DETAIL, type_check: type_check };
};

export const fetchCountryUser = () => {
    return { type: actionTypes.COUNTRY_USER };
};

export const fetchSlideImageList = () => {
    return { type: actionTypes.SLIDE_IMAGE_LIST };
};

export const fetchNewList = () => {
    return { type: actionTypes.NEW_LIST };
};
export const fetchNewDetail = (permalink = '') => {
    return { type: actionTypes.NEW_DETAIL, permalink: permalink };
};
export const fetchAllNewList = () => {
    return { type: actionTypes.ALL_NEW_LIST };
};

export const fetchGolfPackageList = (off = '', limit = '', keyword = '' , typedate = '' ,starhotel= '',outstanding = '') => {
    return { type: actionTypes.GOLF_PACKAGE_LIST, off: off, limit: limit,keyword: keyword,typedate: typedate,starhotel: starhotel,outstanding:outstanding };
};

export const fetchGolfPackageDetail = (permalink = '') => {
    return { type: actionTypes.GOLF_PACKAGE_DETAIL, permalink: permalink };
};

export const fetchGolfPackagePrice = (id = '', customer_number = '', customer_number_child = '', date_start = '', date_end = '', type_hotel = '') => {
    return {
        type: actionTypes.GOLF_PACKAGE_PRICE, id: id, customer_number: customer_number,
        customer_number_child: customer_number_child, date_start: date_start, date_end: date_end, type_hotel: type_hotel
    };
};

export const fetchHotelList = (adult_number = '', child_number = '', room_number = '', keyword = '', date_start = '', date_end = '', off = '', limit = '',area='',start='') => {
    return { type: actionTypes.HOTEL_LIST, adult_number: adult_number, child_number: child_number, room_number: room_number, date_start: date_start, date_end: date_end, keyword: keyword, off: off, limit: limit,area: area,start:start };
};

export const fetchHotelDetail = (permalink = '') => {
    return { type: actionTypes.HOTEL_DETAIL, permalink: permalink };
};

export const fetchHotelPrice = (permalink = '' , date_start = '' ,date_end = '') => {
    return { type: actionTypes.HOTEL_PRICE, permalink: permalink ,date_start:date_start ,date_end:date_end };
};

export const fetchLanguage = () => {
    return { type: actionTypes.LANGUAGE_LIST };
};

export const fetchCityList = () => {
    return { type: actionTypes.CITY_LIST };
};
export const fetchLanguageDetail = () => {
    return { type: actionTypes.LANGUAGE_DETAIL };
};

export const fetchOrderView = (order_code = '') => {
    return { type: actionTypes.ORDER_VIEW_DETAIL, order_code: order_code };
};
export const fetchSetupAddress = (uid = '') => {
    return { type: actionTypes.SETUP_ADDRESS, uid: uid};
};
export const fetchSetupAddressDetail = (id = '') => {
    return { type: actionTypes.SETUP_ADDRESS_DETAIL, id: id};
};
export const fetchOrderHistory = () => {
    return { type: actionTypes.ORDER_HISTORY};
};

export const addToCartAction = (item = [], number_adutl = '', number_child = '') => {
    return {type: actionTypes.ADD_TO_CART, item: item};
}

export const getToCartAction = () => {
    return {type: actionTypes.GET_TO_CART}
}

export const fetchBlogDetail = (id = '') => {
    return {type: actionTypes.BLOG_DETAIL, id: id};
}

export const fetchBlogList = () => {
    return {type: actionTypes.BLOG_LIST}
}

export const fetchTourDetailW3 = (id = '') => {
    return {type: actionTypes.TOUR_DETAIL_W3, id:id}
}

export const removeCartAction = (id = '') => {
    return {type: actionTypes.REMOVE_ITEM_CART, id:''}
}

export const fetchCountHotelList = () => {
    return {type: actionTypes.COUNT_HOTEL}
}

export const addToWatchedAction = (item = []) => {
    return {type: actionTypes.ADD_PRODUCT_WATCHED, item: item};
}

export const getToProductWatchedAction = () => {
    return {type: actionTypes.GET_PRODUCT_WATCHED}
}

export const removeWatchedAction = (id = '') => {
    return {type: actionTypes.REMOVE_ITEM_WATCHED, id:''}
}
