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
      reason: ''
    }
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Cancel booking' }/>
        <div className = 'col-md-offset-4 col-xs-12 col-md-4 cancel'>
          <div className='col-xs-12 center'>Booking ID : {this.state.id}</div>
          <textarea className='col-xs-12' maxlength='50' value={this.state.value} onChange={this.reason.bind(this)} placeholder='Reason for cancellation'/>
          <button type = 'text' className = 'col-xs-12' onClick={  this.cancel.bind(this) }> CANCEL</button>
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
    ajaxObj.url = ajaxObj.baseUrl + '/cancelbooking';
    ajaxObj.data = { bookingid: this.state.id, reason: this.state.reason };
    ajaxObj.success = function(data) {
      browserHistory.push('appointments');
      Base.hideOverlay();
    }
    ajaxObj.error = () => {if(!window.bookingDetails.name){browserHistory.push('login')}}
    $.ajax(ajaxObj);
  }
}
