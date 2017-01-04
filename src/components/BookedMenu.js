/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import Cart from './Cart';

export default class BookedMenu extends React.Component {
  render() {
    return (
      <div className = 'menu col-xs-12'>
        <div className = 'col-xs-7'>
          { this.props.list.name }<br/>
        </div>
        <div className = 'col-xs-2'> &nbsp; <i className = "fa fa-inr"></i>{ this.props.list.cost }</div>
        <div className = 'col-xs-1 center'>

        </div>
        <div className = 'col-xs-1 center'>
          { this.props.count === 0 ? '': this.props.count }
        </div>
        <div className = 'col-xs-1 center'>

        </div>
      </div>
    )
  }
}
