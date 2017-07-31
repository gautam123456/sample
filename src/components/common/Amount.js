import React from 'react';
import Base from '../base/Base';

export default class Amount extends React.Component {
  render() {
    const {sandbox} = Base;

    return (
      <div className = 'col-xs-2 cost pad0'>
        <div className = 'col-xs-12 cost pad0'><i className = 'fa fa-inr'></i> { this.props.cost -  (this.props.cost * sandbox.discount/100)}</div>
        {sandbox.discount ? <div className = 'off'><span>{ this.props.cost }</span>{'(' + (sandbox.discount || 0) +'% Off)' }</div> : null}
      </div>
    )
  }
}
