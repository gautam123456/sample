import React from 'react';
import MenueOptions from '../MenueOptions';

export default class LeftNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className = 'col-md-offset-1 col-xs-12 col-md-3 leftNav'>
        <MenueOptions />
        <div className='col-md-12 call'>
          Call or WhatsApp us on +918826755766 for any assistance.
        </div>
      </div>
    )
  }
}


