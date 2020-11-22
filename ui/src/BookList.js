import React, { useState } from 'react'
import { SearchBox } from './SearchBox'
import { Pagination } from './Pagination'
import { BookItem } from './BookItem'

const BOOK_SEARCH_ENDPOINT = process.env.REACT_APP_BOOK_SEARCH_ENDPOINT

export const BookList = () => {
  const [ pages, setPages ] = useState(0)
  const [ books, setBooks ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ currentPage, setCurrentPage ] = useState(1)

  const handleSearchButton = async (query, page = 1) => {
    const json = await fetchBooks(query, page)

    if (json === undefined || json.books === undefined) return

    const renderedBooks = json.books.map((book, index) => <div key={index}><BookItem detail={book}/><br/></div>)

    setBooks(renderedBooks)
    setPages(Math.ceil(json.totalBooks / 20))
    setQuery(query)
    setCurrentPage(page)
  }

  const handlePageClick = page => {
    return handleSearchButton(query, page)
  }

  const fetchBooks = async (query, pageNumber) => {
    const requestParams = `q=${query}&page=${pageNumber}`

    try {
      const response = await fetch(`${BOOK_SEARCH_ENDPOINT}?${requestParams}`)
      return await response.json()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div id="top" className="col-6 mx-auto">
      <SearchBox handleSearch={handleSearchButton}/>
      <br/>
      <div>{books}</div>
      <Pagination pages={pages} handleClick={handlePageClick} currentPage={currentPage}/>
    </div>
  )
}
