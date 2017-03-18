/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';

export default class TopNotification extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          display: 'block'
      }
  }

  hideMsg() {
    this.setState({display:'none'});
  }

  render() {
        let classs = `col-xs-10 col-md-4 top-msg ${ this.props.type }`;
        return (
            <header className = { classs } style = {{display: this.state.display}}>
                <div>
                    <span >{ this.props.msg }</span>
                    <span className = 'pull-right' onClick = { this.hideMsg.bind(this) }></span>
                </div>

            </header>
        )
    }
}

