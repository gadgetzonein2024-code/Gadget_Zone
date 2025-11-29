import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './PageStyles.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="page-header">
          <h1>Contact Us</h1>
          <p>We're here to help and answer any question you might have</p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info-section">
            <h2>Get in Touch</h2>
            <div className="contact-methods">
              <div className="contact-method">
                <h3>📧 Email</h3>
                <p>support@gadgetzone.com</p>
                <p>We respond within 24 hours</p>
              </div>
              <div className="contact-method">
                <h3>📞 Phone</h3>
                <p>1-800-GADGETS</p>
                <p>Mon-Fri: 9AM-6PM EST</p>
              </div>
              <div className="contact-method">
                <h3>💬 Live Chat</h3>
                <p>Available 24/7</p>
                <p>Get instant help</p>
              </div>
              <div className="contact-method">
                <h3>📍 Address</h3>
                <p>123 Tech Street</p>
                <p>Digital City, TC 12345</p>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>

        <div className="page-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>How long does shipping take?</h3>
              <p>Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.</p>
            </div>
            <div className="faq-item">
              <h3>What is your return policy?</h3>
              <p>We offer a 30-day return policy for all unused items in their original packaging.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer international shipping?</h3>
              <p>Yes, we ship to most countries worldwide. International shipping rates and times vary.</p>
            </div>
            <div className="faq-item">
              <h3>How can I track my order?</h3>
              <p>Once your order ships, you'll receive a tracking number via email to monitor your delivery.</p>
            </div>
          </div>
        </div>

        <div className="page-section">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default Contact
