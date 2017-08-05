/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import TopNotification from './TopNotification';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';

export default class Cancel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.query.id,
      reason: '',
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
        <ActivityHeader heading = { 'Cancel booking' }/>
        <TopNotification data={this.state.notify}/>
        <div className = 'col-md-offset-4 col-xs-12 col-md-4 cancel'>
          <div className='col-xs-12 center'>Booking ID : {this.state.id}</div>
          <textarea className='col-xs-12' maxlength='50' value={this.state.value} onChange={this.reason.bind(this)} placeholder='Reason for cancellation'/>
          <button type = 'text' className = 'col-xs-12' onClick={  this.cancel.bind(this) }> CANCEL</button>
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

  reason(e) {
    const target = e.currentTarget;
    this.setState({reason: target.value});
  }

  cancel() {
    ga('send', 'event', 'Booking Cancelled', '', Base.sandbox.source);
    const self = this;
    Base.showOverlay();
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/cancelbooking';
    ajaxObj.data = { bookingid: this.state.id, reason: this.state.reason };
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
  }
}
