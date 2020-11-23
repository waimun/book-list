# An application that uses Goodreads API to search for books

- This application has two parts.
  - a frontend UI that has a search box that lets the user search books by title, author, or ISBN. Displays a list of books found, and beneath it, a pagination control where the user can page through the search results.
  - an API endpoint that proxies [Goodreads Public API](https://www.goodreads.com/api/index#search.books), and transforms the data that the UI needs to render the list of books.

## Tech Stack

- [UI](ui): a Single Page Application written in React.
- [API](api): Node.js and Express.
