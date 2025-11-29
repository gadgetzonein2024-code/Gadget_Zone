import http from 'http'
import app from './server.js'

const PORT = process.env.PORT || 5000

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
