/**
 * Created by rgautam on 4/17/17.
 */

import React from 'react';
import Carousel from 'nuka-carousel';

const App = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <Carousel>
        <img src="../../styles/assets/images/1.jpg"/>
        <img src="../../styles/assets/images/2.jpg"/>
        <img src="../../styles/assets/images/3.jpg"/>
        <img src="../../styles/assets/images/4.jpg"/>
      </Carousel>
    )
  }
});

module.exports = App;
