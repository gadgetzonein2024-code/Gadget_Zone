import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h'

export const signToken = (payload, options = {}) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, ...options })

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET)
