/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';

export default class TopNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: this.props.display
        }
    }

    render() {
        let visibility = {
            display: this.state.display
        };
        let classs = `col-xs-10 col-xs-offset-1 col-md-4 top-msg ${ this.props.type }`;
        return (
            <header className = { classs } style = { visibility }>
                <div  className = '' style = { this.state.width }>
                    <span >{ this.props.msg }</span>
                    <span className = 'pull-right' onClick = { this.hideMsg.bind(this) }><i className = 'fa fa-times'></i></span>
                </div>

            </header>
        )
    }

    componentDidMount() {
        this.hideIn4Seconds();
    }

    hideIn4Seconds() {
        const self  = this;
        setTimeout(function(){
            self.setState({display: 'none'});
        }, 4000);
    }

    hideMsg() {
        this.setState({display:'none'});
    }
}

