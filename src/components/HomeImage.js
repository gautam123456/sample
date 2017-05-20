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

export default class HomeImage extends React.Component {
  constructor(props) {
    super(props);
    const url = this.props.url.pathname;
    let active = 1;
    switch(url){
      case '/': active = 1; this.changeMetaData(1); fbq('track', 'ViewContent'); break;
      case '/face': active = 1; this.changeMetaData(1); fbq('track', 'ViewContent'); break;
      case '/body': active = 2; this.changeMetaData(2); fbq('track', 'ViewContent'); break;
      case '/hair': active = 3; this.changeMetaData(3); fbq('track', 'ViewContent'); break;
      case '/makeup': active = 4; this.changeMetaData(4); fbq('track', 'ViewContent'); break;
      case '/packages': active = 5; this.changeMetaData(5); fbq('track', 'ViewContent'); break;
    }

    this.state = {
      fullData: this.props.data,
      active: active,
      data: this.getActiveListData(active),
      bookingDetails: window.bookingDetails,
      carousal: true
    };
  }

  getActiveListData(id) {
    const fullData = this.props.data;
    for(let i = 0; i < fullData.serviceList.length; i++){
      if(fullData.serviceList[i].id == id){
        return fullData.serviceList[i];
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(JSON.stringify(nextProps.data));
    console.log("##################################################");
    this.setState({fullData: nextProps.data});
  }

  render() {
    const background = {
      backgroundImage: `url(../styles/assets/images/${ this.state.active }.jpg)`,
      backgroundSize: 'cover',
      height: 250
      },
      images = allImages.homeImages;

    return (
      <section className = 'col-xs-12 col-md-4 pad0 img'>
        <div className = 'bgimage'>
          <Carousel images = {images}/>
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
      }else if(scrollPos <= 250 && fixed) {
        target.className = 'filter';
        fixed = false;
      }
    })
  }

  serviceTypeSelected(e) {
    const attrValue = e.target.getAttribute('data-value');

    switch(attrValue){
      case '1': browserHistory.push('/face'); this.changeMetaData(1); break;
      case '2': browserHistory.push('/body'); this.changeMetaData(2); break;
      case '3': browserHistory.push('/hair');  this.changeMetaData(3); break;
      case '4': browserHistory.push('/makeup');  this.changeMetaData(4); break;
      case '5': browserHistory.push('/packages'); this.changeMetaData(5); break;
    }
    this.setState({active: attrValue, data: this.getActiveListData(attrValue)});
    var body = $('html, body');
    body.stop().animate({scrollTop:0}, '500', 'swing');
  }

  bookingDetailsChanged(id, name, cost, count, operation) {
    fbq('track', 'AddToCart');
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

  changeMetaData(active) {
    //$('meta[property=description]').attr('content', this.getActiveListData(active).metaDescription);
    //$('meta[property=title]').attr('content', this.getActiveListData(active).metaTitle);
    //document.title = this.getActiveListData(active).metaTitle;
  }
}
