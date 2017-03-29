
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
        <Container url={this.props.location}/>
        <Footer />
      </div>
    )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

