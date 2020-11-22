import React, { useState } from 'react'

export const SearchBox = (props) => {
  const [ query, setQuery ] = useState('')

  const handleInput = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div className="TableObject">
      <div className="TableObject-item TableObject-item--primary">
        <input
          className="input-block form-control"
          type="text"
          placeholder="Search books by title, author, ISBN"
          aria-label="Search books by title, author, ISBN"
          value={query}
          onChange={handleInput}
        />
      </div>
      <div className="TableObject-item">
        <button className="btn ml-2" type="button" onClick={() => props.handleSearch(query)}>Search books</button>
      </div>
    </div>
  )
}
