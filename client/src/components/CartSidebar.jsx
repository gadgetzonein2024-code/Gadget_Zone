import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { createRazorpayOrder, verifyPayment, loadRazorpayScript } from '../lib/payment'

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  
  if (!isOpen) return null
  
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  
  const handleCheckout = async () => {
    if (items.length === 0) return
    
    setIsProcessing(true)
    
    try {
      // Load Razorpay script
      await loadRazorpayScript()
      
      // Create order
      const order = await createRazorpayOrder(totalPrice)
      
      // Razorpay options
      const options = {
        key: 'rzp_test_1DP5mmOlFfGpmG', // Razorpay test key
        amount: order.amount,
        currency: order.currency,
        name: 'Gadget Zone',
        description: `Payment for ${totalItems} item(s)`,
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment
            const verification = await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            )
            
            if (verification.success) {
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
          color: ' .00ff88'
        }
      }
      
      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options)
      razorpay.open()
      
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to initiate payment. Please try again.')
      setIsProcessing(false)
    }
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
    </>
  )
}
