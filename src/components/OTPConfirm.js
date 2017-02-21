/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';

export default class OTPConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp : '',
      display: this.props.location.query.errorDisplay || 'none'
    }
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Provide OTP' }/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>

          <input type = 'number' placeholder = 'Enter OTP' pattern="[0-9]*" inputMode="numeric" className = 'col-xs-12' onChange={ this.otpChanged.bind(this) }></input>
          <div className = 'col-xs-3 pad0' style = {{ color: 'red',display: this.state.display}}> Wrong OTP </div>
          <button type = 'text' className = 'col-xs-12' onClick={ this.register.bind(this) }> Submit </button>


          <div className = 'resend-otp col-xs-3 pad0' onClick = { this.resendOtp.bind(this) }> Resend OTP </div>

        </div>
      </div>
    )
  }

  otpChanged(e) {
    let otp = e.currentTarget.value;
    otp.length <= 6 ? this.setState({ otp: otp }) : '';
  }

  resendOtp() {
    new Base().showOverlay();
    let self = this;
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/getmobileotp';
    ajaxObj.data = { phonenumber: self.props.location.query.number };
    ajaxObj.success = function(data) {
      new Base().hideOverlay();
      browserHistory.push('/otp/confirm?number=' + self.props.location.query.number + '&isNewUser=' + data.isNewUser + '&token=' + data.token);
    }
    ajaxObj.error = function() {
      new Base().hideOverlay();
      browserHistory.push('/oops');
    }
    $.ajax(ajaxObj);
  }

  register() {
    const self = this;

    let query = this.props.location.query;

    if(query.isNewUser == true){

      browserHistory.push( '/register?number=' + query.number + '&isNewUser=' + query.isNewUser + '&token=' + query.token + '&otp=' + this.state.otp );

    }else{

      ajaxObj.url = ajaxObj.baseUrl + '/loginguestcustomer';
      ajaxObj.data = { phonenumber: query.number, otp: this.state.otp, token: query.token };
      ajaxObj.success = function() {
        window.bookingDetails.name = 'ZZ';
        browserHistory.push('/book')
      }
      ajaxObj.error = function() {
        browserHistory.push('otp/confirm?number=' + self.props.location.query.number + '&isNewUser=' + self.props.location.query.isNewUser + '&token=' + self.props.location.query.token + '&errorDisplay=' + 'block')
      }
      $.ajax(ajaxObj);

    }
  }
}


