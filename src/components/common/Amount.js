import React from 'react';
import Base from '../base/Base';

export default class Amount extends React.Component {
  render() {
    const {offerbox} = Base;

    return (
      <div className = 'col-xs-2 cost pad0'>
        <div className = 'col-xs-12 cost pad0'><i className = 'fa fa-inr'></i> { this.props.cost -  (this.props.cost * offerbox.discount/100)}</div>
        {offerbox.discount ? <div className = 'off'><span>{ this.props.cost }</span>{'(' + (offerbox.discount || 0) +'% off)' }</div> : null}
      </div>
    )
  }
}
