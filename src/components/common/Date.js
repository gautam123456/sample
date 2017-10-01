import React from 'react';
import ajaxObj from '../../../data/ajax.json';
import $ from 'jquery';
import Base from '../base/Base';

export default class DateWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: '',
      date: '',
      month: '',
      year: '',
      serverTime: new Date()
    }
  }

  renderDate() {
    let days = this.getNumberOfDays();
    return (
      <select className = 'col-xs-12' onChange = { this.datePicked } value = { this.state.date }>
        { days.map(function(index){
          return this.renderDay(index);
        }, this)}
      </select>
    )
  }

  renderMonth(month) {
    return (
      <option key = {month[1]} value={month[0]}>{month[1]}</option>
    )
  }

  renderMonths(){
    const months = this.getMonths();
    return (
      <select className = 'col-xs-12' onChange = { this.monthPicked } value = { this.state.month }>
        { months.map(function(index){
          return this.renderMonth(index)
        }, this)}
      </select>
    )
  }

  getMonths(){
    const {year, serverTime} = this.state;
    let months = [[1,'Jan'],[2,'Feb'],[3,'March'],[4,'April'],[5,'May'],[6,'June'],[7,'July'],[8,'Aug'],[9,'Sep'],[10,'Oct'],[11,'Nov'],[12,'Dec']];
    if(year == serverTime.getFullYear()){
      const currentMonth = serverTime.getMonth() + 1;
      months = months.slice(currentMonth - 1, months.length);

      if(this.isLastDayOfMonth(serverTime) && this.isCurrentDayOver(serverTime)){
        months = months.slice(currentMonth, months.length);
      }
    }
    return months;
  }

  renderDay(day) {
    return (
      <option key = {day} value={day}>{day}</option>
    )
  }

  getNumberOfDays() {
    const {month, year, serverTime} = this.state;
    let days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];

    switch(month){
      case '4':
      case '6':
      case '9':
      case '11': days[29] = 29; days[30] = 30;
        break;
      case '2':
        break;
      default : days[29] = 29; days[30] = 30; days[31] = 31;
    }

    if((month == (serverTime.getMonth() + 1))  && (serverTime.getFullYear() == year)){
      let currentDate = serverTime.getDate();
      if(this.isCurrentDayOver(serverTime)){
        days = days.slice(currentDate, days.length);
      }else{
        days = days.slice(currentDate-1, days.length);
      }
    }

    return days;
  }

  getHours() {
    const {month, year, date, time, serverTime} = this.state;

    let hours = [[570, '09:30 AM'], [600, '10:00 AM'], [630, '10:30 AM'],
      [660, '11:00 AM'], [690, '11:30 AM'], [720, '12:00 PM'],[750, '12:30 PM'],[780, '01:00 PM'],
      [810, '01:30 PM'], [840, '02:00 PM'], [870, '02:30 PM'],[900, '03:00 PM'],[930, '03:30 PM'],
      [960, '04:00 PM'], [990, '04:30 PM'], [1020, '05:00 PM'],[1050, '05:30 PM'],[1080, '06:00 PM']];


    if( (month == serverTime.getMonth())  && (year == serverTime.getFullYear()) && (date == serverTime.getDate())){
      const currentHour = serverTime.getHours();
      if(currentHour < 7){
        return hours;
      }else if(currentHour < 8){
        return hours.slice(2, hours.length);
      }else if(currentHour < 9){
        return hours.slice(4, hours.length);
      }else if(currentHour < 10){
        return hours.slice(6, hours.length);
      }

      let index = 0,
        currentTimeInMin = (currentHour * 60) + serverTime.getMinutes();

      for(let i = 0; i < hours.length; i++){
        if(currentTimeInMin > hours[i][0]){
          index = i;
          break;
        }
      }

      return hours.slice(index + 5, hours.length);
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
    const hours = this.getHours()
    return (
      <select className = 'col-xs-12' onChange = { this.timeEntered }>
        <option value=''> Select Time </option>
        { hours.map(function(hour){
          return this.renderHours(hour[1])
        }, this)}
      </select>
    )
  }

  convertTimeFormat(time) {
    const timeArray = time.split(':');
    if(timeArray[0] > 12){
      return (timeArray[0] - 12) + ':' + timeArray[1] + '_PM';
    } else {
      return time + '_AM';
    }
  }

  componentDidMount() {
      let self = this;
      ajaxObj.type = 'GET';
      ajaxObj.dataType = 'text',
      ajaxObj.url = ajaxObj.baseUrl + '/getcurrenttime';
      ajaxObj.success = (data) => {

        const timeArray = data.split(' '),
          serverTime = new Date(`${timeArray[0]}T${timeArray[1]}+05:30`);
        this.setState({serverTime}, this.setInitialTime());

      }
      $.ajax(ajaxObj);
  }

  setInitialTime = () => {
    const {serverTime} = this.state;
    let date, year, month;

    if(this.isCurrentDayOver(serverTime)){
      if(this.isLastDayOfMonth(serverTime)){
        date = 1;
        if(this.isLastDayOfYear(serverTime)){
          month = 1;
          year = serverTime.getFullYear() + 1;
        }else{
          month = serverTime.getMonth() + 2;
          year = serverTime.getFullYear();
        }
      }else{
        date = serverTime.getDate() + 1;
        month = serverTime.getMonth() + 1;
        year = serverTime.getFullYear();
      }
    }else{
      date = serverTime.getDate();
      month = serverTime.getMonth() + 1;
      year = serverTime.getFullYear();
    }

    this.setState({date, month, year});
  }

  render() {
    let timing = '', meridian = '';
    const {time, date, month, year} = this.state;

    if (time) {
      timing = time.split('_')[0];
      meridian = time.split('_')[1];
    }

    return (
      <div>
        <div className = 'col-xs-12 confirm pad0'>
          <div className = 'col-xs-12 datepick'>
            <div className = 'col-xs-3 pad0'> Pick your slot </div>
            <div className = 'col-xs-7 date' style={{height: 40}}> { date + '/' + month + '/' + year + ' ' + timing + meridian } </div>
            <div className = 'col-xs-12 timer' style={{margin: 'auto'}}>
              <div className = 'one'>
                { this.renderDate() }
              </div>
              <div className = 'two'>
                { this.renderMonths() }
              </div>
              <div className = 'three'>
                <select className = 'col-xs-12' onChange = { this.yearPicked } value = {year}>
                  <option value='2017'>2017</option>
                  <option value='2018'>2018</option>
                </select>
              </div>
            </div>

            <div className = 'col-xs-6 col-xs-offset-3 pad0'>
              { this.renderTime() }
            </div>
          </div>
        </div>
      </div>
    )
  }

  isLastDayOfYear(date){
    const nextDate = new Date(date.getTime());
    nextDate.setDate(date.getDate() + 1);
    return nextDate.getFullYear() !== date.getFullYear();
  }

  isLastDayOfMonth(date){
    const nextDate = new Date(date.getTime());
    nextDate.setDate(date.getDate() + 1);
    return nextDate.getMonth() !== date.getMonth();
  }

  isCurrentDayOver(date){
    return date.getHours() > 15;
  }

  datePicked = (e) => {
    this.setState({date: e.currentTarget.value}, this.props.scheduleHandler(Object.assign({}, this.state, {date: e.currentTarget.value})));
  }

  monthPicked = (e) => {
    this.setState({month: e.currentTarget.value}, this.props.scheduleHandler(Object.assign({}, this.state, {month: e.currentTarget.value})));
  }

  yearPicked = (e) => {
    this.setState({year: e.currentTarget.value}, this.props.scheduleHandler(Object.assign({}, this.state, {year: e.currentTarget.value})));
  }

  timeEntered = (e) => {
    this.setState({time: e.currentTarget.value}, this.props.scheduleHandler(Object.assign({}, this.state, {time: e.currentTarget.value})));
  }
}


