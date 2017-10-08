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

  renderMenue({cost, quantity, name}) {
    return (
      <div className='menu col-xs-12'>
        <div className='col-xs-7'>
          { name }<br/>
        </div>
        <div className='col-xs-3' style={{paddingLeft:14}}><i className="fa fa-inr"></i> { cost }</div>
        <div className='col-xs-2 center'>
          { quantity }
        </div>
      </div>
    )
  }

  renderActionButtons({bookingID}) {
    return(
      <div className = 'col-xs-12 actionBtn'>
        <div className = 'col-xs-4 col-xs-offset-1 cli' onClick={this.handleCancel.bind(this, bookingID)}>Cancel</div>
        <div className = 'col-xs-4 col-xs-offset-2 cli' onClick={this.handleReschedule.bind(this, bookingID)}>Reschedule</div>
      </div>
    )
  }

  renderDetailView(serviceItemListObj, appointment) {
    const {serviceAmountBeforeDiscount, refDiscount, discount, adjustment, payAmount, ajustmentDescription} = appointment;
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
            return (this.renderMenue(service))
          }, this)}
        </div>
        <div className='col-xs-8'>Subtotal : </div><div className='col-xs-4 right'>{serviceAmountBeforeDiscount}</div>
        <div className='col-xs-8 '>Referral Discount : </div> <div className='col-xs-4 right'>{refDiscount || 0}</div>
        <div className='col-xs-8'>Discount : </div><div className='col-xs-4 right'>{discount || 0} %</div>
        <div className='col-xs-8'>{ajustmentDescription} : </div><div className='col-xs-4 right'>{adjustment || 0}</div>
        <strong><div className='col-xs-8'>Amount Payable : </div><div className='col-xs-4 right'>{payAmount}</div></strong>

        {this.props.ongoing ? this.renderActionButtons(appointment) : ''}

        <div className='col-xs-12 detail cli' onClick={this.handlerDetailView.bind(this, false)}>Hide Details</div>
      </div>
    )
  }

  render() {
    const {appointment: {formattedDate, bookingID, customerAddress, payAmount}, ongoing, appointment} = this.props,
      serviceItemList = appointment.serviceItemListString.replace(/\//g, ''),
      serviceItemListObj = JSON.parse(serviceItemList),
      {detailView} = this.state;

    return (
      <div className = 'col-xs-12 pad0 appointment'>
        <div className = 'col-xs-12'>

          <div className = 'col-xs-12 header'>
            <img className = 'col-xs-2' src='../styles/assets/images/lady.png'/>
            <div className = 'col-xs-10 pad0'><strong>Booking Id : {bookingID}</strong></div>
            <div className = 'col-xs-6 pad0 date'>{formattedDate}</div>
            {ongoing ? <div className = 'col-xs-4 pad0 ongoing pull-right'>REQUEST UPCOMING</div> : <div className = 'col-xs-4 pad0 history pull-right'>{this.getLabel(appointment)}</div>}
          </div>

          <div className = 'col-xs-12 body pad0'>
            <div className = 'col-xs-12 add'> <strong> Service Location : </strong> {customerAddress} </div>
            <div className = 'col-xs-12 add'> <strong> Amount Payable : </strong> {payAmount} </div>
            {detailView ? this.renderDetailView(serviceItemListObj, appointment) : ''}
            {!detailView ? <div className='col-xs-12 detail cli' onClick={this.handlerDetailView.bind(this, true)}>View Details</div> : ''}
          </div>
        </div>
      </div>
    )
  }

  getLabel(appointment) {
    return appointment.status !== 'cancelled' ? 'REQUEST PROCESSED' : 'REQUEST CANCELLED';
  }
}


