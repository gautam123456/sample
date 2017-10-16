/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import BookedMenu from './BookedMenu';
import ajaxObj from '../../data/ajax.json';
import $ from 'jquery';
import Base from './base/Base';
import Coupons from './common/Coupons';
import {couponApplied} from '../actions';
import {connect} from 'react-redux';

class ConfirmationList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const then = this,
           {bookingDetails: {services, discount, complementaryOffer, total, subTotal}, userDetails : {details}} = this.props,
            refCount = details ? details.refCount : 0,
            objKeys = Object.keys(services),
            margin = { marginBottom: 60 },
            padding = { paddingTop: 8 },
            refDiscount = refCount ? 200 : 0;

        return (
            <div className = 'col-md-offset-4 col-md-4 pad0'>
                <div className = 'col-xs-12 summary pad0 rr'>
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-8'> Sub Total </div>
                        <div className = 'col-xs-4' style = { padding }> <i className = 'fa fa-inr'></i> { subTotal } </div>
                    </div>
                    <div className = 'col-xs-12'>
                      <div className = 'col-xs-8'> Referral Discount </div>
                      <div className = 'col-xs-4'> - <i className = "fa fa-inr"></i> { parseFloat(refDiscount).toFixed(2) } </div>
                    </div>
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-8'> Discount ({discount}%)</div>
                        <div className = 'col-xs-4' style = { padding }> - <i className = 'fa fa-inr'></i> { parseFloat(discount * (subTotal - refDiscount)  / 100).toFixed(2) }</div>
                    </div>
                    {complementaryOffer ?
                    <div className='col-xs-12' style={{border: '1px dashed #999', fontWeight: 200}}>
                      <div className = 'col-xs-6'>Complimentary Offer</div>
                      <div className = 'col-xs-6' style={{textAlign: 'right', paddingRight: 10}}>{complementaryOffer}</div>
                    </div>: null}
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-8'> Total </div>
                        <div className = 'col-xs-4' style = { padding }> <i className = 'fa fa-inr'></i> { parseFloat((subTotal - refDiscount) - (discount * (subTotal - refDiscount)  / 100)).toFixed(2) } </div>
                    </div>
                </div>
                <Coupons showNotification={this.props.showNotification} />
                <div className = 'col-xs-12 pad0' style = { margin }>
                    <header className = 's-heading full-width'>
                        <div className = 'col-xs-12 pad0'>
                            <div className = 'col-xs-7 pad0'>
                                { 'Service Name' }<br/>
                            </div>
                            <div className = 'col-xs-3'>{ 'Price' }</div>
                            <div className = 'col-xs-2 center'>
                                { 'Qty' }
                            </div>
                        </div>
                    </header>
                    {complementaryOffer ?
                    <div className='cm-offers'>
                      {complementaryOffer}
                    </div>: null}
                    {
                        objKeys.map( function(key) {
                            return <BookedMenu key={key} list = {services[key]} count = { services[key] ? services[key].count : 0 } discount={discount}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails,
    bookingDetails: state.bookingDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    couponApplied: (data) => {
      dispatch(couponApplied(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationList);
