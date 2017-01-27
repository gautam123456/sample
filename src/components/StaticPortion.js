/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';

export default class StaticPortion extends React.Component {
  render() {
    return (
      <div className='advantage clearfix'>
        <div className='text-center bb'><b>LOOK</b>PLEX Advantage</div>
        <div className='col-xs-6 col-md-6 text-center'>
          <div className='clearfix'>
            <i className='fa fa-shield fa-2x'></i>
          </div>
          <h5 className='f12'>Trusted Professionals</h5>
        </div>
        <div className='col-xs-6 col-md-6 text-center'>
          <div className='clearfix'>
            <i className='fa fa-briefcase  fa-2x'></i>
          </div>
          <h5 className='f12'>Branded Products</h5>
        </div>
        <div className='col-xs-6 col-md-6 text-center'>
          <div className='clearfix'>
            <i className='fa fa-heartbeat fa-2x'></i>
          </div>
          <h5 className='f12'>Satisfaction Guaranteed</h5>
        </div>
        <div className='col-xs-6 col-md-6 text-center'>
          <div className='clearfix'>
            <i className='fa fa-money fa-2x'></i>
          </div>
          <h5 className='f12'>Reasonable Price</h5>
        </div>
      </div>
    )
  }
}
