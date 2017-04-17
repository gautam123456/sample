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
      display: this.props.location.query.errorDisplay || 'none',
      error: false,
      msg: ''
    }
  }

  render() {
    return (
      <div className='lo'>
        { this.state.error ? <TopNotification msg = { this.state.msg } type = 'error'/> : ''}
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

  otpChanged(e) {
    const otp = e.currentTarget.value;
    otp.length <= 6 ? this.setState({otp}) : '';
  }

  wrongOtpEntered(e) {
    const self = this;
    self.setState({error: true, msg: e.responseText});
    setTimeout(function(){
      self.setState({error: false, msg: ''});
    }, 4000);
  }

  resendOtp() {
    Base.showOverlay();
    let self = this;
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/getmobileotp';
    ajaxObj.data = { phonenumber: self.props.location.query.number };
    ajaxObj.success = function(data) {
      Base.hideOverlay();
      browserHistory.push('/otp/confirm?number=' + self.props.location.query.number + '&isNewUser=' + data.isNewUser + '&token=' + data.token);
    }
    ajaxObj.error = function(e) {
      Base.hideOverlay();
      self.wrongOtpEntered(e);
    }
    $.ajax(ajaxObj);
  }

  register() {
    Base.showOverlay();
    const self = this;

    let query = this.props.location.query;

    if(query.isNewUser == true){

      browserHistory.push( '/register?number=' + query.number + '&isNewUser=' + query.isNewUser + '&token=' + query.token + '&otp=' + this.state.otp + '&for=' + query.for );

    }else{
      ajaxObj.url = ajaxObj.baseUrl + '/loginguestcustomer';
      ajaxObj.data = { phonenumber: query.number, otp: this.state.otp, token: query.token };
      ajaxObj.success = function() {
        window.bookingDetails.name = 'ZZ';
        if(query.for != 'undefined' && query.for != undefined){
          browserHistory.push(query.for);
        }else {
          browserHistory.push('');
        }
        Base.hideOverlay();
      }
      ajaxObj.error = function(e) {
        self.wrongOtpEntered(e);
        Base.hideOverlay();
      }
      $.ajax(ajaxObj);

    }
  }
}


