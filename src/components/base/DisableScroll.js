/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';

export default class DisableScroll extends React.Component {

  constructor(props) {
    super(props);
  }

  focusChanged() {
    window.scrollBy(0, 100);
  }

  onBlur() {
    window.scrollBy(0, -100);
  }
}



