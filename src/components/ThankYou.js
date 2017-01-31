/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ThankYouFooter from './ThankYouFooter';

import bookingDetails from '../../data/constants.json';

export default class ThankYou extends React.Component {

  render() {
    return (
        <div>
          <ActivityHeader heading = { 'Booking Confirmed' }/>
          <div className = 'col-md-offset-4 col-md-4 us'>
            <div className = 'emptyCart'>
              <i className = 'fa fa-handshake-o' style = { {fontSize: 70,paddingTop: 10} }></i>
            </div>

            <div className = 'message'><i className = 'fa fa-circle'></i> We have sent your booking details on registered mobile number, our beautician will get in touch with you 1-2 hour prior to your booking time.</div>
            <div className = 'message'><i className = 'fa fa-circle'></i> In case you have queries feel free to get in touch.</div>
            <div className = 'message'><i className = 'fa fa-circle'></i> See you soon, until then have a nice time.</div>


          </div>
          <ThankYouFooter />
        </div>
    )
  }

  componentDidMount() {
    window.localStorage.clear();
    window.bookingDetails = {};
  }
}


