import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import TopNotification from './TopNotification';
import DateWidget from './common/Date';
import Base from './base/Base';

export default class OrderConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      mailId: window.bookingDetails.mailId,
      timing: '',
      date: this.getDate(),
      month: (parseInt(this.date.getMonth()) + 1).toString(),
      year: parseInt(this.date.getFullYear()),
      months:[]
    }

    Base.sandbox.date = this.getDate();
    Base.sandbox.month = (parseInt(this.date.getMonth()) + 1).toString();
    Base.sandbox.year = parseInt(this.date.getFullYear());
  }

  getDate() {
    return this.date.getHours() < 16 ? this.date.getDate() : this.date.getDate() + 1;
  }

  render() {
    return (
        <div>
          <ActivityHeader heading = { 'Enter booking Details' }/>
          { this.props.location.query.error ? <TopNotification msg = { !(this.state.mailId) ? 'Please provide valid Email Id' : 'Please select time' } type = 'error'/> : ''}
          <div className = 'col-md-offset-4 col-md-4 col-xs-12 confirm'>

            <input type = 'text' placeholder = 'Enter your mail Id' className = 'col-xs-12' onChange = { this.mailIdEntered.bind(this) }></input>
            <div className = 'col-xs-12 pad0' style = {{marginBottom: 30, marginTop: 0}}>
              <textarea rows="3" cols="50" className = 'col-xs-12 optcomment pad0' placeholder = 'Wish to share something that we can help you with? (Optional)' maxLength='100' onChange = {this.optionalComments.bind(this)}>

              </textarea>
            </div>
            <DateWidget scheduleHandler = {this.scheduleHandler.bind(this)} data = {this.state} date={this.date}/>
            <div className = 'col-xs-11 message'>
              *All fields are mandatory
            </div>

          </div>
          <ActivityFooter key = {34} next = { this.state.date && this.state.mailId && this.state.timing ? 'address' : 'order/details?error=true' } back = { '' } info = 'Please make sure all fields are valid'/>
        </div>
    )
  }

  scheduleHandler(param, value) {
    this.setState({[param]: value});
    Base.sandbox[param] = value;
  }

  optionalComments(e) {
    const comment  = e.currentTarget.value;
    this.setState({comment});
    window.bookingDetails.comment = comment;
    Base.sandbox.comment = comment;
  }

  mailIdEntered(e) {
    let mailId = e.currentTarget.value;
    if(this.isValidEmailId(mailId)){
      this.setState({mailId});
    }
    Base.sandbox.mailId = mailId;
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


