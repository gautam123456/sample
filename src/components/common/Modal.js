/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import Base from '../base/Base';

export default class Modal extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          display: 'none',
          data: ''
        }
    }

    renderBenefits(benefits) {
      if(benefits) {
        const self = this,
          benefitss = benefits.split(',');

        return (
            benefitss.map(function(benefit) {
              return (<li>{benefit.trim()}</li>)
            }
          )
        )
      }
    }

    render() {
      const data = this.state.data;
        return (
            <div id = 'modal' className ='modal' style = {{ display: this.state.display }}>
                <div className = 'cancel' onClick = {this.close.bind(this)}><div>&#215;</div></div>
                <div className = 'modal-content pad0'>
                  <div className = 'content pad0'>
                    <img src='../../styles/assets/images/bgg.jpg' height='150px' width='100%'/>
                    <div className = 'body'>
                      <h3>{data.name}</h3>
                      <p>Rs. {data.cost}</p>
                      <p><i className ='fa fa-clock-o'></i> {data.time}</p>
                      <div className='col-xs-2 border-bottom'></div>
                      <div className='heading col-xs-12 pad0'>BENEFITS</div>
                      <div className='bcontent'><ul>{this.renderBenefits(data.benefits)}</ul></div>
                      <div className='heading'>RECOMMENDED FOR</div>
                      <div className='bcontent'>{data.recommended}</div>
                      <div className='heading'>INGREDIENTS</div>
                      <div className='bcontent'>{data.ingredients}</div>
                    </div>
                  </div>
                  <footer onClick = {this.addToCart.bind(this)}> &#43; ADD TO CART</footer>
                </div>
            </div>
        )
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
    this.props.bookingDetailsChanged(this.props.id, this.props.data.name, this.props.data.cost, 0, 1);
    this.props.renderModal('','','none')
  }

}
