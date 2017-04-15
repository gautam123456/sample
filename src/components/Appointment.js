import React from 'react';
import { browserHistory } from 'react-router';

export default class Appointment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailView: false
    }
  }

  handlerDetailView(detailView) {
    this.setState({detailView});
  }

  handleCancel(bookingId) {
    browserHistory.push('cancel?id='+bookingId)
  }

  handleReschedule(bookingId) {
    browserHistory.push('reschedule?id='+bookingId)
  }

  renderMenue(service) {
    return (
      <div className='menu col-xs-12'>
        <div className='col-xs-7'>
          { service.name }<br/>
        </div>
        <div className='col-xs-3' style={{paddingLeft:14}}><i className="fa fa-inr"></i> { service.cost }</div>
        <div className='col-xs-2 center'>
          { service.quantity }
        </div>
      </div>
    )
  }

  renderActionButtons(appointment) {
    return(
      <div className = 'col-xs-12 actionBtn'>
        <div className = 'col-xs-4 col-xs-offset-1' onClick={this.handleCancel.bind(this, appointment.bookingID)}>Cancel</div>
        <div className = 'col-xs-4 col-xs-offset-2' onClick={this.handleReschedule.bind(this, appointment.bookingID)}>Reschedule</div>
      </div>
    )
  }

  renderDetailView(serviceItemListObj, appointment) {
    const self = this;
    return (
      <div>
        <div className='menue'>
          <div className='col-xs-12 header'>
            <div className='col-xs-7 pad0'>
              Service name <br/>
            </div>
            <div className='col-xs-3' style={{paddingLeft:14}}><i className="fa fa-inr"></i>Price</div>
            <div className='col-xs-2 center'>
              Qnty.
            </div>
          </div>
          {serviceItemListObj.map(function(service){
            return (self.renderMenue(service))
          })}
        </div>
        <div className='col-xs-6'>Subtotal : </div><div className='col-xs-6 right'>{appointment.serviceAmountBeforeDiscount}</div>
        <div className='col-xs-6'>Convenience Charge : </div> <div className='col-xs-6 right'>{appointment.conviniencefee || 0}</div>
        <div className='col-xs-6'>Discount : </div><div className='col-xs-6 right'>{appointment.discount || 0} %</div>

        {this.props.ongoing ? this.renderActionButtons(appointment) : ''}

        <div className='col-xs-12 detail' onClick={this.handlerDetailView.bind(this, false)}>Hide Details</div>
      </div>
    )
  }

  render() {
    const appointment = this.props.appointment,
      serviceItemList = appointment.serviceItemListString.replace(/\//g, ''),
      serviceItemListObj = JSON.parse(serviceItemList);

    return (
      <div className = 'col-xs-12 pad0 appointment'>
        <div className = 'col-xs-12'>

          <div className = 'col-xs-12 header'>
            <img className = 'col-xs-2' src='../styles/assets/images/lady.png'/>
            <div className = 'col-xs-10 pad0'><strong>Booking Id : {appointment.bookingID}</strong></div>
            <div className = 'col-xs-6 pad0 date'>{appointment.formattedDate}</div>
            {this.props.ongoing ? <div className = 'col-xs-4 pad0 ongoing pull-right'>REQUEST ONGOING</div> : <div className = 'col-xs-4 pad0 history pull-right'>{this.getLabel(appointment)}</div>}
          </div>

          <div className = 'col-xs-12 body pad0'>
            <div className = 'col-xs-12 add'> <strong> Service Location : </strong> {appointment.customerAddress} </div>
            <div className = 'col-xs-12 add'> <strong> Amount Payable: </strong> {appointment.payAmount} </div>
            {this.state.detailView ? this.renderDetailView(serviceItemListObj, appointment) : ''}
            {!this.state.detailView ? <div className='col-xs-12 detail' onClick={this.handlerDetailView.bind(this, true)}>View Details</div> : ''}
          </div>
        </div>
      </div>
    )
  }

  getLabel(appointment) {
    return appointment.status !== 'cancelled' ? 'REQUEST PROCESSED' : 'REQUEST CANCELLED';
  }
}


