import React, { useState } from 'react'

const ForgotPassword = ({ onClose, onBackToLogin }) => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: '', message: '' })

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setStatus({
        type: 'success',
        message: 'Password reset instructions have been sent to your email address.'
      })
      setEmail('')
      
      // Auto close after 3 seconds on success
      setTimeout(() => {
        onBackToLogin()
      }, 3000)
      
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send reset instructions. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-header">
        <h3>Reset Your Password</h3>
        <p>Enter your email address and we'll send you instructions to reset your password.</p>
      </div>

      {status.message && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}

      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reset-email">Email Address</label>
          <input
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="reset-button"
          disabled={isLoading || !email}
        >
          {isLoading ? 'Sending...' : 'Send Reset Instructions'}
        </button>
      </form>

      <div className="forgot-password-footer">
        <button 
          className="back-to-login-button"
          onClick={onBackToLogin}
          disabled={isLoading}
        >
          ← Back to Login
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword
