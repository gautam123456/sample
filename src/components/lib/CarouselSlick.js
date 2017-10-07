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
    images: PropTypes.array,
    showArrow: PropTypes.bool
  }

  componentWillReceiveProps(nextProps) {
    this.setState({screenWidth: nextProps.screenWidth > 992 ? nextProps.screenWidth/3 : nextProps.screenWidth});
  }

  componentDidMount() {

    //window.onresize = function() {
    //  self.setState({screenWidth: $(window).width() > 992 ? $(window).width()/3 : $(window).width()})
    //};

    const {props: {autoPlay, images}, state: {current}} = this;

    if(autoPlay) {
      this.interval = setInterval(() => {
        if(current != images.length - 1){
          this.handleTransition(current + 1);
        } else {
          this.handleTransition(0);
        }
      }, 5000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {images: {length}, images, showArrow} = this.props,
      {current, position, screenWidth} = this.state,
      strTrnsfrm = `translate3d(${-(position + (current * screenWidth))}px, 0px, 0px)`,
      style = {
          transform: strTrnsfrm,
          moztransform: strTrnsfrm,
          WebkitTransform: strTrnsfrm,
          msTransform: strTrnsfrm,
          OTransform: strTrnsfrm,
          transition: 'transform 300ms ease, opacity 300ms ease',
          WebkitTransition: 'transform 300ms ease, opacity 300ms ease',
          msTransition: 'transform 300ms ease, opacity 300ms ease',
          width: length * screenWidth + 'px'
      };

    return (
      <div className="carousel-container">
        <div className='carousel width100 pad0' style={style}>
          {images.map(function(image, index){
            return this.renderImage(image, index, length)
          }, this)}
        </div>
        <div className = {'left nav control ' + showArrow} onClick = {this.handleLeftNav.bind(this)}><i className='fa fa-angle-left'></i></div>
        <div className = {'right nav control ' + showArrow} onClick = {this.handleRightNav.bind(this, length)}><i className='fa fa-angle-right'></i></div>
        <div className = 'dots control col-xs-12'>
          {this.renderDots(length)}
        </div>
      </div>
    )
  }

  renderDots(total) {
    const rows = [];
    for(var i = 0 ; i < total; i++){
      rows.push(<i key = {i} className = {i == this.state.current ? 'fa fa-circle' : 'fa fa-circle-o cli'} onClick = {this.handleDotClicked.bind(this, i)}></i>)
    }
    return rows;
  }

  renderImage(image, index, total) {
    return (
      <img key = {index} ref = {index} src = {this.getScreen(image)} style = {{ width: this.state.screenWidth}}
           onTouchStart = {this.handleTouchStart.bind(this)}
           onTouchMove = {this.handleTouchMove.bind(this, total)}
           onTouchEnd = {this.handleTouchEnd.bind(this, total)}
           onTouchCancel = {this.handleTouchCancel.bind(this, index, total)}
        />
    )
  }

  getScreen(image) {
    const {screenWidth} = this.state;
    if(screenWidth > 760) {
      return image.replace('{screen}', 'ipad');
    } else if(screenWidth > 376) {
      return image.replace('{screen}', 'desktop');
    }else {
      return image.replace('{screen}', 'mobile');
    }
  }

  handleLeftNav() {
    const {current} = this.state;
    if(current != 0){
      this.handleTransition(current - 1);
    }
  }

  handleRightNav(total) {
    const {current} = this.state;
    if(current != total -1){
      this.handleTransition(current + 1);
    }
  }

  handleDotClicked(index) {
    this.handleTransition(index);
  }

  handleTouchStart(e) {
    this.setState({startX: e.touches[0].clientX});
  }

  handleTouchMove(total, e) {
    let touch = e.touches[0],
      change = this.state.startX - touch.clientX,
      {current} = this.state;

    if (current == 0 && change < 0) {
    }else if(current == total - 1 && change > 0) {
    }else {
      this.setState({position: change})
    }
  }

  handleTransition(next) {
    this.setState({current: next, position: 0})
  }

  handleTouchEnd(total, e) {
    let touch = e.changedTouches[0],
      change = this.state.startX - touch.clientX,
      {current} = this.state;

    if(change > 70 && current != total -1) {
      this.handleTransition(current + 1);
    }else if(change < -70 && current != 0) {
      this.handleTransition(current - 1);
    }else{
      this.handleTransition(current);
    }
  }

  handleTouchCancel() {
  }
}
