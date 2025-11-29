// Frontend Debug Script - Run this in browser console on your Netlify site
// This will show exactly what your frontend is sending

console.log('🔍 Debugging frontend login...');

// 1. Check what the frontend is actually sending
const originalFetch = window.fetch;
window.fetch = function(...args) {
  if (args[0].includes('/auth/login')) {
    console.log('🌐 Frontend Login Request:');
    console.log('URL:', args[0]);
    console.log('Options:', args[1]);
    
    if (args[1] && args[1].body) {
      try {
        const body = JSON.parse(args[1].body);
        console.log('📧 Email:', body.email);
        console.log('🔑 Password:', body.password);
        console.log('📦 Full Body:', body);
      } catch (e) {
        console.log('📦 Body (raw):', args[1].body);
      }
    }
  }
  
  return originalFetch.apply(this, args).then(response => {
    if (args[0].includes('/auth/login')) {
      console.log('📥 Response Status:', response.status);
      console.log('📥 Response OK:', response.ok);
      
      // Clone response to read body without consuming it
      const clonedResponse = response.clone();
      clonedResponse.json().then(data => {
        console.log('📥 Response Body:', data);
      }).catch(() => {
        console.log('📥 Response Body: Not JSON');
      });
    }
    return response;
  });
};

// 2. Test the exact same data manually
async function testExactCredentials(email, password) {
  console.log('\n🧪 Testing exact credentials manually...');
  
  try {
    const response = await fetch('https://gadget-zone-7r8e.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password: password
      })
    });
    
    const data = await response.json();
    
    console.log('✅ Manual Test Result:');
    console.log('Status:', response.status);
    console.log('Data:', data);
    
    return { success: response.ok, data };
  } catch (error) {
    console.error('❌ Manual Test Error:', error);
    return { success: false, error: error.message };
  }
}

// 3. Test with the working customer account
console.log('\n🎯 Testing with working customer account...');
testExactCredentials('test@example.com', 'test123');

// 4. Test with admin credentials
console.log('\n👨‍💼 Testing with admin credentials...');
testExactCredentials('admin@gadgetzone.com', 'GZ@admin123');

// 5. Helper function to test any credentials
window.testCredentials = (email, password) => {
  return testExactCredentials(email, password);
};

console.log('\n💡 You can now test any credentials with:');
console.log('testCredentials("email@example.com", "password")');
console.log('\n🔄 Now try logging in through your website form...');
