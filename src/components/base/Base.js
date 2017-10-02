/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import ajaxObj from '../../../data/ajax.json';

export default class Base extends React.Component {

    static sandbox = {};

    componentDidMount() {
      window.onresize = function () {
        Base.screenWidth = $(window).width() > 992 ? $(window).width() / 3 : $(window).width();
      };
    }

    // This method is called every time router is invoked
    static routerInvoked() {
        document.getElementById('load').style.display = 'none';
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

    static navigateTo(to) {
      browserHistory.push(to);
    }

    // To track events to google
    static logEvent(eventCategory, eventAction, eventLabel) {
      if(window.location.origin == 'https://lookplex.com'){
        ga('send', 'event', eventCategory, eventAction, eventLabel);
      }
    }

    // To track evnts to facebook
    static track(type, activity, data) {
      if (window.location.origin === 'https://lookplex.com') {
        fbq(type, activity, data);
      }
    }
}


