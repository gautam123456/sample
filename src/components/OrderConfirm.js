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
      timing: '',
      date: this.date.getHours() < 16 ? this.date.getDate() : this.date.getDate() + 1,
      month: (parseInt(this.date.getMonth()) + 1).toString(),
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
    if(this.state.month == (this.date.getMonth() + 1)  && this.date.getFullYear().toString().indexOf(this.state.year) >= 0){
      let currentDate = this.date.getDate();
      if( this.date.getHours() > 16 ){
        days = days.slice(currentDate, days.length);
      }else{
        days = days.slice(currentDate-1, days.length);
      }

    }
    return days;
  }

  getHours() {
    let hours = [['9:30','09:30 AM', 9], ['10:00','10:00 AM', 10], ['10:30','10:30 AM', 10],
      ['11:00','11:00 AM', 11], ['11:30','11:30 AM', 11], ['12:00','12:00 PM', 12],['12:30','12:30 PM', 12],['1:00','01:00 PM', 13],
      ['1:30','01:30 PM', 13], ['2:00','02:00 PM', 14], ['2:30','02:30 PM', 14],['3:00','03:00 PM', 15],['3:30','03:30 PM', 15],
      ['4:00','04:00 PM', 16], ['4:30','04:30 PM', 16], ['5:00','05:00 PM', 17],['5:30','05:30 PM', 17],['6:00','06:00 PM', 18]];

    if( this.state.month == (this.date.getMonth() + 1)  && this.date.getFullYear().toString().indexOf(this.state.year) >= 0 && this.state.date == this.date.getDate()){
      let currentHour = this.date.getHours();
      let index;
      for(var i = 0 ; i < hours.length ; i++){
        if(hours[i][2] == currentHour){
          index = i;
          break;
        }
      }
      return index ? hours.slice(index + 5, hours.length) : hours;
    }else{
      return hours;
    }

  }

  renderHours(hour) {
    return (
        <option key = {hour} value={hour.split(' ').join('_')}>{hour}</option>
    )
  }

  renderTime() {
    const self = this,
         hours = this.getHours()
    return (
        <select className = 'col-xs-12' onChange = { this.timeEntered.bind(this) }>
          <option value=''> Select Time </option>
          { hours.map(function(hour){
            return self.renderHours(hour[1])
          })}
        </select>
    )
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
            <div className = 'col-xs-12 datepick'>
              <span> Pick your time </span>
              <div className = 'col-xs-12 date'> { this.state.date + '/' + this.state.month + '/' + this.state.year + ' ' + this.state.timing } </div>

              <div className = 'col-xs-4 pad0'>
                <select className = 'col-xs-12' onChange = { this.yearPicked.bind(this) } value = { this.state.year }>
                  <option value='2017'>2017</option>
                </select>
              </div>
              <div className = 'col-xs-4 pad0'>
                { this.renderMonths() }
              </div>
              <div className = 'col-xs-4 pad0'>
                { this.renderDate() }
              </div>

              <div className = 'col-xs-6 col-xs-offset-3 pad0'>
                { this.renderTime() }
              </div>
            </div>

            <div className = 'col-xs-11 message'>
              *All fields are mandatory
            </div>

          </div>
          <ActivityFooter key = {34} next = { this.state.date && this.state.mailId && this.state.timing ? 'booking/confirm?lkey=' +this.props.location.query.lkey + '&date=' + this.state.month + '/' + this.state.date + '/' + this.state.year + '&mailId=' + this.state.mailId + '&timing=' + this.state.timing : 'order/details?error=true&lkey=' + this.props.location.query.lkey } back = { 'address' } info = 'Please make sure all fields are valid'/>
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

  optionalComments(e) {
    this.setState({ comment: e.currentTarget.value });
    window.bookingDetails.comment = e.currentTarget.value;
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
    let atpos = email.indexOf('@');
    let dotpos = email.lastIndexOf('.');
    if (atpos < 1 || dotpos<atpos+2 || dotpos+2 >= email.length) {
      return false;
    }
    return true;
  }
}


