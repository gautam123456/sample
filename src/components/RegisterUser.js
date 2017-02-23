/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import Base from './base/Base';

import ajaxObj from '../../data/ajax.json';

export default class RegisterUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            refcode: '',
            otp:'',
            displayType: 'none',
            info: 'Please provide Name & OTP'
        }
    }

    renderNotification() {
        let classs = `col-xs-10 col-md-4 top-msg error`;
        return (
            <header className = { classs } style = {{display: this.state.displayType}}>
                <div>
                    <span> { this.state.info } </span>
                    <span className = 'pull-right'></span>
                </div>
            </header>
        )
    }

    render() {

        return (
            <div>
                <ActivityHeader heading = { 'Register' }/>

                <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>

                    { this.renderNotification() }

                    <input type = 'text' placeholder = 'Name (Required)' className = 'col-xs-12' onChange={ this.nameChanged.bind(this) }></input>

                    <input type = 'text' placeholder = 'OTP (Required)' className = 'col-xs-12' onChange={ this.otpChanged.bind(this) }></input>

                    <input type = 'text' placeholder = 'Refferal Code (Optional)' className = 'col-xs-12' onChange={ this.refCodeChanged.bind(this) }></input>

                    <button type = 'text' className = 'col-xs-12' onClick={ this.register.bind(this) }> Submit </button>

                </div>
            </div>
        )
    }

    nameChanged(e) {
        let name = e.currentTarget.value;
        this.setState({ name: name });
    }

    refCodeChanged(e) {
        let refcode = e.currentTarget.value;
        this.setState({ refcode: refcode });
    }

    otpChanged(e) {
        let otp = e.currentTarget.value;
        this.setState({ otp: otp });
    }

    allRequiredDataProvided() {
        return !!(this.state.name && this.state.otp)
    }

    showNotification() {
        this.setState({displayType:'block'})
    }

    register() {
        if(this.allRequiredDataProvided()) {
            new Base().showOverlay();
            let query = this.props.location.query;
            ajaxObj.url = ajaxObj.baseUrl + '/saveguestcustomer';
            ajaxObj.data = {
                phonenumber: query.number,
                otp: this.state.otp,
                token: query.token,
                name: this.state.name,
                refcode: this.state.refcode
            };
            ajaxObj.success = function (data) {
                new Base().hideOverlay();
                window.bookingDetails.name = data.name || 'dummy';
                browserHistory.push('/book')
            }
            ajaxObj.error = function () {
                new Base().hideOverlay();
                browserHistory.push('/oops')
            }
            $.ajax(ajaxObj);

        }else{
            this.showNotification()
        }
    }
}


