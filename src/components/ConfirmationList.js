/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import BookedMenu from './BookedMenu';
import ajaxObj from '../../data/ajax.json';
import $ from 'jquery';

export default class ConfirmationList extends React.Component {

    constructor(props) {
        super(props);

      //this.renderNotification = this.renderNotification.bind(this);
      //this.renderPromoCodeSection = this.renderPromoCodeSection.bind(this);
      //this.renderCouponAppliedSection = this.renderCouponAppliedSection.bind(this);
      //this.havePromoCode = this.havePromoCode.bind(this);
      //this.hideMsg = this.hideMsg.bind(this);

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
        bookedItemList: window.bookingDetails,
        errormsg: {display: 'none'}
      }
    }

    componentDidMount() {
      const self = this;
      setTimeout(function() {
        self.setState({refDiscount: window.userDetails ? (window.userDetails.refCount ? 200 : 0) : 0})
      }, 1000);
    }

    hideMsg() {
      this.setState({displayType:'none'});
    }

    havePromoCode() {
      this.setState({ applySectionShow:{ display: 'block', paddingTop: 0}, questionShow: { display: 'none', paddingTop: 0 } })
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
        const then = this,
            objKeys = this.state.bookedItemList ? Object.keys(this.state.bookedItemList.services) : [],
            margin = { marginBottom: 60 },
            padding = { paddingTop: 8 },
            {refDiscount} = this.state;
        return (
            <div className = 'col-md-offset-4 col-md-4 pad0'>
                { this.renderNotification.bind(this) }
                <div className = 'col-xs-12 summary pad0 rr'>
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-8'> Sub Total </div>
                        <div className = 'col-xs-4' style = { padding }> <i className = 'fa fa-inr'></i> { this.state.bookedItemList.subTotal } </div>
                    </div>
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-8'> Discount </div>
                        <div className = 'col-xs-4' style = { padding }> - <i className = 'fa fa-inr'></i> { this.state.discount * this.state.bookedItemList.subTotal / 100 } </div>
                    </div>
                    <div className = 'col-xs-12'>
                      <div className = 'col-xs-8'> Referral Discount </div>
                      <div className = 'col-xs-4'> - <i className = "fa fa-inr"></i> { refDiscount } </div>
                    </div>
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-8'> Total </div>
                        <div className = 'col-xs-4' style = { padding }> <i className = 'fa fa-inr'></i> { this.state.bookedItemList.subTotal - (this.state.discount * this.state.bookedItemList.subTotal / 100) - refDiscount } </div>
                    </div>

                    <div className = 'col-xs-12 promo' style = { this.state.questionShow }>
                      <button className = 'col-xs-offset-3 col-xs-6 qn' onClick = { this.havePromoCode.bind(this) }> Have Promo code ? </button>
                    </div>
                    { this.renderPromoCodeSection.bind(this)() }
                    { this.renderCouponAppliedSection.bind(this)() }
                </div>




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
                    {
                        objKeys.map( function(key) {
                            return <BookedMenu list = {then.state.bookedItemList.services[key]} count = { then.state.bookedItemList.services[key] ? then.state.bookedItemList.services[key].count : 0 }/>
                        })
                    }
                </div>
            </div>
        )
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

}
//{ this.renderPromoCodeSection() }
//{ this.renderCouponAppliedSection() }
//{ this.renderNotification() }
