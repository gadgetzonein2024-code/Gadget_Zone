import { Router } from 'express'
import paymentRouter from '../modules/payment/payment.routes.js'
import productRouter from '../modules/product/product.routes.js'
import authRouter from '../modules/auth/auth.routes.js'

const router = Router()

router.use('/payments', paymentRouter)
router.use('/products', productRouter)
router.use('/auth', authRouter)

router.get('/', (_req, res) => {
  res.json({ message: 'Gadget Zone API root' })
})

export default router
