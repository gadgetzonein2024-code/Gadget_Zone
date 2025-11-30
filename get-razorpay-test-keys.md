# How to Get Razorpay Test Keys for Demo Mode

## Step 1: Create Razorpay Account
1. Go to https://razorpay.com/
2. Click "Sign Up" 
3. Fill in your details (email, phone, etc.)
4. Verify your email and phone

## Step 2: Access Test Mode
1. After logging in, you'll be in Test Mode by default
2. Look for the mode toggle (should say "Test Mode")
3. If you're in Live Mode, switch to Test Mode

## Step 3: Get Test Keys
1. Go to https://dashboard.razorpay.com/app/keys
2. You'll see your Test Keys:
   - Key ID: starts with `rzp_test_`
   - Key Secret: hidden, click "Show" to reveal

## Step 4: Copy the Keys
Example format (your actual keys will be different):
```
Key ID: rzp_test_ABCDEFGHIJKLMNOPQRSTUVWXYZ
Key Secret: abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

## Step 5: Add to Your Project
### Option A: Netlify Environment Variables (Recommended)
1. Go to your Netlify dashboard
2. Find your site → Site settings → Build & deploy → Environment
3. Add:
   - `VITE_RAZORPAY_KEY_ID` = your copied Key ID
   - `VITE_RAZORPAY_KEY_SECRET` = your copied Key Secret

### Option B: Render Backend Environment Variables
1. Go to your Render dashboard
2. Find your backend service
3. Add Environment Variables:
   - `RAZORPAY_KEY_ID` = your copied Key ID
   - `RAZORPAY_KEY_SECRET` = your copied Key Secret

## Step 6: Test Payment Flow
Once deployed, you'll see:
- Real Razorpay payment modal
- Test card options
- Complete payment simulation

## Test Card Details for Razorpay Test Mode:
```
Card Number: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
Name: Any name
```

## Benefits:
✅ Real payment modal experience
✅ Test card payments (no real charges)
✅ Complete checkout flow
✅ Professional demo presentation

## Current Status:
⚠️ Using mock mode (no payment modal)
🎯 After setup: Real Razorpay test modal
