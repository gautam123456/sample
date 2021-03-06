import React from 'react';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import ajaxObj from '../../data/ajax.json';
import LeftNav from './common/LeftNav';
import Footer from './Footer';
import { Link } from 'react-router';
import {getUserDetails} from '../actions';
import {connect} from 'react-redux';

class InviteAndEarn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: $(window).width(),
      refCode: this.props.location.query.refcode,
      active: true
    }
  }

  renderInviteAndEarn() {
    let {refCode} = this.state,
      {details} = this.props.userDetails;
    if(!refCode) {
      refCode = details ? details.refCode: null;
    }

    return (
      <div className='invite'>
        <div className='col-xs-12 pad0 img'>
        </div>

        <div className='col-xs-12 a'>
          <ul>
            <li>Lookplex Refer and Earn Program lets you invite friends to join Lookplex.com</li>
            <br />
            <li>If your friends accept the invite and sign up with your referral code at Lookplex.com, they get Rs.200 Off on their first appointment. </li>
            <br />
            <li>Additionally, you will also get Rs.200 Off on your next appointment. </li>
          </ul>
          <div className='col-xs-12'>{refCode ? <div>YOUR <strong>LOOK</strong>PLEX INVITE CODE</div>:'PLEASE LOGIN TO SEE YOUR INVITE CODE'}</div>
          <div className='col-xs-12'><div className='code col-xs-4 col-xs-offset-4'>{refCode || 'XXXXXX'}</div></div>
          {
            refCode ?
              <a href={'whatsapp://send?text=Hey! I tried Lookplex for Beauty Services at Home and had an amazing experience. Here\'s a gift of Rs.200 for you to try their services. I am sure you\'ll love them too! http://lookplex.com/login?refcode=' + refCode} data-action="share/whatsapp/share">
                <div className='invite-wap col-xs-7 a'><i className='col-xs-2 fa fa-whatsapp pad0'></i><div className='col-xs-9 pad0'>Invite via WhatsApp</div></div>
              </a> :
              <Link to={'/login'}>
                <button className='invite-wap col-xs-7 a'>Login</button>
              </Link>
          }
        </div>
      </div>
    )
  }

  renderStaticData() {
    return (
      <div className='static col-xs-12 pad0'>
        <ul>
          <li>As per Lookplex Refer and Earn Program, you can avail a discount of Rs.200 on every appointment.</li>
          <br />
          <li>While booking an appointment, you do not need to apply any coupon code. If eligible, referral discount will be applied automatically to the total bill.</li>
        </ul>
      </div>
    )
  }

  renderRewards() {
    const {details} = this.props.userDetails;
    let refCount, refCode;
    if(details){
      refCode = details.refCode;
      refCount = details.refCount
    }

    if(refCode){
      return (
        <div className='rewards col-xs-12'>
          <div className='col-xs-12 pad0 img'>
          </div>
          <div className='col-xs-12'>Total <strong>LOOK</strong>PLEX Credits Earned</div>
          <div className='col-xs-12'>Total referrals: <strong className='i'>{refCount || 0} </strong></div>
          <div className='col-xs-12'>Rewards earned: <i className='fa fa-inr'></i> <strong className='i'>{refCount ? refCount * 200 : '0'}</strong> </div>
          {this.renderStaticData()}
        </div>
      )
    } else {
      return(
        <div className='invite'>
          <div className='col-xs-12 center a'>{'Please login to see your Rewards'}</div>
          <Link to={'/login'}>
            <button className='invite-wap col-xs-7 a cli'>Login</button>
          </Link>
          {this.renderStaticData()}
        </div>
      )
    }
  }

  render() {
    const {screenWidth, active} = this.state;

    return (
      <div>
        <ActivityHeader heading = { 'Refer & Earn' } fixed={true}/>
        <div className='col-md-4 nomob'>
          <LeftNav screenWidth={screenWidth}/>
        </div>
        <div className='head col-xs-12 col-md-4 pad0 refer'>
          <div className = 'col-xs-10 col-xs-offset-1 tab'>
            <div className = {'col-xs-6 cli ' + active } onClick={this.setActive.bind(this, true)}>INVITE &#38; EARN</div>
            <div className = {'col-xs-6 cli ' + !active } onClick={this.setActive.bind(this, false)}>MY CREDITS</div>
          </div>
          {active ? this.renderInviteAndEarn() : this.renderRewards()}
        </div>
        <Footer />
      </div>
    )
  }

  updateDimensions() {
    this.setState({screenWidth: $(window).width()});
  }

  componentDidMount() {
    //if(!this.props.userDetails.isLoggedIn){
    //  this.props.getUserDetails();
    //}
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  setActive(active) {
    this.setState({active: active})
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserDetails: () => {
      dispatch(getUserDetails());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteAndEarn);




