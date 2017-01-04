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
    this.state = { startDate: moment()}
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Order Confirmation' }/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>


          <input type = 'text' placeholder = 'Enter mail Id' className = 'col-xs-12'></input>


          <DatePicker className = 'col-xs-12 full-width' selected={this.state.startDate} onChange={this.datePicked.bind(this)} />

          <select className = 'col-xs-12'>
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

        </div>
        <ActivityFooter next = { 'booking/confirmed' } back = { 'address' }/>
      </div>
    )
  }

  datePicked(date) {
    this.setState({ startDate: date });
  }

  componentDidMount() {
    document.getElementById('load').style.display = 'none';
    document.getElementById('mySidenav').style.display = 'block';
    document.body.style.backgroundColor = '#fff';
  }
}


