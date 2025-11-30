import Razorpay from 'razorpay'

export const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error('Missing Razorpay credentials. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.')
  }

  console.log('Using Razorpay Key ID:', keyId.substring(0, 10) + '...')
  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}
