import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { createRazorpayOrder, verifyPayment, loadRazorpayScript } from '../lib/payment'
import MockPaymentModal from './MockPaymentModal'

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showMockModal, setShowMockModal] = useState(false)
  
  if (!isOpen) return null
  
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  
  const handleCheckout = async () => {
    if (items.length === 0) return
    
    setIsProcessing(true)
    
    try {
      // Create order first to check if backend has real Razorpay credentials
      const order = await createRazorpayOrder(totalPrice)
      
      // Check if this is a mock order (backend detected no valid credentials)
      if (order.order?.mock) {
        console.log('Backend returned mock order, using mock payment modal')
        setShowMockModal(true)
        setIsProcessing(false)
        return
      }
      
      // Get Razorpay key from environment (should be available if backend is working)
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID
      if (!razorpayKey) {
        console.log('Frontend: No Razorpay key found, but backend is working. Using mock modal.')
        setShowMockModal(true)
        setIsProcessing(false)
        return
      }
      
      // Load Razorpay script only for real payments
      await loadRazorpayScript()
      
      // Razorpay options for real payments
      const options = {
        key: razorpayKey,
        amount: order.order.amount, // Use order.order.amount from backend response
        currency: order.order.currency,
        name: 'Gadget Zone',
        description: `Payment for ${totalItems} item(s)`,
        order_id: order.order.id, // Use order.order.id from backend response
        handler: async (response) => {
          try {
            // Verify payment
            const verification = await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            )
            
            if (verification.valid) { // Backend returns { valid: boolean }
              alert('Payment successful! Order placed.')
              clearCart()
              toggleCart()
            } else {
              alert('Payment verification failed. Please contact support.')
            }
          } catch (error) {
            alert('Payment verification failed. Please contact support.')
          }
          setIsProcessing(false)
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#007bff' // Fixed color format
        }
      }
      
      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options)
      razorpay.open()
      
    } catch (error) {
      console.error('Checkout error:', error)
      // If anything fails, fall back to mock modal
      setShowMockModal(true)
      setIsProcessing(false)
    }
  }
  
  const handleMockPaymentSuccess = () => {
    setShowMockModal(false)
    alert('Mock payment successful! Order placed. (Demo Mode - No actual payment processed)')
    clearCart()
    toggleCart()
  }
  
  const handleMockModalClose = () => {
    setShowMockModal(false)
    setIsProcessing(false)
  }
  
  return (
    <>
      <div className="cart-overlay" onClick={toggleCart}></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Shopping Cart ({totalItems})</h2>
          <button className="cart-close" onClick={toggleCart}>×</button>
        </div>
        
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <Link to="/" onClick={toggleCart}>Continue Shopping</Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <Link to={`/product/${item.slug}`} onClick={toggleCart} className="cart-item-name">
                    {item.name}
                  </Link>
                  <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                  
                  <div className="cart-item-quantity">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                
                <div className="cart-item-actions">
                  <div className="cart-item-total">₹{(item.price * item.quantity).toLocaleString()}</div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="cart-actions">
              <button 
                className="cart-checkout-btn" 
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              <button className="cart-continue-btn" onClick={toggleCart}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
      
      {showMockModal && (
        <MockPaymentModal
          onClose={handleMockModalClose}
          onSuccess={handleMockPaymentSuccess}
          amount={totalPrice}
        />
      )}
    </>
  )
}
