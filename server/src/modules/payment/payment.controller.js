import crypto from 'crypto'
import { getRazorpayClient } from '../../config/razorpay.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'

export const createOrder = asyncHandler(async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body

  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' })
  }

  const razorpay = getRazorpayClient()
  const order = await razorpay.orders.create({
    amount: Number(amount) * 100,
    currency,
    receipt: receipt || `gz-${Date.now()}`,
  })

  res.json({ order })
})

export const verifySignature = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest('hex')

  const isValid = expectedSignature === razorpay_signature

  res.json({ valid: isValid })
})
