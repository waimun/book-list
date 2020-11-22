# Overview

- This project uses [Create React App](https://github.com/facebook/create-react-app). To learn more about its
creation process and usage, you can visit the link.
- This application requires an API endpoint that searches for books via a proxy to Goodreads API.
  - The environment variable `REACT_APP_BOOK_SEARCH_ENDPOINT` in the `.env` file defines the endpoint.
  - The API project is in the `api` top-level folder of this repository.

# React Components Design

## BookList

In `App.js`, the `BookList` component renders. At a high level, this component consists of 3 components that are
responsible for searching books, displaying a list of books, and paginating the results returned from the search.

```
----------------------
| BookList           |
|                    |
|   -------------    |
|   | SearchBox |    |
|   -------------    |
|                    |
|   ------------     |
|   | BookItem |     |
|   ------------     |
|   ------------     |
|   | BookItem |     |
|   ------------     |
|   ------------     |
|   |   ...    |     |
|   ------------     |
|                    |
|   --------------   |
|   | Pagination |   |
|   --------------   |
----------------------
```

The primary goal of the `BookList` is to call the API to search for books, and handle the search request when the user
clicks the search button in the `SearchBox` component.

- The search request has two parameters - `query` and `page`.
  - `query` comes from the `SearchBox`
  - `page` comes from the `BookList`

In this component, there is a helper function: `fetchBooks` that uses two parameters to fetch data from the API.

- `BookList` component maintains 4 state variables: `pages`, `books`, `query`, and `currentPage`
  - `pages` - calculates the number of pages based on the results fetched from the API
  - `books` - a collection of `BookItem` mapped from the API response
  - `query` - the user's input from the `SearchBox`
  - `currentPage` - the current page of search results requested by the user

**Note:** The API endpoint is available in this component via the environment variable
`REACT_APP_BOOK_SEARCH_ENDPOINT`.

## SearchBox

The `SearchBox` component consists of a text input field, and a search button.

The main responsibility of this component is to store the value of the query entered by the user and nothing else.

When the user clicks the search button, the click handler function associated with the search button takes the query
value that is stored in the component's state. The click handler comes from the component's props `handleSearch`
and the function `handleSearchButton` belongs to its parent component `BookList`.

This component is not aware of how search works because the search logic originates from its parent component.

## BookItem

The `BookItem` component displays a book's details such as title, author, publication, and others.

The book data to be displayed is passed via props `detail`.

In `BookList`, the `handleSearchButton` function maps the JSON data returned from the API to individual `BookItem`s.

## Pagination

This component is perhaps the most interesting as it deals with a lot of context around pagination logic.

Occasionally, when there are too many results returned from the API, the number of books displayed in the list is 20
per page. The `Pagination` component located at the bottom of the list displays only 10 pages at a time, but you can
always scroll forward/backwards by clicking on the ellipsis. For example, below.

```
... 4 5 6 7 8 *9* 10 11 12 13 ...
```

The highlighted page number indicates to the user that it is the current page. In the above example, it is page 9.

### State

The only state used by the `Pagination` component is `pageNumbers`. This state variable controls pagination display.

The component renders everytime `pageNumbers` changes.

`pageNumbers` is an array of labels for the page numbers to be displayed as buttons in the `Pagination` component.
Other than an array of numbers, it can sometimes contain labels for the ellipsis (...) to scroll forward or backwards.
The label for the ellipsis can either be `<` or `>` to indicate if it is a forward/backwards scroll.

### Props

The `Pagination` component has these props: `pages`, `handleClick`, and `currentPage`.

When the API returns results, `BookList` component calculates the number of pages based on the total number of
results, and passes it to `Pagination` via `props.pages`.

`props.handleClick` delegates upwards to the `handlePageClick` of the `BookList` component, which in turn calls the
`handleSearchButton` function since it only has knowledge of the page requested at this level. There is a separation
of concern here.

`props.currentPage` is used to highlight the current page that the user is on. This value comes from the `BookList`
component state variable after the search finishes.

## PaginationItems

This is a child component of `Pagination` that facilitates rendering of the HTML for the page buttons.

It has 3 props: `pageNumbers`, `handleClick`, and `currentPage`.

Value of `props.pageNumbers` comes from its parent component state variable `pageNumbers`.

`props.handleClick` references `handlePageClick` function of its parent component. This function is responsible for
re-ordering the page numbers every time the user clicks an ellipsis (...) labeled button. If the user clicks on a page
number instead, this function will delegate upwards to the `handlePageClick` function of the `BookList` component.

`props.currentPage` activates the button as a different style to indicate the current requested page.
