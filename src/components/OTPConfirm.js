/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory, Link } from 'react-router';
import $ from 'jquery';
import Base from './base/Base';
import TopNotification from './TopNotification';
import DisableScroll from './base/DisableScroll';
import {logIn} from '../actions';
import {connect} from 'react-redux';
import {E, I, S, W, OTP, OTP_RESENT} from '../constants';

import ajaxObj from '../../data/ajax.json';

class OTPConfirm extends DisableScroll {
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
          <div onClick={ this.onBlur } className = 'col-xs-12'>
          <div className = 'col-xs-1 col-xs-offset-2 pad0'><i className = 'fa fa-mobile'></i></div>
          <input type = 'number' placeholder = 'Enter OTP' pattern='[0-9]*' inputMode='numeric' className = 'col-xs-7 pad0' onChange={ this.otpChanged } onFocus={ this.focusChanged }></input>
          </div>
          <button type = 'text' className = 'col-xs-8 col-xs-offset-2' onClick={ this.register }> SUBMIT</button>
          <div className = 'resend-otp col-xs-4 col-xs-offset-2 pad0' onClick = { this.resendOtp }> Resend OTP </div>
        </div>
      </div>
    )
  }

  showNotification = (type, msg, timeout, top) => {
    this.setState({notify: {show: true, timeout, type, msg, top}})
  }

  otpChanged = (e) => {
    const otp = e.currentTarget.value;
    if(otp.length <= 6) {
      this.setState({otp, notify: {show: false}});
    } else {
      this.showNotification(W, OTP, 4000, 30);
    }
  }

  resendOtp = () => {
    Base.showOverlay();
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/getmobileotp';
    ajaxObj.data = { phonenumber: this.props.number };
    ajaxObj.success = () => {
      Base.hideOverlay();
      this.showNotification(S, OTP_RESENT, 4000, 30);
    }
    ajaxObj.error = (e) => {
      Base.hideOverlay();
      this.showNotification(E, e.responseText, 4000, 30);
    }
    $.ajax(ajaxObj);
  }

  register = () => {
    Base.showOverlay();
    const {number, token, isNewUser} = this.props;

    if (isNewUser == true) {
      browserHistory.push('/register');
    } else {
      this.props.logIn({phonenumber: number, otp: this.state.otp, token}, this.showNotification);
    }
  }
}

function mapStateToProps(state) {
  return {
    number: state.userDetails.number,
    token: state.userDetails.token,
    isNewUser: state.userDetails.isNewUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: (data, notificationCallBack) => {
      dispatch(logIn(data, notificationCallBack));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPConfirm);



