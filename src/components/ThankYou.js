/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import BookedMenu from './BookedMenu';
import Cart from './Cart';


export default class BookedServicesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookedItemList: window.bookingDetails,
      discount: 0,
      questionShow: {display: 'block'},
      applySectionShow: {display: 'none'},
      errormsg: {display: 'none'}
    }
  }

  render() {
    const then = this,
      objKeys = Object.keys(this.state.bookedItemList.services),
      margin = { marginBottom: 60},
      padding = { paddingTop: 8};
    return (
      <div className = 'col-md-offset-4 col-md-4'>

        <div className = 'col-xs-12 summary pad0'>
          <div className = 'col-xs-12'>
            <div className = 'col-xs-8'> Total </div>
            <div className = 'col-xs-4' style = { padding }> <i className = "fa fa-inr"></i> { this.state.bookedItemList.convenienceCharges + this.state.bookedItemList.subTotal - (this.state.discount * this.state.bookedItemList.subTotal / 100) } </div>
          </div>
          <div className = 'col-xs-12'>
            <div className = 'col-xs-8'> Discount </div>
            <div className = 'col-xs-4' style = { padding }> - <i className = "fa fa-inr"></i> { this.state.discount * this.state.bookedItemList.subTotal / 100 } </div>
          </div>
          <div className = 'col-xs-12'>
            <div className = 'col-xs-8'> Sub Total </div>
            <div className = 'col-xs-4' style = { padding }> <i className = "fa fa-inr"></i> { this.state.bookedItemList.subTotal } </div>
          </div>
          <div className = 'col-xs-12'>
            <div className = 'col-xs-8'> Convenience Charges </div>
            <div className = 'col-xs-4' style = { padding }> + <i className = "fa fa-inr"></i> { this.state.bookedItemList.convenienceCharges } </div>
          </div>
          <div className = 'col-xs-12'>
          </div>
        </div>
        <div className = 'col-xs-12' style = { margin }>
          <header className = 's-heading full-width'>
          <div className = 'col-xs-12 pad0'>
            <div className = 'col-xs-7 pad0'>
              { 'Service Name' }<br/>
            </div>
            <div className = 'col-xs-2'>{ 'Price' }</div>
            <div className = 'col-xs-1 center'>

            </div>
            <div className = 'col-xs-1 center'>
              { 'No.' }
            </div>
            <div className = 'col-xs-1 center'>

            </div>
          </div>
          </header>
          {
            objKeys.map( function(key) {
              return <BookedMenu list = {then.state.bookedItemList.services[key]} count = { then.state.bookedItemList.services[key] ? then.state.bookedItemList.services[key].count : 0 }/>
            })
          }
        </div>
      </div>
    )
  }
}
