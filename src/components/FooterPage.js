/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ActivityFooter from './ActivityFooter';
import $ from 'jquery';
import ajaxObj from '../../data/ajax.json';
import Base from './base/Base';

export default class FullCart extends React.Component {

    constructor(props) {
        super(props);
        let title = this.props.location.pathname.split('/')[1].split('-')
        this.state = {
          title: title.join(' '),
          data: '',
          pgTitle: ''
        }
    }

    componentDidMount() {
        Base.showOverlay();
        const self = this;
        ajaxObj.url = 'https://static.lookplex.com/data' + this.props.location.pathname + '.json';
        ajaxObj.type = 'GET';
        ajaxObj.data = '';
        ajaxObj.xhrFields = { "withCredentials": false }
        ajaxObj.success = function(response) {
          self.setState({data: response.data, pgTitle: response.title});
          Base.hideOverlay();
        }
        ajaxObj.error = function() {
          Base.sandbox.bookingDetails.name = null;
        }
        $.ajax(ajaxObj);
    }

    renderData() {
        return (
            <div dangerouslySetInnerHTML={{__html: this.state.data }} />
        )
    }

    render() {
        return (
            <div>
                <ActivityHeader heading = { this.state.pgTitle }/>
                    <div className = 'col-md-offset-4 col-xs-12 col-md-4 footerpages'>
                        { this.renderData() }
                    </div>
            </div>
        )
    }
}
