/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ThankYouFooter from './ThankYouFooter';
import Base from './base/Base';
import { Link } from 'react-router';

export default class ThankYou extends React.Component {

  render() {
    const {moneySaved, finalAmount} = Base.sandbox;
    return (
        <div>
          <ActivityHeader heading = { 'Booking Confirmed' }/>

          <div className = 'col-md-offset-4 col-md-4 us pad0' style={{fontSize:'16px'}}>
            <img src="../styles/assets/images/booked.jpg" style={{height:'100%', width:'100%', marginBottom:'20px'}} alt=''/>

            <Link to = { '/' }>
            <div className="col-xs-12" style={{marginTop: -120,height:60}}>

            </div>
            </Link>

            {moneySaved ? <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Amount saved: <strong>Rs. {moneySaved} </strong></div> : ''}
            {finalAmount ? <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Amount payable: <strong>Rs. {finalAmount} </strong></div> : ''}
            <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Booking details have been sent on your registered mobile number. </div>
            <div className = 'col-xs-12' > Refer your friends and earn. <a href='/referearn'><u>know more</u></a></div>
            <div className = 'col-xs-12' > Call 8826755766 for any query or assistance.</div>
            {
              Base.sandbox.bookingID && Base.sandbox.finalAmount && ((window.location.origin == 'https://lookplex.com') || (window.location.origin == 'https://m.lookplex.com')) && false ?
              <iframe src={'https://coupondunia.go2cloud.org/aff_l?offer_id=1413&adv_sub='+Base.sandbox.bookingID+'&amount='+Base.sandbox.finalAmount} scrolling="no" frameborder="0" width="1" height="1"></iframe>
                : null
            }


          </div>
          <ThankYouFooter />
        </div>
    )
  }

  componentDidMount() {
    Base.clearCart();
    console.log(window.location.href.splice('.')[0]);
  }
}


