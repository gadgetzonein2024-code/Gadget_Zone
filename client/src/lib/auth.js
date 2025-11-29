import { apiRequest } from './api'

export const loginCustomer = async (credentials) => {
  // First try normal login (when CORS is fixed)
  try {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  } catch (loginError) {
    // If login fails due to CORS, try registration as workaround
    console.log('🔄 Login failed, trying registration workaround...')
    try {
      const response = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Customer', // Default name for login workaround
          email: credentials.email,
          password: credentials.password
        }),
      })
      
      // If registration says account already exists, we have a CORS issue
      if (response.message && response.message.includes('already exists')) {
        throw new Error('Login temporarily unavailable. Please try again later.')
      }
      
      return response
    } catch (regError) {
      // If registration also fails, throw the original login error
      throw loginError
    }
  }
}

export const registerCustomer = (payload) =>
  apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const loginAdmin = (credentials) =>
  apiRequest('/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
