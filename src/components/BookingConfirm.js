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
import {connect} from 'react-redux';
import {saveBookedData, clearCart} from '../actions';

import {E, S, MIN_BOOKING, REFRESH} from '../constants';
import ajaxObj from '../../data/ajax.json';

class BookingConfirm extends React.Component {

  constructor (props){
    super(props);

    //Base.sandbox.bookingDetails.discount = Base.offerbox.discount;
    //Base.offerbox.discount ? Base.sandbox.bookingDetails.couponcode = Base.offerbox.coupon : null;

    this.state = {
      complementaryOffer: null,
      notify: {
        show: false,
        type: 'info',
        timeout: 4000,
        msg:'',
        top: 30
      }
    }
  }

  componentDidMount() {
    //this.checkReferal();
  }

  checkReferal() {
    //const self = this;
    //ajaxObj.url = ajaxObj.baseUrl + '/isloggedinnew';
    //ajaxObj.type = 'GET';
    //ajaxObj.data = '';
    //ajaxObj.success = function(data) {
    //  self.setState({refDiscount: data.refCount ? 200 : 0});
    //}
    //ajaxObj.error = function() {
    //}
    //$.ajax(ajaxObj);
  }

  render() {
    const {notify, refDiscount, complementaryOffer, discount} = this.state;

    return (
      <div>
        <ActivityHeader heading = { 'Confirm Booking' }/>
        <TopNotification data={notify}/>
        <ConfirmationList showNotification={this.showNotification} updateDiscount={this.updateDiscount} complementaryOffer={complementaryOffer} />
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 pad0'>
         <button className = 'col-xs-12 col-md-4 cli' style = {{padding: 15, fontSize: 17, fontWeight: 600, position: 'fixed', bottom:0}} onClick = { this.validateAndConfirm }> Confirm Booking </button>
        </div>
      </div>
    )
  }

  updateDiscount = (discount, msg, complementaryOffer) => {
    //this.setState({discount, complementaryOffer});
    this.showNotification(S, msg, 4000, 30);
  }

  validateAndConfirm = () => {
    const {userDetails : {details: {refCount}}, bookingDetails: {total, minBooking, addressLKey, timing, date, emailId, services, couponCode, comment}} = this.props,
      refDiscount = refCount ? 200 : 0,
      details = {
        date,
        timing,
        addressLKey,
        emailId,
        couponCode,
        comment
      };

    if ((total - refDiscount) > minBooking) {
      if (addressLKey && timing && date && emailId && services){

        details.serviceids = '';
        const keys = Object.keys(services);
        keys.map(function(key){
          details.serviceids = key.split('-')[2] + '-' + services[key].count + ',' + details.serviceids;
        })

        details.serviceids = details.serviceids.substr(0, details.serviceids.length-1);
        this.confirm(details);
      } else {
        this.showNotification(E, REFRESH, 4000, 40);
      }
    } else {
      this.showNotification(E, MIN_BOOKING, 4000, 40);
    }
  }

  showNotification = (type, msg, timeout, top) => {
    this.setState({notify: {show: true, timeout, type, msg, top}})
  }

  confirm = (e) => {
    //console.log(Base.sandbox);
    //console.log(JSON.stringify(Base.sandbox));
    //console.log(localStorage);
    //console.log(JSON.stringify(localStorage));

    const self = this;
    Base.showOverlay();
    ajaxObj.type = 'POST';
    ajaxObj.dataType = "json";
    ajaxObj.url = ajaxObj.baseUrl + '/sendbookingackforhome';
    ajaxObj.data = { datetime: e.date + '__' + e.timing , addresslkey: e.addressLKey, couponcode: e.couponCode, serviceids: e.serviceids, emailid: e.emailId, comment: e.comment }
    ajaxObj.success = (data) => {
      Base.hideOverlay();
      //const {moneySaved, finalAmount, bookingID} = data;

      this.props.saveBookedData(data);
      this.props.clearCart();
      //Base.sandbox.moneySaved = data.moneySaved;
      //Base.sandbox.finalAmount = data.finalAmount;
      //Base.sandbox.bookingID = data.bookingID;
      //Base.clearCart();
      Base.track('track', 'Purchase', {value: data.finalAmount, currency: 'INR', content_name: Base.sandbox.source});
      Base.logEvent('Booking Confirmed', 'Booking Id ' + data.bookingID, Base.sandbox.source);
      browserHistory.push('/booking/confirmed');
    }
    ajaxObj.error = (e) => {
      Base.hideOverlay();
      self.showNotification(E, e.responseJSON.message, 4000, 30);
    }
    $.ajax(ajaxObj);
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails,
    bookingDetails: state.bookingDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveBookedData: (data) => {
      dispatch(saveBookedData(data));
    },
    clearCart: () => {
      dispatch(clearCart());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingConfirm);


