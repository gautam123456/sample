import 'styles/salonathome.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory  } from 'react-router';

import App from './components/Main';
import AddAddress from './components/AddAddress';
import AddressList from './components/AddressList';
import BaseComponent from './components/base/Base';
import BookingConfirm from './components/BookingConfirm';
import BookingSummary from './components/BookingSummary';
import FullCart from './components/FullCart';
import Gallery from './components/Gallery';
import GalleryHome from './components/GalleryHome';
import Loader from './components/Loader';
import Login from './components/Login';
import OrderConfirm from './components/OrderConfirm';
import OTPConfirm from './components/OTPConfirm';
import RegisterUser from './components/RegisterUser';
import ThankYou from './components/ThankYou';
import ErrorPage from './components/ErrorPage';
import SomethingWentWrong from './components/SomethingWentWrong';
import FooterPage from './components/FooterPage';



const Base = new BaseComponent();
// Render the main component into the dom

render(
  <Router history = { browserHistory } onEnter = { Base.routerInvoked() }>
    <Route path = { '/' } component = { App } />
    <Route path = { 'address' } component = { AddressList } />
    <Route path = { 'address/add' } component = { AddAddress } />
    <Route path = { 'booking/confirm' } component = { BookingConfirm } />
    <Route path = { 'booking/confirmed' } component = { ThankYou } />
    <Route path = { 'book' } component = { BookingSummary } />
    <Route path = { 'cart' } component = { FullCart } />
    <Route path = { 'gallery' } component = { GalleryHome } />
    <Route path = { 'gallery/bridal' } component = { Gallery } />
    <Route path = { 'loader' } component = { Loader } />
    <Route path = { 'login' } component = { Login }  />
    <Route path = { 'register' } component = { RegisterUser } />
    <Route path = { 'order/confirm/9' } component = { OrderConfirm } />
    <Route path = { 'otp/confirm' } component = { OTPConfirm } />
    <Route path = { 'about-us' } component = { FooterPage } />
    <Route path = { 'contact-us' } component = { FooterPage } />
    <Route path = { 'privacy-policy' } component = { FooterPage } />
    <Route path = { 'terms-of-service' } component = { FooterPage } />
    <Route path = { 'oops' } component = { SomethingWentWrong } />
    <Route path = { '*' } component = { ErrorPage } />
  </Router>
, document.getElementById('app'));



