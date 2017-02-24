/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import $ from 'jquery';

import ajaxObj from '../../data/ajax.json';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width:{width:0},
      name: window.bookingDetails.name || 'ZZ'
    }
  }

  loggedInRender() {
    return (
        <div>
          { /*TODO <div className = 'u-name'>{ this.getShortName() }</div> */ }
          <a onClick = { this.logOut }>Logout</a>
        </div>
    )
  }

  nonLoggedInRender() {
    return (
        <a href='/login'>Login/Sign up</a>
    )
  }

  render() {
    return (
      <header className='full-width header'>
        <div className='hlg'>
          <div className='col-xs-1 full-height menue pull-right' onClick={this.openDrawer.bind(this)}><i className='fa fa-ellipsis-v fa-lg w'></i></div>
        </div>

        <div id='mySidenav' className='sidenav' style = { this.state.width }>
          <div className='closebtn' onClick = { this.closeDrawer.bind(this) }>&times;</div>
          { this.isLoggedIn() ? this.loggedInRender() : this.nonLoggedInRender() }
          <a href='/'>Home</a>
          <a href='/gallery/bridal'>Gallery</a>
          <span>Call 8826755766 for any help or assistance.</span>
        </div>

      </header>
    )
  }

  openDrawer() {
    this.setState({width:{width:250}});
  }

  closeDrawer() {
    this.setState({width:{width:0}});
  }

  isLoggedIn() {
    if(window.bookingDetails.name)
      return true;
    return false;
  }

  getShortName() {
    let name = this.state.name.split(' ');
    return name[0].substring(0,1).toUpperCase() + name[name.length-1].substring(0,1).toUpperCase();
  }

  logOut() {
    window.bookingDetails.name = null;
    ajaxObj.url = ajaxObj.baseUrl + '/custlogout';
    ajaxObj.type = 'GET';
    ajaxObj.data = '';
    $.ajax(ajaxObj);
  }
}

