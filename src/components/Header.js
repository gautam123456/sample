/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import MenueOptions from './MenueOptions';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width:{width:0}
    }
  }

  render() {
    return (
      <header className='full-width header h'>
        <div className='hlg'>
          <div className='col-xs-10' style={{height: 30, paddingLeft: 8}} onClick={this.navigateTo.bind(this)}>
            {this.props.showNav ? <i className='fa fa-long-arrow-left'></i> : null}
          </div>
          <div className='col-xs-1 full-height menue pull-right' onClick={this.openDrawer.bind(this)}><i className='fa fa-ellipsis-v fa-lg w'></i></div>
        </div>

        <div id='mySidenav' className='sidenav' style = { this.state.width }>
          <div className='closebtn' onClick = { this.closeDrawer.bind(this) }>&times;</div>
          <MenueOptions closeDrawer={this.closeDrawer.bind(this)}/>
          <div className="contact col-xs-12 pad0">
            <a href="tel:918826755766"><i className = "fa fa-phone"></i></a>
            <span>Tap call or Whatsapp on +918826755766 for assistance.</span>
          </div>
        </div>

      </header>
    )
  }

  navigateTo() {
    browserHistory.push('');
  }

  openDrawer() {
    const self = this,
      target = document.getElementById('grey-overlay')

    self.setState({width:{width:250}});
    target.className = 'grey-overlay';

    $('.grey-overlay').on('click', function(){
      self.setState({width:{width:0}});
      target.className = '';
    })
  }

  closeDrawer() {
    this.setState({width:{width:0}});
    document.getElementById('grey-overlay').className = '';
  }
}

