/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ServiceMenu from './ServiceMenu';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import Base from './base/Base';

export default class FullCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookedItemList: Base.sandbox.bookingDetails
    }
  }

  render() {
    return (
        <div>
          <ActivityHeader heading = { 'Cart' }/>
          { this.renderCart() }
          <ActivityFooter key = { 45 } next = { this.navigateNext.bind(this) } back = { this.navigateBack.bind(this) }/>
        </div>
    )
  }

  renderCart() {
    if(this.state.bookedItemList.servicesCount == 0)
      return (
          <div className = 'col-md-offset-4 col-md-4 us'>
            <div className = 'emptyCart'>
              <i className = 'fa fa-shopping-cart'></i>
            </div>

            <div className = 'message center' style = {{fontSize: 15}}>Your cart is empty, please add services.</div>
          </div>
      )

    const then = this,
        objKeys = Object.keys(this.state.bookedItemList.services);
    return (
        <div className = 'col-md-offset-4 col-md-4 pad0'>
          {
            objKeys.map( function(key) {
              return <ServiceMenu list = { then.state.bookedItemList.services[key] } count = { then.state.bookedItemList.services && then.state.bookedItemList.services[key] ? then.state.bookedItemList.services[key].count : 0 } key = { key } id = { key } bookingDetailsChanged = { then.bookingDetailsChanged.bind(then) }/>
            })
          }

          <div className = 'col-xs-12 summary pad0'>
            <div className = 'col-xs-12'>
              <div className = 'col-xs-8'> Sub Total </div>
              <div className = 'col-xs-4'> <i className = 'fa fa-inr'></i> { this.state.bookedItemList.subTotal } </div>
            </div>
          </div>
        </div>
    )
  }

  navigateBack() {
    browserHistory.push('');
  }

  navigateNext() {
    if(Base.sandbox.bookingDetails.name){
      if(Base.sandbox.bookingDetails.subTotal >= Base.sandbox.bookingDetails.minBooking) {
        browserHistory.push('/order/details');
      } else {
        browserHistory.push('');
      }

    }else{
      browserHistory.push('/login');
    }
  }

  bookingDetailsChanged(id, name, cost, count, operation) {

    //var cost = parseInt(cost);
    //
    //if(operation){
    //  // if operation is addition of services....
    //  window.bookingDetails.servicesCount += 1;
    //  window.bookingDetails.subTotal += cost;
    //  if(window.bookingDetails.services[id]){
    //    window.bookingDetails.services[id].count += 1;
    //  } else {
    //    window.bookingDetails.services[id] = {
    //      count: 1,
    //      name: name,
    //      cost: cost
    //    }
    //  }
    //} else {
    //  // If operation is removal of services....
    //  window.bookingDetails.servicesCount -= 1;
    //  window.bookingDetails.subTotal -= cost;
    //  window.bookingDetails.services[id].count -= 1;
    //  if(window.bookingDetails.services[id].count == 0){
    //    delete window.bookingDetails.services[id];
    //  }
    //}

    Base.bookingDetailsChanged({id, name, cost, count, operation});
    this.forceUpdate();
    Base.saveToLocalStorage();
  }

  //saveToLocalStorage() {
  //  let bookingDetails = window.bookingDetails;
  //  bookingDetails.discount = 0;
  //  window.localStorage.bookingDetails = JSON.stringify(bookingDetails);
  //}

  isLoggedIn() {
    if(Base.sandbox.bookingDetails.name)
      return true;
    return false;
  }
}
