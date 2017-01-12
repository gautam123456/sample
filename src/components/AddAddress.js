/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';

export default class AddAddress extends React.Component {
  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Add new Address' }/>

        <div className = 'margin100'>  </div>
        <ActivityFooter next = { 'address' } back = { 'address' }/>
      </div>
    )
  }
}


