/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <ActivityHeader heading = { 'Log In/Sign Up' }/>
        <div className = 'col-md-offset-4 col-md-4 col-xs-12 address'>

          <input type = 'text' placeholder = 'Enter mobile number' className = 'col-xs-12'></input>

          <button type = 'text' placeholder = 'Landmark' className = 'col-xs-12'> Login / SignUp</button>

        </div>
      </div>
    )
  }

  componentDidMount() {
    document.getElementById('load').style.display = 'none';
    document.getElementById('mySidenav').style.display = 'block';
    document.body.style.backgroundColor = '#fff';
  }
}


