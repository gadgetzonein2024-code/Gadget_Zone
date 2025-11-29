import { useState } from 'react'

const RegistrationForm = ({ onSubmit, isSubmitting, status }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Personal Details
    phone: '',
    
    // Step 3: Address
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India'
    },
    
    // Step 4: Preferences
    preferences: {
      newsletter: false,
      smsNotifications: false,
      emailOffers: true
    }
  })

  const [errors, setErrors] = useState({})

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const updateAddressData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
    // Clear error for this field
    if (errors[`address_${field}`]) {
      setErrors(prev => ({ ...prev, [`address_${field}`]: '' }))
    }
  }

  const updatePreferences = (field, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format'
      }
      if (!formData.password) newErrors.password = 'Password is required'
      else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password'
      else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    if (step === 2) {
      if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Invalid Indian mobile number'
      }
    }

    if (step === 3) {
      if (!formData.address.street.trim()) newErrors.address_street = 'Street address is required'
      if (!formData.address.city.trim()) newErrors.address_city = 'City is required'
      if (!formData.address.state.trim()) newErrors.address_state = 'State is required'
      if (!formData.address.postalCode.trim()) newErrors.address_postalCode = 'Postal code is required'
      else if (!/^\d{6}$/.test(formData.address.postalCode.replace(/\s/g, ''))) {
        newErrors.address_postalCode = 'Invalid postal code'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="registration-step">
            <h3>Basic Information</h3>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="registration-step">
            <h3>Contact Information</h3>
            <div className="form-group">
              <label htmlFor="phone">Mobile Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
              <small>For order updates and delivery notifications</small>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="registration-step">
            <h3>Delivery Address</h3>
            <div className="form-group">
              <label htmlFor="street">Street Address *</label>
              <input
                id="street"
                type="text"
                placeholder="123, Main Street, Apartment 4B"
                value={formData.address.street}
                onChange={(e) => updateAddressData('street', e.target.value)}
                className={errors.address_street ? 'error' : ''}
              />
              {errors.address_street && <span className="error-message">{errors.address_street}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  type="text"
                  placeholder="Mumbai"
                  value={formData.address.city}
                  onChange={(e) => updateAddressData('city', e.target.value)}
                  className={errors.address_city ? 'error' : ''}
                />
                {errors.address_city && <span className="error-message">{errors.address_city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  id="state"
                  type="text"
                  placeholder="Maharashtra"
                  value={formData.address.state}
                  onChange={(e) => updateAddressData('state', e.target.value)}
                  className={errors.address_state ? 'error' : ''}
                />
                {errors.address_state && <span className="error-message">{errors.address_state}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code *</label>
                <input
                  id="postalCode"
                  type="text"
                  placeholder="400001"
                  value={formData.address.postalCode}
                  onChange={(e) => updateAddressData('postalCode', e.target.value)}
                  className={errors.address_postalCode ? 'error' : ''}
                />
                {errors.address_postalCode && <span className="error-message">{errors.address_postalCode}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  type="text"
                  value={formData.address.country}
                  onChange={(e) => updateAddressData('country', e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="registration-step">
            <h3>Preferences</h3>
            <div className="preferences-section">
              <h4>Communication Preferences</h4>
              
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.preferences.newsletter}
                    onChange={(e) => updatePreferences('newsletter', e.target.checked)}
                  />
                  <span>Subscribe to newsletter for latest products and offers</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.preferences.smsNotifications}
                    onChange={(e) => updatePreferences('smsNotifications', e.target.checked)}
                  />
                  <span>Receive order updates via SMS</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.preferences.emailOffers}
                    onChange={(e) => updatePreferences('emailOffers', e.target.checked)}
                  />
                  <span>Get exclusive offers and discounts via email</span>
                </label>
              </div>
            </div>

            <div className="registration-summary">
              <h4>Review Your Information</h4>
              <div className="summary-grid">
                <div>
                  <strong>Name:</strong> {formData.name}
                </div>
                <div>
                  <strong>Email:</strong> {formData.email}
                </div>
                <div>
                  <strong>Phone:</strong> {formData.phone || 'Not provided'}
                </div>
                <div>
                  <strong>Address:</strong> {formData.address.street}, {formData.address.city}, {formData.address.state} - {formData.address.postalCode}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="registration-form">
      <div className="step-indicator">
        <div className="steps">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index + 1}
              className={`step ${index + 1 <= currentStep ? 'active' : ''} ${index + 1 === currentStep ? 'current' : ''}`}
            >
              <span className="step-number">{index + 1}</span>
              <span className="step-title">
                {index + 1 === 1 && 'Basic Info'}
                {index + 1 === 2 && 'Contact'}
                {index + 1 === 3 && 'Address'}
                {index + 1 === 4 && 'Preferences'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-content">
        {renderStep()}
      </div>

      <div className="form-actions">
        {currentStep > 1 && (
          <button type="button" className="secondary-button" onClick={handlePrevious}>
            Previous
          </button>
        )}
        
        {currentStep < totalSteps ? (
          <button type="button" className="primary-button" onClick={handleNext}>
            Next Step
          </button>
        ) : (
          <button type="button" className="primary-button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
          </button>
        )}
      </div>

      {status && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  )
}

export default RegistrationForm
