/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';

import ajaxObj from '../../data/ajax.json';

export default class OTPConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp : ''
    }
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Provide OTP' }/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>

          <input type = 'number' placeholder = 'Enter OTP' pattern="[0-9]*" inputMode="numeric" className = 'col-xs-12' onChange={ this.otpChanged.bind(this) }></input>

          <button type = 'text' className = 'col-xs-12' onClick={ this.state.otp.length === 6 ? this.register.bind(this) : this.showErrorMessage.bind(this) }> Submit </button>

        </div>
      </div>
    )
  }

  otpChanged(e) {
    let otp = e.currentTarget.value;
    otp.length <= 6 ? this.setState({ otp: otp }) : '';
  }

  showErrorMessage() {

  }

  register() {
    browserHistory.push('loader')
    let query = this.props.location.query;
    if(query.isNewUser === true){

      browserHistory.push( '/register?number=' + query.number + '&isNewUser=' + query.isNewUser + '&token=' + query.token + '&otp=' + this.state.otp );

    }else{

      ajaxObj.url = ajaxObj.baseUrl + '/loginguestcustomer';
      ajaxObj.data = { phonenumber: query.number, otp: this.state.otp, token: query.token };
      ajaxObj.success = function() {
        window.bookingDetails.hashIndex = 'temp';
        browserHistory.push('/')
      }
      $.ajax(ajaxObj);

    }
  }
}


