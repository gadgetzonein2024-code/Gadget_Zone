import React from 'react'
import { Link } from 'react-router-dom'
import './PageStyles.css'

const AboutUs = () => {
  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="page-header">
          <h1>About Gadget Zone</h1>
          <p>Your trusted destination for cutting-edge technology</p>
        </div>
        
        <div className="page-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, Gadget Zone has grown from a small startup to one of the most trusted 
            destinations for tech enthusiasts. We started with a simple mission: to make the latest 
            technology accessible to everyone.
          </p>
          <p>
            Today, we serve thousands of customers across the country, offering everything from 
            the latest smartphones to cutting-edge gaming equipment. Our commitment to quality, 
            competitive pricing, and exceptional customer service has made us a favorite among 
            tech lovers.
          </p>
        </div>

        <div className="page-section">
          <h2>Our Mission</h2>
          <p>
            At Gadget Zone, our mission is to bridge the gap between technology and people. 
            We believe that everyone deserves access to the latest innovations, and we work 
            tirelessly to bring you the best products at the most competitive prices.
          </p>
        </div>

        <div className="page-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality First</h3>
              <p>We only source products from reputable manufacturers and ensure every item meets our strict quality standards.</p>
            </div>
            <div className="value-card">
              <h3>Customer Centric</h3>
              <p>Your satisfaction is our top priority. We go above and beyond to ensure you have the best shopping experience.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We stay ahead of the curve, constantly updating our inventory with the latest technological innovations.</p>
            </div>
            <div className="value-card">
              <h3>Integrity</h3>
              <p>We conduct business with honesty and transparency, building trust with every interaction.</p>
            </div>
          </div>
        </div>

        <div className="page-section">
          <h2>Our Team</h2>
          <p>
            Our team consists of passionate tech enthusiasts, experienced professionals, and 
            dedicated customer service representatives. Together, we work to ensure that every 
            customer gets the best possible experience when shopping with us.
          </p>
        </div>

        <div className="page-section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p><strong>Email:</strong> support@gadgetzone.com</p>
            <p><strong>Phone:</strong> 1-800-GADGETS</p>
            <p><strong>Address:</strong> 123 Tech Street, Digital City, TC 12345</p>
          </div>
        </div>

        <div className="page-section">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
