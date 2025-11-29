const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const buildUrl = (path) => {
  if (path.startsWith('http')) return path
  return `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(buildUrl(path), {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    const message = errorBody.message || 'API request failed'
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return response.json()
}
