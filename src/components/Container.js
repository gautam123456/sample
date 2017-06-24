/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import HomeImage from './HomeImage';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import ajaxObj from '../../data/ajax.json';

import data from '../../data/items.json';

export default class Container extends React.Component {

  constructor(props) {
    super(props);
    const url = this.props.url.pathname;
    let active = 1;
    switch(url){
      case '/': active = 1; this.changeMetaData(1); fbq('track', 'ViewContent'); break;
      case '/salonathome/face': active = 1; this.changeMetaData(1); fbq('track', 'ViewContent'); break;
      case '/salonathome/body': active = 2; this.changeMetaData(2); fbq('track', 'ViewContent'); break;
      case '/salonathome/hair': active = 3; this.changeMetaData(3); fbq('track', 'ViewContent'); break;
      case '/salonathome/makeup': active = 4; this.changeMetaData(4); fbq('track', 'ViewContent'); break;
      case '/salonathome/packages': active = 5; this.changeMetaData(5); fbq('track', 'ViewContent'); break;
    }

    this.state = {
      data: data,
      active: active
    }
  }

  getActiveData(id) {
    const {data} = this.state;
    for(let i = 0; i < data.serviceList.length; i++){
      if(data.serviceList[i].id == id){
        return data.serviceList[i];
      }
    }
  }

  componentWillReceiveProps(nextProp) {
    const url = nextProp.url.pathname;

    switch(url){
      case '/': this.setState({active: 1}); this.changeMetaData(1); fbq('track', 'ViewContent'); break;
      case '/salonathome/face': this.setState({active: 1}); this.changeMetaData(1); fbq('track', 'ViewContent'); break;
      case '/salonathome/body': this.setState({active: 2}); this.changeMetaData(2); fbq('track', 'ViewContent'); break;
      case '/salonathome/hair': this.setState({active: 3}); this.changeMetaData(3); fbq('track', 'ViewContent'); break;
      case '/salonathome/makeup': this.setState({active: 4}); this.changeMetaData(4); fbq('track', 'ViewContent'); break;
      case '/salonathome/packages': this.setState({active: 5}); this.changeMetaData(5); fbq('track', 'ViewContent'); break;
    }
  }

  render() {
    return (
      <div className='col-md-12 col-xs-12 pad0 clearfix'>
        <div className='col-md-4 nomob'></div>
        <HomeImage data = {this.getActiveData(this.state.active)} serviceSelected = {this.serviceSelected.bind(this)} active = {this.state.active}/>
      </div>
    )
  }

  componentWillMount() {
    let self = this;
    ajaxObj.url = 'https://s3-us-west-2.amazonaws.com/lplexassets/data/items.json';
    ajaxObj.type = 'GET';
    ajaxObj.data = '';
    ajaxObj.xhrFields = { withCredentials: false };
    ajaxObj.success = function(data) {
      ajaxObj.xhrFields = { withCredentials: true };
      self.setState({data: data})
    }
    ajaxObj.error = function() {
      ajaxObj.xhrFields = { withCredentials: true };
      window.bookingDetails.name = null;
    }
    $.ajax(ajaxObj);
  }

  serviceSelected(attrValue) {
    switch(attrValue){
      case '1': browserHistory.push('/salonathome/face');  break;
      case '2': browserHistory.push('/salonathome/body');  break;
      case '3': browserHistory.push('/salonathome/hair');   break;
      case '4': browserHistory.push('/salonathome/makeup');   break;
      case '5': browserHistory.push('/salonathome/packages');  break;
    }
    this.setState({active: attrValue});
  }

  getStaticData(id) {
    for(let i = 0; i < data.serviceList.length; i++){
      if(data.serviceList[i].id == id){
        return data.serviceList[i];
      }
    }
  }

  changeMetaData(active) {
    $('meta[property=description]').attr('content', this.getStaticData(active).metaDescription);
    $('meta[property=title]').attr('content', this.getStaticData(active).metaTitle);
    $('meta[name=keywords]').attr('content', this.getStaticData(active).metaKeyword);
    document.title = this.getStaticData(active).metaTitle;
  }
}

