/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';

export default class ActivityFooter extends React.Component {

  render() {
        return (
            <div className='a-footer col-xs-12'>
              <span className='col-xs-3 pad0 a-f'>
                {this.props.back ? <span onClick={this.props.back}>
                    <i className='fa fa-arrow-circle-left'></i> &nbsp; Back
                </span> : ''}
              </span>
              <span className='col-xs-6'></span>
              <span className='col-xs-3 pad0 a-f'>
                {this.props.next ? <span onClick={this.props.next}>Next &nbsp;
                  <i className='fa fa-arrow-circle-right'></i>
                  </span> : ''}
              </span>
            </div>
        )
    }
}
