/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';

var Constants = {
  CHANGE: 'change',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

export default class TopNotification extends React.Component {
  constructor(props) {
      super(props);
    this.state = {
      current: '',
      show: false
    }
  }

  render() {
    const {top, bottom, msg, show} = this.props.data;
    if(show) {
      return (
        <div className = 'notification-container' style={{bottom, top, display: this.state.show ? 'block' : 'none'}}>
          <div className = {'col-xs-12 notification ' + this.getNotificationClass() + ' ' + this.state.current}>
            <div className = 'col-xs-1 pad0'><i className={'fa ' + this.getIcon() }></i></div>
            <div className = 'col-xs-11 pad0'><span> { msg }</span></div>
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  getIcon() {
    switch(this.props.data.type) {
      case Constants.INFO:
        return 'fa-info-circle';
      case Constants.SUCCESS:
        return 'fa-check-circle';
      case Constants.WARNING:
        return 'fa-exclamation-triangle';
      case Constants.ERROR:
        return 'fa-exclamation-circle';
    }
  }

  getNotificationClass() {
    switch(this.props.data.type) {
      case Constants.INFO:
        return 'notification-info';
      case Constants.SUCCESS:
        return 'notification-success';
      case Constants.WARNING:
        return 'notification-warning';
      case Constants.ERROR:
        return 'notification-error';
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.show) {
      const self = this;
      self.setState({show: true});

      setTimeout(function() {
        self.setState({current: 'notification-enter notification-enter-active'});
      }, 400);

      setTimeout(function(){
        self.setState({current: 'notification-leave notification-leave-active'});

        setTimeout(function(){
          self.setState({show: false});
        }, 400)

      }, nextProps.data.timeout)
    }
  }
}

