import React from 'react';
import ajaxObj from '../../../data/ajax.json';
import $ from 'jquery';
import {connect} from 'react-redux';
import {couponApplied} from '../../actions';
import {E, MIN_COUPON_AMNT} from '../../constants';


class Coupons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCouponList: null,
      loading: false,
      customCoupon: {
        couponCodeC: '',
        discountC: 0,
        complimentaryOfferC: '',
        minAmountC: 800
      }
    }
  }

  componentDidMount() {
    this.getOffers();
  }

  render() {
    const {loading, customerCouponList, customCoupon: {couponCodeC, discountC, complimentaryOfferC, minAmountC}} = this.state,
      {couponCode} = this.props.bookingDetails;

    return (
      <div className='col-xs-12'>
        <div className='b-offers' style={loading ? {opacity: 0.1} : {opacity: 1}}>
          {customerCouponList && customerCouponList.map(offer => {
            return (
              <div className='offer' style={couponCode === offer.couponCode ? {backgroundColor: '#9bcdcc'} : null} onClick={this.applyCoupon.bind(this, offer.couponCode)}>
                <div>Coupon Code : {offer.couponCode} <button className='cli' >{couponCode === offer.couponCode ? 'Applied' : 'Apply'}</button></div>
                <div>Discount : {offer.discount}%</div>
                {offer.complementaryOffer ? <div>Complimentary Offer : {offer.complementaryOffer}</div> : null}
                <div>Minimum Booking Amount : Rs.{offer.minimumAmount}</div>
                <div>{offer.validthru}</div>
              </div>
            )
          }, this)}
        </div>
        <div className='col-xs-12 pad0 b-offers a'>
          <div className='col-xs-12 pad0 cli' style={{height: 40, padding: 9, color: '#068481', textAlign: 'center'}} onClick={this.havePromoCode}>Have a promocode ?</div>
          <div className='offer promo' ref={this.promoCode} style={couponCode === couponCodeC ? {backgroundColor: '#9bcdcc'} : {}}>
            <div className='col-xs-12 pad0'><div className='col-xs-4 pad0' style={{paddingTop: 3}}>Coupon Code : </div><input className='col-xs-6 pad0' type='text' value={couponCodeC} onChange={this.couponAdding} style={{backgroundColor: '#fff', padding: '2px'}} maxLength='20'/>
            <button className='col-xs-2 pad0' onClick={this.applyCoupon.bind(this, couponCodeC)} className='cli' >{couponCode === couponCodeC ? 'Applied' : 'Apply'}</button></div>
          </div>
          <div>
          </div>
        </div>
      </div>
    )
  }

  havePromoCode = (e) => {
    const target = e.target;
    target.style.display = 'none';
    target.nextSibling.classList.remove('promo');
    target.nextSibling.classList.add('apply');
  }

  promoCode = (promoCode) => {
    this.promoCode = promoCode;
  }

  couponAdding = (e) => {
    this.setState({customCoupon: {couponCodeC: e.target.value}});
  }

  applyCoupon = (couponCode) => {

    this.setState({loading: true});
    const {bookingDetails: {total}, userDetails: {details: {refCount}}, couponApplied, showNotification} = this.props,
      refDiscount  = refCount ? 200 : 0,
      amountPayable = total - refDiscount;

    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/iscouponvalid';
    ajaxObj.data = { couponcode: couponCode }
    ajaxObj.success = (data) => {
      if (amountPayable > data.minimumAmount) {
        this.setState({loading: false});
        couponApplied({discount: parseInt(data.discount), couponCode, refDiscount, complementaryOffer: data.complementaryOffer});
      } else {
        this.setState({loading: false});
        showNotification(E, MIN_COUPON_AMNT + data.minimumAmount);
      }
    }
    ajaxObj.error = (e) => {
      this.setState({ discount: 0, loading: false});
      showNotification(E, e.responseJSON.message);
    }
    $.ajax(ajaxObj);
  }

  getOffers = () => {
    ajaxObj.url = ajaxObj.baseUrl + '/getmycoupons';
    ajaxObj.type = 'POST';
    ajaxObj.data = '';
    ajaxObj.success = (data) => {
      this.setState({customerCouponList: data.customerCouponList});
    };
    $.ajax(ajaxObj);
  }
}

function mapStateToProps(state) {
  return {
    bookingDetails: state.bookingDetails,
    userDetails: state.userDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    couponApplied: (data) => {
      dispatch(couponApplied(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);


