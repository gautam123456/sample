/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ServicesList from './ServicesList';
import StaticPortion from './StaticPortion';
import Cart from './Cart';
import Carousel from './Carousel';

import bookingDetails from '../../data/constants.json';
import data from '../../data/items.json'
import testimonials from '../../data/testimonials.json'

window.bookingDetails = bookingDetails;

export default class HomeImage extends React.Component {
  constructor() {
    super();
    this.state = {
      active: '1',
      data: data.serviceList['1'],
      bookingDetails: window.bookingDetails
    };
  }

  render() {
    return (
      <section className = 'col-xs-12 col-md-4 pad0'>
        <div className = 'bgimage'>
        </div>
        <div className = 'filter'>
          <span className = 'f-list'>
              <label className = { this.state.active == '1' ? 'active' : ''} data-value = '1' onClick = { this.serviceTypeSelected.bind(this) }>Face</label>

              <label className = { this.state.active == '2' ? 'active' : ''} data-value = '2' onClick = { this.serviceTypeSelected.bind(this) }>Body</label>

              <label className = { this.state.active == '6' ? 'active' : ''} data-value = '6' onClick = { this.serviceTypeSelected.bind(this) }>Bridal</label>

              <label className = { this.state.active == '3' ? 'active' : ''} data-value = '3' onClick = { this.serviceTypeSelected.bind(this) }>Hair</label>

              <label className = { this.state.active == '4' ? 'active' : ''} data-value = '4' onClick = { this.serviceTypeSelected.bind(this) }>Makeup</label>

              <label className = { this.state.active == '5' ? 'active' : ''} data-value = '5' onClick = { this.serviceTypeSelected.bind(this) }>Packages</label>
          </span>
        </div>

        <ServicesList data = { this.state.data } service = { this.state.active } bookingDetails = { this.state.bookingDetails } bookingDetailsChanged = { this.bookingDetailsChanged.bind(this) }/>
        <StaticPortion />
        <Carousel data = { testimonials } />
        <Cart bookingDetails = { this.state.bookingDetails } />
      </section>
    )
  }

  serviceTypeSelected(e) {
    this.setState({active: e.target.getAttribute('data-value'), data: data.serviceList[e.target.getAttribute('data-value')]})
  }

  bookingDetailsChanged(id, name, cost, count, operation) {

    var count = count || 0;
    var cost = parseInt(cost);

    if(operation){
      // if operation is addition of services....
      window.bookingDetails.servicesCount += 1;
      window.bookingDetails.subTotal += cost;
      if(window.bookingDetails.services[id]){
        window.bookingDetails.services[id].count += 1;
      } else {
        window.bookingDetails.services[id] = {
          count: 1,
          name: name,
          cost: cost
        }
      }
    } else {
      // If operation is removal of services....
      window.bookingDetails.servicesCount -= 1;
      window.bookingDetails.subTotal -= cost;
      window.bookingDetails.services[id].count -= 1;
    }
    this.forceUpdate();
  }
}
