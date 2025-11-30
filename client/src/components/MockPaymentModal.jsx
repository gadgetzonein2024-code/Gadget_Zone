import { useState } from 'react'

export default function MockPaymentModal({ onClose, onSuccess, amount }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onSuccess()
    }, 3000)
  }

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-modal-header">
          <h3>Secure Payment</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="payment-modal-body">
          <div className="payment-amount">
            <h4>Amount: ₹{amount.toLocaleString()}</h4>
            <p className="demo-badge">Demo Mode - No Real Charges</p>
          </div>
          
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="4111 1111 1111 1111"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  placeholder="12/34"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={3}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className={`pay-btn ${isProcessing ? 'processing' : ''}`}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
            </button>
          </form>
          
          <div className="payment-security">
            <p>🔒 Secured by 256-bit SSL encryption</p>
            <div className="payment-methods">
              <span>💳</span>
              <span>📱</span>
              <span>💰</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .payment-modal-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999 !important;
          padding: 20px;
          box-sizing: border-box;
        }
        
        .payment-modal {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 100000 !important;
        }
      `}</style>
      
      <style jsx>{`
        .payment-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 20px;
          box-sizing: border-box;
        }
        
        .payment-modal {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 100000;
        }
        
        .payment-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .payment-modal-header h3 {
          margin: 0;
          color: #333;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        }
        
        .payment-modal-body {
          padding: 20px;
        }
        
        .payment-amount {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .payment-amount h4 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 24px;
        }
        
        .demo-badge {
          background: #e3f2fd;
          color: #1976d2;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          display: inline-block;
          margin: 0;
        }
        
        .payment-form {
          margin-bottom: 20px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 500;
        }
        
        .form-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: #007bff;
        }
        
        .form-row {
          display: flex;
          gap: 15px;
        }
        
        .form-row .form-group {
          flex: 1;
        }
        
        .pay-btn {
          width: 100%;
          background: #007bff;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .pay-btn:hover:not(:disabled) {
          background: #0056b3;
        }
        
        .pay-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .pay-btn.processing {
          background: #28a745;
        }
        
        .payment-security {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        
        .payment-security p {
          margin: 0 0 10px 0;
          color: #666;
          font-size: 14px;
        }
        
        .payment-methods {
          display: flex;
          justify-content: center;
          gap: 20px;
          font-size: 24px;
        }
      `}</style>
    </div>
  )
}
