// src/components/Footer.js
import React from 'react';
import twitter from '../assets/twitter-x.svg';
import insta from '../assets/instagram.svg';
import fb from '../assets/facebook.svg'
import call from '../assets/telephone-plus.svg'
import location from '../assets/geo-alt-fill.svg'
import email from '../assets/envelope-fill.svg'

const Footer = () => {
  return (
    <footer className="bg-danger text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light">About Us</a></li>
              <li><a href="/contact" className="text-light">Contact Us</a></li>
              <li><a href="/careers" className="text-light">Careers</a></li>
              <li><a href="/privacy" className="text-light">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Explore</h5>
            <ul className="list-unstyled">
              <li><a href="/restaurants" className="text-light">Restaurants</a></li>
              <li><a href="/offers" className="text-light">Offers</a></li>
              <li><a href="/blog" className="text-light">Blog</a></li>
              <li><a href="/help" className="text-light">Help</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Follow Us</h5>
            <img src={fb} alt="" /><a href="https://facebook.com" className="text-light me-2">Facebook</a><br />
           <img src={twitter} alt="" /> <a href="https://twitter.com" className="text-light me-2">Twitter</a><br />
           <img src={insta} alt="" /> <a href="https://instagram.com" className="text-light">Instagram</a>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Contact</h5>
            <p><img src={location} alt="" />  431,Kamarajar street,BBkulam,Maduari <br />
            <img src={email} alt="" />   support@zomato-clone.com <br />
             <img src={call} alt="" />   9345269521</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2024 Zomato Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
