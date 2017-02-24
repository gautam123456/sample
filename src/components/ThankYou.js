/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ThankYouFooter from './ThankYouFooter';

export default class ThankYou extends React.Component {

  render() {
    return (
        <div>
          <ActivityHeader heading = { 'Booking Confirmed' }/>
          <div className = 'col-md-offset-4 col-md-4 us'>
            <div className = 'emptyCart'>
              <i className = 'fa fa-handshake-o' style = { {fontSize: 70,paddingTop: 10} }></i>
            </div>

            <div className = 'message'> The booking details have been sent on your registered mobile number. </div>
            <div className = 'message'> Call 8826755766 for any query or assistance.</div>


          </div>
          <ThankYouFooter />
        </div>
    )
  }

  componentDidMount() {
    window.localStorage.clear();
    window.bookingDetails = {
      'minBooking': 800,
      'convenienceCharges': 100,
      'subTotal': 0,
      'servicesCount': 0,
      'discount': 0,
      'couponcode':'',
      'location': 'Delhi',
      'addresslkey': '',
      'services': {},
      'otp': '',
      'hashIndex':'',
      'addressList':'',
      'date':'',
      'timing':'',
      'name':null,
      'mailId':'',
      'total':0
    };
  }
}


