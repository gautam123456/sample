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
        window.bookingDetails = bookingDetailsLS || bookingDetails;
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

          //TODO Remove
            window.bookingDetails.name = data.name;
            window.bookingDetails.addressList = data.addressList;
            window.userDetails = data;
        }
        ajaxObj.error = function() {
            Base.sandbox.bookingDetails.name = null;
            Base.sandbox.userDetails = null;

          //TODO Remove
            window.bookingDetails.name = null;
            window.userDetails = null;
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

      //TODO Remove
      const {name} = window.bookingDetails;
      window.bookingDetails = bookingDetails;
      window.bookingDetails.name = name;

      const {name2} = Base.sandbox.bookingDetails;
      Base.sandbox.bookingDetails = bookingDetails;
      Base.sandbox.bookingDetails.name = name2;



      //TODO Remove
      //window.bookingDetails = {
      //  "minBooking": 800,
      //  "convenienceCharges": 0,
      //  "subTotal": 0,
      //  "servicesCount": 0,
      //  "discount": 0,
      //  "couponcode": "",
      //  "location": "Delhi",
      //  "addresslkey": "",
      //  "services": {},
      //  "otp": "",
      //  "hashIndex": "",
      //  "addressList": "",
      //  "date": "",
      //  "timing": "",
      //  "name": name,
      //  "mailId": "",
      //  "total": 0
      //};
    }

    static bookingDetailsChanged({id, name, cost, count, operation}) {

        var cost = parseInt(cost);
        if(operation){
    // if operation is addition of services....
          window.bookingDetails.servicesCount += 1;
          window.bookingDetails.subTotal += cost;
          if(window.bookingDetails.services[id]){
            window.bookingDetails.services[id].count += 1;
          } else {
            window.bookingDetails.services[id] = {
              count: 1,
              name: name,
              cost: cost
            }
          }
        } else {
    // If operation is removal of services....
          window.bookingDetails.servicesCount -= 1;
          window.bookingDetails.subTotal -= cost;
          window.bookingDetails.services[id].count -= 1;
          if(window.bookingDetails.services[id].count == 0){
            delete window.bookingDetails.services[id];
          }
        }
    }
}
