/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import DatePicker from 'react-datepicker';
var moment = require('moment');
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';


require('react-datepicker/dist/react-datepicker.css');

export default class OrderConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mailId:'',
      timing:'',
      date: moment()
    }
    window.bookingDetails.date = this.state.date._d;
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Enter booking Details' }/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>


          <input type = 'text' placeholder = 'Enter mail Id' className = 'col-xs-12' onChange = { this.mailIdEntered.bind(this) }></input>


          <DatePicker className = 'col-xs-12 full-width' selected={this.state.date} onChange={this.datePicked.bind(this)} />

          <select className = 'col-xs-12' onChange = { this.timeEntered.bind(this) }>
            <option value="">Select Time</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="01:00 PM">01:00 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="05:00 PM">05:00 PM</option>
            <option value="06:00 PM">06:00 PM</option>
          </select>

          <div className = 'col-xs-12 message'>
            *All fields are mandatory
          </div>

        </div>
        <ActivityFooter next = { this.state.date && this.state.mailId && this.state.timing ? 'booking/confirm':'order/confirm' } back = { 'address' }/>
      </div>
    )
  }

  datePicked(date) {
    window.bookingDetails.date = date._d;
    this.setState({ startDate: date });
  }

  mailIdEntered(e) {
    let mailId = e.currentTarget.value;
    window.bookingDetails.mailId = mailId;
    this.setState({ mailId: mailId });
  }

  timeEntered(e) {
    let timing = e.currentTarget.value;
    console.log(timing);
    window.bookingDetails.timing = timing;
    this.setState({ timing: timing });
  }
}


