const express = require('express')
const cors = require('cors')

const { books } = require('./books/router')

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.API_PORT || 3001

app.get('/', (req, res) => {
  res.send('Welcome to Books API!')
})

app.use('/api/books', books)

app.listen(port, () => {
  console.log(`Books API listening at http://localhost:${port}`)
})
