const express = require('express')
const { searchBooks, getBooksFromJson, getBooksCountFromJson } = require('./')

const books = express.Router()

books.get('/search', async (req, res) => {
  const { q, page } = req.query

  try {
    const { status, document } = await searchBooks(q, page)

    switch (status) {
      case 200:
        res.json({
          totalBooks: getBooksCountFromJson(document),
          books: getBooksFromJson(document)
        })
        break;
      default:
        res.status(status).json({
          error: status,
          message: 'Oops, something went wrong.'
        })
    }
  } catch (e) {
    res.status(500).json({
      error: 500,
      message: 'Oops, something went wrong.'
    })
  }
})

exports.books = books
