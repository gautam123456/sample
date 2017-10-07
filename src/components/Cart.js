/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Base from './base/Base';
import {connect} from 'react-redux';
import {MIN_BOOKING, I} from '../constants';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1
    };
  }

  render() {
    const {bookingDetails: {servicesCount, total}} = this.props;

    return (
      <div className='cart col-xs-12 col-md-4'>
        <div className='col-xs-3 pad0'>
          <span className='count'>{ servicesCount }</span>
          <Link to= { '/cart' }>
            <i className='fa fa-opencart' style={{paddingLeft: 5}}></i>
          </Link>
        </div>
        <div className='col-xs-5 pad0'>
          <Link to= { '/cart' } style={{color: '#fff'}}>
          Subtotal &nbsp; <i className='fa fa-inr'></i> { total }
          </Link>
        </div>
        <div className='col-xs-4 full-height book pad0 cli' onClick = {this.navigateTo}>
          {'Book Now'}
        </div>
      </div>
    )
  }

  navigateTo = () => {
    Base.track('track', 'InitiateCheckout');
    if(this.isMinAmountValid()) {
      browserHistory.push('/order/details');
    } else {
      this.props.showNotification(I, MIN_BOOKING, 4000, 60);
    }
  }

  isMinAmountValid() {
    const {bookingDetails: {minBooking, total}} = this.props;
    return (total >= minBooking);
  }

  isLoggedIn() {
    if(this.props.isLoggedIn)
      return true;
    return false;
  }
}

function mapStateToProps(state) {
  return {
    bookingDetails: state.bookingDetails,
    isLoggedIn: state.userDetails.isLoggedIn
  };
}

export default connect(mapStateToProps)(Cart);

