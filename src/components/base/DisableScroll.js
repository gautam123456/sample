/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';

export default class DisableScroll extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'scroll';
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}



