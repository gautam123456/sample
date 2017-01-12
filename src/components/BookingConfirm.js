/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import ThankYou from './ThankYou';
import ThankYouFooter from './ThankYouFooter';


export default class BookingConfirm extends React.Component {
  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Booking Confirmed' }/>
        <ThankYou />
        <ThankYouFooter />
      </div>
    )
  }

  componentDidMount() {
    window.localStorage.clear();
  }
}


