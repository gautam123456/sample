/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import {connect} from 'react-redux';
import {logIn} from '../../actions';
import ajaxObj from '../../../data/ajax.json';
import {I, OTP} from '../../constants';

class OTPModal extends React.Component {

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
          <div className = 'cancel' onClick = {this.close}><div>&#215;</div></div>
          <div className = 'content pad0'>
            <div className='col-xs-12' style={{textAlign: 'center', margin: 5}}>Please check your message box for OTP</div>
            <div className = 'otpbody'>
              <input type = 'text' placeholder = 'Enter OTP' className = 'col-xs-12'
                     onChange = { this.saveOTP} value={this.state.otp}></input>
            </div>
          </div>
          <footer className='cli' onClick = {this.confirmOTP}>CONFIRM OTP</footer>
        </div>
      </div>
    )
  }

  saveOTP = (e) => {
    let otp = e.currentTarget.value;
    this.setState({otp});
  }

  showNotification = (type, msg) => {
    this.props.showNotification(type, msg, 4000, 50);
  }

  confirmOTP = () => {
    const {token, number} = this.props.userDetails,
      {otp} = this.state;

    if(otp.length !== 6){
      this.showNotification(I, OTP);
    }else {
      this.props.logIn({phonenumber: number, otp, token}, this.showNotification, '/address');
    }
  }

  close = () => {
    this.props.renderModal({display: 'none'});
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: (data, notfn, navigateTo) => {
      dispatch(logIn(data, notfn, navigateTo));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPModal);

