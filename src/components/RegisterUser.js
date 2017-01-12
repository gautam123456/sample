/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import $ from 'jquery';

export default class RegisterUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            address: '',
            refcode: ''
        }
    }

    render() {
        return (
            <div>
                <ActivityHeader heading = { 'Register' }/>
                <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>

                    <input type = 'text' placeholder = 'Enter your Name' className = 'col-xs-12' onChange={ this.nameChanged.bind(this) }></input>

                    <input type = 'text' placeholder = 'Enter your full Address' className = 'col-xs-12' onChange={ this.addressChanged.bind(this) }></input>

                    <input type = 'text' placeholder = 'Enter referal Code' className = 'col-xs-12' onChange={ this.refCodeChanged.bind(this) }></input>

                    <button type = 'text' className = 'col-xs-12' onClick={ this.register.bind(this) }> Submit </button>

                </div>
            </div>
        )
    }

    nameChanged(e) {
        let name = e.currentTarget.value;
        name.length > 0 ? this.setState({ name: name }) : this.showErrorMessage('Please provide your Name');
    }

    addressChanged(e) {
        let address = e.currentTarget.value;
        address.length > 0 ? this.setState({ address: address }) : this.showErrorMessage('Please provide full Address');
    }

    refCodeChanged(e) {
        let refcode = e.currentTarget.value;
        this.setState({ refcode: refcode });
    }

    showErrorMessage(msg) {
        console.log(msg);
    }

    register() {
        let query = this.props.location.query,
            self = this;
        $.ajax({
            url: 'https://storeapi.lookplex.com/wsv1/masnepservice/saveguestcustomer',
            data: { phonenumber: query.number, otp: query.otp, token: query.token, address: self.state.address, name: self.state.name, refcode: self.state.refcode },
            dataType: 'json',
            xhrFields: { withCredentials: true },
            contentType: 'application/x-www-form-urlencoded',
            success: function(data) {
                console.log(JSON.stringify(data));
                browserHistory.push('/');
            },
            type: 'POST'
        });
    }
}


