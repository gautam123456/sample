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
import {connect} from 'react-redux';
import {userRegistered, reFetchUserDetails} from '../actions';
import {E, I, OTP, ADD_ADDRESS, LANDMARK, CITY, NAME} from '../constants';

import ajaxObj from '../../data/ajax.json';

class AddAddress extends React.Component {
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
        type: I,
        timeout: 4000,
        msg:'',
        top: 30
      }
    }
  }

  render() {
    const dropStyle = {
      height: 50
    }, {isNewUser, notify, name, otp, address, landmark, city} = this.state;

    return (
      <div>
        <ActivityHeader heading = { 'Provide Address' } />
        <TopNotification data={notify}/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>

          { isNewUser ? <input type = 'text' placeholder = 'Enter your name' className = 'col-xs-12' style={{marginTop: -10}}
                                            onChange = { this.saveName} value={name}></input> : ''}

          { isNewUser ? <input type = 'text' placeholder = 'Enter OTP' className = 'col-xs-12'
                                            onChange = { this.saveOTP} value={otp}></input> : ''}

          <input type = 'text' placeholder = 'Enter complete address' className = 'col-xs-12' onChange = { this.saveAddress } value = { address }/>

          <input type = 'text' placeholder = 'Landmark' className = 'col-xs-12' onChange = { this.saveLandMark } value = { landmark }/>

          <select className = 'col-xs-12' style = { dropStyle } onChange = { this.saveCity} value = { city }>
            <option value = 'New Delhi'> New Delhi </option>
            <option value = 'Noida'> Noida </option>
            <option value = 'Gurgaon'> Gurgaon </option>
            <option value = 'Faridabad'> Faridabad </option>
            <option value = 'Ghaziabad'> Ghaziabad </option>
            <option value = 'Greater Noida'> Greater Noida </option>
            <option value = 'Hyderabad'> Hyderabad </option>
            <option value = 'Dehradun'> Dehradun </option>
          </select>
          <div className = 'col-xs-12 message'>
            *All fields are mandatory
          </div>

        </div>
        <ActivityFooter key = { 45 } back = { this.navigateBack } next = { this.navigateNext }/>
      </div>
    )
  }

  navigateBack = () => {
    if (this.state.op) {
      browserHistory.push('/address');
    }else {
      browserHistory.push('/order/details');
    }
  }

  navigateNext = () => {
    this.updatePreferences();
  }

  showNotification = (type, msg, timeout = 4000, top = 30) => {
    this.setState({notify: {show: true, timeout, type, msg, top}});
  }

  saveName = (e) => {
    let name = e.currentTarget.value;
    this.setState({ name, notify: {show: false}});
  }

  saveOTP = (e) => {
    let otp = e.currentTarget.value;
    this.setState({ otp, notify: {show: false}});
  }

  saveAddress = (e) => {
    let address = e.currentTarget.value;
    this.setState({ address, notify: {show: false}});
  }

  saveCity = (e) => {
    let city = e.currentTarget.value;
    this.setState({ city, notify: {show: false} });
  }

  saveLandMark = (e) => {
    let landmark = e.currentTarget.value;
    this.setState({ landmark, notify: {show: false} });
  }

  updatePreferences = () => {
    if(this.state.isNewUser) {
      this.registerUser();
    } else {
      this.updateAddress();
    }
  }

  registerUser = () => {
    const {name, otp, address, landmark, city} = this.state;

    if(name) {
      if(otp) {
        if(address) {
          if(landmark) {
            if(city) {
              this.registerUserForReal();
            } else {
              this.showNotification(I, CITY);
            }
          } else {
            this.showNotification(I, LANDMARK);
          }
        } else {
          this.showNotification(I, ADD_ADDRESS);
        }
      } else {
        this.showNotification(I, OTP);
      }
    } else {
      this.showNotification(I, NAME);
    }
  }

  registerUserForReal = () => {
    const {number, token} = this.props.userDetails,
      {otp, name} = this.state;
    Base.showOverlay();
    ajaxObj.url = ajaxObj.baseUrl + '/saveguestcustomer';
    ajaxObj.data = {
      phonenumber: number,
      otp,
      token,
      name
    };
    ajaxObj.success =  () => {
      Base.hideOverlay();
      this.props.userRegistered();
      this.addAddress();
    }
    ajaxObj.error = (e) => {
      Base.hideOverlay();
      this.showNotification(E, e.responseText);
    }
    $.ajax(ajaxObj);

  }

  updateAddress = () => {
    const {address, landmark, city, op} = this.state;

    if(city) {
      if(address) {
        if(landmark) {
          op === 'edit' ? this.editAddress() : (op === 'delete' ? this.deleteAddress() : this.addAddress())
        } else {
          this.showNotification(I, LANDMARK);
        }
      } else {
        this.showNotification(I, ADD_ADDRESS);
      }
    } else {
      this.showNotification(I, CITY);
    }
  }

  addAddress = () => {
    this.changeAddress('/addaddress');
  }

  editAddress = () => {
    this.changeAddress('/editaddress');
  }

  deleteAddress = () => {
    this.changeAddress('/deleteaddress');
  }

  changeAddress = (url) => {
    const {address, city, landmark, lkey} = this.state;
    //Base.showOverlay();
    ajaxObj.url = ajaxObj.baseUrl + url;
    ajaxObj.dataType =  "json";
    ajaxObj.data = {address, city, landmark, lkey};
    ajaxObj.success = () => {
      Base.hideOverlay();
      this.props.reFetchUserDetails(true);
      browserHistory.push('/address')
    }
    ajaxObj.error = (e) => {
      Base.hideOverlay();
      this.showNotification(E, e.responseJSON.message);
    }
    $.ajax(ajaxObj);
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userRegistered: () => {
      dispatch(userRegistered());
    },
    reFetchUserDetails: (flag) => {
      dispatch(reFetchUserDetails(flag));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);

