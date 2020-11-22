import React from 'react'

export const BookItem = (props) => {
  return (
    <div className="Box">
      <div className="Box-header">
        <h3 className="Box-title">
          <img
            className="avatar"
            alt="Book cover"
            src={props.detail.imageUrl}
            width="48"
            height="48"
          />
          &nbsp;
          {props.detail.title}
        </h3>
      </div>
      <div className="Box-body">
        <p><strong>Author:</strong> {props.detail.author}</p>
        <p><strong>Publication Year:</strong> {props.detail.publicationYear}</p>
      </div>
      <div className="Box-footer">
        <p>
          <strong>Average Rating:</strong> {props.detail.averageRating}
          &nbsp;|&nbsp;
          <strong>Total Ratings:</strong> {props.detail.ratingsCount}
        </p>
      </div>
    </div>
  )
}
