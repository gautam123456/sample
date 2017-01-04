/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';

export default class FullCart extends React.Component {
  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Booking Cart' }/>
        <ActivityFooter />
      </div>
    )
  }

  componentDidMount() {
    document.getElementById('load').style.display = 'none';
    document.getElementById('mySidenav').style.display = 'block';
    document.body.style.backgroundColor = '#fff';
  }
}


