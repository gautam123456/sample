/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ConfirmationList from './ConfirmationList';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';


export default class BookingConfirm extends React.Component {

  constructor (props){
    super(props);
    this.validateAndConfirm = this.validateAndConfirm.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
    this.renderPromoCodeSection = this.renderPromoCodeSection.bind(this);
    this.renderCouponAppliedSection = this.renderCouponAppliedSection.bind(this);

    this.state = {
      promoCodeApplied: false,
      refDiscount: 0,
      couponCode:'',
      displayType : 'none',
      info: 'Coupon code Applied Successfully',
      infoType: 'info',
      discount: window.bookingDetails.discount,
      questionShow: {display: 'block', paddingTop: 0},
      applySectionShow: {display: 'none', paddingTop: 0},
    }
  }

  hideMsg() {
    this.setState({displayType:'none'});
  }

  removeCode() {
    window.bookingDetails.discount = 0;
    this.setState({promoCodeApplied: false, couponCode:'', discount: 0 })
  }

  renderPromoCodeSection() {
    if(!this.state.promoCodeApplied) {
      return (
        <div className='col-xs-12 promo' style={ this.state.applySectionShow }>
          <input id='promocode' className='col-xs-offset-1 col-xs-4 pad0' type='text' placeholder='Promo Code'
                 onChange={ this.saveCode.bind(this) }></input>
          <button className='col-xs-offset-2 col-xs-4 apply' onClick={ this.applyPromocode.bind(this) }> Apply
          </button>
        </div>
      )
    }

  }

  saveCode(e) {
    let couponCode = e.currentTarget.value;
    this.setState({ couponCode: couponCode });
  }

  renderCouponAppliedSection() {
    if(this.state.promoCodeApplied){
      return(
        <div className = 'col-xs-12 promo'>
          <div className = 'col-xs-offset-3 col-xs-6 applied' onClick = { this.removeCode.bind(this) }>{ this.state.couponCode } <i className = 'fa fa-times-circle-o pull-right'></i></div>
        </div>
      )
    }
  }

  renderNotification() {
    let classs = `col-xs-10 col-md-4 top-msg ${ this.state.infoType }`;
    return (
      <header className = { classs } style = {{display: this.state.displayType}}>
        <div>
          <span >{ this.state.info }</span>
          <span className = 'pull-right' onClick = { this.hideMsg.bind(this) }><i className = 'fa fa-times'></i></span>
        </div>
      </header>
    )
  }

  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Confirm Booking' }/>
        { this.renderNotification() }
        { this.renderPromoCodeSection() }
        { this.renderCouponAppliedSection() }
        <ConfirmationList />
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 pad0'>
         <button className = 'col-xs-12 col-md-4' style = {{padding: 15,fontSize: 17, fontWeight: 600,position: 'fixed',bottom:0}} onClick = { this.validateAndConfirm }> Confirm Booking </button>
        </div>
      </div>
    )
  }

  validateAndConfirm() {
    const details = window.bookingDetails;

    details.addresslkey = this.props.location.query.lkey;
    details.timing = this.props.location.query.timing;
    details.date = this.props.location.query.date;
    details.mailId = this.props.location.query.mailId;

    if (details.addresslkey && details.timing && details.date && details.mailId && details.services){

      details.serviceids = '';
      const keys = Object.keys(details.services);
      keys.map(function(key){
        details.serviceids = key.split('-')[2] + '-' + details.services[key].count + ',' + details.serviceids;
      })

      details.serviceids = details.serviceids.substr(0, details.serviceids.length-1);
      this.confirm(details);

    }
  }

  applyPromocode() {
    let self = this;
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/iscouponvalid';
    ajaxObj.data = { couponcode: self.state.couponCode }
    ajaxObj.success = function(data) {
      self.setState({ discount: data.discount, displayType: 'block', info: 'Coupon code Applied Successfully', infoType: 'info', promoCodeApplied: true });
      window.bookingDetails.couponcode = self.state.couponCode;
      window.bookingDetails.discount = data.discount;
      setTimeout(function(){
        self.hideMsg();
      }, 3000)
    }
    ajaxObj.error = function(e){
      self.setState({ discount: 0, displayType: 'block', info: e.responseJSON.message , infoType: 'error' });
      setTimeout(function(){
        self.hideMsg();
      }, 3000)
    }
    $.ajax(ajaxObj);
  }

  confirm(e) {
    fbq('track', 'Purchase', {value: '1.00', currency: 'USD'});
    Base.showOverlay();
    ajaxObj.type = 'POST'
    ajaxObj.url = ajaxObj.baseUrl + '/sendbookingackforhome';
    ajaxObj.data = { datetime: e.date + '__' + e.timing , addresslkey: e.addresslkey, couponcode: e.couponcode, serviceids: e.serviceids, emailid: e.mailId, comment: e.comment }
    ajaxObj.success = function() {
      Base.hideOverlay();
      browserHistory.push('/booking/confirmed');
    }
    ajaxObj.error = function(){
      Base.hideOverlay(); browserHistory.push('/oops');
    }
    $.ajax(ajaxObj);
  }
}


