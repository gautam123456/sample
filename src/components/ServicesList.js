/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ServiceMenu from './ServiceMenu';
import Modal from './common/Modal';
import Base from './base/Base';
import {connect} from 'react-redux';
import {bookingDetailsChanged} from '../actions';

class ServicesList extends React.Component {
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

  renderModal = (fullId, data, display) => {
    display == 'block' ? Base.hideOverFlow() : Base.addOverFlow()
    this.setState({data: data, modalDisplay: display, id: fullId})
  }

  render() {
    const then = this,
      {data, modalDisplay, id} = this.state,
      {data: {serviceCategoryList}, bookingDetails, service} = this.props;

    return (
      <div>
        <Modal data={data} display={modalDisplay} id={id} renderModal={this.renderModal} />
        {
          serviceCategoryList.map(function(title) {
            return  (
              <div key={title.id}>
                { then.renderHeading(title.name, service + '-' + title.id) }
                { title.serviceItemList.map(function(list) {
                  let id = service + '-' + title.id + '-' + list.id;
                  return <ServiceMenu list = {list} count = { bookingDetails.services[id] ? bookingDetails.services[id].count : 0 } key = { id } id = { id } renderModal={then.renderModal.bind(then, id)}/>
                })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bookingDetails: state.bookingDetails
  };
}

export default connect(mapStateToProps)(ServicesList);
