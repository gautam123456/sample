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
}
