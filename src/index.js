import 'styles/salonathome.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory  } from 'react-router';

import App from './components/Main';
import Address from './components/Address';
import AddAddress from './components/AddAddress';
import BaseComponent from './components/base/Base';
import BookingConfirm from './components/BookingConfirm';
import BookingSummary from './components/BookingSummary';
import FullCart from './components/FullCart';
import Login from './components/Login';
import OrderConfirm from './components/OrderConfirm';
import OTPConfirm from './components/OTPConfirm';
import Search from './components/Search';
import RegisterUser from './components/RegisterUser';

const Base = new BaseComponent();
// Render the main component into the dom

render(
  <Router history = { browserHistory } onEnter = { Base.routerInvoked() }>
    <Route path = { '/' } component = { App } />
    <Route path = { 'address' } component = { Address } />
    <Route path = { 'address/add' } component = { AddAddress } />
    <Route path = { 'booking/confirmed' } component = { BookingConfirm } />
    <Route path = { 'book' } component = { BookingSummary } />
    <Route path = { 'cart' } component = { FullCart } />
    <Route path = { 'login' } component = { Login }  />
    <Route path = { 'register' } component = { RegisterUser } />
    <Route path = { 'order/confirm' } component = { OrderConfirm } />
    <Route path = { 'otp/confirm' } component = { OTPConfirm } />
    <Route path = { 'search' } component = { Search } />
  </Router>
, document.getElementById('app'));


