/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import $ from 'jquery';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      number : ''
    }
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Log In/Sign Up' }/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>

          <input type = 'number' placeholder = 'Enter mobile number' pattern="[0-9]*" inputMode="numeric" className = 'col-xs-12' onChange={ this.numberChanged.bind(this) }></input>

          <button type = 'text' className = 'col-xs-12' onClick={ this.state.number.length === 10 ? this.login.bind(this) : this.showErrorMessage.bind(this) }> Login / SignUp</button>

        </div>
      </div>
    )
  }

  numberChanged(e) {
    let number = e.currentTarget.value;
    number.length <= 10 ? this.setState({ number: number }) : this.showErrorMessage('Please provide valid mobile number');
  }

  showErrorMessage(msg){
    console.log(msg);
  }

  login() {
    let self = this;
    $.ajax({
      url: 'https://storeapi.lookplex.com/wsv1/masnepservice/getmobileotp',
      data: { phonenumber: self.state.number },
      dataType: 'json',
      xhrFields: { withCredentials: true },
      contentType: 'application/x-www-form-urlencoded',
      success: function(data) {
        console.log(JSON.stringify(data));
        browserHistory.push('/otp/confirm?number=' + self.state.number + '&isNewUser=' + data.isNewUser + '&token=' + data.token);
      },
      type: 'POST'
    });
  }
}


