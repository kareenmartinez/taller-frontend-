import express from 'express'
import cors from 'cors'
import { pathToFileURL } from 'node:url'

const transactions = []

export function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.get('/transactions', (req, res) => {
    res.json(transactions)
  })

  app.post('/transactions', (req, res) => {
    const { amount, description } = req.body ?? {}

    if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        error: 'Transaction amount must be a positive number.',
      })
    }

    const trimmedDescription = typeof description === 'string' ? description.trim() : ''
    if (!trimmedDescription) {
      return res.status(400).json({
        error: 'Transaction description is required.',
      })
    }

    const transaction = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      amount: Number(amount.toFixed(2)),
      description: trimmedDescription,
      createdAt: new Date().toISOString(),
    }

    transactions.push(transaction)

    return res.status(201).json(transaction)
  })

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }

    console.error(err)
    return res.status(500).json({ error: 'Something went wrong on the server.' })
  })

  return app
}

const app = createApp()
const PORT = Number(process.env.PORT) || 300

const isMainModule =
  typeof process.argv[1] === 'string' &&
  import.meta.url === pathToFileURL(process.argv[1]).href

if (isMainModule) {
  app.listen(PORT, () => {
    console.log(`Transaction API listening on port ${PORT}`)
  })
}

export default app
