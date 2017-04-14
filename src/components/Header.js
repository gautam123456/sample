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
          <a onClick = { this.logOut.bind(this) }>Logout</a>
          <a href='/appointments'>My Appointments</a>
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
          <a href='/offers'>My Offers</a>
          <a href='/'>Home</a>
          <a href='/gallery/bridal'>Gallery</a>
          <div className="contact col-xs-12 pad0">
            <a href="tel:918826755766"><i className = "fa fa-phone"></i></a>
            <span>Tap call or Whatsapp on +918826755766 for assistance.</span>
          </div>
        </div>

      </header>
    )
  }

  openDrawer() {
    const self = this,
      target = document.getElementById('grey-overlay')

    self.setState({width:{width:250}});
    target.className = 'grey-overlay';

    $('.grey-overlay').on('click', function(){
      self.setState({width:{width:0}});
      target.className = '';
    })
  }

  closeDrawer() {
    this.setState({width:{width:0}});
    document.getElementById('grey-overlay').className = '';
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
    const self = this;
    this.setState({name: ''});
    window.bookingDetails.name = null;
    ajaxObj.url = ajaxObj.baseUrl + '/custlogout';
    ajaxObj.type = 'GET';
    ajaxObj.data = '';
    ajaxObj.success = function(data) {
      self.setState({ addresslist: data.addressList });
      Base.hideOverlay();
    }
    $.ajax(ajaxObj);

  }
}

