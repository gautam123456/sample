/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ConfirmationList from './ConfirmationList';
import TopNotification from './TopNotification';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';


export default class BookingConfirm extends React.Component {

  constructor (props){
    super(props);

    Base.sandbox.bookingDetails.discount = Base.offerbox.discount;
    Base.offerbox.discount ? Base.sandbox.bookingDetails.couponcode = Base.offerbox.coupon : null;

    this.state = {
      refDiscount: 0,
      discount: Base.sandbox.bookingDetails.discount,
      bookedItemList: Base.sandbox.bookingDetails,
      complementaryOffer: null,
      notify: {
        show: false,
        type: 'info',
        timeout: 4000,
        msg:'',
        top: 30
      }
    }

    this.validateAndConfirm = this.validateAndConfirm.bind(this);
    this.updateDiscount = this.updateDiscount.bind(this);
  }

  componentDidMount() {
    this.checkReferal();
  }

  checkReferal() {
    const self = this;
    ajaxObj.url = ajaxObj.baseUrl + '/isloggedinnew';
    ajaxObj.type = 'GET';
    ajaxObj.data = '';
    ajaxObj.success = function(data) {
      self.setState({refDiscount: data.refCount ? 200 : 0});
    }
    ajaxObj.error = function() {
    }
    $.ajax(ajaxObj);
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Confirm Booking' }/>
        <TopNotification data={this.state.notify}/>
        <ConfirmationList showNotification={this.showNotification.bind(this)} updateDiscount={this.updateDiscount} refDiscount={this.state.refDiscount} complementaryOffer={this.state.complementaryOffer} discount={this.state.discount}/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 pad0'>
         <button className = 'col-xs-12 col-md-4 cli' style = {{padding: 15, fontSize: 17, fontWeight: 600, position: 'fixed', bottom:0}} onClick = { this.validateAndConfirm }> Confirm Booking </button>
        </div>
      </div>
    )
  }

  updateDiscount(discount, msg, complementaryOffer) {
    this.setState({discount, complementaryOffer});
    this.showNotification('success', msg, 4000, 30);
  }

  validateAndConfirm() {
    const details = Base.sandbox.bookingDetails,
      sandbox = Base.sandbox;

    if ((details.subTotal - (details.subTotal * this.state.discount)/100 - this.state.refDiscount) > 800) {
      details.addresslkey = sandbox.lkey;
      details.timing = sandbox.timing;
      details.date = sandbox.month + '/' + sandbox.date + '/' + sandbox.year;
      details.mailId = sandbox.mailId;

      if (details.addresslkey && details.timing && details.date && details.mailId && details.services){

        details.serviceids = '';
        const keys = Object.keys(details.services);
        keys.map(function(key){
          details.serviceids = key.split('-')[2] + '-' + details.services[key].count + ',' + details.serviceids;
        })

        details.serviceids = details.serviceids.substr(0, details.serviceids.length-1);
        this.confirm(details);
      } else {
        this.showNotification('error', 'Some data lost due to your page refresh, please restart the booking flow', 4000, 40);
      }
    } else {
      this.showNotification('error', 'Minimum booking amount in Rs.800, please add more services', 4000, 40);
    }

  }

  showNotification(type, msg, timeout, top) {
    this.setState({notify: {show: true, timeout, type, msg, top}})
  }

  confirm(e) {
    const self = this;
    Base.showOverlay();
    ajaxObj.type = 'POST'
    ajaxObj.url = ajaxObj.baseUrl + '/sendbookingackforhome';
    ajaxObj.data = { datetime: e.date + '__' + e.timing , addresslkey: e.addresslkey, couponcode: e.couponcode, serviceids: e.serviceids, emailid: e.mailId, comment: e.comment }
    ajaxObj.success = function(data) {
      Base.hideOverlay();
      Base.sandbox.moneySaved = data.moneySaved;
      Base.sandbox.finalAmount = data.finalAmount;
      Base.sandbox.bookingID = data.bookingID;
      Base.clearCart();
      Base.track('track', 'Purchase', {value: data.finalAmount, currency: 'INR'});
      Base.logEvent('Booking Confirmed', 'Booking Id ' + data.bookingID, Base.sandbox.source);
      browserHistory.push('/booking/confirmed');
    }
    ajaxObj.error = function(e){
      Base.hideOverlay();
      self.showNotification('error', e.responseJSON.message, 4000, 30);
    }
    $.ajax(ajaxObj);
  }
}


