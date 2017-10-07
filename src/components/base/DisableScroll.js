/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import $ from 'jquery';

export default class DisableScroll extends React.Component {

  focusChanged(e) {
    e.stopPropagation();
    window.scrollBy(0, 100);
  }

  onBlur(e) {
    e.stopPropagation();
    window.scrollBy(0, -100);
  }

  componentDidMount() {
    $("html, body").stop().animate({scrollTop:0}, '500', 'swing');
  }
}



