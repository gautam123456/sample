/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';

export default class Cancel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.query.id,
      datetime: ''
    }
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Reschedule booking' }/>
        <div className = 'col-md-offset-4 col-xs-12 col-md-4 cancel'>
          <div className='col-xs-12 center'>Booking ID : {this.state.id}</div>
          
          <button type = 'text' className = 'col-xs-12' onClick={  this.cancel.bind(this) }> RESCHEDULE</button>
        </div>
      </div>
    )
  }

  reason(e) {
    const target = e.currentTarget;
    this.setState({reason: target.value});
  }

  cancel() {
    Base.showOverlay();
    const self = this;
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/reschedulebooking';
    ajaxObj.data = { bookingid: this.state.id, datetime: this.state.datetime };
    ajaxObj.success = function(data) {
      browserHistory.push('appointments');
      Base.hideOverlay();
    }
    ajaxObj.error = () => {if(!window.bookingDetails.name){browserHistory.push('login')}}
    $.ajax(ajaxObj);
  }
}

