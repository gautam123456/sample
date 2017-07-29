import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import TopNotification from './TopNotification';
import DateWidget from './common/Date';
import Base from './base/Base';

export default class OrderConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    const {sandbox} = Base;
    this.state = {
      mailId: sandbox.mailId || sandbox.userDetails ? sandbox.userDetails.email : '',
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

  render() {
    const {mailId, notify} = this.state;
    return (
        <div>
          <ActivityHeader heading = { 'Enter booking Details' }/>
          <TopNotification data={notify}/>
          { this.props.location.query.error ? <TopNotification msg = { !(mailId) ? 'Please provide valid Email Id' : 'Please select time' } type = 'error'/> : ''}
          <div className = 'col-md-offset-4 col-md-4 col-xs-12 confirm'>

            <input type = 'text' placeholder = 'Enter your mail Id' className = 'col-xs-12' defaultValue={mailId} onChange = { this.mailIdEntered.bind(this) } onFocus = {this.mailFocus.bind(this) } onBlur = { this.mailUnFocus.bind(this) }></input>
            <div className = 'col-xs-12 pad0' style = {{marginBottom: 10, marginTop: 0}}>
              <textarea rows="3" cols="50" style={{padding: 5}} className = 'col-xs-12 optcomment' placeholder = 'Wish to share something that we can help you with? (Optional)' maxLength='100' onChange = {this.optionalComments.bind(this)} onFocus = {this.commentFocus.bind(this) } onBlur = { this.commentUnFocus.bind(this) }>
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
    if(this.state.mailId) {
      if(this.state.timing) {
        browserHistory.push('/address');
      } else {
        this.showNotification('info', 'Please select your time slot', 4000, 50);
      }
    } else {
      this.showNotification('info', 'Please provide email address', 4000, 50);
    }
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
    Base.sandbox.comment = comment;
  }

  mailFocus(e) {
    e.currentTarget.setAttribute('placeholder', '');
  }

  mailUnFocus(e) {
    if (e.currentTarget.value == '') {
      e.currentTarget.setAttribute('placeholder', 'Enter your mail Id');
    }
  }

  commentUnFocus(e) {
    if (e.currentTarget.value == '') {
      e.currentTarget.setAttribute('placeholder', 'Wish to share something that we can help you with? (Optional)');
    }
  }

  commentFocus(e) {
    e.currentTarget.setAttribute('placeholder', '');
  }

  mailIdEntered(e) {
    let mailId = e.currentTarget.value;
    if(this.isValidEmailId(mailId)){
      this.setState({mailId});
    }
    Base.sandbox.mailId = mailId;
    this.setState({notify: {show: false}})
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


