import React, { useEffect, useState } from 'react'
import { PaginationItems } from './PaginationItems'

export const Pagination = (props) => {
  const [ pageNumbers, setPageNumbers ] = useState([])

  useEffect(() => {
    const allPageNumbers = Array(props.pages).fill(0).map((e, i) => i + 1)
    const decorated = trimEnd(allPageNumbers)

    if (hasMorePagesAtTheEnd(props.pages, decorated)) decorated.push('>')
    setPageNumbers(decorated)
  }, [props.pages])

  const hasMorePagesAtTheEnd = (totalPages, array) => {
    if (array && array.length > 0) {
      return array[array.length - 1] < totalPages
    }

    return false
  }

  const hasMorePagesAtTheStart = (array) => {
    if (array && array.length > 0) {
      return array[0] > 1
    }

    return false
  }

  const trimStart = (array) => {
    return (array.length <= 10) ? array : array.slice(array.length - 10)
  }

  const trimEnd = (array) => {
    return (array.length <= 10) ? array : array.slice(0,10)
  }

  const appendPages = (startNumber, count, pages) => {
    const appended = []
    for (let i = 0, nextPage = startNumber; i < count; i++) {
      nextPage += 1
      if (nextPage <= pages) appended.push(nextPage)
    }

    return appended
  }

  const prependPages = (startNumber, count) => {
    const prepended = []
    for (let i = 0, prevPage = startNumber; i < count; i++) {
      prevPage -= 1
      if (prevPage >= 1) prepended.push(prevPage)
    }

    return prepended.reverse()
  }

  const handlePageClick = page => {
    let array, appended, prepended, decorated

    switch (page) {
      case '>':
        array = [...pageNumbers]
        if (array.indexOf('<') !== -1) array.shift() // remove <
        if (array.indexOf('>') !== -1) array.pop() // remove >

        appended = appendPages(array[array.length - 1], 3, props.pages)
        decorated = array.concat(...appended)
        decorated = trimStart(decorated)
        if (hasMorePagesAtTheEnd(props.pages, decorated)) decorated.push('>')
        if (hasMorePagesAtTheStart(decorated)) decorated.unshift('<')

        setPageNumbers(decorated)
        break;
      case '<':
        array = [...pageNumbers]
        if (array.indexOf('<') !== -1) array.shift() // remove <
        if (array.indexOf('>') !== -1) array.pop() // remove >

        prepended = prependPages(array[0], 3)
        decorated = prepended.concat(...array)
        decorated = trimEnd(decorated)
        if (hasMorePagesAtTheEnd(props.pages, decorated)) decorated.push('>')
        if (hasMorePagesAtTheStart(decorated)) decorated.unshift('<')

        setPageNumbers(decorated)
        break;
      default:
        props.handleClick(page)
    }
  }

  return (
    <nav id="page" className="paginate-container" aria-label="Pagination">
      <PaginationItems pageNumbers={pageNumbers} handleClick={handlePageClick} currentPage={props.currentPage}/>
    </nav>
  )
}
