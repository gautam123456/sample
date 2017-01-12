/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ServiceMenu from './ServiceMenu';
import Cart from './Cart';

import Data from '../../data/items.json';
import bookingDetails from '../../data/constants.json';

export default class ServicesList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHeading(title, id) {
    return <header key = { id } className = 's-heading full-width'>{ title }</header>
  }

  renderDescription(description, title) {
    return <div>
    </div>
  }

  render() {
    const then = this;
    return (
      <div>
        {
          this.props.data.serviceCategoryList.map(function(title) {
            return <div> { then.renderHeading(title.name, then.props.service + '-' + title.id) }
                      { title.serviceItemList.map(function(list) {
                        let id = then.props.service + '-' + title.id + '-' + list.id;
                        return <ServiceMenu list = {list} count = { then.props.bookingDetails.services && then.props.bookingDetails.services[id] ? then.props.bookingDetails.services[id].count : 0 } key = { id } id = { id } bookingDetailsChanged = { then.props.bookingDetailsChanged.bind(this) }/>
                      })
                      }
            </div>
          })
        }
        {
          this.renderDescription( this.props.data.serviceDescription, this.props.data.metaTitle )
        }

      </div>

    )
  }
}
