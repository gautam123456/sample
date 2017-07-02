/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ThankYouFooter from './ThankYouFooter';
import Base from './base/Base';

export default class ThankYou extends React.Component {

  render() {
    const {moneySaved, finalAmount} = Base.sandbox;
    return (
        <div>
          <ActivityHeader heading = { 'Booking Confirmed' }/>

          <div className = 'col-md-offset-4 col-md-4 us pad0' style={{fontSize:'16px'}}>
            <img src="../styles/assets/images/booked.png" style={{height:'100%', width:'100%', marginBottom:'20px'}} alt=''/>

            {moneySaved ? <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Amount saved: <strong>Rs. {moneySaved} </strong></div> : ''}
            {finalAmount ? <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Amount payable: <strong>Rs. {finalAmount} </strong></div> : ''}
            <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> The booking details have been sent on your registered mobile number. </div>
            <div className = 'col-xs-12' > Refer your friends and earn. <a href='/referearn'><u>know more</u></a></div>
            <div className = 'col-xs-12' > Call 8826755766 for any query or assistance.</div>


          </div>
          <ThankYouFooter />
        </div>
    )
  }

  componentDidMount() {
    Base.clearCart();
  }
}


