import React from 'react';
import { Link, browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {logOut} from '../actions';
import ajaxObj from '../../data/ajax.json';

import $ from 'jquery';

class MenueOptions extends React.Component {
  render() {

    return (
      <div style={{width:'100%'}}>

          {
            this.props.isLoggedIn ?
              <div className='col-md-12 col-xs-12' onClick={this.props.logOut}>
                <i className="fa fa-user-circle"></i>
                <a>
                  Logout
                </a>
              </div>:
              <div className='col-md-12 col-xs-12' onClick={this.logIn}>
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
          <a onClick={this.goToHome.bind(this)}>
            Home
          </a>
        </div>
      </div>
    )
  }

  goToHome() {
    this.props.closeDrawer ? this.props.closeDrawer() : null;
    browserHistory.push('');
  }

  logIn(e) {
    e.stopPropagation();
    browserHistory.push('login');
  }

  navigateTo(path, e){
    e.stopPropagation();
    browserHistory.push(path);
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userDetails.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: () => {
      dispatch(logOut());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenueOptions);


