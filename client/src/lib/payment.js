import { apiRequest } from '../lib/api.js'

export const createRazorpayOrder = async (amount, currency = 'INR') => {
  try {
    console.log('Creating order with amount:', amount, currency)
    const response = await apiRequest('payments/order', {
      method: 'POST',
      body: JSON.stringify({
        amount: amount, // Backend will convert to paise
        currency,
        receipt: `receipt_${Date.now()}`
      })
    })
    
    console.log('Order created successfully:', response)
    return response
  } catch (error) {
    console.error('Order creation error:', error)
    console.error('Error details:', error.message, error.status)
    throw new Error(`Failed to create payment order: ${error.message}`)
  }
}

export const verifyPayment = async (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
  try {
    const response = await apiRequest('payments/verify', {
      method: 'POST',
      body: JSON.stringify({
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature
      })
    })
    
    return response
  } catch (error) {
    console.error('Payment verification error:', error)
    throw new Error('Payment verification failed')
  }
}

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = resolve
    document.body.appendChild(script)
  })
}
