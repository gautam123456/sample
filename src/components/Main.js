
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

  componentDidMount() {
    document.getElementById('load').style.display = 'none';
    document.getElementById('mySidenav').style.display = 'block';
    document.body.style.backgroundColor = '#fff';
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

