import { Router } from 'express'
import { adminLogin, getProfile, loginUser, registerUser } from './auth.controller.js'
import { requireAuth } from '../../middleware/auth.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/admin/login', adminLogin)
router.get('/me', requireAuth(), getProfile)

export default router
