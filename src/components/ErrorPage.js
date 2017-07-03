/**
 * Created by rgautam on 1/13/17.
 */
import React from 'react';
import { Link } from 'react-router';
import Header from './Header';

export default class ErrorPage extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className = 'col-md-12 col-xs-12'>
                  <img src="../styles/assets/images/404.gif" style={{width:'100%', margin:'20px 0'}} alt=''/>

                    <Link to = '/'>
                        <button className = 'col-xs-6 col-xs-offset-3 col-md-2 col-md-offset-5'>Back to home page</button>
                    </ Link>
                </div>
            </div>
        )
    }
}


