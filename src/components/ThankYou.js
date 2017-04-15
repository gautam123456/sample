/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ThankYouFooter from './ThankYouFooter';
import Base from './base/Base';

export default class ThankYou extends React.Component {

  render() {
    const style = {
      fontSize: 16
    }

    return (
        <div>
          <ActivityHeader heading = { 'Booking Confirmed' }/>
          <div className = 'col-md-offset-4 col-md-4 us'>
            <div className = 'emptyCart'>
              <i className = 'fa fa-handshake-o' style = { {fontSize: 70,paddingTop: 10} }></i>
            </div>

            <div className = 'message' style = { style }> The booking details have been sent on your registered mobile number. </div>
            <div className = 'message' style = { style }> Call 8826755766 for any query or assistance.</div>


          </div>
          <ThankYouFooter />
        </div>
    )
  }

  componentDidMount() {
    Base.clearCart();
  }
}


