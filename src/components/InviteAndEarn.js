import React from 'react';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import ajaxObj from '../../data/ajax.json';

export default class InviteAndEarn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refCode: '',
      active: true,
      refCount: ''
    }
  }

  renderInviteAndEarn() {
    return (
      <div className='invite'>

        <div className='col-xs-12 a'>Share your service experience with your friends by gifting them Rs.200.</div>
        <div className='col-xs-12 a'>Earn Rs.200 cashback on their first trial.</div>
        <div className='col-xs-12 pad0 a'>
          <div className='col-xs-2'></div>
          <div className='col-xs-8'>YOUR <strong>LOOK</strong>PLEX INVITE CODE</div>
          <div className='col-xs-2'></div>
        </div>
        <div className='col-xs-12 center a'>{this.state.refCode || 'Please login to see your referral code'}</div>
        {
          this.state.refCode ?
          <a href={'whatsapp://send?text=Hey! I tried LookPlex and had an amazing experience. Here\'s a gift of Rs 200 for you to try their beauty services. I am sure you\'ll love them too! http://lookplex.com/login?refcode=' + this.state.refCode} data-action="share/whatsapp/share">
            <div className='invite-wap col-xs-7 a'><i className='col-xs-2 fa fa-whatsapp pad0'></i><div className='col-xs-9 pad0'>Invite via WhatsApp</div></div>
          </a> :
          <a href={'/login'}>
            <button className='invite-wap col-xs-7 a'>Login</button>
          </a>
        }

      </div>
    )
  }

  renderRewards() {
    return (
      <div className='rewards col-xs-12'>
        <div className='col-xs-12'>Total <strong>LOOK</strong>PLEX Credits Earned</div>
        <div className='col-xs-12'>Total referrals : {this.state.refCount || 0} </div>
        <div className='col-xs-12'>Rewards : <i className='fa fa-inr'></i> {this.state.refCount ? this.state.refCount * 200 : '0'} </div>
        <div className='col-xs-12'>Per booking you can avail maximum Rs. 200 discount by using referral program</div>
      </div>
    )
  }

  render() {
    return (
      <div className = 'col-xs-12 col-md-4 col-md-offset-4 pad0 refer'>
        <ActivityHeader heading = { 'Earn Free Services' }/>
        <div className='head col-xs-12 pad0'>
          <div className={'col-xs-6 pad0 ' + this.state.active} onClick={this.setActive.bind(this, true)}>INVITE &#38; EARN</div>
          <div className={'col-xs-6 pad0 ' + !this.state.active} onClick={this.setActive.bind(this, false)}>REWARDS</div>
        </div>
        <img className='col-xs-12 pad0' src='../styles/assets/images/refer.jpg' height='150px'/>
        <div className='col-xs-12 pad0 mask'></div>
        {this.state.active ? this.renderInviteAndEarn() : this.renderRewards()}
      </div>
    )
  }

  componentWillMount() {
    this.getUserDetails();
  }

  getUserDetails() {
    let self = this;
    ajaxObj.url = ajaxObj.baseUrl + '/isloggedinnew';
    ajaxObj.type = 'GET';
    ajaxObj.data = '';
    ajaxObj.success = function(data) {
      window.bookingDetails.name = data.name;
      window.bookingDetails.addressList = data.addressList;
      self.setState({refCode: data.refCode, refCount: data.refCount})
    }
    ajaxObj.error = function() {
      window.bookingDetails.name = null;
    }
    $.ajax(ajaxObj);
  }

  setActive(active) {
    this.setState({active: active})
  }
}




