import { Router } from 'express'
import { getProducts, getProductBySlug, seedProducts } from './product.controller.js'

const router = Router()

router.get('/', getProducts)
router.get('/:slug', getProductBySlug)
router.post('/seed', seedProducts)

export default router
