/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';


export default class BookedMenu extends React.Component {
  render() {
    return (
      <div className = 'menu col-xs-12 pad0'>
        <div className = 'col-xs-7'>
          { this.props.list.name }<br/>
        </div>
        <div className = 'col-xs-3' style = {{paddingLeft:14}}><i className = "fa fa-inr"></i>{ this.props.list.cost - (this.props.list.cost * window.bookingDetails.discount/100) }</div>
        <div className = 'col-xs-2 center'>
          { this.props.count === 0 ? '': this.props.count }
        </div>
      </div>
    )
  }
}
