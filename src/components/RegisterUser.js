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

export default class RegisterUser extends DisableScroll {

    constructor(props) {
        super(props);
        this.state = {
          name : '',
          refcode: Base.sandbox.refcode || '',
          otp:'',
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
      const opts = Base.sandbox.refcode ? {'readOnly':'readOnly'} : {};

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
            <div className = 'col-xs-1 col-xs-offset-2 pad0'><i className = 'fa fa-user-o'></i></div>
            <input type = 'text' placeholder = 'Name (Required)' className = 'col-xs-7 pad0' onChange={ this.nameChanged.bind(this) } onFocus={ this.focusChanged.bind(this) } ></input>
            <div className = 'col-xs-1 col-xs-offset-2 pad0'><i className = 'fa fa-mobile'></i></div>
            <input type = 'text' placeholder = 'OTP (Required)' className = 'col-xs-7 pad0' onChange={ this.otpChanged.bind(this) } onFocus={ this.focusChanged.bind(this) } ></input>
            <div className = 'col-xs-1 col-xs-offset-2 pad0'><i className = 'fa fa-link'></i></div>
            <input type = 'text' placeholder = 'Referral Code (Optional)' className = 'col-xs-7 pad0' onChange={ this.refCodeChanged.bind(this) } onFocus={ this.focusChanged.bind(this)} value={this.state.refcode} {...opts}></input>
            <button type = 'text' className = 'col-xs-8 col-xs-offset-2' onClick={  this.register.bind(this) }> SUBMIT</button>
          </div>
        </div>
        )
    }

    showNotification(type, msg, timeout, top) {
      this.setState({notify: {show: true, timeout, type, msg, top}})
    }

    nameChanged(e) {
        let name = e.currentTarget.value;
        this.setState({name});
    }

    refCodeChanged(e) {
        let refcode = e.currentTarget.value;
        this.setState({refcode});
    }

    otpChanged(e) {
      const otp = e.currentTarget.value;
      if(otp.length <= 6) {
        this.setState({otp, notify: {show: false}});
      } else {
        this.showNotification('warning', 'Please provide 6 digit OTP', 4000, 30);
      }
    }

    allRequiredDataProvided() {
        if(this.state.name){
          if(this.state.otp){
            return true;
          }else{
            this.showNotification('info', 'Please provide OTP', 4000, 30);
            return false
          }
        }else{
          this.showNotification('info', 'Please provide name', 4000, 30);
          return false
        }
    }

    register() {
        const self =  this;
        if(this.allRequiredDataProvided()) {
            Base.showOverlay();
            ajaxObj.url = ajaxObj.baseUrl + '/saveguestcustomer';
            ajaxObj.data = {
                phonenumber: Base.sandbox.number,
                otp: this.state.otp,
                token: Base.sandbox.token,
                name: this.state.name,
                refcode: this.state.refcode
            };
            ajaxObj.success = function (data) {
                Base.hideOverlay();
                Base.track('track', 'CompleteRegistration');
                Base.sandbox.bookingDetails.name = data.name || 'dummy';
                Base.sandbox.isNewUser = false;
                browserHistory.push('');
            }
            ajaxObj.error = function (e) {
                Base.hideOverlay();
                self.showNotification('error', e.responseText || 'Something went wrong', 4000, 30);
            }
            $.ajax(ajaxObj);
        }
    }
}


