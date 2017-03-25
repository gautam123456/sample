/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import BookedServicesList from './BookedServicesList';

export default class BookingSummary extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      display: 'none'
    }
  }
  render() {
    const book = {
      minHeight: 40,
      fontSize: 15,
      bottom: 0
    }
    return (
      <div>
        <ActivityHeader heading = { 'Booking Summary' }/>
        <BookedServicesList />
        <button className = 'col-xs-12 col-md-4 summ' style = {book} onClick = { this.bookingConfirm.bind(this) }>
          <div className='tooltip'>Continue
            <span className='tooltiptext'> Minimum booking amount is <i className='fa fa-inr'></i> 800, add more services. </span>
          </div>
        </button>
      </div>
    )
  }

  hideMsg() {
    this.setState({displayType:'none'});
  }

  bookingConfirm() {
    const subTotal = window.bookingDetails.subTotal;
    if((subTotal - (subTotal * window.bookingDetails.discount/100)) >= window.bookingDetails.minBooking){
      browserHistory.push('address');
    }
  }
}


