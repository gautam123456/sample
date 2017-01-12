/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import HomeImage from './HomeImage';
import StaticPortion from './StaticPortion';
import $ from 'jquery';

export default class Container extends React.Component {
  render() {
    return (
      <div className='col-md-12 col-xs-12 pad0 clearfix'>
        <div className='col-md-4 nomob'></div>
        <HomeImage />
      </div>
    )
  }

  componentDidMount(){
    $.ajax({
      url: 'https://storeapi.lookplex.com/wsv1/masnepservice/isloggedinnew',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      contentType: 'application/x-www-form-urlencoded',
      success: function(data) {
        console.log(data + "::" + JSON.stringify(data));
      },
      type: 'GET'
    });
  }
}

