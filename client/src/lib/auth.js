import { apiRequest } from './api'

export const loginCustomer = (credentials) =>
  apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

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
