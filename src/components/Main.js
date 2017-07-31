import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';
import $ from 'jquery';

class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: $(window).width()
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div id = 'grey-overlay'></div>
        <Container url={this.props.location} screenWidth={this.state.screenWidth}/>
      </div>
    )
  }

  updateDimensions() {
    this.setState({screenWidth: $(window).width()});
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
}

export default AppComponent;

