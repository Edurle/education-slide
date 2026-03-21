import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'

// Load .env from parent directory (ES module compatible)
import { config } from 'dotenv'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../../.env') })

import { agentRouter } from './routes/agent.js'

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/agent', agentRouter)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`Agent Education Server running on http://localhost:${PORT}`)
  console.log(`API Base: ${process.env.OPENAI_API_BASE}`)
  console.log(`Model: ${process.env.MODEL}`)
})
