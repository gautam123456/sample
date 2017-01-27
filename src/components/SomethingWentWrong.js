import React from 'react';
import { Link } from 'react-router';
import Header from './Header';

export default class SomethingWentWrong extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className = 'col-md-4 col-xs-12 col-md-offset-4 server-error'>

                    <div><i className = 'fa fa-cogs fa-5x'></i></div>
                    <div className = 'error-msg'>
                        We are experiencing issues with our server <br/>
                        But no worries, we are fixing it now.
                    </div>

                    <div className = 'error-msg'>
                        We recommend you to call us directly and book services by tapping on below button.
                    </div>
                    <a href="tel:09811870670">
                        <button className = 'col-xs-10 col-xs-offset-1 call'> <i className = 'fa fa-phone'></i> 09811870670 </button>
                    </a>

                    <Link to = '/'>
                        <button className = 'col-xs-10 col-xs-offset-1 home'>Back to Home</button>
                    </ Link>
                </div>
            </div>
        )
    }
}


