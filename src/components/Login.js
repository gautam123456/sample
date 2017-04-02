/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory, Link } from 'react-router';
import $ from 'jquery';
import ActivityHeader from './ActivityHeader';
import Base from './base/Base';
import DisableScroll from './base/DisableScroll';
import TopNotification from './TopNotification';

import ajaxObj from '../../data/ajax.json';

export default class Login extends DisableScroll {

  constructor(props) {
    super(props);
    this.state = {
      number : '',
      msg: '',
      error: false
    }
  }

  render() {
    return (
      <div className='lo'>
        { this.state.error ? <TopNotification msg = { this.state.msg } type = 'error'/> : ''}
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 login pad0'>
          <div className = 'discard col-xs-1 pad0'>
            <Link to = { '/' }>
              &#215;
            </Link>
            </div>
          <div className = 'logo'>
            <div className = 'hlg'></div>
          </div>
          <div className = 'col-xs-1 col-xs-offset-2 pad0'><i className = 'fa fa-user-o'></i></div>
          <input type = 'number' placeholder = 'Enter mobile number' pattern='[0-9]*' inputMode='numeric' className = 'col-xs-7 pad0' onChange={ this.numberChanged.bind(this) } onFocus={ this.focusChanged.bind(this) }></input>

          <button type = 'text' className = 'col-xs-8 col-xs-offset-2' onClick={ this.state.number.length === 10 ? this.login.bind(this) : this.showErrorMessage.bind(this) }> LOG IN / SIGN UP</button>
        </div>
      </div>
    )
  }

  showErrorMessage() {
    this.setState({msg:'Mobile no should be of 10 digits', error: true})
  }

  hideErrorMessage(number) {
    this.setState({msg:'', error: true, number})
  }

  numberChanged(e) {
    let number = e.currentTarget.value;
    number.length <= 10 ? this.hideErrorMessage(number) : this.showErrorMessage();
  }

  login() {
    new Base().showOverlay();
    let self = this;
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/getmobileotp';
    ajaxObj.data = { phonenumber: self.state.number };
    ajaxObj.success = function(data) {
      if(data.isNewUser == true){
        browserHistory.push( 'register?number=' + self.state.number + '&isNewUser=' + data.isNewUser + '&token=' + data.token );
      }else{
        browserHistory.push('otp/confirm?number=' + self.state.number + '&isNewUser=' + data.isNewUser + '&token=' + data.token);
      }
        new Base().hideOverlay();
    }
    ajaxObj.error = function(e) {
      new Base().hideOverlay();
      self.setState({msg:e.responseText, error: true})
    }
    $.ajax(ajaxObj);
  }
}


