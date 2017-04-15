/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ServiceMenu from './ServiceMenu';
import Modal from './common/Modal';
import Base from './base/Base';

export default class ServicesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      modalDisplay: 'none',
      id: ''
    }
  }

  renderHeading(title, id) {
    return <header key = { id } className = 's-heading full-width'>{ title }</header>
  }

  renderModal(fullId, data, display) {
    display == 'block' ? Base.hideOverFlow() : Base.addOverFlow()
    this.setState({data: data, modalDisplay: display, id: fullId})
  }

  render() {
    const then = this;
    return (
      <div>
        <Modal data={this.state.data} display={this.state.modalDisplay} id={this.state.id} renderModal={this.renderModal.bind(this)} bookingDetailsChanged={this.bookingDetailsChanged.bind(this)}/>
        {
          this.props.data.serviceCategoryList.map(function(title) {
            return <div>
                      { then.renderHeading(title.name, then.props.service + '-' + title.id) }
                      { title.serviceItemList.map(function(list) {
                        let id = then.props.service + '-' + title.id + '-' + list.id;
                        return <ServiceMenu list = {list} count = { then.props.bookingDetails.services && then.props.bookingDetails.services[id] ? then.props.bookingDetails.services[id].count : 0 } key = { id } id = { id } bookingDetailsChanged = { then.bookingDetailsChanged.bind(then) } renderModal={then.renderModal.bind(then, id)}/>
                      })
                      }
            </div>
          })
        }

      </div>

    )
  }

  bookingDetailsChanged(id, name, cost, count, operation) {
    this.props.bookingDetailsChanged(id, name, cost, count, operation);
  }
}
