/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import Base from './base/Base';
import DateWidget from './common/Date';
import ajaxObj from '../../data/ajax.json';

export default class Reschedule extends React.Component {

  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      id: this.props.location.query.id,
      datetime: '',
      timing: '',
      date: this.date.getHours() < 16 ? this.date.getDate() : this.date.getDate() + 1,
      month: (parseInt(this.date.getMonth()) + 1).toString(),
      year: parseInt(this.date.getFullYear()),
      months: [],
      msg: 'Please select time'
    }
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Reschedule booking' }/>
        <div className = 'col-md-offset-4 col-xs-12 col-md-4 cancel'>
          <div className = 'col-xs-12 center'>Booking ID : {this.state.id}</div>
          <DateWidget scheduleHandler = {this.scheduleHandler.bind(this)} data = {this.state} date={this.date}/>
          <button type = 'text' className = 'col-xs-12' onClick={  this.reschedule.bind(this) }> RESCHEDULE</button>
        </div>
      </div>
    )
  }

  scheduleHandler(param, value) {
    this.setState({[param]: value});
  }

  getDateTime() {
    const state = this.state;
    return state.month + '/' + state.date + '/' + state.year + '__' + state.timing;
  }

  reschedule() {
    const state = this.state;
    if(state.month && state.date && state.year && state.timing){
      Base.showOverlay();
      const self = this;
      ajaxObj.type = 'POST';
      ajaxObj.url = ajaxObj.baseUrl + '/reschedulebooking';
      ajaxObj.data = { bookingid: self.state.id, datetime: self.getDateTime() };
      ajaxObj.success = function() {
        browserHistory.push('appointments');
        Base.hideOverlay();
      }
      ajaxObj.error = () => {if(!Base.sandbox.bookingDetails.name){browserHistory.push('login')}}
      $.ajax(ajaxObj);
    }
  }
}

