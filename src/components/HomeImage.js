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
    const images = allImages.homeImages,
      {screenWidth, active, data, showNotification} = this.props,
      {bookingDetails, bg, opacity, fixed} = this.state;

    return (
      <section className = 'col-xs-12 col-md-4 pad0 img h' style={{backgroundColor: screenWidth < 992 ? bg : '#fff'}}>
        <div className = 'bgimage' style={{opacity: opacity}}>
          <Carousel images = {images} showArrow={false} autoPlay={true} screenWidth={screenWidth}/>
        </div>
        <div id = 'filter' className = {'filter ' + fixed}>
          <span className = 'f-list col-xs-12'>
              <label className = { active == '5' ? 'active col-xs-2' : 'col-xs-2 cli'} data-value = '5' onClick = { this.serviceTypeSelected }>Packages</label>

              <label className = { active == '1' ? 'active col-xs-2' : 'col-xs-2 cli'} data-value = '1' onClick = { this.serviceTypeSelected }>Face</label>

              <label className = { active == '2' ? 'active col-xs-2' : 'col-xs-2 cli'} data-value = '2' onClick = { this.serviceTypeSelected }>Body</label>

              <label className = { active == '3' ? 'active col-xs-2' : 'col-xs-2 cli'} data-value = '3' onClick = { this.serviceTypeSelected }>Hair</label>

              <label className = { active == '4' ? 'active col-xs-2' : 'col-xs-2 cli'} data-value = '4' onClick = { this.serviceTypeSelected }>Makeup</label>
          </span>
        </div>

        <ServicesList data = { data } service = { active }  />
        <StaticPortion data={data}/>
        <Testimonial data = { testimonials } />
        <Cart showNotification={showNotification}/>
      </section>
    )
  }

  componentDidMount() {
    let fixed = false;

    const self = this;

    $(window).on('scroll', function() {

      var scrollPos = $(this).scrollTop();
      if(scrollPos < 251) {
        if (self.props.screenWidth < 769) {
          self.setState({opacity: 1 - (scrollPos * 1.3) / 250});
        }
        if(fixed) {
          self.setState({fixed: "", bg:'#000'});
          $('meta[name=theme-color]').attr('content', '#068481');
          fixed = false;
        }
      }else {
        if(!fixed) {
          self.setState({fixed: "fixed", bg:'#fff'});
          $('meta[name=theme-color]').attr('content', '#000');
          fixed = true;
        }
      }

    });
  }

  serviceTypeSelected = (e) => {
    const attrValue = e.target.getAttribute('data-value');
    this.props.serviceSelected(attrValue);
    var body = $('html, body');
    body.stop().animate({scrollTop: 255}, '500', 'swing');
  }

  bookingDetailsChanged = (id, name, cost, count, operation) => {
    Base.track('track', 'AddToCart');
    Base.bookingDetailsChanged({id, name, cost, count, operation});
    //this.forceUpdate();
    Base.saveToLocalStorage();
  }
}
