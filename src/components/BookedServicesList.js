/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ServiceMenu from './ServiceMenu';
import $ from 'jquery';

import ajaxObj from '../../data/ajax.json';

export default class BookedServicesList extends React.Component {

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
    const then = this,
          objKeys = Object.keys(this.state.bookedItemList.services);
    return (
      <div className = 'col-md-offset-4 col-md-4'>
        {
          objKeys.map( function(key) {
                return <ServiceMenu list = { then.state.bookedItemList.services[key] } count = { then.state.bookedItemList.services && then.state.bookedItemList.services[key] ? then.state.bookedItemList.services[key].count : 0 } key = { key } id = { key } bookingDetailsChanged = { then.bookingDetailsChanged.bind(then) }/>
          })
        }

        <div className = 'col-xs-12 summary pad0'>
          <div className = 'col-xs-12'>
            <div className = 'col-xs-8'> Sub Total </div>
            <div className = 'col-xs-4'> <i className = "fa fa-inr"></i> { this.state.bookedItemList.subTotal } </div>
          </div>
          <div className = 'col-xs-12'>
            <div className = 'col-xs-8'> Convenience Charges </div>
            <div className = 'col-xs-4'> + <i className = "fa fa-inr"></i> { this.state.bookedItemList.convenienceCharges } </div>
          </div>
          <div className = 'col-xs-12 promo' style = { this.state.questionShow }>
             <button className = 'col-xs-offset-3 col-xs-6 qn' onClick = { this.havePromoCode.bind(this) }> Have Promo code ? </button>
          </div>
          <div className = 'col-xs-12 promo' style = { this.state.applySectionShow }>
            <input id = 'promocode' className = 'col-xs-offset-1 col-xs-4 pad0' type = 'text' placeholder = 'Promo Code' onChange = { this.saveCode.bind(this) }></input> <button className = 'col-xs-offset-2 col-xs-4' onClick = { this.applyPromocode.bind(this) }> Apply </button>
          </div>
          <div className = 'col-xs-12 errormsg' style = { this.state.errormsg }>
            Invalid Code
          </div>
          <div className = 'col-xs-12'>
            <div className = 'col-xs-8'> Discount </div>
            <div className = 'col-xs-4'> - <i className = "fa fa-inr"></i> { this.state.discount * this.state.bookedItemList.subTotal / 100 } </div>
          </div>
          <div className = 'col-xs-12'>
            <div className = 'col-xs-8'> Total </div>
            <div className = 'col-xs-4'> <i className = "fa fa-inr"></i> { this.state.bookedItemList.convenienceCharges + this.state.bookedItemList.subTotal - (this.state.discount * this.state.bookedItemList.subTotal / 100) } </div>
          </div>
        </div>
        <div className="terms col-xs-12">
          <h5>Terms :</h5>
          <ul>
            <li>Services available only for females.</li>
            <li>Booking amount can be paid to beautician @Home.</li>
          </ul>
        </div>
      </div>
    )
  }

  havePromoCode() {
    this.setState({ applySectionShow:{ display: 'block', paddingTop: 0}, questionShow: { display: 'none', paddingTop: 0 } })
  }

  saveCode(e) {
    let couponCode = e.currentTarget.value;
    this.setState({ couponCode: couponCode });
  }

  applyPromocode() {
    let self = this;
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/iscouponvalid';
    ajaxObj.data = { couponcode: self.state.couponCode }
    ajaxObj.success = function(data) {
      self.setState({ discount: data.discount, errormsg: {display: 'none'} });
      window.bookingDetails.couponcode = self.state.couponCode;
      window.bookingDetails.discount = data.discount;
    }
    ajaxObj.error = function(){
      self.setState({ discount: 0 , errormsg: {display: 'block'} });
    }
    $.ajax(ajaxObj);
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
}
