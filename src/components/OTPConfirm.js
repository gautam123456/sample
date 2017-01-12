/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import ThankYouFooter from './ThankYouFooter';
import $ from 'jquery';

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
    otp.length <= 6 ? this.setState({ otp: otp }) : this.showErrorMessage('Please provide valid mobile number');
  }

  showErrorMessage() {

  }

  register() {
    console.log("---------1");
    let query = this.props.location.query;
    if(query.isNewUser === true){
      console.log("---------2");
      browserHistory.push( '/register?number=' + query.number + '&isNewUser=' + query.isNewUser + '&token=' + query.token + '&otp=' + this.state.otp );
    }else{
      $.ajax({
        url: 'https://storeapi.lookplex.com/wsv1/masnepservice/loginguestcustomer',
        data: { phonenumber: query.number, otp: this.state.otp, token: query.token },
        dataType: 'json',
        xhrFields: { withCredentials: true },
        contentType: 'application/x-www-form-urlencoded',
        success: function(data) {
          console.log(JSON.stringify(data));
          browserHistory.push('/');
        },
        type: 'POST'
      });
    }
  }
}


