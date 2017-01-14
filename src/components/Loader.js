import React from 'react';
import Header from './Header';

export default class Loader extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <div className = 'col-md-12 col-xs-12 bg-loader'>
                    <div className = "loader">
                    </div>
                </div>
            </div>
        )
    }
}


