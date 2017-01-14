/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className='full-width header'>
        <div className='hlg'>
          <div className='col-xs-1 full-height menue pull-right' onClick={this.openDrawer.bind(this)}><i className='fa fa-ellipsis-v fa-lg w'></i></div>
        </div>
      </header>
    )
  }

  openDrawer() {
    document.getElementById('mySidenav').style.width = '250px';
  }
}

