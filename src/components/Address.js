/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';

export default class Address extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city:'Delhi',
      address:'',
      landmark:''
    }
  }
  render() {

    const dropStyle = {
      height: 40
    }

    return (
      <div>
        <ActivityHeader heading = { 'Provide Address' }/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>
          <select className = 'col-xs-12' style = { dropStyle } onChange = { this.saveCity.bind(this) }>
            <option value = 'Delhi'>Delhi </option>
            <option value = 'Noida'>Noida </option>
            <option value = 'Gurgaon'>Gurgaon </option>
          </select>

          <input type = 'text' placeholder = 'Enter complete address' className = 'col-xs-12' onChange = { this.saveAddress.bind(this) }></input>

          <input type = 'text' placeholder = 'Landmark' className = 'col-xs-12' onChange = { this.saveLandMark.bind(this) }></input>

        </div>

        <ActivityFooter next = { 'order/confirm' } back = { 'book' }/>
      </div>
    )
  }

  saveAddress(e) {
    let address = e.currentTarget.value;
    this.setState({ address: address });
    window.bookingDetails.address.address = this.state.address;
  }

  saveCity(e) {
    let city = e.currentTarget.value;
    this.setState({ city: city });
    window.bookingDetails.address.city = this.state.city;
  }

  saveLandMark(e) {
    let landMark = e.currentTarget.value;
    this.setState({ landMark: landMark });
    window.bookingDetails.address.landMark = this.state.landMark;
  }
}

