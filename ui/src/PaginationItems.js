import React from 'react'

export const PaginationItems = (props) => {
  const buttons = props.pageNumbers.map(page => {
    if (page === props.currentPage) {
      return <em key={page} aria-current="page">{page}</em>
    } else {
      return (
        <a
          key={page}
          onClick={() => props.handleClick(page)}
          href={isNaN(Number(page)) ? '#page' : '#top'}
          aria-label={page}
        >
          {isNaN(Number(page)) ? '...' : page}
        </a>
      )
    }
  })

  return (
    <div className="pagination">
      {buttons}
    </div>
  )
}
