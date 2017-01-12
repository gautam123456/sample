/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';

export default class Base extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    // This method is called everytime router is invoked

    routerInvoked() {
        document.getElementById('load').style.display = 'none';
        document.getElementById('mySidenav').style.display = 'block';
        document.body.style.backgroundColor = '#fff';
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}
