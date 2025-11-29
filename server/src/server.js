import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDatabase } from './config/db.js'
import apiRouter from './routes/index.js'
import { ensureDefaultAdmin } from './modules/auth/admin.seed.js'

dotenv.config()

const app = express()

app.use(cors({ 
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://gadgetzone2024.netlify.app',
    'https://gadget-zone-7r8e.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'gadget-zone-api' })
})

app.use('/api', apiRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' })
})

connectDatabase()
  .then(() => {
    console.log('MongoDB connected')
    return ensureDefaultAdmin()
  })
  .catch((error) => {
    console.error('Database connection failed', error)
    process.exit(1)
  })

export default app
