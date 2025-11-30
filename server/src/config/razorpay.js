import Razorpay from 'razorpay'

export const getRazorpayClient = () => {
  // Use environment variables if available, otherwise use demo test credentials
  const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_1234567890abcdefghijklmnop'
  const keySecret = process.env.RAZORPAY_KEY_SECRET || '1234567890abcdefghijklmnop1234567890abcdefghijklmnop'

  if (!keyId || !keySecret) {
    throw new Error('Missing Razorpay credentials. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.')
  }

  console.log('Using Razorpay Key ID:', keyId.substring(0, 10) + '...')
  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}
