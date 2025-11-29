import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/gadget_zone_logo.png" alt="Gadget Zone" className="footer-logo-image" />
            </div>
            <h3>Gadget Zone</h3>
            <p>Your trusted destination for the latest smartphones, smart wearables, and gaming gear.</p>
            <div className="social-links">
              <a href=" ." aria-label="Facebook">
                <span className="social-icon">📘</span>
              </a>
              <a href=" ." aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
              <a href=" ." aria-label="Instagram">
                <span className="social-icon">📷</span>
              </a>
              <a href=" ." aria-label="YouTube">
                <span className="social-icon">📺</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/deals">Deals & Offers</Link></li>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/trending">Trending</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul className="footer-links">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/support">Support Center</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns & Exchanges</Link></li>
            <li><Link to="/warranty">Warranty</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/press">Press & Media</Link></li>
            <li><Link to="/partners">Partners</Link></li>
            <li><Link to="/sustainability">Sustainability</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/cookies">Cookie Policy</Link></li>
            <li><Link to="/accessibility">Accessibility</Link></li>
            <li><Link to="/compliance">Compliance</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to get exclusive offers and new product updates.</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
          <div className="payment-methods">
            <p>We Accept:</p>
            <div className="payment-icons">
              <span className="payment-icon">💳</span>
              <span className="payment-icon">💰</span>
              <span className="payment-icon">📱</span>
              <span className="payment-icon">🏦</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 Gadget Zone. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
