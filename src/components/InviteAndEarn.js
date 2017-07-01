import React from 'react';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import ajaxObj from '../../data/ajax.json';
import Base from './base/Base';

export default class InviteAndEarn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refCode: '',
      active: true,
      totalrefcount: ''
    }
  }

  renderInviteAndEarn() {
    return (
      <div className='invite'>

        <div className='col-xs-12 a'>
          <ul>
            <li>If your friend sign up using your refer code(check below). </li>
            <li>You will get 200 Rs OFF on your next booking. </li>
            <li>Your friend will get Rs 200 OFF on her First booking. </li>
          </ul>
        </div>
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

  renderStaticData() {
    return (
      <div className='static col-xs-12 pad0'>
        <ul>
          <li>Hurray! you can avail 200 Rs off per booking as per referral program</li>
          <li>No need to apply coupon, just make your booking, referral discount will be applied automatically, If eligible.</li>
        </ul>
      </div>
    )
  }

  renderRewards() {
    if(this.state.refCode){
      return (
        <div className='rewards col-xs-12'>
          <div className='col-xs-12'>Total <strong>LOOK</strong>PLEX Credits Earned</div>
          <div className='col-xs-12'>Total referrals: <strong className='i'>{this.state.totalrefcount || 0} </strong></div>
          <div className='col-xs-12'>Rewards earned: <i className='fa fa-inr'></i> <strong className='i'>{this.state.totalrefcount ? this.state.totalrefcount * 200 : '0'}</strong> </div>
          {this.renderStaticData()}
        </div>
      )
    } else {
      return(
        <div className='invite'>
          <div className='col-xs-12 center a'>{'Please login to see your Rewards'}</div>
          <a href={'/login'}>
            <button className='invite-wap col-xs-7 a'>Login</button>
          </a>
          {this.renderStaticData()}
        </div>
      )
    }
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
      Base.sandbox.bookingDetails.name = data.name;
      Base.sandbox.bookingDetails.addressList = data.addressList;
      self.setState({refCode: data.refCode, totalrefcount: data.totalrefcount})
    }
    ajaxObj.error = function() {
      Base.sandbox.bookingDetails.name = null;
    }
    $.ajax(ajaxObj);
  }

  setActive(active) {
    this.setState({active: active})
  }
}




