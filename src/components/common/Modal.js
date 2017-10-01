/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import Base from '../base/Base';
import {connect} from 'react-redux';
import {bookingDetailsChanged} from '../../actions';

class Modal extends React.Component {

  constructor(props){
      super(props)
      this.state = {
        display: 'none',
        data: ''
      }
  }

  renderBenefits(benefits) {
    if(benefits) {
      return (
        benefits.split(',').map(function(benefit) {
            return (<li key={benefit}>{benefit.trim()}</li>)
          }
        )
      )
    }
  }

  render() {
    const {data: {cost, name, recommended, ingredients, benefits, time}, display} = this.state;

      return (
          <div id = 'modal' className ='modal' style = {{display}}>
              <div className = 'modal-content pad0'>
                <div className = 'cancel' onClick = {this.close.bind(this)}><div>&#215;</div></div>
                <div className = 'content pad0'>
                  <div className = 'body'>
                    <h3>{name}</h3>
                    <p>Rs. {cost}</p>
                    <p><i className ='fa fa-clock-o'></i> {time}</p>
                    <div className='col-xs-2 border-bottom'></div>
                    <div className='heading col-xs-12 pad0'>BENEFITS</div>
                    <div className='bcontent'><ul>{this.renderBenefits(benefits)}</ul></div>
                    <div className='heading'>RECOMMENDED FOR</div>
                    <div className='bcontent'>{recommended}</div>
                    <div className='heading'>INGREDIENTS</div>
                    <div className='bcontent'>{ingredients}</div>
                  </div>
                </div>
                <footer onClick = {this.addToCart.bind(this)}> &#43; ADD TO CART</footer>
              </div>
          </div>
      )
  }

  componentDidMount() {
    window.onhashchange = function() {
      Base.addOverFlow();
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      display: nextProps.display,
      data: nextProps.data
    });
  }

  close() {
      this.props.renderModal('','','none')
      Base.addOverFlow();
  }

  addToCart() {
    const {id, data: {name, cost}} = this.props;
    this.props.bookingDetailsChanged({id, name, cost, count: 0, operation: 1});
    this.props.renderModal('','','none')
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    bookingDetailsChanged: (options) => {
      dispatch(bookingDetailsChanged(options));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
