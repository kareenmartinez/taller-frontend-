import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'

import { createApp } from './server.js'

test('POST /api/transactions saves a transaction and GET returns it', async () => {
  const app = createApp()
  const server = createServer(app)

  await new Promise((resolve) => server.listen(0, resolve))

  const address = server.address()
  const baseUrl = `http://127.0.0.1:${address.port}`

  try {
    const postResponse = await fetch(`${baseUrl}/api/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 85.5, description: 'Lunch meeting' }),
    })

    assert.equal(postResponse.status, 201)
    const created = await postResponse.json()
    assert.equal(created.description, 'Lunch meeting')
    assert.equal(created.amount, 85.5)

    const getResponse = await fetch(`${baseUrl}/api/transactions`)
    assert.equal(getResponse.status, 200)

    const transactions = await getResponse.json()
    assert.ok(Array.isArray(transactions))
    assert.ok(transactions.some((item) => item.description === 'Lunch meeting'))
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()))
    })
  }
})
