import React from 'react';
import ServiceMenu from './ServiceMenu';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';

export default class BookedServicesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookedItemList: Base.sandbox.bookingDetails,
      discount: Base.sandbox.bookingDetails.discount,
      questionShow: {display: 'block', paddingTop: 0},
      applySectionShow: {display: 'none', paddingTop: 0},
      couponCode:'',
      displayType : 'none',
      info: 'Coupon code Applied Successfully',
      infoType: 'info',
      promoCodeApplied: false,
      refDiscount: 0
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

  hideMsg() {
    this.setState({displayType:'none'});
  }

  removeCode() {
    Base.sandbox.bookingDetails.discount = 0;
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

  renderCouponAppliedSection() {
    if(this.state.promoCodeApplied){
      return(
          <div className = 'col-xs-12 promo'>
            <div className = 'col-xs-offset-3 col-xs-6 applied' onClick = { this.removeCode.bind(this) }>{ this.state.couponCode } <i className = 'fa fa-times-circle-o pull-right'></i></div>
          </div>
      )
    }
  }


  render() {
    const then = this,
        objKeys = Object.keys(this.state.bookedItemList.services),
        {refDiscount} = this.state;
    return (
        <div className = 'col-md-offset-4 col-md-4'>
          {
            objKeys.map( function(key) {
              return <ServiceMenu list = { then.state.bookedItemList.services[key] } count = { then.state.bookedItemList.services && then.state.bookedItemList.services[key] ? then.state.bookedItemList.services[key].count : 0 } key = { key } id = { key } bookingDetailsChanged = { then.bookingDetailsChanged.bind(then) } />
            })
          }

          { this.renderNotification() }

          <div className = 'col-xs-12 summary pad0'>
            <div className = 'col-xs-12 pad0'>
              <div className = 'col-xs-8'> Sub Total </div>
              <div className = 'col-xs-4'> <i className = "fa fa-inr"></i> { this.state.bookedItemList.subTotal } </div>
            </div>
            <div className = 'col-xs-12 promo' style = { this.state.questionShow }>
              <button className = 'col-xs-offset-3 col-xs-6 qn' onClick = { this.havePromoCode.bind(this) }> Have Promo code ? </button>
            </div>

            { this.renderPromoCodeSection() }

            { this.renderCouponAppliedSection() }

            <div className = 'col-xs-12'>
              <div className = 'col-xs-8'> Discount </div>
              <div className = 'col-xs-4'> - <i className = "fa fa-inr"></i> { this.state.discount * this.state.bookedItemList.subTotal / 100 } </div>
            </div>
            <div className = 'col-xs-12'>
              <div className = 'col-xs-8'> Referral Discount </div>
              <div className = 'col-xs-4'> - <i className = "fa fa-inr"></i> { refDiscount } </div>
            </div>
            <div className = 'col-xs-12'>
              <div className = 'col-xs-8'> Total </div>
              <div className = 'col-xs-4'> <i className = "fa fa-inr"></i> { this.state.bookedItemList.subTotal - (this.state.discount * this.state.bookedItemList.subTotal / 100) - refDiscount } </div>
            </div>
          </div>
          <div className="terms col-xs-12">
            <h5>Terms :</h5>
            <ul>
              <li>Services available only for females.</li>
              <li>Bill amount to be paid to the professional after completion of services.</li>
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

  componentDidMount() {
    const self = this;
    setTimeout(function() {
      self.setState({refDiscount: Base.sandbox.userDetails ? (Base.sandbox.userDetails.refCount ? 200 : 0) : 0})
    }, 1000);
  }

  applyPromocode() {
    let self = this;
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/iscouponvalid';
    ajaxObj.data = { couponcode: self.state.couponCode }
    ajaxObj.success = function(data) {
      self.setState({ discount: data.discount, displayType: 'block', info: 'Coupon code Applied Successfully', infoType: 'info', promoCodeApplied: true });
      Base.sandbox.bookingDetails.couponcode = self.state.couponCode;
      Base.sandbox.bookingDetails.discount = data.discount;
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

  bookingDetailsChanged(id, name, cost, count, operation) {
    Base.bookingDetailsChanged({id, name, cost, count, operation});
    this.forceUpdate();
    Base.saveToLocalStorage();
  }

  //TODO Remove
  //saveToLocalStorage() {
  //  let bookingDetails = window.bookingDetails;
  //  bookingDetails.discount = 0;
  //  window.localStorage.bookingDetails = JSON.stringify(bookingDetails);
  //}
}
