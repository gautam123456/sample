/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { Link } from 'react-router';

export default class ActivityFooter extends React.Component {
    render() {
        return (
            <footer className='a-footer col-xs-12'>
          <span className='col-xs-3 pad0'>
            <Link to = { '/'+this.props.back }>
                <i className="fa fa-arrow-circle-left"></i> &nbsp; Back
            </Link>
          </span>
                <span className='col-xs-6'></span>
          <span className='col-xs-3 pad0'>
              <Link to = { '/'+this.props.next }>Next &nbsp;
                  <i className="fa fa-arrow-circle-right"></i>
              </Link>
          </span>
            </footer>
        )
    }
}
