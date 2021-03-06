/**
 * Created by rgautam on 1/13/17.
 */
import React from 'react';
import { Link } from 'react-router';

export default class AddAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: this.props.address
        }
    }

    render() {
        return (
            <div className = 'col-xs-12 address-space pad0'>
                <div className = 'addresscard col-xs-12' style = { this.props.active ? { backgroundColor: '#add7d5' }: {backgroundColor: '#f9f9f9'}} onClick = { this.selectAddress.bind(this) }>
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-3 head pad0'> Address: </div>
                        <div className = 'col-xs-9'>{ this.props.address.address }</div>
                    </div>
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-3 head pad0'> Landmark: </div>
                        <div className = 'col-xs-9'>{ this.props.address.landmark }</div>
                    </div>
                    <div className = 'col-xs-12'>
                        <div className = 'col-xs-3 head pad0'> City: </div>
                        <div className = 'col-xs-9'>{ this.props.address.city }</div>
                    </div>
                </div>
                <div className = 'options col-xs-12 pad0' style = { this.props.active ? { backgroundColor: '#add7d5' }: {backgroundColor: '#f9f9f9'}}>
                    <Link to = { '/address/add' + '?op=delete&address=' + JSON.stringify(this.state.address) }>
                        <button className = 'col-xs-3'>
                            <i className = 'fa fa-trash'></i> Delete
                        </button>
                    </Link>
                    <Link to = { '/address/add' + '?op=edit&address=' + JSON.stringify(this.state.address) }>
                        <button className = 'col-xs-3 col-xs-offset-1'>
                            <i className = 'fa fa-pencil-square-o'></i> Edit
                        </button>
                    </Link>
                    <input type="checkbox" className = "pull-right" checked = { this.props.active ? true : false } onClick = { this.selectAddress.bind(this) } />
                </div>
            </div>
        )
    }

    componentDidMount() {
        if(this.props.index == 0){
            this.props.selectedAddress(this.state.address);
        }
    }

    selectAddress() {
        this.props.selectedAddress(this.state.address);
    }
}


