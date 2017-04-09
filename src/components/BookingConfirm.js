/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ConfirmationList from './ConfirmationList';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import Base from './base/Base';

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
         <button className = 'col-xs-12 col-md-4' style = {{padding: 15,fontSize: 17, fontWeight: 600,position: 'fixed',bottom:0}} onClick = { this.validateAndConfirm }> Confirm Booking </button>
        </div>
      </div>
    )
  }

  validateAndConfirm() {
    const details = window.bookingDetails;

    details.addresslkey = this.props.location.query.lkey;
    details.timing = this.props.location.query.timing;
    details.date = this.props.location.query.date;
    details.mailId = this.props.location.query.mailId;

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

  confirm(e) {
    Base.showOverlay();
    ajaxObj.type = 'POST'
    ajaxObj.url = ajaxObj.baseUrl + '/sendbookingackforhome';
    ajaxObj.data = { datetime: e.date + '__' + e.timing , addresslkey: e.addresslkey, couponcode: e.couponcode, serviceids: e.serviceids, emailid: e.mailId }
    ajaxObj.success = function() {
      Base.hideOverlay();
      browserHistory.push('/booking/confirmed');
    }
    ajaxObj.error = function(){
      Base.hideOverlay(); browserHistory.push('/oops');
    }
    $.ajax(ajaxObj);
  }
}


