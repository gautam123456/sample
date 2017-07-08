
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';

class AppComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />
        <div id = 'grey-overlay'></div>
        <Container url={this.props.location}/>
      </div>
    )
  }
}

export default AppComponent;

