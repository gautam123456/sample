/**
 * Created by rgautam on 4/17/17.
 */

import React from 'react';
import Carousel from 'nuka-carousel';

const App = React.createClass({
  mixins: [Carousel.ControllerMixin],

  slidesToScroll: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.oneOf(['auto'])
  ]),

  render() {
    return (
      <Carousel autoplay = {true} autoplayInterval={3000} dragging={true} easing={'easeInQuint'} wrapAround={'true'}>
        <img src = '../../styles/assets/images/1.jpg' height = '250px'/>
        <img src = '../../styles/assets/images/2.jpg' height = '250px'/>
        <img src = '../../styles/assets/images/3.jpg' height = '250px'/>
        <img src = '../../styles/assets/images/4.jpg' height = '250px'/>
      </Carousel>
    )
  }
});

module.exports = App;
