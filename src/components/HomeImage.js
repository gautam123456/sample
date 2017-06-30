/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ServicesList from './ServicesList';
import StaticPortion from './StaticPortion';
import { browserHistory } from 'react-router';
import Cart from './Cart';
import $ from 'jquery';
import Testimonial from './Testimonial';
import Carousel from './lib/CarouselSlick';
import allImages from '../../data/imageContoller.json';
import testimonials from '../../data/testimonials.json';
import Base from './base/Base';

export default class HomeImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookingDetails: Base.sandbox.bookingDetails,
      carousal: true
    };
  }

  render() {
    const images = allImages.homeImages;

    return (
      <section className = 'col-xs-12 col-md-4 pad0 img'>
        <div className = 'bgimage'>
          <Carousel images = {images} showArrow={true}/>
        </div>
        <div id = 'filter' className = 'filter'>
          <span className = 'f-list col-xs-12'>
              <label className = { this.props.active == '1' ? 'active col-xs-2' : 'col-xs-2'} data-value = '1' onClick = { this.serviceTypeSelected.bind(this) }>Face</label>

              <label className = { this.props.active == '2' ? 'active col-xs-2' : 'col-xs-2'} data-value = '2' onClick = { this.serviceTypeSelected.bind(this) }>Body</label>

              <label className = { this.props.active == '3' ? 'active col-xs-2' : 'col-xs-2'} data-value = '3' onClick = { this.serviceTypeSelected.bind(this) }>Hair</label>

              <label className = { this.props.active == '4' ? 'active col-xs-2' : 'col-xs-2'} data-value = '4' onClick = { this.serviceTypeSelected.bind(this) }>Makeup</label>

              <label className = { this.props.active == '5' ? 'active col-xs-2' : 'col-xs-2'} data-value = '5' onClick = { this.serviceTypeSelected.bind(this) }>Packages</label>
          </span>
        </div>

        <ServicesList data = { this.props.data } service = { this.props.active } bookingDetails = { this.state.bookingDetails } bookingDetailsChanged = { this.bookingDetailsChanged.bind(this) }/>
        <StaticPortion data={this.props.data}/>
        <Testimonial data = { testimonials } />
        <Cart bookingDetails = { this.state.bookingDetails } />
      </section>
    )
  }

  componentDidMount() {
    let fixed = false,
      target = document.getElementById('filter');

    $(window).on('scroll', function(){
      var scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
      if(scrollPos >= 250 && !fixed) {
        fixed = true;
        target.className += ' fixed';
      }else if(scrollPos <= 250 && fixed) {
        target.className = 'filter';
        fixed = false;
      }
    })
  }

  serviceTypeSelected(e) {
    const attrValue = e.target.getAttribute('data-value');
    this.props.serviceSelected(attrValue);
    var body = $('html, body');
    body.stop().animate({scrollTop:0}, '500', 'swing');
  }

  bookingDetailsChanged(id, name, cost, count, operation) {
    fbq('track', 'AddToCart');
    Base.bookingDetailsChanged({id, name, cost, count, operation});

    //TODO Remove
    //var cost = parseInt(cost);
    //if(operation){
    //  // operation is addition of services....
    //  window.bookingDetails.servicesCount += 1;
    //  window.bookingDetails.subTotal += cost;
    //  if(window.bookingDetails.services[id]){
    //    window.bookingDetails.services[id].count += 1;
    //  } else {
    //    window.bookingDetails.services[id] = {
    //      count: 1,
    //      name: name,
    //      cost: cost
    //    }
    //  }
    //} else {
    //  // operation is removal of services....
    //  window.bookingDetails.servicesCount -= 1;
    //  window.bookingDetails.subTotal -= cost;
    //  window.bookingDetails.services[id].count -= 1;
    //  if(window.bookingDetails.services[id].count == 0){
    //    delete window.bookingDetails.services[id];
    //  }
    //}
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
