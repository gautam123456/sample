/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import $ from 'jquery';

import ajaxObj from '../../data/ajax.json';

export default class FullCart extends React.Component {

    constructor(props) {
        super(props);
        let title = this.props.location.pathname.split('/')[1].split('-')
        this.state = {
            title: title.join(' '),
            data: ''
        }
    }

    getData(path) {
        const self = this;
        fetch('https://static.lookplex.com/data'+ path +'.html')
            .then(function(response) {
                return response;
            });

    }

    renderData() {
        const data = this.getData(this.props.location.pathname);
        return (
            <div dangerouslySetInnerHTML={{__html: data }} />
        )
    }

    render() {
        return (
            <div>
                <ActivityHeader heading = { this.state.title }/>
                    <div className = 'col-md-offset-4 col-xs-12 col-md-4'>
                        { this.renderData() }
                    </div>
                <ActivityFooter next = { '/' } back = { '/' }/>
            </div>
        )
    }
}
