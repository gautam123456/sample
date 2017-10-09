/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory, Link } from 'react-router';
import $ from 'jquery';
import Base from './base/Base';
import TopNotification from './TopNotification';
import DisableScroll from './base/DisableScroll';
import {connect} from 'react-redux';
import {userRegistered, registerUser} from '../actions';
import {OTP, NAME, W, I} from '../constants';

import ajaxObj from '../../data/ajax.json';

class RegisterUser extends DisableScroll {

    constructor(props) {
        super(props);
        this.state = {
          name : '',
          refcode: this.props.location.query.refcode || '',
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
      const {notify, refcode} = this.state,
        opts = refcode ? {'readOnly':'readOnly'} : {};

      return (
        <div className='lo'>
          <TopNotification data={notify}/>
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
            <input type = 'text' placeholder = 'Name (Required)' className = 'col-xs-7 pad0' onChange={ this.nameChanged } onFocus={ this.focusChanged } ></input>
            <div className = 'col-xs-1 col-xs-offset-2 pad0'><i className = 'fa fa-mobile'></i></div>
            <input type = 'text' placeholder = 'OTP (Required)' className = 'col-xs-7 pad0' onChange={ this.otpChanged } onFocus={ this.focusChanged } ></input>
            <div className = 'col-xs-1 col-xs-offset-2 pad0'><i className = 'fa fa-link'></i></div>
            <input type = 'text' placeholder = 'Referral Code (Optional)' className = 'col-xs-7 pad0' onChange={ this.refCodeChanged } onFocus={ this.focusChanged } value={refcode || ''} {...opts}></input>
            <button type = 'text' className = 'col-xs-8 col-xs-offset-2' onClick={  this.register }> SUBMIT</button>
          </div>
        </div>
        )
    }

    showNotification = (type, msg, timeout, top) => {
      this.setState({notify: {show: true, timeout, type, msg, top}})
    }

    nameChanged = (e) => {
        let name = e.currentTarget.value;
        this.setState({name});
    }

    refCodeChanged = (e) => {
        let refcode = e.currentTarget.value;
        this.setState({refcode});
    }

    otpChanged = (e) => {
      const otp = e.currentTarget.value;
      if(otp.length <= 6) {
        this.setState({otp, notify: {show: false}});
      } else {
        this.showNotification(W, OTP, 4000, 30);
      }
    }

    allRequiredDataProvided = () => {
      const {name, otp} = this.state;

        if(name){
          if(otp){
            return true;
          }else{
            this.showNotification(I, OTP, 4000, 30);
            return false
          }
        }else{
          this.showNotification(I, NAME, 4000, 30);
          return false
        }
    }

    register = () => {

        const  {props: {number, token}, state: {otp, name, refcode}} = this;
        if(this.allRequiredDataProvided()) {
          const data = {
                phonenumber: number,
                otp,
                token,
                name,
                refcode
            };
            this.props.registerUser(data, this.showNotification, '', this.props.userRegistered);
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
    userRegistered: () => {
      dispatch(userRegistered());
    },
    registerUser: (data, notfn, route, callBack) => {
      dispatch(registerUser(data, notfn, route, callBack));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);


