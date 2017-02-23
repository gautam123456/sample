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
                    <Link to = { '/' + this.props.back }>
                        <i className='fa fa-arrow-circle-left'></i> &nbsp; Back
                    </Link>
                  </span>
                  <span className='col-xs-6'></span>
                  <span className='col-xs-3 pad0 a-f'>
                      <Link to = { '/' + this.props.next }>Next &nbsp;
                          <i className='fa fa-arrow-circle-right'></i>
                      </Link>
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
