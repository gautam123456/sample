/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import $ from 'jquery';

import bookingDetails from '../../../data/constants.json';
import ajaxObj from '../../../data/ajax.json';

export default class Base extends React.Component {
    constructor(props) {
        super(props);
    }

    // This method is called everytime router is invoked

    routerInvoked() {
        document.getElementById('load').style.display = 'none';
        document.body.style.backgroundColor = '#eee';
        let bookingDetailsLS = '';
        try{
            bookingDetailsLS = JSON.parse(window.localStorage.bookingDetails);
        }catch(e){
            console.log(' Error in localStorage BookingDetails :: ' + window.localStorage.bookingDetails);
        }
        window.bookingDetails = bookingDetailsLS || bookingDetails;
        this.loginStatus();
    }

    loginStatus() {
        ajaxObj.url = ajaxObj.baseUrl + '/isloggedinnew';
        ajaxObj.type = 'GET';
        ajaxObj.data = '';
        ajaxObj.success = function(data) {
            window.bookingDetails.name = data.name;
            window.bookingDetails.addressList = data.addressList;
        }
        ajaxObj.error = function() {
            window.bookingDetails.name = null;
        }
        $.ajax(ajaxObj);
    }

    showOverlay() {
        document.getElementById('overlay').style.display = 'block';
    }

    hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }
}
