/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ThankYouFooter from './ThankYouFooter';
import {connect} from 'react-redux';
import { Link } from 'react-router';
// Remove place holder and create a component for same.
class ThankYou extends React.Component {

  render() {
    const {moneySaved} = this.props.misc;

    return (
      <div>
        <ActivityHeader heading = { 'Booking Confirmed' }/>
          <div className = 'col-md-offset-4 col-md-4 us pad0' style={{fontSize:'16px'}}>
            <div className='mcwidget-embed' data-widget-id="527494">
              <div className='pht' style={{marginTop: 50}}>
                <div className='a-b'>
                  <div className='ph-option'>
                  </div>
                </div>
              </div>
              <div className='pht' style={{marginTop: 20, width: '60%', marginLeft: '20%'}}>
                <div className='a-b'>
                  <div className='ph-option'>
                  </div>
                </div>
              </div>
              <div className='pht' style={{marginTop: 50, width: '50%', marginLeft: '25%'}}>
                <div className='a-b' style={{height: 35}}>
                  <div className='ph-option'>
                  </div>
                </div>
              </div>
            </div>
            {moneySaved != 0 ? <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Amount saved: <strong>Rs. {moneySaved} </strong></div> : ''}
            {this.renderVariables()}
            <div className = 'col-xs-12' > Booking details have been sent on your registered mobile number. </div>
            <div className = 'col-xs-12' > Refer your friends and earn. <Link to={'/salon-at-home/referearn'}><a className='cli'><u>know more</u></a></Link></div>
            <div className = 'col-xs-12' > Call 8826755766 for any query or assistance.</div>
          </div>
        <ThankYouFooter />
      </div>
    )
  }

  renderVariables(){
    const {finalAmount} = this.props.misc;
    if(finalAmount){
      const src=`//www.googleadservices.com/pagead/conversion/844167913/?value=${finalAmount}&currency_code=INR&label=fopCCK7XknQQ6fXDkgM&guid=ON&script=0`;
      return (
        <div>
          <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Amount payable: <strong>Rs. {finalAmount} </strong></div>
          <img height='1' width='1' style={{border:'none'}} alt='' src={src}/>
        </div>
      )
    }
  }

  componentDidMount(){
    this.renderManyChat();
  }

  renderManyChat() {
    (function(d, s){
      var b = d.getElementsByTagName(s)[0],
        a = d.createElement(s);
      a.src = '//widget.manychat.com/615351411942253.js?' + (new Date).getTime();
      a.async=1;
      b.parentNode.insertBefore(a, b);
    })(document, 'script');
  }
}

function mapStateToProps(state) {
  return {
    misc: state.misc
  };
}

export default connect(mapStateToProps)(ThankYou);
