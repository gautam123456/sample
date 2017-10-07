/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './ActivityHeader';
import ThankYouFooter from './ThankYouFooter';
import {connect} from 'react-redux';
import { Link } from 'react-router';

class ThankYou extends React.Component {

  render() {
    const {moneySaved} = this.props.misc;

    return (
        <div>
          <ActivityHeader heading = { 'Booking Confirmed' }/>
            <div className = 'col-md-offset-4 col-md-4 us pad0' style={{fontSize:'16px'}}>
              <img src='../styles/assets/images/booked.jpg' style={{height:'100%', width:'100%', marginBottom:'20px'}} alt=''/>

              <Link to={'/'}>
                <a className='cli'>
                  <div className="col-xs-12" style={{marginTop: -120, height:60}}></div>
                </a>
              </Link>

              {moneySaved != 0 ? <div className = 'col-xs-12' > <i className="fa fa-check-circle"></i> Amount saved: <strong>Rs. {moneySaved} </strong></div> : ''}
              {this.renderVariables()}
              <div className = 'col-xs-12' > Booking details have been sent on your registered mobile number. </div>
              <div className = 'col-xs-12' > Refer your friends and earn. <Link to={'/salon-at-home/referearn'}><a className='cli'><u>know more</u></a></Link></div>
              <div className = 'col-xs-12' style={{marginBottom: 70}} > Call 8826755766 for any query or assistance.</div>

              <div class="mcwidget-embed" data-widget-id="527494"></div>
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
    window.mcwidget = {
      appId: '532160876956612',
      pageId: '615351411942253',
      widgets: [{
        widget_id: 527494,
        page_id: 615351411942253,
        widget_type: 'box',
        status: 'active',
        name: 'Example Popup',
        data: {
          submitted: {
            action: 'redirect',
            redirectUrl: 'https:\/\/www.Lookplex.com'
          },
          main:{
            buttonType: 'checkbox',
            optInButtonText: 'Subscribe',
            desc: 'Please subscribe to Lookplex notification to get updates on appointments and offers',
            title: '',
            fitContainer: true
          }
        }
      },
        {
          widget_id: 527493,
          page_id: 615351411942253,
          widget_type: 'landing',
          status: 'active',
          name: 'Example Landing',
          data: {
            main: {
              title: '',
              desc: 'Please subscribe to lookplex notification to assist you with further appointments and offers'
            }
          }
        }
      ]
    };

    (function(d, s, id){
      var host = 'manychat.com/102506';

      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = '//' + host + '/assets/js/widget.js?' + (Math.round(+new Date/1000*600));
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'mcwidget-core'));
  }
}

function mapStateToProps(state) {
  return {
    misc: state.misc
  };
}

export default connect(mapStateToProps)(ThankYou);
