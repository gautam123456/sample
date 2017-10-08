import {FETCHED_ITEMS, FETCHED_USER, NON_FETCHED_USER,
  SAVE_LOGIN_DATA, USER_REGISTERED, CART_UPDATED,
  SAVE_BOOKING_DATA, ADDRESS_SELECTED,COUPON_APPLIED,
  SAVE_BOOKED_DATA, CLEAR_CART, UPDATE_REFETCH_FLAG, E} from '../constants';
import $ from 'jquery';
import ajaxObj from '../../data/ajax.json';
import {browserHistory} from 'react-router';
import Base from '../components/base/Base';

function fetchedItems(items) {
  return {
    type: FETCHED_ITEMS,
    items
  };
}

function fetchedUser(details) {
  return {
    type: FETCHED_USER,
    details
  };
}

function nonFetchedUser() {
  return {
    type: NON_FETCHED_USER
  };
}

function saveUserLoginData(data) {
  return {
    type: SAVE_LOGIN_DATA,
    data
  };
}

function noMoreNewUser() {
  return {
    type: USER_REGISTERED
  };
}

function bookingDetailsUpdated(options) {
  return {
    type: CART_UPDATED,
    options
  };
}

function saveUserBookingData(options){
  return {
    type: SAVE_BOOKING_DATA,
    options
  };
}

function userAddressSelected(options) {
  return {
    type: ADDRESS_SELECTED,
    options
  };
}

function couponCodeApplied(options) {
  return {
    type: COUPON_APPLIED,
    options
  };
}
function saveSuccessBookedData(data) {
  return {
    type: SAVE_BOOKED_DATA,
    data
  };
}

function clearedCart() {
  return {
    type: CLEAR_CART
  };
}

function reFetchDetails(flag) {
  return {
    type: UPDATE_REFETCH_FLAG,
    flag
  };
}

export function getItems() {
  return (dispatch) => {
    ajaxObj.url = 'https://static.lookplex.com/data/items.json';
    ajaxObj.type = 'GET';
    ajaxObj.data = '';
    ajaxObj.xhrFields = {withCredentials: false};
    ajaxObj.success = (items) => {
      ajaxObj.xhrFields = {withCredentials: true};
      return dispatch(fetchedItems(items));
    }
    $.ajax(ajaxObj);
  };
}

export function getUserDetails() {
  return (dispatch) => {
    ajaxObj.url = ajaxObj.baseUrl + '/isloggedinnew';
    ajaxObj.type = 'GET';
    ajaxObj.dataType = "json";
    ajaxObj.data = '';
    ajaxObj.xhrFields = {withCredentials: true};
    ajaxObj.success = (details) => {
      Base.hideOverlay();
      return dispatch(fetchedUser(details));
    }
    ajaxObj.error = () => {
      Base.hideOverlay();
      return dispatch(nonFetchedUser());
    }
    $.ajax(ajaxObj);
  };
}

export function logOut() {
  return (dispatch) => {
    ajaxObj.url = ajaxObj.baseUrl + '/custlogout';
    ajaxObj.type = 'GET';
    ajaxObj.data = '';
    ajaxObj.success = () => {
      Base.hideOverlay();
      return dispatch(nonFetchedUser());
    }
    $.ajax(ajaxObj);
  };
}

export function logIn(data, showNotification, navigateTo = '') {
  return (dispatch) => {
    ajaxObj.url = ajaxObj.baseUrl + '/loginguestcustomer';
    ajaxObj.data = data;
    ajaxObj.success = (details) => {
      browserHistory.push(navigateTo);
      Base.hideOverlay();
      return dispatch(fetchedUser(details));
    }
    ajaxObj.error = (e) => {
      Base.hideOverlay();
      showNotification(E, e.responseText, 4000, 30);
    }
    $.ajax(ajaxObj);
  };
}

export function registerUser(data, showNotification, navigateTo, successCallBack) {
  return (dispatch) => {
    ajaxObj.url = ajaxObj.baseUrl + '/saveguestcustomer';
    ajaxObj.data = data;
    ajaxObj.success = (details) => {
      navigateTo !== null ? browserHistory.push(navigateTo) : null;
      Base.hideOverlay();
      successCallBack();
      Base.track('track', 'CompleteRegistration');
      return dispatch(fetchedUser(details));
    }
    ajaxObj.error = (e) => {
      Base.hideOverlay();
      showNotification(E, e.responseText, 4000, 30);
    }
    $.ajax(ajaxObj);
  };
}

export function saveLoginData(data) {
  return (dispatch) => {
    return dispatch(saveUserLoginData(data));
  };
}

export function userRegistered() {
  return (dispatch) => {
    return dispatch(noMoreNewUser());
  };
}

export function bookingDetailsChanged(options) {
  return (dispatch) => {
    return dispatch(bookingDetailsUpdated(options));
  };
}

export function saveBookingData(options) {
  return (dispatch) => {
    return dispatch(saveUserBookingData(options));
  };
}

export function addressSelected(options) {
  return (dispatch) => {
    return dispatch(userAddressSelected(options));
  };
}

export function couponApplied(options) {
  return (dispatch) => {
    return dispatch(couponCodeApplied(options));
  };
}

export function saveBookedData(data) {
  return (dispatch) => {
    return dispatch(saveSuccessBookedData(data));
  };
}

export function clearCart() {
  return (dispatch) => {
    return dispatch(clearedCart());
  };
}

export function reFetchUserDetails(flag) {
  return (dispatch) => {
    return dispatch(reFetchDetails(flag));
  };
}


