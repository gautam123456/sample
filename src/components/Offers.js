/**
 * Created by rgautam on 1/13/17.
 */
import React from 'react';
import { Link, browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';

export default class Offers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offers: []
    }
  }

  render() {
    return (
      <div className = 'col-xs-12 col-md-4 col-md-offset-4 pad0'>
        <ActivityHeader heading = { 'My Offers' }/>
        { this.state.offers }
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
      console.log(JSON.stringify(data));
      self.updateOffers(data);
      Base.hideOverlay();
    }
    ajaxObj.error = () => {if(!window.bookingDetails.name){browserHistory.push('login')}}
    $.ajax(ajaxObj);
  }
}



