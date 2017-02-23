/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import ActivityHeader from './ActivityHeader';
import Base from './base/Base';
import ajaxObj from '../../data/ajax.json';

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
        <ActivityHeader heading = { 'Log In/Sign up' }/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>

          <input type = 'number' placeholder = 'Enter mobile number' pattern='[0-9]*' inputMode='numeric' className = 'col-xs-12' onChange={ this.numberChanged.bind(this) }></input>

          <button type = 'text' className = 'col-xs-12' onClick={ this.state.number.length === 10 ? this.login.bind(this) : this.showErrorMessage.bind(this) }> Login / SignUp</button>

        </div>
      </div>
    )
  }

  numberChanged(e) {
    let number = e.currentTarget.value;
    number.length <= 10 ? this.setState({ number: number }) : this.showErrorMessage();
  }

  showErrorMessage(){
  }

  login() {
    new Base().showOverlay();
    let self = this;
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/getmobileotp';
    ajaxObj.data = { phonenumber: self.state.number };
    ajaxObj.success = function(data) {
      if(data.isNewUser == true){
        browserHistory.push( '/register?number=' + self.state.number + '&isNewUser=' + data.isNewUser + '&token=' + data.token );
      }else{
        browserHistory.push('/otp/confirm?number=' + self.state.number + '&isNewUser=' + data.isNewUser + '&token=' + data.token);
      }
        new Base().hideOverlay();
    }
    ajaxObj.error = function() {
      new Base().hideOverlay();
      browserHistory.push('/oops');
    }
    $.ajax(ajaxObj);
  }
}


