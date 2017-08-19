/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import $ from 'jquery';
import Base from './base/Base';
import DateWidget from './common/Date';
import TopNotification from './TopNotification';

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
      notify: {
        show: false,
        type: 'info',
        timeout: 4000,
        msg:'',
        top: 30
      }
    }
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Reschedule booking' }/>
        <TopNotification data={this.state.notify}/>
        <div className = 'col-md-offset-4 col-xs-12 col-md-4 cancel'>
          <div className = 'col-xs-12 center'>Booking ID : {this.state.id}</div>
          <DateWidget scheduleHandler = {this.scheduleHandler.bind(this)} data = {this.state} date={this.date}/>
          <button type = 'text' className = 'col-xs-12' onClick={  this.reschedule.bind(this) }> RESCHEDULE</button>
        </div>
        <ActivityFooter key = { 45 } back = { this.navigateBack.bind(this) }/>
      </div>
    )
  }

  navigateBack() {
    browserHistory.push('/appointments');
  }

  showNotification(type, msg, timeout, top) {
    this.setState({notify: {show: true, timeout, type, msg, top}})
  }

  scheduleHandler(param, value) {
    if(param === 'date') {
      this.setState({timing: ''});
    }
    this.setState({[param]: value, notify: {show: false}});
  }

  getDateTime() {
    const state = this.state;
    return state.month + '/' + state.date + '/' + state.year + '__' + state.timing;
  }

  reschedule() {
    const state = this.state,
      self = this;
    if(state.month && state.date && state.year && state.timing){
      Base.showOverlay();
      ajaxObj.type = 'POST';
      ajaxObj.url = ajaxObj.baseUrl + '/reschedulebooking';
      ajaxObj.data = { bookingid: self.state.id, datetime: self.getDateTime() };
      ajaxObj.success = function(data) {
        Base.hideOverlay();
        Base.sandbox.notify = data.message;
        browserHistory.push('/appointments?notify=true');
      }
      ajaxObj.error = (e) => {
        Base.hideOverlay();
        self.showNotification('error', e.responseJSON.message, 4000, 30);
      }
      $.ajax(ajaxObj);
    } else {
      self.showNotification('info', 'Please select your new time slot', 4000, 30);
    }
  }
}

