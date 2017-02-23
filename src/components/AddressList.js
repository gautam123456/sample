/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { Link } from 'react-router';
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
                        <div className = 'message' style = {{marginTop: 20}}>{this.state.addresslist.length > 0 ? '*Tap to select your desired address':''}</div>
                        <button type = 'text' className = 'col-xs-12 add-address'> <Link to = '/address/add'>Add New Address</Link></button>

                    </div>
                <ActivityFooter key = { 45 } next = { this.state.address ? 'order/confirm?lkey='+this.state.address.lkey :'address' } back = { 'book' } address = { this.state.address } info = { 'please select address' }/>
            </div>
        )
    }

    componentWillMount(){
        this.callGetAddressListIn3Sec();
    }

    callGetAddressListIn3Sec(){
        let self = this;
        new Base().showOverlay();
        setTimeout(function(){ self.getaddresslist() }, 3000)
    }

    getaddresslist() {
        const self = this;
        ajaxObj.type = 'GET';
        ajaxObj.data = '';
        ajaxObj.url = ajaxObj.baseUrl + '/isloggedinnew';
        ajaxObj.success = function(data) {
            self.setState({ addresslist: data.addressList });
            new Base().hideOverlay();
        }
        ajaxObj.error = function(){

        }
        $.ajax(ajaxObj);
    }

    selectedAddress(address){
        this.setState({ address: address, activelkey: address.lkey });
    }

}

