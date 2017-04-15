/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Address from './Address';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';

export default class addresslist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            addresslist: [],
            activelkey: ''
        }
    }

    render() {
        const self = this;
        return (
            <div>
                <ActivityHeader heading = { 'Select your Address' }/>
                    <div className = 'col-md-offset-4 col-md-4 col-xs-12'>

                        { this.state.addresslist ? this.state.addresslist.map( function(address, index) {
                            return (<Address key = { address.lkey } address = { address } index = { index } active = { self.state.activelkey === address.lkey } selectedAddress = { self.selectedAddress.bind(self) }/>)
                        }):'' }
                        <div className = 'message' style = {{marginTop: 20}}>{this.state.addresslist.length > 1 ? '*Tap to select your desired address':''}</div>
                        <div className='add-address col-xs-4'><Link to = '/address/add'>Add New Address</Link></div>

                    </div>
                <ActivityFooter key = { 45 } next = { this.state.address ? 'order/details?lkey='+this.state.address.lkey :'address' } back = { 'book' } address = { this.state.address } info = { 'please select address' }/>
            </div>
        )
    }

    componentWillMount(){
        this.callGetAddressListIn3Sec();
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
        ajaxObj.success = function(data) {
            self.setState({ addresslist: data.addressList });
            Base.hideOverlay();
        }
        ajaxObj.error = () => { if(!window.bookingDetails.name){browserHistory.push('login')} }
        $.ajax(ajaxObj);
    }

    selectedAddress(address){
        this.setState({ address: address, activelkey: address.lkey });
    }

}

