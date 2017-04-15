import React from 'react';

export default class DateWidget extends React.Component {
  constructor(props) {
    super(props);
    this.date = this.props.date;
  }

  renderDate() {
    let days = this.getNumberOfDays(),
      self = this;
    return (
      <select className = 'col-xs-12' onChange = { this.datePicked.bind(this) } value = { this.props.data.date }>
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
      <select className = 'col-xs-12' onChange = { this.monthPicked.bind(this) } value = { this.props.data.month }>
        { this.props.data.months.map(function(index){
          return self.renderMonth(index)
        })}
      </select>
    )
  }

  getMonths(){
    this.props.data.months = [[1,'Jan'],[2,'Feb'],[3,'March'],[4,'April'],[5,'May'],[6,'June'],[7,'July'],[8,'Aug'],[9,'Sep'],[10,'Oct'],[11,'Nov'],[12,'Dec']];
    if(this.props.data.year == this.date.getFullYear()){
      this.props.data.months = this.props.data.months.slice(this.date.getMonth(),11);
    }
  }

  renderDay(day) {
    return (
      <option key = {day} value={day}>{day}</option>
    )
  }

  getNumberOfDays() {
    let days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    switch(this.props.data.month){
      case '4':
      case '6':
      case '9':
      case '11': days[29] = 29; days[30] = 30;
        break;
      case '2':
        break;
      default : days[29] = 29; days[30] = 30; days[31] = 31;
    }
    if(this.props.data.month == (this.date.getMonth() + 1)  && this.date.getFullYear().toString().indexOf(this.props.data.year) >= 0){
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
    let hours = [['9:00','09:00 AM'], ['9:30','09:30 AM'], ['10:00','10:00 AM'], ['10:30','10:30 AM'],
      ['11:00','11:00 AM'], ['11:30','11:30 AM'], ['12:00','12:00 PM'],['12:30','12:30 PM'],['1:00','01:00 PM'],
      ['1:30','01:30 PM'], ['2:00','02:00 PM'], ['2:30','02:30 PM'],['3:00','03:00 PM'],['3:30','03:30 PM'],
      ['4:00','04:00 PM'], ['4:30','04:30 PM'], ['5:00','05:00 PM'],['5:30','05:30 PM'],['6:00','06:00 PM']];

    if( this.props.data.month == (this.date.getMonth() + 1)  && this.date.getFullYear().toString().indexOf(this.props.data.year) >= 0 && this.props.data.date == this.date.getDate() && this.date.getHours() < 16){
      let currentHour = this.date.getHours()
      let index;
      for(var i = 0 ; i < hours.length ; i++){
        if(hours[i][0].split(':')[0] == currentHour){
          index = i;
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
        <div className = 'col-xs-12 confirm'>
          <div className = 'col-xs-12 datepick'>
            <span> Pick your time </span>
            <div className = 'col-xs-12 date' style={{height:40}}> { this.props.data.date + '/' + this.props.data.month + '/' + this.props.data.year + ' ' + this.props.data.timing } </div>

            <div className = 'col-xs-4 pad0'>
              <select className = 'col-xs-12' onChange = { this.yearPicked.bind(this) } value = { this.props.data.year }>
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
        </div>
      </div>
    )
  }

  datePicked(e) {
    this.props.scheduleHandler('date', e.currentTarget.value)
  }

  monthPicked(e) {
    this.props.scheduleHandler('month', e.currentTarget.value)
  }

  yearPicked(e) {
    this.props.scheduleHandler('year', e.currentTarget.value)
  }

  timeEntered(e) {
    this.props.scheduleHandler('timing', e.currentTarget.value)
  }
}

