import React from 'react';
import ajaxObj from '../../../data/ajax.json';
import $ from 'jquery';
import Base from '../base/Base';

export default class DateWidget extends React.Component {
  constructor(props) {
    super(props);

    this.date = new Date();
    this.state = {
      time: '',
      date: this.date.getDate(),
      month: this.date.getMonth() + 1,
      year: this.date.getFullYear(),
      serverState : {
        time: this.date.getHours() + ':' + this.date.getMinutes(),
        date: this.date.getDate(),
        month: this.date.getMonth() + 1,
        year: this.date.getFullYear()
      }
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
    const self = this,
      months = this.getMonths();
    return (
      <select className = 'col-xs-12' onChange = { this.monthPicked.bind(this) } value = { this.state.month }>
        { months.map(function(index){
          return self.renderMonth(index)
        })}
      </select>
    )
  }

  getMonths(){
    let months = [[1,'Jan'],[2,'Feb'],[3,'March'],[4,'April'],[5,'May'],[6,'June'],[7,'July'],[8,'Aug'],[9,'Sep'],[10,'Oct'],[11,'Nov'],[12,'Dec']];
    if(this.state.year == this.state.serverState.year){
      months = months.slice(this.state.serverState.month - 1);
    }
    return months;
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
      if( this.date.getHours() > 15 ){
        days = days.slice(currentDate, days.length);
      }else{
        days = days.slice(currentDate-1, days.length);
      }

    }
    return days;
  }

  getHours() {
    let hours = [[570, '09:30 AM'], [600, '10:00 AM'], [630, '10:30 AM'],
      [660, '11:00 AM'], [690, '11:30 AM'], [720, '12:00 PM'],[750, '12:30 PM'],[780, '01:00 PM'],
      [810, '01:30 PM'], [840, '02:00 PM'], [870, '02:30 PM'],[900, '03:00 PM'],[930, '03:30 PM'],
      [960, '04:00 PM'], [990, '04:30 PM'], [1020, '05:00 PM'],[1050, '05:30 PM'],[1080, '06:00 PM']];

    console.log(this.state.month + "--" + this.state.serverState.month + "--" +
      this.state.serverState.year + "--" + this.state.year + "--" +this.state.date + "--" + this.state.serverState.date);

    if( this.state.month == (this.state.serverState.month)  && this.state.serverState.year == this.state.year && this.state.date == this.state.serverState.date){
      let index = 0,
        serverTimeSplit = this.state.serverState.time.split(':'),
        serverTimeInMin = (parseInt(serverTimeSplit[0]) * 60) + parseInt(serverTimeSplit[1]);

      if (serverTimeInMin <= 360) {
        return hours
      }else if (serverTimeInMin <= 480) {
        return hours.slice(index + 2, hours.length);
      }else if (serverTimeInMin <= 570) {
        return hours.slice(index + 5, hours.length);
      }

      for(let i = 0; i < hours.length; i++){
        if(serverTimeInMin <= hours[i][0]) {
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
      ajaxObj.success = function(data) {
        console.log(data);
        const timeArray = data.split(' ');
        self.setState({
          serverState: {
            time: '9:35',
            date: timeArray[0].split('-')[2],
            month: timeArray[0].split('-')[1],
            year: timeArray[0].split('-')[0]
        }});
      }
      $.ajax(ajaxObj);
  }

  render() {
    let timing = '', meridian = '';
    if (this.state.time) {
      timing = this.state.time.split('_')[0];
      meridian = this.state.time.split('_')[1];
    }

    return (
      <div>
        <div className = 'col-xs-12 confirm pad0'>
          <div className = 'col-xs-12 datepick'>
            <div className = 'col-xs-3 pad0'> Pick your slot </div>
            <div className = 'col-xs-7 date' style={{height: 40}}> { this.props.data.date + '/' + this.props.data.month + '/' + this.props.data.year + ' ' + timing + meridian } </div>
            <div className = 'col-xs-12 timer' style={{margin: 'auto'}}>
              <div className = 'one'>
                { this.renderDate() }
              </div>
              <div className = 'two'>
                { this.renderMonths() }
              </div>
              <div className = 'three'>
                <select className = 'col-xs-12' onChange = { this.yearPicked.bind(this) } value = { this.props.data.year }>
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

  datePicked(e) {
    this.setState({date: e.currentTarget.value});
    this.props.scheduleHandler('date', e.currentTarget.value)
  }

  monthPicked(e) {
    this.setState({month: e.currentTarget.value});
    this.props.scheduleHandler('month', e.currentTarget.value)
  }

  yearPicked(e) {
    this.setState({year: e.currentTarget.value});
    this.props.scheduleHandler('year', e.currentTarget.value)
  }

  timeEntered(e) {
    this.setState({time: e.currentTarget.value});
    this.props.scheduleHandler('timing', e.currentTarget.value)
  }
}


