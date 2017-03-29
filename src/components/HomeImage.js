/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ServicesList from './ServicesList';
import StaticPortion from './StaticPortion';
import Cart from './Cart';
import $ from 'jquery';
import Testimonial from './Testimonial';

import data from '../../data/items.json';
import testimonials from '../../data/testimonials.json';

export default class HomeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '1',
      data: data.serviceList['1'],
      bookingDetails: window.bookingDetails
    };
  }

  render() {
    var background = {
      backgroundImage: `url(../styles/assets/images/${ this.state.active }.jpg)`,
      backgroundSize: 'cover'
    }
    return (
      <section className = 'col-xs-12 col-md-4 pad0'>
        <div className = 'bgimage' style = { background }>
        </div>
        <div id = 'filter' className = 'filter'>
          <span className = 'f-list col-xs-12'>
              <label className = { this.state.active == '1' ? 'active col-xs-2' : 'col-xs-2'} data-value = '1' onClick = { this.serviceTypeSelected.bind(this) }>Face</label>

              <label className = { this.state.active == '2' ? 'active col-xs-2' : 'col-xs-2'} data-value = '2' onClick = { this.serviceTypeSelected.bind(this) }>Body</label>

              <label className = { this.state.active == '3' ? 'active col-xs-2' : 'col-xs-2'} data-value = '3' onClick = { this.serviceTypeSelected.bind(this) }>Hair</label>

              <label className = { this.state.active == '4' ? 'active col-xs-2' : 'col-xs-2'} data-value = '4' onClick = { this.serviceTypeSelected.bind(this) }>Makeup</label>

              <label className = { this.state.active == '5' ? 'active col-xs-2' : 'col-xs-2'} data-value = '5' onClick = { this.serviceTypeSelected.bind(this) }>Packages</label>
          </span>
        </div>

        <ServicesList data = { this.state.data } service = { this.state.active } bookingDetails = { this.state.bookingDetails } bookingDetailsChanged = { this.bookingDetailsChanged.bind(this) }/>
        <StaticPortion active={this.state.active}/>
        <Testimonial data = { testimonials } />
        <Cart bookingDetails = { this.state.bookingDetails } />
      </section>
    )
  }

  componentDidMount() {
    let fixed = false,
      target = document.getElementById('filter');
    $(window).on('scroll', function(){
      var scrollPos = window.scrollY || window.scollTop || document.getElementsByTagName('html')[0].scrollTop;
      if(scrollPos >= 250 && !fixed) {
        fixed = true;
        target.className += ' fixed';
      }else if(scrollPos <= 210 && fixed) {
        target.className = 'filter';
        fixed = false;
      }
    })
  }

  serviceTypeSelected(e) {
    const attrValue = e.target.getAttribute('data-value');
    this.setState({active: attrValue, data: data.serviceList[attrValue]})
  }

  bookingDetailsChanged(id, name, cost, count, operation) {
    var cost = parseInt(cost);
    if(operation){
      // operation is addition of services....
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
      // operation is removal of services....
      window.bookingDetails.servicesCount -= 1;
      window.bookingDetails.subTotal -= cost;
      window.bookingDetails.services[id].count -= 1;
      if(window.bookingDetails.services[id].count == 0){
        delete window.bookingDetails.services[id];
      }
    }
    this.forceUpdate();
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    let bookingDetails = window.bookingDetails;
    bookingDetails.discount = 0;
    window.localStorage.bookingDetails = JSON.stringify(bookingDetails);
  }
}
