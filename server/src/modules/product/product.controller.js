import { Product } from './product.model.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'

const buildFilters = (query) => {
  const filters = {}
  if (query.tag) {
    filters.tags = query.tag
  }
  if (query.search) {
    filters.$text = { $search: query.search }
  }
  return filters
}

export const getProducts = asyncHandler(async (req, res) => {
  const { limit = 8, sort = '-createdAt' } = req.query
  const filters = buildFilters(req.query)

  const products = await Product.find(filters)
    .sort(sort)
    .limit(Number(limit))

  res.json({ data: products })
})

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json({ data: product })
})
