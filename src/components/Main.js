
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Container />
        <Footer />
      </div>
    )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
