/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import TopNotification from './TopNotification';

export default class OrderConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mailId: window.bookingDetails.mailId,
      timing:'',
      date: parseInt(new Date().getDate()),
      month: parseInt(new Date().getMonth()) + 1,
      year: parseInt(new Date().getFullYear())
    }
  }

  renderDate() {
    let days = this.getNumberOfDays(),
        self = this;
    return (
        <select className = 'col-xs-12' onChange = { this.datePicked.bind(this) } value = { this.state.date }>
          { days.map(function(index){
             return self.renderDay(index);
          })}
        </select>
    )
  }

  renderDay(day) {
    return (
        <option key = {day} value={day}>{day}</option>
    )
  }
  getNumberOfDays() {
    let days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    switch(this.state.month){
      case '4':
      case '6':
      case '9':
      case '11': days[29] = 29; days[30] = 30;
        return days;
      case '2':
        return days;
      default : days[29] = 29; days[30] = 30; days[31] = 31;
        return days;
    }
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Enter booking Details' }/>
        { this.props.location.query.error ? <TopNotification msg = 'All fields are mandatory' type = 'error'/> : ''}
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 confirm'>


          <input type = 'text' placeholder = 'Enter your mail Id' className = 'col-xs-12' value = { this.state.mailId } onChange = { this.mailIdEntered.bind(this) }></input>


          <div className = 'col-xs-12 datepick'>
            <span> Pick your time </span>
            <div className = 'col-xs-12 date'> { ' - ' + this.state.date + '/' + this.state.month + '/' + this.state.year + ' - ' + this.state.timing } </div>

            <div className = 'col-xs-4 pad0'>
              <select className = 'col-xs-12' onChange = { this.yearPicked.bind(this) } value = { this.state.year }>
                <option value='2017'>2017</option>
                <option value='2018'>2018</option>
              </select>
            </div>
            <div className = 'col-xs-4 pad0'>
              <select className = 'col-xs-12' onChange = { this.monthPicked.bind(this) } value = { this.state.month }>
                <option value='1'>Jan</option>
                <option value='2'>Feb</option>
                <option value='3'>Mar</option>
                <option value='4'>Apr</option>
                <option value='5'>May</option>
                <option value='6'>June</option>
                <option value='7'>July</option>
                <option value='8'>Aug</option>
                <option value='9'>Sep</option>
                <option value='10'>Oct</option>
                <option value='11'>Nov</option>
                <option value='12'>Dev</option>
              </select>
            </div>
            <div className = 'col-xs-4 pad0'>
              { this.renderDate() }
            </div>

            <div className = 'col-xs-6 col-xs-offset-3 pad0'>
              <select className = 'col-xs-12' onChange = { this.timeEntered.bind(this) }>
                <option value=''>Select Time</option>
                <option value='09:00-AM'>09:00 AM</option>
                <option value='10:00-AM'>10:00 AM</option>
                <option value='11:00-AM'>11:00 AM</option>
                <option value='12:00-PM'>12:00 PM</option>
                <option value='01:00-PM'>01:00 PM</option>
                <option value='02:00-PM'>02:00 PM</option>
                <option value='03:00-PM'>03:00 PM</option>
                <option value='04:00-PM'>04:00 PM</option>
                <option value='05:00-PM'>05:00 PM</option>
                <option value='06:00-PM'>06:00 PM</option>
              </select>
            </div>
          </div>

          <div className = 'col-xs-11 message'>
            *All fields are mandatory
          </div>

        </div>
        <ActivityFooter next = { this.state.date && this.state.mailId && this.state.timing ? 'booking/confirm?lkey=' +this.props.location.query.lkey + '&date=' + this.state.date + '/' + this.state.month + '/' + this.state.year + '&mailId=' + this.state.mailId + '&timing=' + this.state.timing : 'order/confirm?error=true' } back = { 'address' }/>
      </div>
    )
  }

  datePicked(e) {
    this.setState({ date: e.currentTarget.value });
  }

  monthPicked(e) {
    this.setState({ month: e.currentTarget.value });
  }

  yearPicked(e) {
    this.setState({ year: e.currentTarget.value });
  }

  mailIdEntered(e) {
    this.setState({ mailId: e.currentTarget.value });
  }

  timeEntered(e) {
    this.setState({ timing: e.currentTarget.value });
  }
}


