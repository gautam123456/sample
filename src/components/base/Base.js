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
        document.getElementById('mySidenav').style.display = 'block';
        document.body.style.backgroundColor = '#fff';
        let bookingDetailsLS = {};
        try{
            bookingDetailsLS = JSON.parse(window.localStorage.bookingDetails);
        }catch(e){
            console.log('Error in localStorage BookingDetails : ' + window.localStorage.bookingDetails);
        }
        window.bookingDetails = bookingDetailsLS || bookingDetails;
        this.loginStatus();
    }

    loginStatus() {
        ajaxObj.url = ajaxObj.baseUrl + '/isloggedinnew';
        ajaxObj.type = 'GET';
        ajaxObj.success = function(data) {
            window.bookingDetails.hashIndex = data.hashIndex;
            window.bookingDetails.addressList = data.addressList;
        }
        $.ajax(ajaxObj);
    }
}
