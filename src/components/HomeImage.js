/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ServicesList from './ServicesList';
import StaticPortion from './StaticPortion';
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
      carousal: true,
      opacity: 1,
      fixed: "",
      bg: '#000'
    };
  }

  render() {
    const images = allImages.homeImages;

    return (
      <section className = 'col-xs-12 col-md-4 pad0 img' style={{backgroundColor: this.state.bg}}>
        <div className = 'bgimage' style={{opacity: this.state.opacity}}>
          <Carousel images = {images} showArrow={true}/>
        </div>
        <div id = 'filter' className = {'filter ' + this.state.fixed}>
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
        <Cart bookingDetails = { this.state.bookingDetails } showNotification={this.props.showNotification}/>
      </section>
    )
  }

  componentDidMount() {
    let fixed = false;

    const self = this;

    $(window).on('scroll', function() {

      var scrollPos = $(this).scrollTop();
      if(scrollPos < 251) {
        self.setState({opacity: 1 - (scrollPos) / 250});
        if(fixed) {
          self.setState({fixed: "", bg:'#000'});
          fixed = false;
        }
      }else {
        if(!fixed) {
          self.setState({fixed: "fixed", bg:'#fff'});
          fixed = true;
        }
      }

      });
  }

  serviceTypeSelected(e) {
    const attrValue = e.target.getAttribute('data-value');
    this.props.serviceSelected(attrValue);
    var body = $('html, body');
    body.stop().animate({scrollTop: 0}, '500', 'swing');
  }

  bookingDetailsChanged(id, name, cost, count, operation) {
    fbq('track', 'AddToCart');
    Base.bookingDetailsChanged({id, name, cost, count, operation});
    this.forceUpdate();
    Base.saveToLocalStorage();
  }
}
