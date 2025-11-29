import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gadget-zone'

export const connectDatabase = async () => {
  mongoose.set('strictQuery', false)
  return mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
}
