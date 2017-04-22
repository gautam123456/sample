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
      <Carousel autoplayInterval={3000} dragging={true} easing={'easeOutBack'} wrapAround={'true'}>
        <img src = '../../styles/assets/images/1con.jpg' height = '250px'/>
        <img src = '../../styles/assets/images/2con.jpg' height = '250px'/>
        <img src = '../../styles/assets/images/3con.jpg' height = '250px'/>
      </Carousel>
    )
  }
});

module.exports = App;
