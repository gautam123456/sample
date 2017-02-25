/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';

export default class Modal extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            display: 'block'
        }
    }

    render() {
        return (
            <div id = 'modal' className ='modal' style = {{ display: this.state.display }}>
                <div className = 'modal-content'>
                    <span className = 'close pull-right' onClick = { this.close.bind(this) } >&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>
        )
    }

    close() {
        this.setState({display: 'none'})
    }

}
