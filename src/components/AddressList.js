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
import {addressSelected, getUserDetails, reFetchUserDetails} from '../actions';

import ajaxObj from '../../data/ajax.json';

class AddressList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          address: '',
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
        const {notify, activelkey} = this.state,
          {addressList} = this.props.userDetails.details;

        return (
            <div>
                <ActivityHeader heading = { 'Select your Address' }/>
                  <TopNotification data={notify}/>
                    <div className = 'col-md-offset-4 col-md-4 col-xs-12'>
                        { Array.isArray(addressList) ? addressList.map( function(address, index) {
                            return (<Address key = { address.lkey } address = { address } index = { index } active = { activelkey === address.lkey } selectedAddress = { this.selectedAddress }/>)
                        }, this):'' }
                        <div className = 'message' style = {{marginTop: 20}}>{Array.isArray(addressList) && addressList.length > 1 ? '*Tap to select your desired address':''}</div>
                        <div className='add-address col-xs-4'><Link to = '/address/add'>Add New Address</Link></div>

                    </div>
                <ActivityFooter key = { 45 } next = { this.navigateNext } back = { this.navigateBack }/>
            </div>
        )
    }

    navigateNext = () => {
      if(this.state.activelkey) {
        browserHistory.push('booking/confirm');
      } else {
        this.showNotification(I, ADDRESS);
      }
    }

    navigateBack = () => {
      browserHistory.push('/order/details');
    }

    showNotification = (type, msg, timeout = 4000, bottom = 50) => {
      this.setState({notify: {show: true, timeout, type, msg, bottom}})
    }

    componentDidMount = () => {
      const {reFetchDetails} = this.props.userDetails;
      if(reFetchDetails) {
        this.callGetAddressListIn3Sec();
      }
    }

    callGetAddressListIn3Sec = () => {
      Base.showOverlay();
      setTimeout(() => { this.getaddresslist() }, 3000);
    }

    getaddresslist = () => {
      this.props.getUserDetails();
      this.props.reFetchUserDetails(false);
    }

    selectedAddress = (address) => {
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
    },
    reFetchUserDetails: (flag) => {
      dispatch(reFetchUserDetails(flag));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddressList);

