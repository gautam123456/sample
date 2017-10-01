import * as types from '../constants';
import $ from 'jquery';
import ajaxObj from '../../data/ajax.json';
import {browserHistory} from 'react-router';
import Base from '../components/base/Base';

function fetchedItems(items) {
  return {
    type: types.FETCHED_ITEMS,
    items
  };
}

function fetchedUser(details) {
  return {
    type: types.FETCHED_USER,
    details
  };
}

function nonFetchedUser() {
  return {
    type: types.NON_FETCHED_USER
  };
}

function saveUserLoginData(data) {
  return {
    type: types.SAVE_LOGIN_DATA,
    data
  };
}

function noMoreNewUser() {
  return {
    type: types.USER_REGISTERED
  };
}

function bookingDetailsUpdated(options) {
  return {
    type: types.CART_UPDATED,
    options
  };
}

function saveServersTime(options) {
  return {
    type: types.CART_UPDATED,
    options
  };
}

function saveUserBookingData(options){
  return {
    type: types.SAVE_BOOKING_DATA,
    options
  };
}

function userAddressSelected(options) {
  return {
    type: types.ADDRESS_SELECTED,
    options
  };
}

function couponCodeApplied(options) {
  return {
    type: types.COUPON_APPLIED,
    options
  };
}

export function getItems() {
  return (dispatch) => {
    ajaxObj.url = 'https://static.lookplex.com/data/items.json';
    ajaxObj.type = 'GET';
    ajaxObj.data = '';
    ajaxObj.xhrFields = {withCredentials: false};
    ajaxObj.success = function(items) {
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
    ajaxObj.data = '';
    ajaxObj.xhrFields = {withCredentials: true};
    ajaxObj.success = function(details) {
      return dispatch(fetchedUser(details));
    }
    ajaxObj.error = function() {
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
    ajaxObj.success = function() {
      Base.hideOverlay();
      return dispatch(nonFetchedUser());
    }
    $.ajax(ajaxObj);
  };
}

export function logIn(data, showNotification) {
  return (dispatch) => {
    ajaxObj.url = ajaxObj.baseUrl + '/loginguestcustomer';
    ajaxObj.data = data;
    ajaxObj.success = function(details) {
      browserHistory.push('');
      Base.hideOverlay();
      return dispatch(fetchedUser(details));
    }
    ajaxObj.error = function(e) {
      Base.hideOverlay();
      showNotification('error', e.responseText, 4000, 30);
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

export function saveServerTime(options) {
  return (dispatch) => {
    return dispatch(saveServersTime(options));
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


