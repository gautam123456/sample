/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory, Link } from 'react-router';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import Base from './base/Base';
import TopNotification from './TopNotification';

import ajaxObj from '../../data/ajax.json';

export default class RegisterUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            refcode: '',
            otp:'',
            error: ''
        }
    }

    render() {

        return (
          <div>
            <TopNotification msg = { this.state.error } type = 'error'/>
            <div className = 'col-md-offset-4 col-md-4 col-xs-12 login pad0'>
              <div className = 'discard col-xs-2 pull-right pad0'>
                <Link to = { '/' }>
                  &#215;
                </Link>
              </div>
              <div className = 'logo'>
                <div className = 'hlg'></div>
              </div>
              <div className = 'col-xs-1 col-xs-offset-1 pad0'><i className = 'fa fa-user-o'></i></div>
              <input type = 'text' placeholder = 'Name (Required)' className = 'col-xs-9 pad0' onChange={ this.nameChanged.bind(this) }></input>
              <div className = 'col-xs-1 col-xs-offset-1 pad0'><i className = 'fa fa-mobile'></i></div>
              <input type = 'text' placeholder = 'OTP (Required)' className = 'col-xs-9 pad0' onChange={ this.otpChanged.bind(this) }></input>
              <div className = 'col-xs-1 col-xs-offset-1 pad0'><i className = 'fa fa-link'></i></div>
              <input type = 'text' placeholder = 'Referral Code (Optional)' className = 'col-xs-9 pad0' onChange={ this.refCodeChanged.bind(this) }></input>
              <button type = 'text' className = 'col-xs-10 col-xs-offset-1' onClick={  this.register.bind(this) }> Submit</button>
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
            new Base().showOverlay();
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
                new Base().hideOverlay();
                window.bookingDetails.name = data.name || 'dummy';
                browserHistory.push('/book')
            }
            ajaxObj.error = function (e) {
                new Base().hideOverlay();
                self.showNotification(e.responseText);
            }
            $.ajax(ajaxObj);
        }
    }
}


