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
          <ActivityHeader heading = { 'Booking Confirmed' } refresh={true}/>

          <div className = 'col-md-offset-4 col-md-4 us pad0' style={{fontSize:'16px'}}>
            <img src='../styles/assets/images/booked.jpg' style={{height:'100%', width:'100%', marginBottom:'20px'}} alt=''/>

            <a onClick={this.reload}>
              <div className="col-xs-12" style={{marginTop: -120, height:60}}></div>
            </a>

            {moneySaved != 0 ? <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Amount saved: <strong>Rs. {moneySaved} </strong></div> : ''}
            {finalAmount ? <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Amount payable: <strong>Rs. {finalAmount} </strong></div> : ''}
            <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Booking details have been sent on your registered mobile number. </div>
            <div className = 'col-xs-12' > Refer your friends and earn. <Link to='/salon-at-home/referearn'><u>know more</u></Link></div>
            <div className = 'col-xs-12' style={{marginBottom: 70}} > Call 8826755766 for any query or assistance.</div>
          </div>
          <ThankYouFooter />
        </div>
    )
  }

  reload() {
    window.location.assign(location.origin);
  }

  componentDidMount() {
    Base.clearCart();
  }
}
