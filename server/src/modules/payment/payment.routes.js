import { Router } from 'express'
import { createOrder, verifySignature } from './payment.controller.js'

const router = Router()

router.post('/order', createOrder)
router.post('/verify', verifySignature)

export default router
