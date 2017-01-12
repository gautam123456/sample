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
        <ActivityFooter next = { 'address' } back = { '' }/>
      </div>
    )
  }
}


