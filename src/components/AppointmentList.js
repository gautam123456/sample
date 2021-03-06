/**
 * Created by rgautam on 1/13/17.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import Base from './base/Base';
import Footer from './Footer';
import Appointment from './Appointment';
import TopNotification from './TopNotification';
import LeftNav from './common/LeftNav';
import {connect} from 'react-redux';
import ajaxObj from '../../data/ajax.json';

class AppointmentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: $(window).width(),
      ongoing: true,
      ongoingList: [],
      historyList: [],
      notify: {
        show: this.props.location.query.notify,
        type: 'success',
        timeout: 4000,
        msg: Base.sandbox.notify || '',
        top: 30
      }
    }
    this.ongoingList = [];
    this.historyList = [];
  }

  handlerHistory = () => {
    this.setState({ongoing: false, notify: {show: false}})
  }

  handlerOngoing = () => {
    this.setState({ongoing: true, notify: {show: false}})
  }

  getRenderer = (appointment) => {
    return (<Appointment key={appointment.bookingID} appointment={appointment} ongoing={this.state.ongoing}/>)
  }

  render() {
    const {ongoing, ongoingList, historyList, screenWidth, notify} = this.state,
      list = ongoing ? ongoingList : historyList;

    return (
      <div>
        <ActivityHeader heading = { 'My Appointments' } fixed={true}/>
        <div className='col-md-4 nomob'>
          <LeftNav screenWidth={screenWidth}/>
        </div>
        <div className = 'col-xs-12 pad0 col-md-4 appointments' style={{minHeight: 500}}>
          <TopNotification data={notify}/>
          <div className = 'col-xs-10 col-xs-offset-1 tab'>
            <div className = {'col-xs-6 cli ' + ongoing } onClick={this.handlerOngoing}>UPCOMING</div>
            <div className = {'col-xs-6 cli ' + !ongoing } onClick={this.handlerHistory}>HISTORY</div>
          </div>
          { list.length > 0 ?
            list.map(function(appointment){
              return (this.getRenderer(appointment))
            }, this)
            : <div className='img'>
                <div className='caption'>OMG! You have no upcoming events.<br /> Let's change that!</div>
              </div>
          }
          </div>
        <Footer />
      </div>
    )
  }

  showNotification(type, msg, timeout, top) {
    this.setState({notify: {show: true, timeout, type, msg, top}})
  }

  addBookingType(list) {
    list.map(function(appointment){
      this.updateBookingType(appointment);
    }, this)
    this.setState({ongoingList: this.ongoingList, historyList: this.historyList})
  }

  updateBookingType(appointment) {
    if(!($.isEmptyObject(appointment))){
      const date = appointment.formattedDate.split(' '),
        month = date[1],
        day = date[0],
        currentDay = new Date();

      let numericMonth = 0;

      switch(month.toString().toLowerCase()){
        case 'jan': numericMonth = 0; break;
        case 'feb': numericMonth = 1; break;
        case 'mar': numericMonth = 2; break;
        case 'apr': numericMonth = 3; break;
        case 'may': numericMonth = 4; break;
        case 'june': numericMonth = 5; break;
        case 'jul': numericMonth = 6; break;
        case 'aug': numericMonth = 7; break;
        case 'sep': numericMonth = 8; break;
        case 'oct': numericMonth = 9; break;
        case 'nov': numericMonth = 10; break;
        case 'dec': numericMonth = 11; break;
      }

      if(numericMonth < currentDay.getMonth() || (numericMonth == currentDay.getMonth() && day < currentDay.getDate())){
        this.historyList.push(appointment);
      }else if(appointment.status == 'cancelled'){
        this.historyList.push(appointment);
      }else {
        this.ongoingList.push(appointment);
      }
    }
  }

  updateDimensions() {
    this.setState({screenWidth: $(window).width()});
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillMount() {
    this.getAppointments();
  }

  getAppointments() {
    Base.showOverlay();
    ajaxObj.type = 'POST';
    ajaxObj.url = ajaxObj.baseUrl + '/getmybookings';
    ajaxObj.success = (data) => {
      this.addBookingType(data.customerBookingList);
      Base.hideOverlay();
    }
    ajaxObj.error = () => {if(!this.props.isLoggedIn){browserHistory.push('/login')}}
    $.ajax(ajaxObj);
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userDetails.isLoggedIn
  };
}

export default connect(mapStateToProps)(AppointmentList);


