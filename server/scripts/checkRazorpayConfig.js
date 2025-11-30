import dotenv from 'dotenv'
import { getRazorpayClient } from '../src/config/razorpay.js'

dotenv.config()

const checkRazorpayConfig = async () => {
  try {
    console.log('Checking Razorpay configuration...')
    console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? 'Set' : 'Not set')
    console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? 'Set' : 'Not set')
    
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('❌ Razorpay credentials not found in environment variables')
      console.log('Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your backend environment')
      return
    }
    
    console.log('✅ Environment variables found')
    
    // Test Razorpay client initialization
    const razorpay = getRazorpayClient()
    console.log('✅ Razorpay client initialized successfully')
    
    // Test creating a small order to verify credentials
    try {
      const order = await razorpay.orders.create({
        amount: 10000, // ₹100
        currency: 'INR',
        receipt: `test-${Date.now()}`
      })
      
      console.log('✅ Razorpay API test successful!')
      console.log('Test Order ID:', order.id)
      console.log('Test Order Amount:', order.amount / 100, 'INR')
      
    } catch (error) {
      console.error('❌ Razorpay API test failed:', error.message)
      if (error.error?.code === 'BAD_REQUEST_ERROR') {
        console.error('This usually means invalid API keys')
      }
    }
    
  } catch (error) {
    console.error('❌ Configuration check failed:', error.message)
  }
}

checkRazorpayConfig()
