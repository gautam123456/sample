/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class ActivityFooter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notification: false,
            info: this.props.info
        }
    }

    renderNotification() {
        let classs = `col-xs-10 col-md-4 col-md-offset-4 top-msg error`;
        return (
            <header className = { classs } style = { this.state.notification ? {display: 'block'} : {display: 'none'}}>
                <div>
                    <span >{ this.props.info }</span>
                    <span className = 'pull-right' onClick = { this.hideMsg.bind(this) }><i className = 'fa fa-times'></i></span>
                </div>
            </header>
        )
    }

    hideMsg() {
        this.setState({ notification: false });
    }

    render() {
        return (
            <div className='a-footer col-xs-12'>
                { this.renderNotification() }
                  <span className='col-xs-3 pad0 a-f'>
                    <a onClick = { this.pushToPrevious.bind(this) }>
                        <i className='fa fa-arrow-circle-left'></i> &nbsp; Back
                    </a>
                  </span>
                        <span className='col-xs-6'></span>
                  <span className='col-xs-3 pad0 a-f'>
                      <a onClick = { this.pushToNext.bind(this) }>Next &nbsp;
                          <i className='fa fa-arrow-circle-right'></i>
                          <div className='tooltip'>
                              <span className='tooltiptext'> { this.props.msg } </span>
                          </div>
                      </a>
                  </span>
            </div>
        )
    }

    pushToNext() {
        console.log(this.props.next.substr(0,5))
        if(parseInt(window.bookingDetails.subTotal) < parseInt(window.bookingDetails.minBooking)){
            this.setState({ notification: true})
        }else if( !(this.props.address) && this.props.next == ''){
            this.setState({ notification: true})
        }else if( !(this.props.detail) && this.props.next == ''){
            this.setState({ notification: true})
        }else{
            if(this.props.next == ''){

            }else{
                browserHistory.push('/' + this.props.next);
            }
        }
    }

    pushToPrevious() {
        browserHistory.push('/' + this.props.back);
    }
}
