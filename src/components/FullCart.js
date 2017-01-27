/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ServiceMenu from './ServiceMenu';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';

export default class FullCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookedItemList: window.bookingDetails,
      discount: 0,
      questionShow: {display: 'block', paddingTop: 0},
      applySectionShow: {display: 'none', paddingTop: 0},
      errormsg: {display: 'none', paddingTop: 0},
      couponCode:''
    }
  }

  render() {
    return (
        <div>
          <ActivityHeader heading = { 'Cart' }/>
          { this.renderCart() }
          <ActivityFooter next = { this.state.bookedItemList.subTotal >= this.state.bookedItemList.minBooking ? this.navigateTo() : '' } back = { '/' }/>
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

            <div className = 'message center'>Your Cart is empty, click next to add Services</div>
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
          {  this.state.bookedItemList.subTotal < this.state.bookedItemList.minBooking ? this.renderMessage() : ''}
        </div>
    )
  }

  renderMessage() {
    return (
        <div className = 'message center'>You need to add <i className = 'fa fa-inr'></i> { this.state.bookedItemList.minBooking - this.state.bookedItemList.subTotal} worth of more services in order to book</div>
    )
  }

  navigateTo() {
    if( window.bookingDetails.name === '' ){
      return 'login'
    }else{
      return 'book';
    }
  }

  bookingDetailsChanged(id, name, cost, count, operation) {

    var cost = parseInt(cost);

    if(operation){
      // if operation is addition of services....
      window.bookingDetails.servicesCount += 1;
      window.bookingDetails.subTotal += cost;
      if(window.bookingDetails.services[id]){
        window.bookingDetails.services[id].count += 1;
      } else {
        window.bookingDetails.services[id] = {
          count: 1,
          name: name,
          cost: cost
        }
      }
    } else {
      // If operation is removal of services....
      window.bookingDetails.servicesCount -= 1;
      window.bookingDetails.subTotal -= cost;
      window.bookingDetails.services[id].count -= 1;
      if(window.bookingDetails.services[id].count == 0){
        delete window.bookingDetails.services[id];
      }
    }
    this.forceUpdate();
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    window.localStorage.bookingDetails = JSON.stringify(window.bookingDetails);
  }

  isLoggedIn() {
    if(window.bookingDetails.name)
      return true;
    return false;
  }
}
