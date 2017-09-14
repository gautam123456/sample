/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory, Link } from 'react-router';
import $ from 'jquery';
import Base from './base/Base';
import DisableScroll from './base/DisableScroll';
import TopNotification from './TopNotification';
import RightColumn from './RightColumn';

import ajaxObj from '../../data/ajax.json';

export default class Login extends DisableScroll {

  constructor(props) {
    super(props);
    this.state = {
      number : '',
      screenWidth: $(window).width(),
      notify: {
        show: false,
        type: 'info',
        timeout: 4000,
        msg:'',
        top: 30
      }
    }
  }

  render() {
    return (
      <div className='lo'>
        <TopNotification data={this.state.notify}/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 login pad0'>
          <div className = 'discard col-xs-12 col-md-4'>
            <Link to = { '/' }>
              &#215;
            </Link>
          </div>

          <div className = 'logo'>
            <div className = 'hlg'></div>
          </div>
          <div onClick={ this.onBlur.bind(this) } className = 'col-xs-12'>
          <div className = 'col-xs-1 col-xs-offset-2 pad0'><i className = 'fa fa-user-o'></i></div>
          <input type = 'number' placeholder = 'Enter mobile number' pattern='[0-9]*' inputMode='numeric' className = 'col-xs-7 pad0' onChange={ this.numberChanged.bind(this) } onFocus={ this.focusChanged.bind(this) }></input>
          </div>
          <button type = 'text' className = 'col-xs-8 col-xs-offset-2' onClick={ this.login.bind(this) }> LOG IN / SIGN UP</button>
        </div>
      </div>
    )
  }

  updateDimensions() {
    this.setState({screenWidth: $(window).width()});
  }

  componentDidMount() {
    Base.hideOverlay();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    $zoho.salesiq.visitor.contactnumber("8373928697");
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  showNotification(type, msg, timeout, top) {
    this.setState({notify: {show: true, timeout, type, msg, top}})
  }

  numberChanged(e) {
    let number = e.currentTarget.value;
    this.setState({number});

    if(number.length == 10) {
      ajaxObj.type = 'POST';
      ajaxObj.url = ajaxObj.baseUrl + '/recordcontactnumber';
      ajaxObj.data = { phonenumber: number };
      $.ajax(ajaxObj);
    }

    if(!(number.length <= 10)) {
      this.showNotification('warning', 'Please provide 10 digit mobile number', 4000, 30);
    } else {
      this.setState({notify: {show: false}});
    }
  }

  login() {
    if(this.state.number.length !== 10) {
      this.showNotification('warning', 'Please provide 10 digit mobile number', 4000, 30);
    } else {
      Base.showOverlay();
      let self = this,
        query = this.props.location.query;


      Base.sandbox.refcode = query.refcode;
      Base.sandbox.number = self.state.number;

      ajaxObj.type = 'POST';
      ajaxObj.url = ajaxObj.baseUrl + '/getmobileotp';
      ajaxObj.data = { phonenumber: self.state.number };
      ajaxObj.success = function(data) {
        Base.sandbox.isNewUser = data.isNewUser;
        Base.sandbox.token = data.token;
        if(data.isNewUser == true){
          browserHistory.push( '/register');
        }else{
          browserHistory.push('/otp/confirm');
        }
        Base.hideOverlay();
      }
      ajaxObj.error = function(e) {
        Base.hideOverlay();
        self.showNotification('error', e.responseText, 4000, 30);
      }
      $.ajax(ajaxObj);
    }
  }
}


