/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opacity: 1 };
  }

  render() {
    return (
      <div className='cart col-xs-12 col-md-4'>
        <div className='col-xs-2'>
          <i className='fa fa-comments fa-2x'></i>
        </div>
        <div className='col-xs-2 pad0'>
          <span className='count'>{ this.props.bookingDetails.servicesCount || 0 }</span>
          <Link to= { 'cart' }>
            <i className='fa fa-shopping-cart fa-2x'></i>
          </Link>
        </div>
        <div className='col-xs-5 pad0'>
          SubTotal &nbsp; <i className='fa fa-inr'></i> { this.props.bookingDetails.subTotal || 0 }
        </div>
        <div className='col-xs-3 full-height book pad0' onClick = { this.props.bookingDetails.subTotal >= this.props.bookingDetails.minBooking ? this.navigateTo.bind(this) : this.showMessage.bind(this) }>

          <div className="tooltip">Book Now
            <span className="tooltiptext"> Minimum booking amount is 800 </span>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    window.onscroll = this.userIsScrolling
  }

  userIsScrolling() {
    console.log('Scrolling');
    var that = this;
    var doc = document.documentElement;
    var h1 = ( window.pageYOffset || doc.scrollTop )  - ( doc.clientTop || 0 );

    setTimeout(function() {
      var h2 = ( window.pageYOffset || doc.scrollTop )  - ( doc.clientTop || 0 );
      if( h1 > h2) {
        that.userIsScrollingUp
      }else if( h2 > h1) {
        that.userIsScrollingDown
      }else {
        that.userScrollingStopped
      }
    }, 100)

  }

  userIsScrollingUp() {
    console.log('Up');
  }

  userIsScrollingDown() {
    console.log("Set1");

  }

  userScrollingStopped() {
    console.log("UnSet1");

  }

  navigateTo() {
    this.isLoggedIn() ?  browserHistory.push('/book') : browserHistory.push('/login')
  }

  showMessage() {

  }

  isLoggedIn() {
    return true;
  }


}

