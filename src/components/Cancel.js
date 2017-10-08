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
import {I, E, R_CANCEL} from '../constants';

import ajaxObj from '../../data/ajax.json';

export default class Cancel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.query.id,
      reason: '',
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
    const {notify, id, value} = this.state;

    return (
      <div>
        <ActivityHeader heading = { 'Cancel booking' }/>
        <TopNotification data={notify}/>
        <div className = 'col-md-offset-4 col-xs-12 col-md-4 cancel'>
          <div className='col-xs-12 center'>Booking ID : {id}</div>
          <textarea className='col-xs-12' maxLength='50' value={value} onChange={this.reason} placeholder={R_CANCEL}/>
          <button type = 'text' className = 'col-xs-12' onClick={  this.cancel }> CANCEL</button>
        </div>
        <ActivityFooter key = { 45 } back = { this.navigateBack }/>
      </div>
    )
  }

  navigateBack = () => {
    browserHistory.push('/appointments');
  }

  showNotification = (type, msg, timeout, top) => {
    this.setState({notify: {show: true, timeout, type, msg, top}})
  }

  reason = (e) => {
    this.setState({reason: e.target.value});
  }

  cancel = () => {
    //ga('send', 'event', 'Booking Cancelled', '', Base.sandbox.source);
    const {id, reason} = this.state;
    Base.showOverlay();
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/cancelbooking';
    ajaxObj.data = { bookingid: id, reason };
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
  }
}
