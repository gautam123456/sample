/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ServiceMenu from './ServiceMenu';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import LeftNav from './common/LeftNav';
import {connect} from 'react-redux';

class FullCart extends React.Component {
  render() {
    return (
        <div>
          <ActivityHeader heading = { 'Cart' }/>
          <div className='col-md-4 nomob'>
            <LeftNav />
          </div>
          { this.renderCart() }
          <ActivityFooter key = { 45 } next = { this.navigateNext.bind(this) } back = { this.navigateBack.bind(this) }/>
        </div>
    )
  }

  renderCart() {
    const {bookingDetails : {services, servicesCount, total}} = this.props;

    if(servicesCount == 0)
      return (
          <div className = 'col-md-4 us'>
            <div className = 'emptyCart'>
              <i className = 'fa fa-opencart'></i>
            </div>

            <div className = 'message center' style = {{fontSize: 15}}>Your cart is empty, please add services.</div>
          </div>
      )

    const then = this,
        objKeys = Object.keys(services);
    return (
        <div className = 'col-md-4 pad0'>
          {
            objKeys.map( function(key) {
              return <ServiceMenu list = { services[key] } count = { services[key] ? services[key].count : 0 } key = { key } id = { key } />
            })
          }

          <div className = 'col-xs-12 summary pad0'>
            <div className = 'col-xs-12'>
              <div className = 'col-xs-8'> Total </div>
              <div className = 'col-xs-4'> <i className = 'fa fa-inr'></i> { total } </div>
            </div>
          </div>
        </div>
    )
  }

  navigateBack() {
    browserHistory.push('');
  }

  navigateNext() {
    const {bookingDetails: {total, minBooking}} = this.props;
    if(total >= minBooking) {
      browserHistory.push('/order/details');
    } else {
      browserHistory.push('');
    }
  }
}

function mapStateToProps(state) {
  return {
    bookingDetails: state.bookingDetails
  };
}

export default connect(mapStateToProps)(FullCart);
