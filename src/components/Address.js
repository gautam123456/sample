/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';

export default class Address extends React.Component {
  render() {

    const dropStyle = {
      height: 40
    }

    return (
      <div>
        <ActivityHeader heading = { 'Provide Address' }/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>
          <select className = 'col-xs-12' style = { dropStyle }>
            <option value = 'Delhi'>Delhi </option>
            <option value = 'Noida'>Noida </option>
            <option value = 'Gurgaon'>Gurgaon </option>
          </select>

          <input type = 'text' placeholder = 'Enter complete address' className = 'col-xs-12'></input>

          <input type = 'text' placeholder = 'Landmark' className = 'col-xs-12'></input>

        </div>

        <ActivityFooter next = { 'order/confirm' } back = { 'book' }/>
      </div>
    )
  }

  componentDidMount() {
    document.getElementById('load').style.display = 'none';
    document.getElementById('mySidenav').style.display = 'block';
    document.body.style.backgroundColor = '#fff';
  }
}

