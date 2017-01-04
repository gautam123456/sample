/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="col-md-12 col-xs-12">
        <div className="flinks">
            <div className="info"><a href="/about" >About Us</a> </div>
            <div className="info"><a href="/contactus" >Contact Us</a> </div>
            <div className="info"><a href="/freelisting" >Free Listing</a> </div>
            <div className="info"><a href="/advertise" >Advertise</a> </div>
            <div className="info"><a href="/privacypolicy" >Privacy</a> </div>
            <div className="info"><a href="/termsofservice" >Terms of Service</a> </div>
        </div>
        <div className="social">
          <a href="https://facebook.com/LookPlex" className="fs-item"><i className="fa fa-facebook "></i> </a>
          <a href="https://twitter.com/lookplex"  className="fs-item"><i className="fa fa-twitter "></i></a>
          <a href="https://in.pinterest.com/lookplex/"  className="fs-item"><i className="fa fa-pinterest "></i></a>
          <a href="https://www.instagram.com/lookplex/"  className="fs-item"><i className="fa fa-instagram "></i></a>
          <a href="https://plus.google.com/104895346847255000908"  className="fs-item"><i className="fa fa-google-plus "></i></a>
        </div>
        <span className="copyright"><i className="fa fa-copyright"></i> 2015-17 LookPlex . All rights reserved.</span>
      </footer>
    )
  }
}

