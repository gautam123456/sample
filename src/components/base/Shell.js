import React from 'react';
import { browserHistory, Link } from 'react-router';
import $ from 'jquery';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: '',
      error: ''
    }
  }

  render() {
    const self = this;
    return (
      <div className='shell col-md-4 col-xs-12 col-md-offset-4'>
        <div className='shell-in'>
          <header className='head'>
            <div className='col-xs-12 icons'>
              <span className='col-xs-1 pull-right'>
                <Link to = { '/' }>
                  <i className='fa fa-times fa-lg'></i>
                </Link>
              </span>
              <span className='col-xs-1 pull-right'>
                <Link to = { '/' }>
                  <i className='fa fa-shopping-cart fa-lg'></i>
                </Link>
              </span>
            </div>
            <div className='col-xs-12'></div>
          </header>
          <div className='body'>

          </div>
        </div>
        <footer></footer>
      </div>
    )
  }
}


