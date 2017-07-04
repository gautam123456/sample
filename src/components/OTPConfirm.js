/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory, Link } from 'react-router';
import $ from 'jquery';
import Base from './base/Base';
import TopNotification from './TopNotification';
import DisableScroll from './base/DisableScroll';

import ajaxObj from '../../data/ajax.json';

export default class OTPConfirm extends DisableScroll {
  constructor(props) {
    super(props);
    this.state = {
      otp : '',
      notify: {
        show: false,
        type: 'info',
        timeout: 4000,
        msg:'',
        top: 30
      }
    }
  }

  render() {
    return (
      <div className='lo'>
        <TopNotification data={this.state.notify}/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 login pad0'>
          <div className = 'discard col-xs-12 col-md-4'>
            <Link to = { '/' }>
              &#215;
            </Link>
          </div>
          <div className = 'logo'>
            <div className = 'hlg'></div>
          </div>
          <div onClick={ this.onBlur.bind(this) } className = 'col-xs-12'>
          <div className = 'col-xs-1 col-xs-offset-2 pad0'><i className = 'fa fa-mobile'></i></div>
          <input type = 'number' placeholder = 'Enter OTP' pattern='[0-9]*' inputMode='numeric' className = 'col-xs-7 pad0' onChange={ this.otpChanged.bind(this) } onFocus={ this.focusChanged.bind(this) }></input>
          </div>
          <button type = 'text' className = 'col-xs-8 col-xs-offset-2' onClick={ this.register.bind(this) }> SUBMIT</button>
          <div className = 'resend-otp col-xs-4 col-xs-offset-2 pad0' onClick = { this.resendOtp.bind(this) }> Resend OTP </div>
        </div>
      </div>
    )
  }

  showNotification(type, msg, timeout, top) {
    this.setState({notify: {show: true, timeout, type, msg, top}})
  }

  otpChanged(e) {
    const otp = e.currentTarget.value;
    if(otp.length <= 6) {
      this.setState({otp, notify: {show: false}});
    } else {
      this.showNotification('warning', 'Please provide 6 digit OTP', 4000, 30);
    }
  }

  resendOtp() {
    Base.showOverlay();
    let self = this;
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/getmobileotp';
    ajaxObj.data = { phonenumber: Base.sandbox.number };
    ajaxObj.success = function(data) {
      Base.hideOverlay();
      self.showNotification('success', 'OTP successfully resent on your mobile number', 4000, 30);
    }
    ajaxObj.error = function(e) {
      Base.hideOverlay();
      self.showNotification('error', e.responseText, 4000, 30);
    }
    $.ajax(ajaxObj);
  }

  register() {
    Base.showOverlay();
    const self = this;
    if (Base.sandbox.isNewUser == true) {
      browserHistory.push('/register');
    } else {
      ajaxObj.url = ajaxObj.baseUrl + '/loginguestcustomer';
      ajaxObj.data = { phonenumber: Base.sandbox.number, otp: this.state.otp, token: Base.sandbox.token };
      ajaxObj.success = function() {
        Base.sandbox.bookingDetails.name = 'ZZ';
        Base.hideOverlay();
        if(Base.sandbox.bookingDetails.subTotal >= Base.sandbox.bookingDetails.minBooking) {
          browserHistory.push('/order/details');
        } else{
          browserHistory.push('');
        }
      }
      ajaxObj.error = function(e) {
        self.showNotification('error', e.responseText, 4000, 30);
        Base.hideOverlay();
      }
      $.ajax(ajaxObj);

    }
  }
}


