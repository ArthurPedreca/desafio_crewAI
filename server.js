import express from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(express.json())

const CATALOG_PATH = join(__dirname, 'mock_catalog.json')
const TICKETS_PATH = join(__dirname, 'mock_ticket.json')

if (!existsSync(TICKETS_PATH)) {
  writeFileSync(TICKETS_PATH, JSON.stringify({ tickets: [] }, null, 2), 'utf8')
}

app.get('/catalog', (_req, res) => {
  try {
    const data = JSON.parse(readFileSync(CATALOG_PATH, 'utf8'))
    res.json(data)
  } catch {
    res.json({ books: [] })
  }
})

app.get('/tickets', (_req, res) => {
  try {
    const data = JSON.parse(readFileSync(TICKETS_PATH, 'utf8'))
    res.json(data)
  } catch {
    res.json({ tickets: [] })
  }
})

app.post('/tickets', (req, res) => {
  const title = (req.body?.title || '').trim()
  const description = (req.body?.description || '').trim()
  if (!title) return res.status(400).json({ error: 'title é obrigatório' })

  let data
  try {
    data = JSON.parse(readFileSync(TICKETS_PATH, 'utf8'))
  } catch {
    data = { tickets: [] }
  }

  const ticket = {
    id: (data.tickets?.length || 0) + 1,
    title,
    description,
    book_title: req.body?.book_title || null,
    priority: req.body?.priority || 'baixa'
  }

  data.tickets = [...(data.tickets || []), ticket]
  writeFileSync(TICKETS_PATH, JSON.stringify(data, null, 2), 'utf8')

  res.status(201).json(ticket)
})

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`API on http://127.0.0.1:${port}`))
