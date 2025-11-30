# How to Add Environment Variables to Render Backend

## Step 1: Go to Render Dashboard
1. Visit https://dashboard.render.com/
2. Log in to your account

## Step 2: Find Your Backend Service
1. Look for your backend service (should be named something like "gadget-zone-api" or similar)
2. Click on the service name

## Step 3: Add Environment Variables
1. In your service dashboard, look for the "Environment" tab or section
2. Click "Add Environment Variable" or "Environment Variables"
3. Add the following variables:

### For Razorpay (Optional - for real payments):
```
RAZORPAY_KEY_ID=rzp_test_1DP5mmOlFfGpmG
RAZORPAY_KEY_SECRET=your_secret_here
```

### For Database (IMPORTANT - this should already be set):
```
MONGO_URI=mongodb+srv://your_connection_string
```

## Step 4: Deploy Changes
1. After adding environment variables, Render will automatically redeploy
2. Wait for the deployment to complete (usually 1-2 minutes)

## Step 5: Test the Changes
1. Visit your Netlify website
2. Try the checkout process
3. If using Razorpay test credentials, you'll see real payment modal
4. If no credentials, you'll see mock payment mode

## Alternative: Use Render CLI
If you have Render CLI installed:
```bash
# Set environment variables
render env set RAZORPAY_KEY_ID=rzp_test_1DP5mmOlFfGpmG
render env set RAZORPAY_KEY_SECRET=your_secret_here

# Check current environment variables
render env ls
```

## Important Notes:
- The backend should already have MONGO_URI set (otherwise products wouldn't work)
- Razorpay credentials are optional - the app works fine in mock mode
- Test credentials from Razorpay dashboard: https://dashboard.razorpay.com/app/keys
- Never share your secret keys publicly

## Current Status:
✅ Products are working (database is connected)
✅ Mock payment mode is working (no errors)
⚠️ Real payments need Razorpay credentials (optional)
