/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';

export default class Search extends React.Component {
  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Search Results' }/>
      </div>
    )
  }
}

