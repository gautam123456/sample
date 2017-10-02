import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import TopNotification from './TopNotification';
import DateWidget from './common/Date';
import Base from './base/Base';
import $ from 'jquery';
import OTPModal from './common/OTPModal';
import ajaxObj from '../../data/ajax.json';
import {connect} from 'react-redux';
import {saveLoginData, saveBookingData} from '../actions';
import {EMAIL, TIME, NUMBER, I, E, EM, MO, PH, MSG} from '../constants'

class OrderConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDisplay: 'none',
      mailId: '',
      mobile: '',
      comment: '',
      timing: '',
      notify: {
        show: false,
        type: I,
        timeout: 4000,
        msg:'',
        bottom: 50
      }
    }
  }

  getDate = () => {
    return this.date.getHours() < 16 ? this.date.getDate() : this.date.getDate() + 1;
  }

  renderModal = ({display}) => {
    this.setState({modalDisplay: display});
  }

  render() {
    const {mailId, notify, mobile, modalDisplay, comment} = this.state,
      {isLoggedIn, location: {query: {error}}} = this.props;

    return (
        <div>
          <ActivityHeader heading = { 'Enter booking Details' }/>
          <OTPModal display={modalDisplay} renderModal={this.renderModal} showNotification={this.showNotification}/>
          <TopNotification data={notify}/>
          { error ? <TopNotification msg = { !(mailId) ? EMAIL : TIME } type = 'error'/> : ''}
          <div className = 'col-md-offset-4 col-md-4 col-xs-12 confirm'>

            <input type = 'text' placeholder = {EM} className = 'col-xs-12'
                                              defaultValue={mailId} onChange = { this.mailIdEntered }
                                              onFocus = {this.mailFocus }
                                              onBlur = { this.mailUnFocus }></input>
            { isLoggedIn ? '' : <input type = 'text' placeholder = {MO} className = 'col-xs-12' style={{marginTop: -10}}
                   defaultValue={mobile} onChange = { this.mobileEntered } onFocus = {this.mobileFocus }
                   onBlur = { this.mobileUnFocus }></input> }
            <DateWidget scheduleHandler = {this.scheduleHandler}/>
            <div className = 'col-xs-12 pad0' style = {{marginBottom: 10, marginTop: 0}}>
              <textarea rows="3" cols="50" style={{padding: 5}} className = 'col-xs-12 optcomment'
                        placeholder = {MSG} maxLength='100'
                        onBlur = {this.optionalComments}
                        onFocus = {this.commentFocus }>
              </textarea>
            </div>
            <div className = 'col-xs-11 message'>
            </div>

          </div>
          <ActivityFooter key = {34} next = { this.navigateNext } back = { this.navigateBack } />
        </div>
    )
  }

  navigateNext = () => {
    const {mailId, timing, mobile, comment} = this.state,
      {isLoggedIn} = this.props;

    console.log(timing);

    if(isLoggedIn) {
      if(mailId) {
        if(timing.time) {
          browserHistory.push('/address');
          this.props.saveBookingData({mailId, timing, comment});
        } else {
          this.showNotification(I, TIME);
        }
      } else {
        this.showNotification(I, EMAIL);
      }
    } else {
      if(mailId) {
        if(mobile) {
          if (timing.time) {
            this.props.saveBookingData({mailId, timing, comment});
            this.login();
          } else {
            this.showNotification(I, TIME);
          }
        } else {
          this.showNotification(I, NUMBER);
        }
      } else {
        this.showNotification(I, EMAIL);
      }
    }
  }

  login = () => {
      Base.showOverlay();
      const self = this,
        {mobile} = this.state;

      ajaxObj.type = 'POST';
      ajaxObj.dataType = 'json';
      ajaxObj.url = ajaxObj.baseUrl + '/getmobileotp';
      ajaxObj.data = { phonenumber: mobile };
      ajaxObj.success = function(data) {
        if(data.isNewUser == true){
          browserHistory.push('/address/add');
        }else{
          self.renderModal({display: 'block'});
        }
        Base.hideOverlay();

        self.props.saveLoginData({
          isNewUser: data.isNewUser,
          number: mobile,
          token: data.token
        });

      }
      ajaxObj.error = function(e) {
        Base.hideOverlay();
        self.showNotification(E, e.responseText);
      }
      $.ajax(ajaxObj);
  }

  navigateBack = () => {
    browserHistory.push('');
  }

  showNotification = (type, msg) => {
    this.setState({notify: {show: true, timeout: 4000, type, msg, bottom: 50}})
  }

  scheduleHandler = (timing) => {
    this.setState({timing, notify: {show: false}});
  }

  optionalComments = (e) => {
    const comment  = e.currentTarget.value;
    this.setState({comment});
  }

  mailFocus = (e) => {
    e.currentTarget.setAttribute(PH, '');
  }

  mailUnFocus = (e) => {
    if (e.currentTarget.value == '') {
      e.currentTarget.setAttribute(PH, EM);
    }
  }

  mailIdEntered = (e) => {
    let mailId = e.currentTarget.value;
    if(this.isValidEmailId(mailId)){
      this.setState({mailId});
    }
    this.setState({notify: {show: false}});
  }

  mobileFocus = (e) => {
    e.currentTarget.setAttribute(PH, '');
  }

  mobileUnFocus = (e) => {
    if (e.currentTarget.value == '') {
      e.currentTarget.setAttribute(PH, MO);
    }
  }

  mobileEntered = (e) => {
    let mobile = e.currentTarget.value;

    if((mobile.length == 10)) {
      this.setState({mobile, notify: {show: false}});
      ajaxObj.type = 'POST';
      ajaxObj.url = ajaxObj.baseUrl + '/recordcontactnumber';
      ajaxObj.data = { phonenumber: mobile };
      $.ajax(ajaxObj);
    }
  }

  commentFocus = (e) => {
    e.currentTarget.setAttribute(PH, '');
  }

  isValidEmailId = (email) => {
    let atpos = email.indexOf('@');
    let dotpos = email.lastIndexOf('.');
    if (atpos < 1 || dotpos<atpos+2 || dotpos+2 >= email.length) {
      return false;
    }
    return true;
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails,
    isLoggedIn: state.userDetails.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveLoginData: (data) => {
      dispatch(saveLoginData(data));
    },
    saveBookingData: (data) => {
      dispatch(saveBookingData(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm);


