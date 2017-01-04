import 'styles/salonathome.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';

import App from './components/Main';
import Address from './components/Address';
import AddAddress from './components/AddAddress';
import BookingConfirm from './components/BookingConfirm';
import BookingSummary from './components/BookingSummary';
import FullCart from './components/FullCart';
import Login from './components/Login';
import OrderConfirm from './components/OrderConfirm';
import OTPConfirm from './components/OTPConfirm';
import Search from './components/Search';

// Render the main component into the dom

ReactDOM.render(
  <Router history = { browserHistory }>
    <Route path = { '/' } component = { App } />
    <Route path = { 'address' } component = { Address } />
    <Route path = { 'address/add' } component = { AddAddress } />
    <Route path = { 'booking/confirmed' } component = { BookingConfirm } />
    <Route path = { 'book' } component = { BookingSummary } />
    <Route path = { 'cart' } component = { FullCart } />
    <Route path = { 'login' } component = { Login } />
    <Route path = { 'order/confirm' } component = { OrderConfirm } />
    <Route path = { 'otp/confirm' } component = { OTPConfirm } />
    <Route path = { 'search' } component = { Search } />
  </Router>
, document.getElementById('app'));


