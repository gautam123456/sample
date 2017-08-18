/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import Base from '../base/Base';

import { browserHistory } from 'react-router';
import $ from 'jquery';

import ajaxObj from '../../../data/ajax.json';

export default class OTPModal extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      otp: ''
    }
  }

  render() {
    return (
      <div id = 'modal' className ='modal otp' style = {{ display: this.props.display }}>
        <div className = 'modal-content pad0'>
          <div className = 'cancel' onClick = {this.close.bind(this)}><div>&#215;</div></div>
          <div className = 'content pad0'>
            <div className='col-xs-12' style={{textAlign: 'center', margin: 5}}>Please check your message box for OTP</div>
            <div className = 'otpbody'>
              <input type = 'text' placeholder = 'Enter OTP' className = 'col-xs-12'
                     onChange = { this.saveOTP.bind(this)} value={this.state.otp}></input>
            </div>
          </div>
          <footer className='cli' onClick = {this.confirmOTP.bind(this)}>CONFIRM OTP</footer>
        </div>
      </div>
    )
  }

  saveOTP(e) {
    let otp = e.currentTarget.value;
    this.setState({otp});
  }

  showNotification() {
    this.props.showNotification('info', 'Please provide 6 digit OTP sent on your mobile', 4000, 50);
  }

  confirmOTP() {
    const self = this;
    if(this.state.otp.length !== 6){
      this.showNotification();
    }else {
      ajaxObj.url = ajaxObj.baseUrl + '/loginguestcustomer';
      ajaxObj.data = { phonenumber: Base.sandbox.mobile, otp: this.state.otp, token: Base.sandbox.token };
      ajaxObj.success = function() {
        Base.sandbox.bookingDetails.name = 'ZZ';
        browserHistory.push('/address');
      }
      ajaxObj.error = function(e) {
        self.props.showNotification('error', e.responseText, 4000, 30);
        Base.hideOverlay();
      }
      $.ajax(ajaxObj);
    }
  }

  close() {
    this.props.renderModal({display: 'none'});
  }
}
