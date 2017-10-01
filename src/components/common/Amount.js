import React from 'react';

export default class Amount extends React.Component {
  render() {
    let {cost, discount} = this.props;
    return (
      <div className = 'col-xs-2 cost pad0'>
        <div className = 'col-xs-12 cost pad0'><i className = 'fa fa-inr'></i> { cost -  (cost * discount/100)}</div>
        {discount ? <div className = 'off'><span>{ cost }</span>{'(' + (discount || 0) +'% off)' }</div> : null}
      </div>
    )
  }
}
