/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import HomeImage from './HomeImage';

export default class Container extends React.Component {
  render() {
    return (
      <div className='col-md-12 col-xs-12 pad0 clearfix'>
        <div className='col-md-4 nomob'></div>
        <HomeImage />
      </div>
    )
  }

  componentDidMount(){

  }
}

