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
    this.active = 1;
    this.switchUrl(url);

    this.state = {
      data: data,
      active: this.active
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

  switchUrl(url) {
    switch(url){
      case '/': this.changeData(1); break;
      case '/salon-at-home/in/delhi': this.changeData(1); break;
      case '/salon-at-home/in/gurgaon': this.changeData(1); break;
      case '/salon-at-home/in/noida': this.changeData(1); break;
      case '/salon-at-home/in/indirapuram': this.changeData(1); break;
      case '/salon-at-home/face': this.changeData(1); break;
      case '/salon-at-home/face/': this.changeData(1); break;
      case '/face': this.changeData(1); break;
      case '/salon-at-home/body': this.changeData(2); break;
      case '/salon-at-home/body/': this.changeData(2); break;
      case '/body': this.changeData(2); break;
      case '/salon-at-home/hair': this.changeData(3); break;
      case '/salon-at-home/hair/': this.changeData(3); break;
      case '/hair': this.changeData(3); break;
      case '/salon-at-home/makeup': this.changeData(4); break;
      case '/salon-at-home/makeup/': this.changeData(4); break;
      case '/makeup': this.changeData(4); break;
      case '/salon-at-home/packages': this.changeData(5); break;
      case '/salon-at-home/packages/': this.changeData(5); break;
      case '/packages': this.changeData(5); break;
    }
  }

  changeData(active) {
    this.active = active; this.setState({active: active}); this.changeMetaData(active); fbq('track', 'ViewContent');
  }

  componentWillReceiveProps(nextProp) {
    const url = nextProp.url.pathname;
    this.switchUrl(url);
  }

  render() {
    return (
      <div className='col-md-12 col-xs-12 pad0 clearfix'>
        <div className='col-md-4 nomob'></div>
        <HomeImage data = {this.getActiveData(this.state.active)} serviceSelected = {this.serviceSelected.bind(this)} active = {this.state.active || 1}/>
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
      case '1': browserHistory.push('/salon-at-home/face');  break;
      case '2': browserHistory.push('/salon-at-home/body');  break;
      case '3': browserHistory.push('/salon-at-home/hair');   break;
      case '4': browserHistory.push('/salon-at-home/makeup');   break;
      case '5': browserHistory.push('/salon-at-home/packages');  break;
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

