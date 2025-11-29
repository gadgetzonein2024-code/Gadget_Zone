import { verifyToken } from '../config/jwt.js'
import { User } from '../modules/auth/user.model.js'

export const requireAuth = (roles = []) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles]

  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required.' })
      }

      const token = authHeader.split(' ')[1]
      const payload = verifyToken(token)
      const user = await User.findById(payload.sub)
      if (!user) {
        return res.status(401).json({ message: 'Invalid token.' })
      }

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Insufficient permissions.' })
      }

      req.user = user
      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: 'Authentication failed.' })
    }
  }
}
