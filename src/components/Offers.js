/**
 * Created by rgautam on 1/13/17.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import Header from './Header';
import $ from 'jquery';
import Base from './base/Base';
import LeftNav from './common/LeftNav';
import Footer from './Footer';

import ajaxObj from '../../data/ajax.json';

export default class Offers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: $(window).width(),
      offers: [],
      message: '',
      complementaryOffer: null
    }
  }

  render() {
    const {offers, screenWidth} = this.state;

    return (
      <div>
        <Header showNav={true}/>
        <div className='col-md-4 nomob'>
          <LeftNav screenWidth={screenWidth}/>
        </div>
        <div className = 'col-xs-12 col-md-4 offers'>
          <div className = 'col-xs-10 col-xs-offset-1 pad0 img'></div>

          {offers.map((offer) => {
            return this.getOfferRenderer(offer);
          }, this)}
          </div>
        <Footer />
      </div>
    )
  }

  getOfferRenderer = ({couponCode, discount, complementaryOffer, minimumAmount, validthru}) => {
    return (
      <div className = 'offer col-xs-12 pad0' key={couponCode}>
        <div className= 'col-xs-12 header' >
          <div className='col-xs-10 pad0'>Coupon Code: <strong id='code'>{couponCode}</strong></div>
          <div className='col-xs-5 col-xs-offset-7' style={{background: "url('../styles/assets/images/barcode.png') center no-repeat",backgroundSize: 'contain', height: 120}}></div>
        </div>
        <div className= 'col-xs-12 body' ><strong>{discount}%</strong> Off</div>
        {complementaryOffer ?
          <div className='col-xs-12'>
            Complimentary Offer : {complementaryOffer}
          </div>: null}
          <div className='col-xs-12'>
            Minimum Booking Amount : Rs.{minimumAmount}
          </div>
        <div className= 'col-xs-5 pad0 pull-right' style={{fontSize: 8, textAlign: 'right'}}>Valid till : {validthru || 'Limited Period'}</div>
      </div>
    )
  }

  updateOffers = ({customerCouponList, message, complementaryOffer}) => {
    this.setState({offers: customerCouponList, message, complementaryOffer});
  }

  updateDimensions = () => {
    this.setState({screenWidth: $(window).width()});
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillMount = () => {
    this.getOffers();
  }

  getOffers = () => {
    Base.showOverlay();
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/getmycoupons';
    ajaxObj.success = (data) => {
      this.updateOffers(data);
      Base.hideOverlay();
    }
    $.ajax(ajaxObj);
  }
}



