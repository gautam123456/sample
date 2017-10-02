/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import Base from './base/Base';


export default class BookedMenu extends React.Component {
  render() {
    const {list: {cost, name}, discount, count} = this.props;

    return (
      <div className = 'menu col-xs-12 pad0'>
        <div className = 'col-xs-7'>
          { name }<br/>
        </div>
        <div className = 'col-xs-3' style = {{paddingLeft:14}}><i className = "fa fa-inr"></i>{cost - (cost * discount/100)}</div>
        <div className = 'col-xs-2 center'>
          {count === 0 ? '': count}
        </div>
      </div>
    )
  }
}
