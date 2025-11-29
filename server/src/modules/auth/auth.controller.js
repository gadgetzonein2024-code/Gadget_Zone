import { User } from './user.model.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { signToken } from '../../config/jwt.js'

const sanitizeUser = (userDoc) => {
  const { password, __v, ...rest } = userDoc.toObject({ getters: true })
  rest.id = rest._id
  delete rest._id
  return rest
}

const buildAuthResponse = (user) => ({
  user: sanitizeUser(user),
  token: signToken({ sub: user.id, role: user.role }),
})

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' })
  }

  const existing = await User.findOne({ email })
  if (existing) {
    return res.status(409).json({ message: 'Account already exists for this email.' })
  }

  const user = await User.create({ name, email, password })
  res.status(201).json(buildAuthResponse(user))
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }

  res.json(buildAuthResponse(user))
})

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await User.findOne({ email, role: 'admin' }).select('+password')
  if (!admin) {
    return res.status(401).json({ message: 'Admin account not found.' })
  }

  const isMatch = await admin.comparePassword(password)
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid admin credentials.' })
  }

  res.json(buildAuthResponse(admin))
})

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ user: sanitizeUser(req.user) })
})
