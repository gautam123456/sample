/**
 * Created by rgautam on 1/13/17.
 */
import React from 'react';
import { Link } from 'react-router';

export default class Appointment extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const appointment = this.props.appointment;
    return (
      <div className = 'col-xs-12 pad0 appointment'>
        <div className = 'col-xs-12'>

          <div className = 'col-xs-12 header'>
            <div className = 'col-xs-12 pull-right pad0'>Booking Id : {appointment.bookingID}</div>
            <div className = 'col-xs-12 pad0'>Appointment Date : {appointment.formattedDate}</div>
          </div>

          <div className = 'col-xs-12 body'>

          </div>
        </div>
      </div>
    )
  }
}


