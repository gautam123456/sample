/**
 * Created by gautam on 19/12/16.
 */
import React, {PropTypes} from 'react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    images: PropTypes.array
  }

  render() {
    const self = this;
    return (
      <div className='carousel width100 pad0'>
        {this.props.images.map(function(image, index){
          return self.renderImage(image, index)
        })}
      </div>
    )
  }

  renderImage(image, index) {
    return (
      <img src = {image} style = {{left: index * 100 + '%'}}/>
    )
  }
}
