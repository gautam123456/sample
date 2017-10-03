/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ThankYouFooter from './ThankYouFooter';
import {connect} from 'react-redux';
import { Link } from 'react-router';

class ThankYou extends React.Component {

  render() {
    const {moneySaved, finalAmount} = this.props.misc,
      src=`//www.googleadservices.com/pagead/conversion/844167913/?value=${finalAmount}&currency_code=INR&label=fopCCK7XknQQ6fXDkgM&guid=ON&script=0`;

    return (
        <div>
          <ActivityHeader heading = { 'Booking Confirmed' }/>

          <div className = 'col-md-offset-4 col-md-4 us pad0' style={{fontSize:'16px'}}>
            <img src='../styles/assets/images/booked.jpg' style={{height:'100%', width:'100%', marginBottom:'20px'}} alt=''/>

            <Link to={'/'}>
              <a className='cli'>
                <div className="col-xs-12" style={{marginTop: -120, height:60}}></div>
              </a>
            </Link>

            {moneySaved != 0 ? <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Amount saved: <strong>Rs. {moneySaved} </strong></div> : ''}
            {finalAmount ? <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Amount payable: <strong>Rs. {finalAmount} </strong></div> : ''}
            <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Booking details have been sent on your registered mobile number. </div>
            <div className = 'col-xs-12' > Refer your friends and earn. <Link to={'/salon-at-home/referearn'}><a className='cli'><u>know more</u></a></Link></div>
            <div className = 'col-xs-12' style={{marginBottom: 70}} > Call 8826755766 for any query or assistance.</div>
            {finalAmount ? <img height='1' width='1' style={{border:'none'}} alt='' src={src}/> : null}
          </div>
          <ThankYouFooter />
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    misc: state.misc
  };
}

export default connect(mapStateToProps)(ThankYou);
