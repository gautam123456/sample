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
            refcode: this.props.location.query.refcode,
            otp:'',
            error: ''
        }
    }

    render() {
      const opts = this.props.location.query.refcode ? {'readOnly':'readOnly'} : {};

      return (
        <div className='lo'>
          <TopNotification msg = { this.state.error } type = 'error'/>
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

    nameChanged(e) {
        let name = e.currentTarget.value;
        this.setState({ name: name });
    }

    refCodeChanged(e) {
        let refcode = e.currentTarget.value;
        this.setState({ refcode: refcode });
    }

    otpChanged(e) {
        let otp = e.currentTarget.value;
        this.setState({ otp: otp });
    }

    allRequiredDataProvided() {
        if(this.state.name){
          if(this.state.otp){
            return true;
          }else{
            this.showNotification('Please provide OTP');
            return false
          }
        }else{
          this.showNotification('Please provide Name');
          return false
        }
    }

    showNotification (msg) {
      const self = this;
      self.setState({error: msg})
      setTimeout(function(){
        self.setState({error: ''})
      }, 4000)
    }

    register() {
        const self =  this;
        if(this.allRequiredDataProvided()) {
            Base.showOverlay();
            let query = this.props.location.query;
            ajaxObj.url = ajaxObj.baseUrl + '/saveguestcustomer';
            ajaxObj.data = {
                phonenumber: query.number,
                otp: this.state.otp,
                token: query.token,
                name: this.state.name,
                refcode: this.state.refcode
            };
            ajaxObj.success = function (data) {
                Base.hideOverlay();
                window.bookingDetails.name = data.name || 'dummy';
              if(query.for != 'undefined' && query.for != undefined){
                browserHistory.push(query.for);
              }else {
                browserHistory.push('');
              }
            }
            ajaxObj.error = function (e) {
                Base.hideOverlay();
                self.showNotification(e.responseText);
            }
            $.ajax(ajaxObj);
        }
    }
}


