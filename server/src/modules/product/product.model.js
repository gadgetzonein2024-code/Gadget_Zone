import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: '' },
  },
  { _id: false }
)

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: false },
    helpful: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
)

const specificationSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    specs: [{
      name: { type: String, required: true },
      value: { type: String, required: true }
    }]
  },
  { _id: false }
)

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    originalPrice: { type: Number },
    discount: { type: Number },
    badge: { type: String },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    shortDescription: { type: String },
    fullDescription: { type: String },
    highlights: [{ type: String }],
    specifications: [specificationSchema],
    reviews: [reviewSchema],
    heroImage: { type: String },
    gallery: [imageSchema],
    inventory: {
      inStock: { type: Boolean, default: true },
      quantity: { type: Number, default: 0 },
      sku: { type: String },
      weight: { type: Number },
      dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number },
        unit: { type: String, default: 'cm' }
      }
    },
    shipping: {
      free: { type: Boolean, default: false },
      cost: { type: Number, default: 0 },
      deliveryTime: { type: String },
      returnPolicy: { type: String }
    },
    warranty: {
      period: { type: String },
      type: { type: String },
      description: { type: String }
    }
  },
  { timestamps: true }
)

productSchema.index({ name: 'text', brand: 'text', shortDescription: 'text' })

export const Product = mongoose.model('Product', productSchema)
