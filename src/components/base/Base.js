/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';

import bookingDetails from '../../../data/constants.json';
import ajaxObj from '../../../data/ajax.json';

export default class Base extends React.Component {
    constructor(props) {
        super(props);
    }

    static sandbox = {
      bookingDetails
    };

    // This method is called every time router is invoked

    static routerInvoked() {
        document.getElementById('load').style.display = 'none';
        let bookingDetailsLS = '';
        try{
            bookingDetailsLS = JSON.parse(window.localStorage.bookingDetails);
        }catch(e){
            console.log(' Error in localStorage BookingDetails :: ' + window.localStorage.bookingDetails);
        }
        Base.sandbox.bookingDetails = bookingDetailsLS || bookingDetails;
        this.loginStatus();
    }

    static loginStatus() {
        ajaxObj.url = ajaxObj.baseUrl + '/isloggedinnew';
        ajaxObj.type = 'GET';
        ajaxObj.data = '';
        ajaxObj.success = function(data) {
            Base.sandbox.bookingDetails.name = data.name;
            Base.sandbox.bookingDetails.addressList = data.addressList;
            Base.sandbox.userDetails = data;
        }
        ajaxObj.error = function() {
            Base.sandbox.bookingDetails.name = null;
            Base.sandbox.userDetails = null;
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

    static clearCart() {
      window.localStorage.clear();
      const {name} = Base.sandbox.bookingDetails;
      Base.sandbox.bookingDetails = bookingDetails;
      Base.sandbox.bookingDetails.name = name;
    }

    static bookingDetailsChanged({id, name, cost, count, operation}) {
      var cost = parseInt(cost);
      if(operation){
        // if operation is addition of services....
        Base.sandbox.bookingDetails.servicesCount += 1;
        Base.sandbox.bookingDetails.subTotal += cost;
        if(Base.sandbox.bookingDetails.services[id]){
          Base.sandbox.bookingDetails.services[id].count += 1;
        } else {
          Base.sandbox.bookingDetails.services[id] = {
            count: 1,
            name: name,
            cost: cost
          }
        }
      } else {
        // If operation is removal of services....
        Base.sandbox.bookingDetails.servicesCount -= 1;
        Base.sandbox.bookingDetails.subTotal -= cost;
        Base.sandbox.bookingDetails.services[id].count -= 1;
        if(Base.sandbox.bookingDetails.services[id].count == 0){
          delete Base.sandbox.bookingDetails.services[id];
        }
      }
    }

    static saveToLocalStorage() {
      let bookingDetails = Base.sandbox.bookingDetails;
      bookingDetails.discount = 0;
      window.localStorage.bookingDetails = JSON.stringify(bookingDetails);
    }

    static navigateTo(to) {
      browserHistory.push(to);
    }
}
