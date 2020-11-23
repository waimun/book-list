# Overview

This project provides an API to search for books using [Goodreads API](https://www.goodreads.com/api).

- The search endpoint is `/api/books/search`
  - Takes 3 query parameters:
    - `q` (required) - search query; book title, author, or ISBN
    - `page` (optional) - page number of the results if paginated; defaults to 1
    - `key` (required) - developer API key from Goodreads; obtainable by signing up for an account

# Getting Started

The API is built using Node.js, and Express. Make sure you have Node.js installed locally. At the time
of writing, the Node.js version is 14.15.1.

### Step 1

After downloading the source code, install the project dependencies using `npm`. Open a terminal, and in the
root of the project where `package.json` resides, type:

```
npm install
```

### Step 2

You need a developer API key from Goodreads. After you have signed up for an API key, you can
specify the key via an environment variable.

```
export GOOD_READS_API_KEY=paste_your_api_key_here
```

### Step 3

To start the API server, open a terminal and in the root of the project, type:

```
node src/server.js
```

By default, the API is serving requests at `http://localhost:3001/api/books/search`.

To specify a different port, set the environment variable as follows, and replace the value with a different port.

```
export API_PORT=another_port_number
```

# API

The [Goodreads API](https://www.goodreads.com/api) to find books by title, author, or ISBN is at
` https://www.goodreads.com/search/index.xml`.

Since Goodreads API is XML-based, I have used `xml2js` to translate XML to JSON.

- After converting to JSON, I have selected some fields to return to the client.
  - ratingsCount
  - averageRating
  - publicationYear
  - title
  - author
  - imageUrl

- A few functions worth mentioning in `src/books/index.js` are:
  - `convertXmlToJson` - converts XML content to JSON
  - `getBooksFromJson` - maps Goodreads data to a custom object using `toBookDto` function
  - `getBooksCountFromJson` - returns the total number of results; used for pagination
