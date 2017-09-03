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

import ajaxObj from '../../data/ajax.json';

export default class addresslist extends React.Component {
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
        const self = this;
        return (
            <div>
                <ActivityHeader heading = { 'Select your Address' }/>
                  <TopNotification data={this.state.notify}/>
                    <div className = 'col-md-offset-4 col-md-4 col-xs-12'>
                        { this.state.addresslist ? this.state.addresslist.map( function(address, index) {
                            return (<Address key = { address.lkey } address = { address } index = { index } active = { self.state.activelkey === address.lkey } selectedAddress = { self.selectedAddress.bind(self) }/>)
                        }):'' }
                        <div className = 'message' style = {{marginTop: 20}}>{this.state.addresslist.length > 1 ? '*Tap to select your desired address':''}</div>
                        <div className='add-address col-xs-4'><Link to = '/address/add'>Add New Address</Link></div>

                    </div>
                <ActivityFooter key = { 45 } next = { this.navigateNext.bind(this) } back = { this.navigateBack.bind(this) }/>
            </div>
        )
    }

    navigateNext() {
      if(this.state.address) {
        browserHistory.push('booking/confirm');
      } else {
        this.showNotification('info', 'Please add and select address', 4000, 50);
      }
    }

    navigateBack() {
      browserHistory.push('/order/details');
    }

    showNotification(type, msg, timeout, bottom) {
      this.setState({notify: {show: true, timeout, type, msg, bottom}})
    }

    componentWillMount(){
      this.getaddresslist();
    }

    componentWillReceiveProps(props) {
      if (props.location.query.update) {
        this.callGetAddressListIn3Sec();
      } else {
        this.getaddresslist();
      }
    }

    callGetAddressListIn3Sec(){
        let self = this;
        Base.showOverlay();
        setTimeout(function(){ self.getaddresslist() }, 3000)
    }

    getaddresslist() {
        const self = this;
        ajaxObj.type = 'GET';
        ajaxObj.data = '';
        ajaxObj.url = ajaxObj.baseUrl + '/isloggedinnew';
        ajaxObj.xhrFields = { withCredentials: true };
        ajaxObj.success = function(data) {
            self.setState({ addresslist: data.addressList });
            Base.sandbox.refCount = data.refCount;
            Base.hideOverlay();
        }
        ajaxObj.error = () => { if(!Base.sandbox.bookingDetails.name){browserHistory.push('login')} }
        $.ajax(ajaxObj);
    }

    selectedAddress(address){
        this.setState({ address, activelkey: address.lkey });
        Base.sandbox.lkey = address.lkey;
    }

}

