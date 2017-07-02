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
    this.state = {
      notify: {
        show: false,
        type: 'info',
        timeout: 4000,
        msg:'',
        top: 30
      }
    }

    this.validateAndConfirm = this.validateAndConfirm.bind(this);
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Confirm Booking' }/>
        <TopNotification data={this.state.notify}/>
        <ConfirmationList showNotification={this.showNotification.bind(this)}/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 pad0'>
         <button className = 'col-xs-12 col-md-4' style = {{padding: 15,fontSize: 17, fontWeight: 600,position: 'fixed',bottom:0}} onClick = { this.validateAndConfirm }> Confirm Booking </button>
        </div>
      </div>
    )
  }

  validateAndConfirm() {
    const details = Base.sandbox.bookingDetails,
      sandbox = Base.sandbox;

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

    }
  }

  showNotification(type, msg, timeout, top) {
    this.setState({notify: {show: true, timeout, type, msg, top}})
  }

  confirm(e) {
    fbq('track', 'Purchase', {value: '1.00', currency: 'USD'});
    Base.showOverlay();
    ajaxObj.type = 'POST'
    ajaxObj.url = ajaxObj.baseUrl + '/sendbookingackforhome';
    ajaxObj.data = { datetime: e.date + '__' + e.timing , addresslkey: e.addresslkey, couponcode: e.couponcode, serviceids: e.serviceids, emailid: e.mailId, comment: e.comment }
    ajaxObj.success = function(data) {
      Base.hideOverlay();
      Base.sandbox.moneySaved = data.moneySaved;
      Base.sandbox.finalAmount = data.finalAmount;
      browserHistory.push('/booking/confirmed');
    }
    ajaxObj.error = function(){
      Base.hideOverlay(); browserHistory.push('/oops');
    }
    $.ajax(ajaxObj);
  }
}


