/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';

export default class Drawer extends React.Component {
  render() {
    return (
      <div id='mySidenav' class='sidenav'>
        <div href='javascript:void(0)' class='closebtn' onClick={this.closeDrawer.bind(this)}>&times;</div>
        <a href='#'>About</a>
        <a href='#'>Services</a>
        <a href='#'>Clients</a>
        <a href='#'>Contact</a>
        <span>For any assistance call us on 9971249821</span>
      </div>
    )
  }

  closeDrawer() {
    document.getElementById('mySidenav').style.width = '0';
  }
}

// Need to work on this....Currently this is not being used and direct HTM node is being used as of now... for more look at HTML file...
