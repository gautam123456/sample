import React from 'react';
import Amount from './common/Amount';
import {connect} from 'react-redux';
import {bookingDetailsChanged} from '../actions';

class ServiceMenu extends React.Component {
  render() {
    const {list: {name, condition, information, cost}, count, id} = this.props,
      discount = this.props.discount || this.props.list.discount || 0;

    return (
      <div className = 'menu full-width'>
        <div className = 'col-xs-7'>

          { name }<br/>
          { condition ? this.renderCondition() : '' }
          { information ? this.renderInformation() : '' }

        </div>
        <Amount cost={cost} discount={discount || 0}/>
        <div className = 'col-xs-1 center'>

          { count > 0 ? <i className = 'fa fa-minus-circle fa-2x cli' onClick = { this.bookingDetailsChanged.bind(this, id, name, cost, count, 0, discount) }></i> : '' }

        </div>
        <div className = 'col-xs-1 center'>

          { count === 0 ? '': count }

        </div>
        <div className = 'col-xs-1 center'>
        <i className = 'fa fa-plus-circle fa-2x cli' onClick = { this.bookingDetailsChanged.bind(this, id, name, cost, count, 1, discount) }></i>
        </div>
      </div>
    )
  }

  renderInformation() {
    return (
        <div style={{display: 'inline'}}>
          <i className = 'fa fa-info-circle margin5 cli' onClick = {this.renderModal.bind(this, this.props.list)}></i>
        </div>
    )
  }

  renderModal(data) {
    this.props.renderModal(data, 'block')
  }

  renderCondition() {
    return (
        <span className = 'brand'> ({ this.props.list.condition }) </span>
    )
  }

  bookingDetailsChanged = (id, name, cost, count, operation, discount) => {
    this.props.bookingDetailsChanged({id, name, cost, count, operation, discount});
  }
}

function mapStateToProps(state) {
  return {
    discount: state.bookingDetails.discount
  };
}

function mapDispatchToProps(dispatch) {
  return {
    bookingDetailsChanged: (options) => {
      dispatch(bookingDetailsChanged(options));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceMenu);
