/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';

import data from '../../data/items.json';

export default class StaticPortion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='static-portion'>
        <div className='description'>
          <img src="../styles/assets/images/bg.png" height="112" width="112" alt=""/>
          <h3>{data.serviceList[this.props.active].serviceDescriptionHeading}</h3>
          <div className='desc' dangerouslySetInnerHTML={{__html: data.serviceList[this.props.active].serviceDescription}}></div>
        </div>
        <div className='desc-bottom'></div>
        <div className='advantage clearfix'>
          <div className='header'><b>LOOK</b>PLEX Advantage</div>
          <div className = 'col-xs-12 pad0 flex'>
            <div>
              <i className='fa fa-shield fa-2x'></i>
              <h5 className='f12'>Trusted Professionals</h5>
            </div>
            <div>
              <i className='fa fa-briefcase  fa-2x'></i>
              <h5 className='f12'>Branded Products</h5>
            </div>
            <div>
              <i className='fa fa-heartbeat fa-2x'></i>
              <h5 className='f12'>Satisfaction Guaranteed</h5>
            </div>
            <div>
              <i className='fa fa-money fa-2x'></i>
              <h5 className='f12'>Reasonable Price</h5>
            </div>
          </div>
        </div>
        <div className='desc-bottom d'>
          <div className='col-xs-6 col-md-6'></div>
          <div className='col-xs-6 col-md-6'></div>
        </div>
      </div>
    )
  }
}
