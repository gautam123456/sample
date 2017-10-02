/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { Link } from 'react-router';

export default class ActivityHeader extends React.Component {
  render() {
    const {fixed, heading} = this.props;

    return (
      <header className='header width100' style={fixed ? {position: 'fixed',zIndex: 3} : null}>
        <div className='a-header'>
          <span className='col-xs-10 col-xs-offset-1'>{heading}</span>
          <span className='col-xs-1'>
              <Link to={ '/' }>
                &#215;
              </Link>
          </span>
        </div>
      </header>
    )
  }
}


