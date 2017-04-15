import React from 'react';
import ActivityHeader from './ActivityHeader';

export default class InviteAndEarn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refcode: this.props.location.query.refcode,
      active: true
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
        <div className='col-xs-12 center a'>{'euwyfv5434'}</div>
        <a href="whatsapp://send?text=Hey! I tried LookPlex and had an amazing experience. Here's a gift of Rs 200 for you to try their beauty services. I am sure you'll love them too! http://lookplex.com/referal?code=gautam1234" data-action="share/whatsapp/share">
          <div className='invite-wap col-xs-6 a'><i className='fa fa-whatsapp'></i><span>Invite via WhatsApp</span></div>
        </a>
      </div>
    )
  }

  renderRewards() {
    return (
      <div className='rewards col-xs-12'>
        <div className='col-xs-12'>Total <strong>LOOK</strong>PLEX Credits Earned</div>
        <div className='col-xs-12'><i className='fa fa-inr'></i> {0}</div>
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

  setActive(active) {
    this.setState({active: active})
  }
}




