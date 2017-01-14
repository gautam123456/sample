/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { Link } from 'react-router';
import Address from './Address';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import $ from 'jquery';

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

                        { this.state.addresslist ? this.state.addresslist.map( function(address) {
                            return (<Address key = { address.lkey } address = { address } active = { self.state.activelkey === address.lkey } selectedAddress = { self.selectedAddress.bind(self) }/>)
                        }):'' }

                        <button type = 'text' className = 'col-xs-5 add-address'> <Link to = 'address/add'>Add New Address</Link></button>

                    </div>
                <ActivityFooter next = { this.state.address ? 'order/confirm' :'address' } back = { 'book' }/>
            </div>
        )
    }

    componentWillMount(){
        this.getaddresslist();
    }

    getaddresslist() {
        const self = this;
        ajaxObj.type = 'GET';
        ajaxObj.data = '';
        ajaxObj.url = ajaxObj.baseUrl + '/isloggedinnew';
        ajaxObj.success = function(data) {
            self.setState({ addresslist: data.addressList });
        }
        ajaxObj.error = function(e){

        }
        $.ajax(ajaxObj);
    }

    selectedAddress(address){
        window.bookingDetails.addresslkey = address.lkey;
        this.setState({ address: address, activelkey: address.lkey });
    }

}

