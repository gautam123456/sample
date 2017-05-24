/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';

export default class AddAddress extends React.Component {
  constructor(props) {
    super(props)
    ajaxObj.type = 'POST';
    const address = this.props.location.query.address ? JSON.parse(this.props.location.query.address) : '',
          op = this.props.location.query.op;
    this.state = {
      city: address ? address.city : 'Delhi',
      address: address ? address.address : '',
      landmark: address ? address.landmark : '',
      lkey: address ? address.lkey : '',
      op: op
    }
  }
  render() {
    const dropStyle = {
      height: 50
    }

    return (
      <div>
        <ActivityHeader heading = { 'Provide Address' } />
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>
          <select className = 'col-xs-12' style = { dropStyle } onChange = { this.saveCity.bind(this) } value = { this.state.city }>
            <option value = 'New Delhi'> New Delhi </option>
            <option value = 'Noida'> Noida </option>
            <option value = 'Gurgaon'> Gurgaon </option>
            <option value = 'Faridabad'> Faridabad </option>
            <option value = 'Ghaziabad'> Ghaziabad </option>
            <option value = 'Greater Noida'> Greater Noida </option>
          </select>

          <input type = 'text' placeholder = 'Enter complete address' className = 'col-xs-12' onChange = { this.saveAddress.bind(this) } value = { this.state.address }/>

          <input type = 'text' placeholder = 'Landmark' className = 'col-xs-12' onChange = { this.saveLandMark.bind(this) } value = { this.state.landmark }/>

          <button type = 'text' className = 'col-xs-12' onClick={ this.state.address && this.state.city && this.state.landmark ? this.updateAddress.bind(this) : '' }> { this.state.op === 'edit' ? 'Update' : (this.state.op === 'delete' ? 'Delete' : 'Submit')} </button>

          <div className = 'col-xs-12 message'>
            *All fields are mandatory
          </div>

        </div>

      </div>
    )
  }

  saveAddress(e) {
    let address = e.currentTarget.value;
    this.setState({ address: address });
  }

  saveCity(e) {
    let city = e.currentTarget.value;
    this.setState({ city: city });
  }

  saveLandMark(e) {
    let landmark = e.currentTarget.value;
    this.setState({ landmark: landmark });
  }

  updateAddress() {
    this.state.op === 'edit' ? this.editAddress() : (this.state.op === 'delete' ? this.deleteAddress() : this.addAddress())
    browserHistory.push('/address');
  }

  addAddress() {
    Base.showOverlay();
    ajaxObj.url = ajaxObj.baseUrl + '/addaddress';
    ajaxObj.data = { address: this.state.address, city: this.state.city, landmark: this.state.landmark };
    ajaxObj.success = function() { browserHistory.push('/address?update=true') }
    ajaxObj.error = function() { Base.hideOverlay(); browserHistory.push('/oops') }
    $.ajax(ajaxObj);
  }

  editAddress() {
    Base.showOverlay();
    ajaxObj.url = ajaxObj.baseUrl + '/editaddress';
    ajaxObj.data = { address: this.state.address, city: this.state.city, landmark: this.state.landmark, lkey: this.state.lkey };
    ajaxObj.success = function(){ browserHistory.push('/address?update=true') }
    ajaxObj.error = function() { Base.hideOverlay(); browserHistory.push('/oops') }
    $.ajax(ajaxObj);
  }

  deleteAddress() {
    Base.showOverlay();
    ajaxObj.url = ajaxObj.baseUrl + '/deleteaddress';
    ajaxObj.data = { lkey: this.state.lkey };
    ajaxObj.success = function(){ browserHistory.push('/address?update=true') }
    ajaxObj.error = function() { Base.hideOverlay(); browserHistory.push('/oops') }
    $.ajax(ajaxObj);
  }
}

