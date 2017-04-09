/**
 * Created by rgautam on 1/13/17.
 */
import React from 'react';
import { Link, browserHistory } from 'react-router';
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
      <div className = 'col-xs-12 pad0'>
        { this.state.offers }
      </div>
    )
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
      self.setState({offers: data});
      Base.hideOverlay();
    }
    ajaxObj.error = () => {if(!window.bookingDetails.name){browserHistory.push('login')}}
    $.ajax(ajaxObj);
  }
}



