/**
 * Created by rgautam on 1/13/17.
 */
import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import Base from './base/Base';
import Appointment from './Appointment';

import ajaxObj from '../../data/ajax.json';

export default class AddAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ongoing: true,
      bookingList: [{}],
      ongoingList: [{}],
      historyList: [{}]
    }
  }

  render() {
    const list = this.state.bookingList,
      self = this;

    return (
      <div className = 'col-xs-12 pad0 col-md-4 col-md-offset-4 appointments'>
        <div className = 'col-xs-10 col-xs-offset-1 tab'>
          <div className = 'col-xs-6 active'>ONGOING</div>
          <div className = 'col-xs-6'>HISTORY</div>
        </div>
        { list.map( function(appointment) {
          if(appointment.formattedDate){
            
          }
          return (<Appointment appointment={appointment}/>)
        }) }
      </div>
    )
  }

  componentWillMount() {
    this.getAppointments();
  }

  getAppointments() {
    Base.showOverlay();
    const self = this;
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/getmybookings';
    ajaxObj.success = function(data) {
      self.setState({bookingList: data.customerBookingList});
      Base.hideOverlay();
    }
    ajaxObj.error = () => {if(!window.bookingDetails.name){browserHistory.push('login')}}
    $.ajax(ajaxObj);
  }
}


