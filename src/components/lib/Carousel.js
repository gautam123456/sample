/**
 * Created by gautam on 19/12/16.
 */
import React, {PropTypes} from 'react';
import $ from 'jquery';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startX: 0,
      position: 0,
      current: 0,
      screenWidth: $(window).width() > 992 ? $(window).width()/3 : $(window).width()
    }
  }

  static propTypes = {
    images: PropTypes.array
  }

  componentDidMount() {
    const self = this;
    window.onresize = function() {
      self.setState({screenWidth: $(window).width() > 992 ? $(window).width()/3 : $(window).width()})
    };
  }

  render() {
    const self = this,
      total = this.props.images.length;

    return (
      <div className='carousel width100 pad0'>
        {this.props.images.map(function(image, index){
          return self.renderImage(image, index, total)
        })}
      </div>
    )
  }

  renderImage(image, index, total) {
    return (
      <img key = {index} src = {image} style = {{left: (((index - this.state.current) * this.state.screenWidth) - (this.state.position)) + 'px'}}
           onTouchStart = {this.handleTouchStart.bind(this, index, total)}
           onTouchMove = {this.handleTouchMove.bind(this, index, total)}
           onTouchEnd = {this.handleTouchEnd.bind(this, index, total)}
           onTouchCancel = {this.handleTouchCancel.bind(this, index, total)}
      />
    )
  }

  handleTouchStart(index, total, e) {
    this.state.startX = e.touches[0].clientX;
  }

  handleTouchMove(index, total, e) {
    let touch = e.touches[0],
      change = this.state.startX - touch.clientX,
      current = this.state.current;

    if (current == 0 && change < 0) {
    }else if(current == total - 1 && change > 0) {
    }else {
      this.setState({position: change})
    }
  }

  handleTouchEnd(index, total, e) {
    let touch = e.changedTouches[0],
      change = this.state.startX - touch.clientX,
      {current, position} = this.state;

    if(change > 100) {
      this.setState({current: current == total -1 ? current : current + 1})
    }else if(change < -100) {
      this.setState({current: current == 0 ? current : current - 1})
    }

    this.setState({position: 0})
  }

  handleTouchCancel(index, total, e) {
    console.log('handleTouchCancel');
  }
}
