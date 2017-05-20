/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import HomeImage from './HomeImage';
import $ from 'jquery';
import ajaxObj from '../../data/ajax.json';

import data from '../../data/items.json';

export default class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: data
    }
  }

  render() {
    return (
      <div className='col-md-12 col-xs-12 pad0 clearfix'>
        <div className='col-md-4 nomob'></div>
        <HomeImage url = {this.props.url} data = {this.state.data}/>
      </div>
    )
  }

  componentDidMount() {
    let self = this;
    ajaxObj.url = 'https://static.lookplex.com/data/items.json';
    ajaxObj.type = 'GET';
    ajaxObj.data = '';
    ajaxObj.success = function(data) {
      self.setState({data: data})
    }
    $.ajax(ajaxObj);
  }
}

