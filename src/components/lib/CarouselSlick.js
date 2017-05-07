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
      total = this.props.images.length,
      {current, position, screenWidth} = this.state,
      style = {
          transform: `translate3d(${-(position + (current * screenWidth))}px, 0px, 0px)`,
          transition: 'transform 400ms ease, opacity 400ms ease',
          width: total * this.state.screenWidth + 'px'
      };

    return (
      <div className='carousel width100 pad0' style={style}>
        {this.props.images.map(function(image, index){
          return self.renderImage(image, index, total)
        })}
        <div className = 'left nav control' onClick = {this.handleLeftNav.bind(this)}><i className='fa fa-angle-left'></i></div>
        <div className = 'right nav control' onClick = {this.handleRightNav.bind(this, total)}><i className='fa fa-angle-right'></i></div>
        <div className = 'dots control col-xs-12'>
          {this.renderDots(total)}
        </div>
      </div>
    )
  }

  renderDots(total) {
    const rows = [];
    for(var i = 0 ; i < total; i++){
      rows.push(<i key = {i} className = {i == this.state.current ? 'fa fa-circle' : 'fa fa-circle-o'} onClick = {this.handleDotClicked.bind(this, i)}></i>)
    }
    return rows;
  }

  renderImage(image, index, total) {
    return (
      <img key = {index} ref = {index} src = {image} style = {{ width: this.state.screenWidth}}
           onTouchStart = {this.handleTouchStart.bind(this)}
           onTouchMove = {this.handleTouchMove.bind(this, total)}
           onTouchEnd = {this.handleTouchEnd.bind(this, total)}
           onTouchCancel = {this.handleTouchCancel.bind(this, index, total)}
        />
    )
  }

  handleLeftNav() {
    if(this.state.current != 0){
      this.handleTransition(this.state.current - 1)
    }
  }

  handleRightNav(total) {
    if(this.state.current != total -1){
      this.handleTransition(this.state.current + 1)
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

    console.log('Change' + change)
    console.log(current);

    if (current == 0 && change < 0) {
    }else if(current == total - 1 && change > 0) {
    }else {
      this.setState({position: change})
    }
  }

  handleTransition(next) {
    this.setState({current: next})
    //this.refs[this.state.current].style.transition = 'all 0.3s';
    //this.refs[next].style.transition = 'all 0.3s';
    this.setState({position: 0})
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
