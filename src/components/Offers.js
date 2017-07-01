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

        <div className = 'col-xs-10 col-xs-offset-1 pad0 img'></div>

        {this.state.offers.map(function(offer){
          return self.getOfferRenderer(offer);
        })}

      </div>
    )
  }

  getOfferRenderer(offer) {
    return (
      <div className = 'offer col-xs-10 col-xs-offset-1 pad0' key={offer.couponCode}>
        <div className= 'col-xs-12 header' >
          <div className='col-xs-6 pad0'>Coupon Code: <strong id='code'>{offer.couponCode}</strong></div>
          <div className='col-xs-6' style={{background: "url('../styles/assets/images/barcode.png') center no-repeat",backgroundSize: 'contain', height: 120}}></div>
        </div>
        <div className= 'col-xs-12 body'><strong>{offer.discount}%</strong> Off</div>
        <div className= 'col-xs-4 pad0 pull-right' style={{fontSize: 8}}>Valid till : {offer.validthru || 'Limited Period'}</div>
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
    ajaxObj.error = () => {if(!Base.sandbox.bookingDetails.name){browserHistory.push('login')}}
    $.ajax(ajaxObj);
  }
}



