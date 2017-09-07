import React from 'react';
import ajaxObj from '../../../data/ajax.json';
import $ from 'jquery';

export default class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCouponList: null,
      couponApplied: 'LOOK30'
    }
  }

  componentDidMount() {
    this.getOffers();
  }

  render() {
    const {customerCouponList, couponApplied} = this.state;
    if (customerCouponList) {
      return (
        <div className='col-xs-12'>
          <div className='b-offers'>
            {customerCouponList.map(offer => {
              return (
                <div className='offer'>
                  <div>Coupon Code : {offer.couponCode} <button onClick={this.applyCoupon.bind(this, offer.couponCode)}>{couponApplied === offer.couponCode ? 'Applied' : 'Apply'}</button></div>
                  <div>Discount : {offer.discount}%</div>
                  {offer.complementaryOffer ? <div>Complementary Offer : {offer.complementaryOffer}</div> : null}
                  <div>Minimum Booking Amount : Rs.{offer.minimumAmount}</div>
                  <div>{offer.validthru}</div>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  applyCoupon(couponApplied) {
    this.setState({couponApplied});
  }

  getOffers() {
    const self = this;
    ajaxObj.url = ajaxObj.baseUrl + '/getmycoupons';
    ajaxObj.type = 'POST';
    ajaxObj.data = '';
    ajaxObj.success = function(data) {
      self.setState({customerCouponList: data.customerCouponList});
    }
    ajaxObj.error = function() {
    }
    $.ajax(ajaxObj);
  }
}


