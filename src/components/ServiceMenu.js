/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';

export default class ServiceMenu extends React.Component {
  render() {
    return (
      <div className = 'menu full-width'>
        <div className = 'col-xs-7'>

          { this.props.list.name }<br/>
          { this.props.list.condition ? this.renderCondition() : '' }
          { this.props.list.information ? this.renderInformation() : '' }

        </div>
        <div className = 'col-xs-2 cost'> &nbsp; <i className = 'fa fa-inr'></i> { this.props.list.cost }</div>
        <div className = 'col-xs-1 center'>

          { this.props.count > 0 ? <i className = 'fa fa-minus-circle fa-2x' onClick = { this.props.bookingDetailsChanged.bind(this, this.props.id, this.props.list.name, this.props.list.cost, this.props.count, 0) }></i> : '' }

        </div>
        <div className = 'col-xs-1 center'>

          { this.props.count === 0 ? '': this.props.count }

        </div>
        <div className = 'col-xs-1 center'>
        <i className = 'fa fa-plus-circle fa-2x' onClick = { this.props.bookingDetailsChanged.bind(this, this.props.id, this.props.list.name, this.props.list.cost, this.props.count, 1) }></i>
        </div>
      </div>
    )
  }

  renderInformation() {
    return (
        <div style={{display: 'inline'}}>
          <i className = 'fa fa-info-circle margin5' onClick = {this.renderModal.bind(this, this.props.list)}></i>
        </div>
    )
  }

  renderModal(data) {
    this.props.renderModal(data, 'block')
  }

  renderCondition() {
    return (
        <span className = 'brand'> ({ this.props.list.condition }) </span>
    )
  }
}
