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
    this.date = new Date();
    this.state = {
      mailId: window.bookingDetails.mailId,
      timing:'',
      date: parseInt(this.date.getDate()),
      month: parseInt(this.date.getMonth()) + 1,
      year: parseInt(this.date.getFullYear()),
      months:[]
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

  renderMonth(month) {
    return (
        <option key = {month[1]} value={month[0]}>{month[1]}</option>
    )
  }

  renderMonths(){
    const self = this;
    this.getMonths();
    return (
        <select className = 'col-xs-12' onChange = { this.monthPicked.bind(this) } value = { this.state.month }>
          { this.state.months.map(function(index){
              return self.renderMonth(index)
          })}
        </select>
    )
  }

  getMonths(){
     this.state.months = [[1,'Jan'],[2,'Feb'],[3,'March'],[4,'April'],[5,'May'],[6,'June'],[7,'July'],[8,'Aug'],[9,'Sep'],[10,'Oct'],[11,'Nov'],[12,'Dec']];
    if(this.state.year == this.date.getFullYear()){
      this.state.months = this.state.months.slice(this.date.getMonth(),11);
    }
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
        break;
      case '2':
        break;
      default : days[29] = 29; days[30] = 30; days[31] = 31;
    }
    if(this.state.month == (this.date.getMonth() + 1)  && this.date.getFullYear().toString().includes(this.state.year)){
      let currentDate = this.date.getDate();
      days = days.slice(currentDate-1, days.length);
    }
    return days;
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Enter booking Details' }/>
        { this.props.location.query.error ? <TopNotification msg = 'Please provide valid data to all fields' type = 'error'/> : ''}
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 confirm'>


          <input type = 'text' placeholder = 'Enter your mail Id' className = 'col-xs-12' onChange = { this.mailIdEntered.bind(this) }></input>


          <div className = 'col-xs-12 datepick'>
            <span> Pick your time </span>
            <div className = 'col-xs-12 date'> { this.state.date + '/' + this.state.month + '/' + this.state.year + ' ' + this.state.timing } </div>

            <div className = 'col-xs-4 pad0'>
              <select className = 'col-xs-12' onChange = { this.yearPicked.bind(this) } value = { this.state.year }>
                <option value='2017'>2017</option>
                <option value='2018'>2018</option>
              </select>
            </div>
            <div className = 'col-xs-4 pad0'>
              { this.renderMonths() }
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
        <ActivityFooter key = {34} next = { this.state.date && this.state.mailId && this.state.timing ? 'booking/confirm?lkey=' +this.props.location.query.lkey + '&date=' + this.state.month + '/' + this.state.date + '/' + this.state.year + '&mailId=' + this.state.mailId + '&timing=' + this.state.timing : 'order/confirm?error=true&lkey=' + this.props.location.query.lkey } back = { 'address' } info = 'Please make sure all fields are valid'/>
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
    let email = e.currentTarget.value;
    if(this.isValidEmailId(email)){
      this.setState({ mailId: email });
    }
  }

  timeEntered(e) {
    this.setState({ timing: e.currentTarget.value });
  }

  isValidEmailId(email) {
    let atpos = email.indexOf("@");
    let dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
      return false;
    }
    return true;
  }
}


