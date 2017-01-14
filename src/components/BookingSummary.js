/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import BookedServicesList from './BookedServicesList';

export default class BookingSummary extends React.Component {
  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Booking Summary' }/>
        <BookedServicesList />
        <ActivityFooter next = { window.bookingDetails.subTotal >= window.bookingDetails.minBooking ? 'address': 'book' } back = { '' } msg = { 'Minimum booking amount is 800' }/>
      </div>
    )
  }
}


