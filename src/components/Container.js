/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import HomeImage from './HomeImage';
import TopNotification from './TopNotification';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import ajaxObj from '../../data/ajax.json';
import Base from './base/Base';
import Footer from './Footer';
import LeftNav from './common/LeftNav';
import RightColumn from './RightColumn';
import {connect} from 'react-redux';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.active = 1;

    this.state = {
      active: this.active,
      notify: {
        show: false,
        type: 'info',
        timeout: 12000,
        msg:'',
        bottom: 60
      }
    }

    this.getStaticData = this.getStaticData.bind(this);
  }

  getActiveData(id) {
    const {data} = this.props;
    if(data && data.serviceList) {
      for(let i = 0; i < data.serviceList.length; i++){
        if(data.serviceList[i].id == id){
          return data.serviceList[i];
        }
      }
    }
  }

  switchUrl(url) {
    switch(url){
      case '/': this.changeData(5); break;
      case '/salon-at-home': this.changeData(5); break;
      case '/salon-at-home/in/delhi': this.changeData(5); break;
      case '/salon-at-home/in/gurgaon': this.changeData(5); break;
      case '/salon-at-home/in/noida': this.changeData(5); break;
      case '/salon-at-home/in/indirapuram': this.changeData(5); break;
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
    this.active = active;
    this.setState({active: active, notify: {show: false}});
    this.changeMetaData(active);
    Base.track('track', 'ViewContent');
  }

  showNotification = (type, msg, timeout, bottom) => {
    this.setState({notify: {show: true, timeout, type, msg, bottom}})
  }

  componentWillReceiveProps(nextProp) {
    const url = nextProp.url.pathname;
    this.switchUrl(url);
  }

  render() {
    const {data, screenWidth} = this.props,
      {active, notify} = this.state;

    if(data) {
      document.getElementById('load').style.display = 'none';
      return (
        <div className='col-md-12 col-xs-12 pad0 clearfix b-fix'>
          <TopNotification data={notify}/>
          <div className='col-md-4 nomob'>
            <LeftNav screenWidth={screenWidth}/>
          </div>
          <HomeImage data = {this.getActiveData(active)}
                     serviceSelected = {this.serviceSelected.bind(this)} active = {active || 1}
                     showNotification={this.showNotification} screenWidth={screenWidth}/>
          <div className='col-md-4 nomob pad0'>
            <RightColumn screenWidth={screenWidth}/>
          </div>
          <Footer />
        </div>
      )
    } else {
      document.getElementById('load').style.display = 'block';
      return (
        <div style={{minHeight: 700}}></div>
      )
    }
  }

  componentDidMount() {
    const source = this.props.url.query.s || document.referrer || 'Direct';
    Base.track('track', 'Lead', {content_category: source});
    Base.logEvent('Main page', 'Landed', source);
  }

  serviceSelected(attrValue) {
    switch(attrValue){
      case '1': browserHistory.push('/salon-at-home/face');  break;
      case '2': browserHistory.push('/salon-at-home/body');  break;
      case '3': browserHistory.push('/salon-at-home/hair');   break;
      case '4': browserHistory.push('/salon-at-home/makeup');   break;
      case '5': browserHistory.push('/salon-at-home/packages');  break;
    }
    this.setState({active: attrValue, notify: {show: false}});
  }

  getStaticData(id) {
    const {data} = this.props;
    if(data && data.serviceList) {
      for(let i = 0; i < data.serviceList.length; i++){
        if(data.serviceList[i].id == id){
          return data.serviceList[i];
        }
      }
    }
  }

  changeMetaData(active) {
    const staticData = this.getStaticData(active);
    if(staticData){
      $('meta[property=description]').attr('content', staticData.metaDescription);
      $('meta[property=title]').attr('content', staticData.metaTitle);
      $('meta[name=keywords]').attr('content', staticData.metaKeyword);
      document.title = staticData.metaTitle;
    }
  }
}

function mapStateToProps(state) {
  return {
    data: state.misc.items
  };
}


export default connect(mapStateToProps)(Container);


