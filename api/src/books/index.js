const GOOD_READS_API_KEY = process.env.GOOD_READS_API_KEY

if (GOOD_READS_API_KEY === undefined) throw new Error('GOOD_READS_API_KEY env variable is not found')

const searchBooks = async (query = '', page = 1) => {
  return new Promise((resolve, reject) => {

    const https = require('https')
    const options = {
      hostname: 'www.goodreads.com',
      path: `/search/index.xml?q=${encodeURIComponent(query)}&page=${page}&key=${GOOD_READS_API_KEY}`
    }

    console.log(`fetching... ${options.path}`)

    const req = https.request(options, (res) => {
      let content = ''

      res.on('data', d => { content += d.toString() })
      res.on('end', () => resolve({ status: res.statusCode, document: convertXmlToJson(content) }))
    })

    req.on('error', e => {
      console.error(`error fetching... ${options.path}`)
      reject(e)
    })

    req.end()
  })
}

const convertXmlToJson = xml => {
  const parseString = require('xml2js').parseString
  let json = undefined
  parseString(xml, (error, result) => json = result)
  return json
}

const getBooksFromJson = json => {
  const { GoodreadsResponse } = json
  const works = GoodreadsResponse.search[0].results[0].work
  return works === undefined ? [] : works.map(work => toBookDto(work))
}

const getBooksCountFromJson = json => {
  const { GoodreadsResponse } = json
  const [ count ] = GoodreadsResponse.search[0]['total-results']
  return count
}

const toBookDto = work => {
  const [ ratingsCount ] = work.ratings_count

  let [ averageRating ] = work.average_rating
  if (averageRating._ !== undefined) averageRating = averageRating._

  const [ publicationYear ] = work.original_publication_year

  const [ book ] = work.best_book
  const { title, author, image_url } = book

  const [ bookTitle ] = title
  const [ imageUrl ] = image_url

  const [ authorObj ] = author
  const { name } = authorObj
  const [ authorName ] = name

  return {
    ratingsCount: ratingsCount._,
    averageRating,
    publicationYear: publicationYear._,
    title: bookTitle,
    author: authorName,
    imageUrl
  }
}

exports.searchBooks = searchBooks
exports.getBooksFromJson = getBooksFromJson
exports.getBooksCountFromJson = getBooksCountFromJson
