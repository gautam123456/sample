/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import { Link } from 'react-router';

export default class ActivityHeader extends React.Component {
  render() {
    const fixed = {
      position: 'fixed',
      zIndex: 3
    };

    return (
      <header className='header width100' style={this.props.fixed ? fixed : null}>
        <div className='a-header'>
          <span className='col-xs-10 col-xs-offset-1'>{ this.props.heading }</span>
          <span className='col-xs-1'>
            <Link to = { '/' }>
              &#215;
            </Link>
          </span>
        </div>
      </header>
    )
  }
}


