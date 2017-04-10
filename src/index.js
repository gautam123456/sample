import 'styles/salonathome.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory  } from 'react-router';

import App from './components/Main';
import AddAddress from './components/AddAddress';
import AddressList from './components/AddressList';
import Base from './components/base/Base';
import BookingConfirm from './components/BookingConfirm';
import BookingSummary from './components/BookingSummary';
import Cancel from './components/Cancel';
import FullCart from './components/FullCart';
import Gallery from './components/Gallery';
import GalleryHome from './components/GalleryHome';
import Loader from './components/Loader';
import Login from './components/Login';
import OrderConfirm from './components/OrderConfirm';
import OTPConfirm from './components/OTPConfirm';
import Offers from './components/Offers';
import Reschedule from './components/Reschedule';
import RegisterUser from './components/RegisterUser';
import ThankYou from './components/ThankYou';
import ErrorPage from './components/ErrorPage';
import Shell from './components/base/Shell';
import SomethingWentWrong from './components/SomethingWentWrong';
import FooterPage from './components/FooterPage';
import Appointments from './components/AppointmentList';


render(
  <Router history = { browserHistory } onEnter = { Base.routerInvoked() }>
    <Route path = { '/' } component = { App } />
    <Route path = { 'face' } component = { App } />
    <Route path = { 'body' } component = { App } />
    <Route path = { 'hair' } component = { App } />
    <Route path = { 'makeup' } component = { App } />
    <Route path = { 'packages' } component = { App } />
    <Route path = { 'address' } component = { AddressList } />
    <Route path = { 'address/add' } component = { AddAddress } />
    <Route path = { 'appointments' } component = { Appointments } />
    <Route path = { 'booking/confirm' } component = { BookingConfirm } />
    <Route path = { 'booking/confirmed' } component = { ThankYou } />
    <Route path = { 'book' } component = { BookingSummary } />
    <Route path = { 'cart' } component = { FullCart } />
    <Route path = { 'cancel' } component = { Cancel } />
    <Route path = { 'reschedule' } component = { Reschedule } />
    <Route path = { 'gallery' } component = { GalleryHome } />
    <Route path = { 'gallery/bridal' } component = { Gallery } />
    <Route path = { 'loader' } component = { Loader } />
    <Route path = { 'login' } component = { Login }  />
    <Route path = { 'register' } component = { RegisterUser } />
    <Route path = { 'order/details' } component = { OrderConfirm } />
    <Route path = { 'otp/confirm' } component = { OTPConfirm } />
    <Route path = { 'offers' } component = { Offers } />
    <Route path = { 'about-us' } component = { FooterPage } />
    <Route path = { 'contact-us' } component = { FooterPage } />
    <Route path = { 'privacy-policy' } component = { FooterPage } />
    <Route path = { 'terms-of-service' } component = { FooterPage } />
    <Route path = { 'oops' } component = { SomethingWentWrong } />
    <Route path = { 'shell' } component = { Shell } />
    <Route path = { '*' } component = { ErrorPage } />
  </Router>
, document.getElementById('app'));



