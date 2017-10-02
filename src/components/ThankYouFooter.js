/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import {browserHistory} from 'react-router';

export default class ThankYouFooter extends React.Component {
  render() {
    return (
      <footer className='a-footer col-xs-12 pad0' onClick={this.reload}>
          <span className='col-xs-12' style = {{color: '#fff'}}>
            Thank you for booking with Lookplex!
          </span>
      </footer>
    )
  }

  reload = () => {
    browserHistory.push('');
  }
}
