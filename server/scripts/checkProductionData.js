import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Product } from '../src/modules/product/product.model.js'

dotenv.config()

const checkProductionData = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gadget-zone'
    
    console.log('Checking database connection...')
    console.log('MongoDB URI:', MONGO_URI)
    
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    })
    
    console.log('Connected successfully!')
    
    const count = await Product.countDocuments()
    console.log(`Total products in database: ${count}`)
    
    if (count > 0) {
      const products = await Product.find().limit(3)
      console.log('Sample products:')
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - Tags: ${product.tags?.join(', ') || 'none'}`)
      })
    } else {
      console.log('❌ No products found in database!')
    }
    
  } catch (error) {
    console.error('❌ Check failed:', error.message)
  } finally {
    await mongoose.connection.close()
  }
}

checkProductionData()
