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
                <div className = 'col-md-12 col-xs-12 error'>
                    <div className = 'error-msg'>
                        404
                        <div className = "error-info">
                            OOps!! Seems like you are lost<br/>
                            Here's a button to take you back to our homepage
                        </div>
                    </div>
                    <Link to = '/'>
                        <button className = 'col-xs-12 col-md-4 col-md-offset-4'>Home</button>
                    </ Link>
                </div>
            </div>
        )
    }
}


