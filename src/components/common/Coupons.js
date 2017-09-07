import React from 'react';
import ajaxObj from '../../../data/ajax.json';
import $ from 'jquery';
import Base from '../base/Base';


export default class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCouponList: null,
      couponApplied: 'LOOK30',
      discount: 30,
      loading: false
    }
  }

  componentDidMount() {
    this.getOffers();
  }

  render() {
    const {customerCouponList, couponApplied, loading} = this.state;
    if (customerCouponList) {
      return (
        <div className='col-xs-12'>
          <div className='b-offers' style={loading ? {opacity: 0.1} : {opacity: 1}}>
            {customerCouponList.map(offer => {
              return (
                <div className='offer'>
                  <div>Coupon Code : {offer.couponCode} <button className='cli' onClick={this.applyCoupon.bind(this, offer.couponCode)}>{couponApplied === offer.couponCode ? 'Applied' : 'Apply'}</button></div>
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
    let self = this;
    this.setState({loading: true});
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/iscouponvalid';
    ajaxObj.data = { couponcode: couponApplied }
    ajaxObj.success = function(data) {
      self.setState({ discount: data.discount, couponApplied, loading: false});
      self.props.updateDiscount(data.discount, data.status, data.complementaryOffer);
      Base.sandbox.bookingDetails.couponcode = couponApplied;
      Base.sandbox.bookingDetails.discount = data.discount;
    }
    ajaxObj.error = function(e){
      self.setState({ discount: 0, loading: false});
      self.props.showNotification('error', e.responseJSON.message, 4000, 30);
    }
    $.ajax(ajaxObj);
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


