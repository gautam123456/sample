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
import {TIME, I, E} from '../constants';

import ajaxObj from '../../data/ajax.json';

export default class Reschedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.query.id,
      timing: {},
      notify: {
        show: false,
        type: I,
        timeout: 4000,
        msg:'',
        top: 30
      }
    }
  }

  render() {
    const {notify, id} = this.state;

    return (
      <div>
        <ActivityHeader heading = { 'Reschedule booking' }/>
        <TopNotification data={notify}/>
        <div className = 'col-md-offset-4 col-xs-12 col-md-4 cancel'>
          <div className = 'col-xs-12 center'>Booking ID : {id}</div>
          <DateWidget scheduleHandler = {this.scheduleHandler} />
          <button type = 'text' className = 'col-xs-12' onClick={this.reschedule}> RESCHEDULE</button>
        </div>
        <ActivityFooter key = { 45 } back = {this.navigateBack}/>
      </div>
    )
  }

  navigateBack = () => {
    browserHistory.push('/appointments');
  }

  showNotification = (type, msg, timeout, top) => {
    this.setState({notify: {show: true, timeout, type, msg, top}})
  }

  scheduleHandler = (timing) => {
    this.setState({timing, notify: {show: false}});
  }

  reschedule = () => {
    const {timing: {date, month, time, year}, id} = this.state;

    if(month && date && year && time){
      Base.showOverlay();
      ajaxObj.type = 'POST';
      ajaxObj.url = ajaxObj.baseUrl + '/reschedulebooking';
      ajaxObj.dataType ="json",
      ajaxObj.data = { bookingid: id, datetime: month + '/' + date + '/' + year + '__' + time };
      ajaxObj.success = (data) => {
        Base.hideOverlay();
        Base.sandbox.notify = data.message;
        browserHistory.push('/appointments?notify=true');
      }
      ajaxObj.error = (e) => {
        Base.hideOverlay();
        this.showNotification(E, e.responseJSON.message, 4000, 30);
      }
      $.ajax(ajaxObj);
    } else {
      this.showNotification(I, TIME, 4000, 30);
    }
  }
}

