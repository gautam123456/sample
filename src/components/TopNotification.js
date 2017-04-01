/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';

export default class TopNotification extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
        let classs = `col-xs-10 col-md-4 top-msg ${ this.props.type }`;
        return (
            <header className = { classs } style = {{display: this.props.msg ? 'block' : 'none'}}>
                <div>
                    <span >{ this.props.msg }</span>
                </div>
            </header>
        )
  }
}

