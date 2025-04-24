import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css"; // External CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Side - Footer Content */}
        <div className="footer-content">
          
          {/* Logo & About */}
          <div className="footer-section">
            <h2>Legal Advisor</h2>
            <p>Your trusted legal consultation platform providing expert guidance and legal solutions.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/lawyers">Find a Lawyer</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/faq">FAQs</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info & Socials */}
          <div className="footer-section">
            <h3>Contact</h3>
            <p><FaMapMarkerAlt /> k.c. College of Engineering, Thane</p>
            <p><FaPhoneAlt /> +91 8454900538</p>
            <p><FaEnvelope /> info@legaladvisor.com</p>

            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </div>

        </div>

        {/* Right Side - Google Map */}
        <div className="footer-map">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.1592135420515!2d72.9778503746677!3d19.179970748701376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8da14eacea9%3A0xb4f1e032d9e4fc41!2sK.C.%20College%20of%20Engineering%20%26%20Management%20Studies%20%26%20Research!5e1!3m2!1sen!2sin!4v1740148952862!5m2!1sen!2sin"
            width="100%"
            height="180"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Legal Advisor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
