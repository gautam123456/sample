/**
 * Created by rgautam on 1/13/17.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';

export default class Offers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offers: [],
      message: ''
    }
  }

  render() {
    const self = this;
    return (
      <div className = 'col-xs-12 col-md-4 col-md-offset-4 pad0 offers'>
        <ActivityHeader heading = { 'My Offers' }/>

        <div className = 'col-xs-10 col-xs-offset-1 pad0 message'>{this.state.message}</div>

        {this.state.offers.map(function(offer){
          return self.getOfferRenderer(offer);
        })}

      </div>
    )
  }

  getOfferRenderer(offer) {
    return (
      <div className = 'offer col-xs-10 col-xs-offset-1 pad0' key={offer.couponCode}>
        <div className= 'col-xs-12 header'>Coupon Code : <strong>{offer.couponCode}</strong></div>
        <div className= 'col-xs-12 body'>Valid till : {offer.validthru}</div>
        <div className= 'col-xs-12 body'>Discount : <strong>{offer.discount}%</strong></div>
      </div>
    )
  }

  updateOffers(data) {
    this.setState({offers: data.customerCouponList, message: data.message})
  }

  componentWillMount() {
    this.getOffers();
  }

  getOffers() {
    Base.showOverlay();
    const self = this;
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/getmycoupons';
    ajaxObj.success = function(data) {
      self.updateOffers(data);
      Base.hideOverlay();
    }
    ajaxObj.error = () => {if(!window.bookingDetails.name){browserHistory.push('login')}}
    $.ajax(ajaxObj);
  }
}



