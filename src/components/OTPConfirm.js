/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ThankYouFooter from './ThankYouFooter';

export default class OTPConfirm extends React.Component {
  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Your Order Confirmed' }/>
        <ActivityFooter next = { 'booking/confirmed' } back = { 'address' }/>
      </div>
    )
  }

  componentDidMount() {
    document.getElementById('load').style.display = 'none';
    document.getElementById('mySidenav').style.display = 'block';
    document.body.style.backgroundColor = '#fff';
  }
}


