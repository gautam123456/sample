/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import TopNotification from './TopNotification';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';

export default class AddAddress extends React.Component {
  constructor(props) {
    super(props)
    ajaxObj.type = 'POST';
    const address = this.props.location.query.address ? JSON.parse(this.props.location.query.address) : '',
          op = this.props.location.query.op;
    this.state = {
      city: address ? address.city : 'Delhi',
      name: '',
      otp: '',
      address: address ? address.address : '',
      landmark: address ? address.landmark : '',
      lkey: address ? address.lkey : '',
      isNewUser: Base.sandbox.isNewUser,
      op: op,
      notify: {
        show: false,
        type: 'info',
        timeout: 4000,
        msg:'',
        top: 30
      }
    }
  }

  componentDidMount() {
    Base.sandbox.isNewUser = false;
  }

  render() {
    const dropStyle = {
      height: 50
    }, {isNewUser} = this.state;

    return (
      <div>
        <ActivityHeader heading = { 'Provide Address' } />
        <TopNotification data={this.state.notify}/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>

          { isNewUser ? <input type = 'text' placeholder = 'Enter your name' className = 'col-xs-12' style={{marginTop: -10}}
                                            onChange = { this.saveName.bind(this)} value={this.state.name}></input> : ''}

          { isNewUser ? <input type = 'text' placeholder = 'Enter OTP' className = 'col-xs-12'
                                            onChange = { this.saveOTP.bind(this)} value={this.state.otp}></input> : ''}

          <input type = 'text' placeholder = 'Enter complete address' className = 'col-xs-12' onChange = { this.saveAddress.bind(this) } value = { this.state.address }/>

          <input type = 'text' placeholder = 'Landmark' className = 'col-xs-12' onChange = { this.saveLandMark.bind(this) } value = { this.state.landmark }/>

          <select className = 'col-xs-12' style = { dropStyle } onChange = { this.saveCity.bind(this) } value = { this.state.city }>
            <option value = 'New Delhi'> New Delhi </option>
            <option value = 'Noida'> Noida </option>
            <option value = 'Gurgaon'> Gurgaon </option>
            <option value = 'Faridabad'> Faridabad </option>
            <option value = 'Ghaziabad'> Ghaziabad </option>
            <option value = 'Greater Noida'> Greater Noida </option>
            <option value = 'Dehradun'> Dehradun </option>
          </select>
          <div className = 'col-xs-12 message'>
            *All fields are mandatory
          </div>

        </div>
        <ActivityFooter key = { 45 } back = { this.navigateBack.bind(this) } next = { this.navigateNext.bind(this) }/>
      </div>
    )
  }

  navigateBack() {
    browserHistory.push('/');
  }

  navigateNext() {
    this.updatePreferences();
  }

  showNotification(type, msg, timeout, top) {
    this.setState({notify: {show: true, timeout, type, msg, top}})
  }

  saveName(e) {
    let name = e.currentTarget.value;
    this.setState({ name, notify: {show: false}});
  }

  saveOTP(e) {
    let otp = e.currentTarget.value;
    this.setState({ otp, notify: {show: false}});
  }

  saveAddress(e) {
    let address = e.currentTarget.value;
    this.setState({ address, notify: {show: false}});
  }

  saveCity(e) {
    let city = e.currentTarget.value;
    this.setState({ city, notify: {show: false} });
  }

  saveLandMark(e) {
    let landmark = e.currentTarget.value;
    this.setState({ landmark, notify: {show: false} });
  }

  updatePreferences() {
    if(this.state.isNewUser) {
      this.registerUser();
    } else {
      this.updateAddress();
    }
  }

  registerUser() {
    const {name, otp, address, landmark, city} = this.state;

    if(name) {
      if(otp) {
        if(address) {
          if(landmark) {
            if(city) {
              this.registerUserForReal();
            } else {
              this.showNotification('info', 'Please select your city', 4000, 30);
            }
          } else {
            this.showNotification('info', 'Please provide your nearest landmark', 4000, 30);
          }
        } else {
          this.showNotification('info', 'Please provide your complete address', 4000, 30);
        }
      } else {
        this.showNotification('info', 'Please provide OTP', 4000, 30);
      }
    } else {
      this.showNotification('info', 'Please provide your name', 4000, 30);
    }
  }

  registerUserForReal() {
    const self =  this;

    Base.showOverlay();
    ajaxObj.url = ajaxObj.baseUrl + '/saveguestcustomer';
    ajaxObj.data = {
      phonenumber: Base.sandbox.mobile  || Base.sandbox.number,
      otp: this.state.otp,
      token: Base.sandbox.token,
      name: this.state.name
    };
    ajaxObj.success = function (data) {
      Base.sandbox.bookingDetails.name = data.name || 'dummy';
      self.addAddress();
    }
    ajaxObj.error = function (e) {
      Base.hideOverlay();
      self.showNotification('error', e.responseText || 'Something went wrong', 4000, 30);
    }
    $.ajax(ajaxObj);

  }

  updateAddress() {
    const {address, landmark, city} = this.state;

    if(city) {
      if(address) {
        if(landmark) {
          this.state.op === 'edit' ? this.editAddress() : (this.state.op === 'delete' ? this.deleteAddress() : this.addAddress())
        } else {
          this.showNotification('info', 'Please provide your nearest landmark', 4000, 30);
        }
      } else {
        this.showNotification('info', 'Please provide your complete address', 4000, 30);
      }
    } else {
      this.showNotification('info', 'Please select your city', 4000, 30);
    }
  }

  addAddress() {
    const self = this;
    Base.showOverlay();
    ajaxObj.url = ajaxObj.baseUrl + '/addaddress';
    ajaxObj.data = { address: this.state.address, city: this.state.city, landmark: this.state.landmark };
    ajaxObj.success = function() { Base.hideOverlay();browserHistory.push('/address?update=true') }
    ajaxObj.error = function() { Base.hideOverlay(); self.showNotification('error', e.responseJSON.message, 4000, 30); }
    $.ajax(ajaxObj);
  }

  editAddress() {
    const self = this;
    Base.showOverlay();
    ajaxObj.url = ajaxObj.baseUrl + '/editaddress';
    ajaxObj.data = { address: this.state.address, city: this.state.city, landmark: this.state.landmark, lkey: this.state.lkey };
    ajaxObj.success = function(){ browserHistory.push('/address?update=true') }
    ajaxObj.error = function() { Base.hideOverlay(); self.showNotification('error', e.responseJSON.message, 4000, 30); }
    $.ajax(ajaxObj);
  }

  deleteAddress() {
    const self = this;
    Base.showOverlay();
    ajaxObj.url = ajaxObj.baseUrl + '/deleteaddress';
    ajaxObj.data = { lkey: this.state.lkey };
    ajaxObj.success = function(){ browserHistory.push('/address?update=true') }
    ajaxObj.error = function() { Base.hideOverlay(); self.showNotification('error', e.responseJSON.message, 4000, 30); }
    $.ajax(ajaxObj);
  }
}

