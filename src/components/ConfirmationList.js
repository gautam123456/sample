/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import BookedMenu from './BookedMenu';
import ajaxObj from '../../data/ajax.json';
import $ from 'jquery';
import Base from './base/Base';
import Coupons from './common/Coupons';
import {couponApplied} from '../actions';
import {connect} from 'react-redux';

class ConfirmationList extends React.Component {

    constructor(props) {
        super(props);
    }

    //havePromoCode() {
    //  this.setState({ applySectionShow:{ display: 'block', paddingTop: 0}, questionShow: { display: 'none', paddingTop: 0 } })
    //}

    //removeCode() {
    //  Base.sandbox.bookingDetails.discount = 0;
    //  Base.sandbox.bookingDetails.couponcode = '';
    //  this.setState({promoCodeApplied: false, couponCode:'', discount: 0 })
    //  this.props.showNotification('success', 'Coupon removed successfully', 4000, 30);
    //}

    //renderPromoCodeSection() {
    //  if(!this.state.promoCodeApplied) {
    //    return (
    //      <div className='col-xs-12 promo' style={ this.state.applySectionShow }>
    //        <input id='promocode' className='col-xs-offset-1 col-xs-4 pad0' type='text' placeholder='Promo Code'
    //               onChange={ this.saveCode.bind(this) }></input>
    //        <button className='col-xs-offset-2 col-xs-4 apply' onClick={ this.applyPromocode.bind(this) }> Apply
    //        </button>
    //      </div>
    //    )
    //  }
    //}

    //saveCode(e) {
    //  let couponCode = e.currentTarget.value;
    //  this.setState({ couponCode: couponCode });
    //}

    //renderCouponAppliedSection() {
    //  if(this.state.promoCodeApplied){
    //    return(
    //      <div className = 'col-xs-12 promo'>
    //        <div className = 'col-xs-offset-3 col-xs-6 applied'>{ this.state.couponCode }</div>
    //      </div>
    //    )
    //  }
    //}

    //renderDiscountSection() {
    //  if(this.state.promoCodeApplied) {
    //    return (
    //      <div className = 'col-xs-12 promo'>
    //        <div className = 'col-xs-offset-3 col-xs-6 applied'>{ this.state.couponCode }<i className = 'fa fa-times-circle-o pull-right cli' onClick = { this.removeCode.bind(this) }></i></div>
    //      </div>
    //    )
    //  } else {
    //    return (
    //      <div>
    //        <div className = 'col-xs-12 promo' style = { this.state.questionShow }>
    //          <button className = 'col-xs-offset-3 col-xs-6 qn' onClick = { this.havePromoCode.bind(this) }> Have Promo code ? </button>
    //        </div>
    //        { this.renderPromoCodeSection.bind(this)() }
    //        { this.renderCouponAppliedSection.bind(this)() }
    //      </div>
    //    )
    //  }
    //
    //}

    render() {
        const then = this,
           {bookingDetails: {services, discount, complementaryOffer, total, subTotal}, userDetails : {details: {refCount}}} = this.props,
            objKeys = Object.keys(services),
            margin = { marginBottom: 60 },
            padding = { paddingTop: 8 },
            refDiscount = refCount ? 200 : 0;

        return (
            <div className = 'col-md-offset-4 col-md-4 pad0'>
                <div className = 'col-xs-12 summary pad0 rr'>
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-8'> Sub Total </div>
                        <div className = 'col-xs-4' style = { padding }> <i className = 'fa fa-inr'></i> { subTotal } </div>
                    </div>
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-8'> Discount ({discount}%)</div>
                        <div className = 'col-xs-4' style = { padding }> - <i className = 'fa fa-inr'></i> { discount * subTotal / 100 }</div>
                    </div>
                    {complementaryOffer ?
                    <div className='col-xs-12' style={{border: '1px dashed #999', fontWeight: 200}}>
                      <div className = 'col-xs-6'>Complimentary Offer</div>
                      <div className = 'col-xs-6' style={{textAlign: 'right', paddingRight: 10}}>{complementaryOffer}</div>
                    </div>: null}
                    <div className = 'col-xs-12'>
                      <div className = 'col-xs-8'> Referral Discount </div>
                      <div className = 'col-xs-4'> - <i className = "fa fa-inr"></i> { refDiscount } </div>
                    </div>
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-8'> Total </div>
                        <div className = 'col-xs-4' style = { padding }> <i className = 'fa fa-inr'></i> { total - refDiscount } </div>
                    </div>
                </div>
                <Coupons showNotification={this.props.showNotification} />
                <div className = 'col-xs-12 pad0' style = { margin }>
                    <header className = 's-heading full-width'>
                        <div className = 'col-xs-12 pad0'>
                            <div className = 'col-xs-7 pad0'>
                                { 'Service Name' }<br/>
                            </div>
                            <div className = 'col-xs-3'>{ 'Price' }</div>
                            <div className = 'col-xs-2 center'>
                                { 'Qty' }
                            </div>
                        </div>
                    </header>
                    {complementaryOffer ?
                    <div className='cm-offers'>
                      {complementaryOffer}
                    </div>: null}
                    {
                        objKeys.map( function(key) {
                            return <BookedMenu key={key} list = {services[key]} count = { services[key] ? services[key].count : 0 } discount={discount}/>
                        })
                    }
                </div>
            </div>
        )
    }

    //updateDiscount = (discount, msg, complementaryOffer) => {
    //  this.props.updateDiscount(discount, msg, complementaryOffer);
    //  //this.props.showNotification('success', msg, 4000, 30);
    //}

    //applyPromocode() {
    //  let self = this;
    //  ajaxObj.type = 'POST';
    //  ajaxObj.url = ajaxObj.baseUrl + '/iscouponvalid';
    //  ajaxObj.data = { couponcode: self.state.couponCode }
    //  ajaxObj.success = function(data) {
    //
    //    Base.sandbox.bookingDetails.couponcode = self.state.couponCode;
    //    Base.sandbox.bookingDetails.discount = data.discount;
    //  }
    //  ajaxObj.error = function(e){
    //    self.setState({ discount: 0});
    //    self.props.showNotification('error', e.responseJSON.message, 4000, 30);
    //  }
    //  $.ajax(ajaxObj);
    //}
}

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails,
    bookingDetails: state.bookingDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    couponApplied: (data) => {
      dispatch(couponApplied(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationList);
