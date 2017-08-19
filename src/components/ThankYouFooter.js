/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';

export default class ThankYouFooter extends React.Component {
  render() {
    return (
      <footer className='a-footer col-xs-12 pad0' onClick={this.reload.bind(this)}>
          <span className='col-xs-12' style = {{color: '#fff'}}>
            Thank you for booking with Lookplex!
          </span>
      </footer>
    )
  }

  reload() {
    window.location.assign(location.origin);
  }
}
