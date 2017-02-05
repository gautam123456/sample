/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class ActivityFooter extends React.Component {


    render() {
        return (
            <div className='a-footer col-xs-12'>
                  <span className='col-xs-3 pad0 a-f'>
                    <a onClick = { this.pushToPrevious.bind(this) }>
                        <i className='fa fa-arrow-circle-left'></i> &nbsp; Back
                    </a>
                  </span>
                        <span className='col-xs-6'></span>
                  <span className='col-xs-3 pad0 a-f'>
                      <a onClick = { this.pushToNext.bind(this) }>Next &nbsp;
                          <i className='fa fa-arrow-circle-right'></i>
                      </a>
                  </span>
            </div>
        )
    }

    pushToNext() {
        browserHistory.push('/' + this.props.next);
    }

    pushToPrevious() {
        browserHistory.push('/' + this.props.back);
    }
}
