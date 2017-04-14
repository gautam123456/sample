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

    static routerInvoked() {
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

    static loginStatus() {
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

    static showOverlay() {
        document.getElementById('app').style.display = 'none';
        document.getElementById('overlay').style.display = 'block';

    }

    static hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    }

    static hideOverFlow() {
        document.body.style.overflow = 'hidden';
    }

    static addOverFlow() {
      document.body.style.overflow = 'scroll';
    }
}
