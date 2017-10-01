/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Address from './Address';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import TopNotification from './TopNotification';
import $ from 'jquery';
import Base from './base/Base';
import {I, ADDRESS} from '../constants';
import {connect} from 'react-redux';
import {addressSelected, getUserDetails} from '../actions';

import ajaxObj from '../../data/ajax.json';

class AddressList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          address: '',
          addresslist: [],
          activelkey: '',
          notify: {
            show: false,
            type: 'info',
            timeout: 4000,
            msg:'',
            bottom: 50
          }
        }
    }

    render() {
        const self = this,
          {addresslist} = this.state;

        return (
            <div>
                <ActivityHeader heading = { 'Select your Address' }/>
                  <TopNotification data={this.state.notify}/>
                    <div className = 'col-md-offset-4 col-md-4 col-xs-12'>
                        { addresslist ? addresslist.map( function(address, index) {
                            return (<Address key = { address.lkey } address = { address } index = { index } active = { self.state.activelkey === address.lkey } selectedAddress = { self.selectedAddress.bind(self) }/>)
                        }):'' }
                        <div className = 'message' style = {{marginTop: 20}}>{Array.isArray(addresslist) && addresslist.length > 1 ? '*Tap to select your desired address':''}</div>
                        <div className='add-address col-xs-4'><Link to = '/address/add'>Add New Address</Link></div>

                    </div>
                <ActivityFooter key = { 45 } next = { this.navigateNext.bind(this) } back = { this.navigateBack.bind(this) }/>
            </div>
        )
    }

    navigateNext() {
      if(this.state.activelkey) {
        browserHistory.push('booking/confirm');
      } else {
        this.showNotification(I, ADDRESS, 4000, 50);
      }
    }

    navigateBack() {
      browserHistory.push('/order/details');
    }

    showNotification(type, msg, timeout, bottom) {
      this.setState({notify: {show: true, timeout, type, msg, bottom}})
    }

    componentDidMount(){
      const {details} = this.props.userDetails;
      if(details && Array.isArray(details.addressList)) {
        this.setState({ addresslist: details.addressList });
      }else {
        this.getaddresslist();
      }
    }

    componentWillReceiveProps(props) {
      const {details} = this.props.userDetails;

      if (props.location.query.update) {
        this.callGetAddressListIn3Sec();
      } else {
        if(details && Array.isArray(details.addressList)) {
          this.setState({ addresslist: details.addressList });
        }else {
          this.getaddresslist();
        }

      }
    }

    callGetAddressListIn3Sec(){
      let self = this;
      Base.showOverlay();
      setTimeout(function(){ self.getaddresslist() }, 3000)
    }

    getaddresslist() {
      this.props.getUserDetails();
        //ajaxObj.type = 'GET';
        //ajaxObj.data = '';
        //ajaxObj.dataType = 'json',
        //ajaxObj.url = ajaxObj.baseUrl + '/isloggedinnew';
        //ajaxObj.xhrFields = { withCredentials: true };
        //ajaxObj.success = (data) => {
        //    this.setState({ addresslist: data.addressList });
        //    Base.hideOverlay();
        //}
        //ajaxObj.error = () => {
        //  if(!this.props.userDetails.isLoggedIn){
        //    browserHistory.push('login')
        //  }
        //}
        //$.ajax(ajaxObj);
    }

    selectedAddress(address){
        this.setState({ address, activelkey: address.lkey });
        this.props.addressSelected({activelkey: address.lkey});
    }
}

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressSelected: (options) => {
      dispatch(addressSelected(options));
    },
    getUserDetails: () => {
      dispatch(getUserDetails());
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddressList);

