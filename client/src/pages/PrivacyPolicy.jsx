import React from 'react'
import { Link } from 'react-router-dom'
import './PageStyles.css'

const PrivacyPolicy = () => {
  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="page-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: November 2024</p>
        </div>
        
        <div className="page-section">
          <h2>Introduction</h2>
          <p>
            At Gadget Zone, we take your privacy seriously. This Privacy Policy outlines how we collect, 
            use, and protect your personal information when you use our website and services.
          </p>
        </div>

        <div className="page-section">
          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <ul>
            <li>Name and contact information</li>
            <li>Shipping and billing addresses</li>
            <li>Payment information</li>
            <li>Email address and phone number</li>
            <li>Account credentials</li>
          </ul>
          
          <h3>Automatically Collected Information</h3>
          <ul>
            <li>IP address and browsing data</li>
            <li>Device information</li>
            <li>Cookies and tracking data</li>
            <li>Usage patterns and preferences</li>
          </ul>
        </div>

        <div className="page-section">
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To process and fulfill your orders</li>
            <li>To provide customer support</li>
            <li>To improve our products and services</li>
            <li>To send marketing communications (with your consent)</li>
            <li>To personalize your shopping experience</li>
            <li>To detect and prevent fraud</li>
          </ul>
        </div>

        <div className="page-section">
          <h2>Information Sharing</h2>
          <p>
            We do not sell your personal information to third parties. We only share your information 
            with trusted service providers who help us operate our business, such as payment processors 
            and shipping companies.
          </p>
        </div>

        <div className="page-section">
          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies to enhance your experience on our website. You can control cookie settings 
            through your browser preferences. Some features of our site may not function properly 
            without cookies.
          </p>
        </div>

        <div className="page-section">
          <h2>Your Rights</h2>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>
        </div>

        <div className="page-section">
          <h2>Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction.
          </p>
        </div>

        <div className="page-section">
          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect personal 
            information from children under 13.
          </p>
        </div>

        <div className="page-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </div>

        <div className="page-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> privacy@gadgetzone.com<br/>
            <strong>Phone:</strong> 1-800-GADGETS
          </p>
        </div>

        <div className="page-section">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
