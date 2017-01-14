/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ConfirmationList from './ConfirmationList';
import { browserHistory } from 'react-router';
import $ from 'jquery';

import ajaxObj from '../../data/ajax.json';


export default class BookingConfirm extends React.Component {

  constructor (props){
    super(props);
    this.validateAndConfirm = this.validateAndConfirm.bind(this);
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Confirm Booking' }/>
        <ConfirmationList />
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 pad0'>
         <button className = 'col-xs-12' style = {{padding: 10,fontSize: 14,position: 'fixed',bottom:0}} onClick = { this.validateAndConfirm }> Confirm Booking </button>
        </div>
      </div>
    )
  }

  validateAndConfirm() {
    const details = window.bookingDetails;
    console.log(details.services + ":----:" + JSON.stringify(details));
    if (details.addresslkey && details.timing && details.date && details.mailId && details.services){

      details.serviceids = '';
      const keys = Object.keys(details.services);
      keys.map(function(key){
        details.serviceids = details.serviceids + ',' + key.split('-')[2];
      })

      let bookdate = details.date.split(' ');
      details.date = bookdate[0] + '/' + bookdate[1] + '/' + bookdate[2] + '/' + bookdate[3];

      this.confirm(details);

    }else{
      this.showErrorMsg()
    }
  }

  confirm(e) {
    let self = this;
    ajaxObj.type = 'POST'
    ajaxObj.url = ajaxObj.baseUrl + '/sendbookingackforhome';
    ajaxObj.data = { datetime: e.date + '__' + e.timing , addresslkey: e.addresslkey, couponcode: e.couponcode, serviceids: e.serviceids, emailid: e.mailId }
    ajaxObj.success = function() {
      browserHistory.push('booking/confirmed');
    }
    ajaxObj.error = function(e){
      self.showErrorMsg(e);
    }
    $.ajax(ajaxObj);
  }

  showErrorMsg(e) {
    console.log('Somthing Wrong Happened : ');
  }
}


