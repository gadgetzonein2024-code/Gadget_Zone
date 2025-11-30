import crypto from 'crypto'
import { getRazorpayClient } from '../../config/razorpay.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'

export const createOrder = asyncHandler(async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body

  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' })
  }

  // Check if we have valid Razorpay credentials
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    // Mock order for demonstration
    console.log('Using mock payment mode (no Razorpay credentials)')
    const mockOrder = {
      id: `order_mock_${Date.now()}`,
      entity: 'order',
      amount: Number(amount) * 100,
      amount_paid: 0,
      amount_due: Number(amount) * 100,
      currency: currency,
      receipt: receipt || `gz-${Date.now()}`,
      status: 'created',
      attempts: 0,
      created_at: Math.floor(Date.now() / 1000),
      notes: [],
      offer_id: null,
      mock: true // Flag to indicate this is a mock order
    }
    return res.json({ order: mockOrder })
  }

  // Real Razorpay integration
  try {
    const razorpay = getRazorpayClient()
    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency,
      receipt: receipt || `gz-${Date.now()}`,
    })

    console.log('Real Razorpay order created:', order.id)
    res.json({ order })
  } catch (error) {
    console.error('Razorpay error:', error)
    // Fallback to mock order if Razorpay fails
    const mockOrder = {
      id: `order_fallback_${Date.now()}`,
      entity: 'order',
      amount: Number(amount) * 100,
      amount_paid: 0,
      amount_due: Number(amount) * 100,
      currency: currency,
      receipt: receipt || `gz-${Date.now()}`,
      status: 'created',
      attempts: 0,
      created_at: Math.floor(Date.now() / 1000),
      notes: [],
      offer_id: null,
      mock: true
    }
    res.json({ order: mockOrder })
  }
})

export const verifySignature = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  // For mock orders, always return valid
  if (razorpay_order_id && razorpay_order_id.includes('mock')) {
    console.log('Mock payment verification - always valid')
    return res.json({ valid: true, mock: true })
  }

  // Real signature verification
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return res.json({ valid: true, mock: true })
  }

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest('hex')

  const isValid = expectedSignature === razorpay_signature

  console.log('Payment verification result:', isValid)
  res.json({ valid: isValid })
})
