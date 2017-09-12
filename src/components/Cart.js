/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Base from './base/Base';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1
    };
  }

  render() {
    return (
      <div className='cart col-xs-12 col-md-4'>
        <div className='col-xs-3 pad0'>
          <span className='count'>{ this.props.bookingDetails.servicesCount || 0 }</span>
          <Link to= { '/cart' }>
            <i className='fa fa-opencart' style={{paddingLeft: 5}}></i>
          </Link>
        </div>
        <div className='col-xs-5 pad0'>
          <Link to= { '/cart' } style={{color: '#fff'}}>
          Subtotal &nbsp; <i className='fa fa-inr'></i> { this.getSubTotal() }
          </Link>
        </div>
        <div className='col-xs-4 full-height book pad0 cli' onClick = {this.navigateTo.bind(this)}>
          {'Book Now'}
        </div>
      </div>
    )
  }

  getSubTotal() {
    if(this.props.bookingDetails.subTotal) {
      if(Base.offerbox.discount) {
        return (this.props.bookingDetails.subTotal - (this.props.bookingDetails.subTotal * Base.offerbox.discount/100));
      } else {
        return this.props.bookingDetails.subTotal;
      }
    } else {
      return 0;
    }

  }

  componentDidMount() {
    this.initializeTawkTo();
  }

  initializeTawkTo() {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function(){
      var s1=document.createElement('script'),s0=document.getElementsByTagName('script')[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/57cada172b03647ba16fdffe/default';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();

    Tawk_API.onChatMaximized = function(){
      console.log(Base.sandbox);
      Tawk_API.visitor = {
        name  : 'Name',
        email : 'email@email.com'
      };
    };
  }

  navigateTo() {
    Base.track('track', 'InitiateCheckout');
    //if(this.isLoggedIn()) {
      if(this.isMinAmountValid()) {
        browserHistory.push('/order/details');
      } else {
        this.props.showNotification('info', 'Minimum booking amount is Rs.800, please add more services.', 4000, 60);
      }
   // } else {
   //   browserHistory.push('/login')
   // }
  }

  isMinAmountValid() {
    if (Base.offerbox.discount) {
      const subTotal = this.props.bookingDetails.subTotal - (this.props.bookingDetails.subTotal * Base.offerbox.discount/100);
      return subTotal >= this.props.bookingDetails.minBooking;
    }else {
      return this.props.bookingDetails.subTotal >= this.props.bookingDetails.minBooking;
    }
  }

  isLoggedIn() {
    if(Base.sandbox.bookingDetails.name)
      return true;
    return false;
  }


}

