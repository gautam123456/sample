import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import TopNotification from './TopNotification';
import DateWidget from './common/Date';
import Base from './base/Base';
import $ from 'jquery';
import OTPModal from './common/OTPModal';

import ajaxObj from '../../data/ajax.json';

export default class OrderConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    const {sandbox} = Base;
    if(!sandbox.mailId) {
      sandbox.mailId = sandbox.userDetails ? sandbox.userDetails.email : '';
    }

    this.state = {
      modalDisplay: 'none',
      mailId: sandbox.mailId,
      mobile: sandbox.mobile,
      comment: sandbox.bookingDetails.comment,
      timing: '',
      date: this.getDate(),
      month: (parseInt(this.date.getMonth()) + 1).toString(),
      year: parseInt(this.date.getFullYear()),
      months:[],
      notify: {
        show: false,
        type: 'info',
        timeout: 4000,
        msg:'',
        bottom: 50
      }
    }

    Base.sandbox.date = this.getDate();
    Base.sandbox.month = (parseInt(this.date.getMonth()) + 1).toString();
    Base.sandbox.year = parseInt(this.date.getFullYear());
  }

  getDate() {
    return this.date.getHours() < 16 ? this.date.getDate() : this.date.getDate() + 1;
  }

  renderModal({display}) {
    this.setState({modalDisplay: display});
  }

  render() {
    const {mailId, notify, mobile} = this.state;
    return (
        <div>
          <ActivityHeader heading = { 'Enter booking Details' }/>
          <OTPModal display={this.state.modalDisplay} renderModal={this.renderModal.bind(this)} showNotification={this.showNotification.bind(this)}/>
          <TopNotification data={notify}/>
          { this.props.location.query.error ? <TopNotification msg = { !(mailId) ? 'Please provide valid Email Id' : 'Please select time' } type = 'error'/> : ''}
          <div className = 'col-md-offset-4 col-md-4 col-xs-12 confirm'>

            <input type = 'text' placeholder = 'Enter mail id (To receive booking details)' className = 'col-xs-12'
                                              defaultValue={mailId} onChange = { this.mailIdEntered.bind(this) }
                                              onFocus = {this.mailFocus.bind(this) }
                                              onBlur = { this.mailUnFocus.bind(this) }></input>
            { this.isLoggedIn() ? '' : <input type = 'text' placeholder = 'Enter mobile no (To receive booking status updates)' className = 'col-xs-12' style={{marginTop: -10}}
                   defaultValue={mobile} onChange = { this.mobileEntered.bind(this) } onFocus = {this.mobileFocus.bind(this) }
                   onBlur = { this.mobileUnFocus.bind(this) }></input> }

            <div className = 'col-xs-12 pad0' style = {{marginBottom: 10, marginTop: 0}}>
              <textarea rows="3" cols="50" style={{padding: 5}} className = 'col-xs-12 optcomment'
                        placeholder = 'Wish to share something that we can help you with? (Optional)' maxLength='100'
                        onBlur = {this.optionalComments.bind(this)}
                        onFocus = {this.commentFocus.bind(this) }
                        value = {this.state.comment}>
              </textarea>
            </div>
            <DateWidget scheduleHandler = {this.scheduleHandler.bind(this)} data = {this.state} date={this.date}/>
            <div className = 'col-xs-11 message'>
              *All fields are mandatory
            </div>

          </div>
          <ActivityFooter key = {34} next = { this.navigateNext.bind(this) } back = { this.navigateBack.bind(this) } info = 'Please make sure all fields are valid'/>
        </div>
    )
  }

  navigateNext() {
    if(this.isLoggedIn()) {
      if(this.state.mailId) {
        if(this.state.timing) {
          browserHistory.push('/address');
        } else {
          this.showNotification('info', 'Please select your date & time slot', 4000, 50);
        }
      } else {
        this.showNotification('info', 'Please provide email address', 4000, 50);
      }
    } else {
      if(this.state.mailId) {
        if(this.state.mobile) {
          if (this.state.timing) {
            this.login();
          } else {
            this.showNotification('info', 'Please select your date & time slot', 4000, 50);
          }
        } else {
          this.showNotification('info', 'Please provide valid mobile number', 4000, 50);
        }
      } else {
        this.showNotification('info', 'Please provide email address', 4000, 50);
      }
    }
  }

  login() {
      Base.showOverlay();
      let self = this;

      ajaxObj.type = 'POST';
      ajaxObj.url = ajaxObj.baseUrl + '/getmobileotp';
      ajaxObj.data = { phonenumber: self.state.mobile };
      ajaxObj.success = function(data) {
        Base.sandbox.isNewUser = data.isNewUser;
        Base.sandbox.token = data.token;
        if(data.isNewUser == true){
          Base.sandbox.isNewUser = true;
          Base.sandbox.token = data.token;
          browserHistory.push('/address/add');
        }else{
          self.renderModal({display: 'block'});
        }
        Base.hideOverlay();
      }
      ajaxObj.error = function(e) {
        Base.hideOverlay();
        self.showNotification('error', e.responseText, 4000, 30);
      }
      $.ajax(ajaxObj);
  }

  navigateBack() {
    browserHistory.push('');
  }

  showNotification(type, msg, timeout, bottom) {
    this.setState({notify: {show: true, timeout, type, msg, bottom}})
  }

  scheduleHandler(param, value) {
    this.setState({[param]: value});
    Base.sandbox[param] = value;
    this.setState({notify: {show: false}})
  }

  optionalComments(e) {
    const comment  = e.currentTarget.value;
    this.setState({comment});
    Base.sandbox.bookingDetails.comment = comment;
  }

  mailFocus(e) {
    e.currentTarget.setAttribute('placeholder', '');
  }

  mailUnFocus(e) {
    if (e.currentTarget.value == '') {
      e.currentTarget.setAttribute('placeholder', 'Enter mail id (To receive booking details)');
    }
  }

  mailIdEntered(e) {
    let mailId = e.currentTarget.value;
    if(this.isValidEmailId(mailId)){
      this.setState({mailId});
    }
    Base.sandbox.mailId = mailId;
    this.setState({notify: {show: false}})
  }

  mobileFocus(e) {
    e.currentTarget.setAttribute('placeholder', '');
  }

  mobileUnFocus(e) {
    if (e.currentTarget.value == '') {
      e.currentTarget.setAttribute('placeholder', 'Enter mobile no (To receive booking status updates)');
    }
  }

  mobileEntered(e) {
    let mobile = e.currentTarget.value;

    if((mobile.length == 10)) {
      this.setState({mobile, notify: {show: false}});
      Base.sandbox.mobile = mobile;
    }
  }

  isLoggedIn() {
    if(Base.sandbox.bookingDetails.name)
      return true;
    return false;
  }

  commentFocus(e) {
    console.log('Focus');
    e.currentTarget.setAttribute('placeholder', '');
  }

  isValidEmailId(email) {
    let atpos = email.indexOf('@');
    let dotpos = email.lastIndexOf('.');
    if (atpos < 1 || dotpos<atpos+2 || dotpos+2 >= email.length) {
      return false;
    }
    return true;
  }
}


