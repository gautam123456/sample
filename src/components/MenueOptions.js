import React from 'react';
import { Link, browserHistory } from 'react-router';
import Base from './base/Base';
import ajaxObj from '../../data/ajax.json';

import $ from 'jquery';

export default class MenueOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: Base.sandbox.bookingDetails.name
    }
  }

  componentDidMount() {
    const self = this;
    setTimeout(()=>{
      if(Base.sandbox.bookingDetails.name) {
        self.setState({name: Base.sandbox.bookingDetails.name});
      }
    }, 3000);
  }

  render() {

    return (
      <div style={{width:'100%'}}>

          {
            this.state.name ?
              <div className='col-md-12 col-xs-12' onClick={this.logOut.bind(this)}>
                <i className="fa fa-user-circle"></i>
                <a>
                  Logout
                </a>
              </div>:
              <div className='col-md-12 col-xs-12' onClick={this.logIn.bind(this)}>
                <i className="fa fa-user-circle"></i>
                <a>
                  Login/Sign up
                </a>
              </div>
          }


        <div className='col-md-12 col-xs-12' onClick={this.navigateTo.bind(this, '/appointments')}>
          <i className="fa fa-clock-o"></i>
          <Link to = { '/appointments' }>
            My Appointments
          </Link>
        </div>

        <div className='col-md-12 col-xs-12' onClick={this.navigateTo.bind(this, '/salon-at-home/offers')}>
          <i className="fa fa-hand-peace-o"></i>
          <Link to = { '/salon-at-home/offers' }>
            Offers
          </Link>
        </div>

        <div className='col-md-12 col-xs-12' onClick={this.navigateTo.bind(this, '/salon-at-home/referearn')}>
          <i className="fa fa-money"></i>
          <Link to = { '/salon-at-home/referearn' }>
            Refer &#38; Earn
          </Link>
        </div>

        <div className='col-md-12 col-xs-12' onClick={this.navigateTo.bind(this, '/salon-at-home/gallery/bridal')}>
          <i className="fa fa-camera-retro"></i>
          <Link to = { '/salon-at-home/gallery/bridal' }>
            Gallery
          </Link>
        </div>

        <div className='col-md-12 col-xs-12' onClick={this.navigateTo.bind(this, '')}>
          <i className="fa fa-home"></i>
          <Link to = { '/' }>
            Home
          </Link>
        </div>
      </div>
    )
  }

  logIn(e) {
    e.stopPropagation();
    browserHistory.push('login');
  }

  navigateTo(path, e){
    e.stopPropagation();
    browserHistory.push(path);
  }

  logOut() {
    const self = this;
    Base.sandbox.bookingDetails.name = null;
    ajaxObj.url = ajaxObj.baseUrl + '/custlogout';
    ajaxObj.type = 'GET';
    ajaxObj.data = '';
    ajaxObj.success = function(data) {
      self.setState({name: ''});
    }
    $.ajax(ajaxObj);
  }
}


