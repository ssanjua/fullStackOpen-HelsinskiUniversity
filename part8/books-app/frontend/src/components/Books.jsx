import PropTypes from 'prop-types'
import { useState } from 'react'

const Books = ({ books }) => {
  const [ filter, setFilter ] = useState("")

  if (books === null) {
    return null
  }

  const uniqueGenres = [...new Set(books.flatMap(book => book.genres))]

  const filteredBooks = books.filter(book =>
    book.genres.some(genre => genre.toLowerCase().includes(filter.toLowerCase()))
  )

  return (
    <div>
      <h2>books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
            <th>Author</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.published}</td>
              <td>{book.author.name}</td>
              <td>{book.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((genre) => (
          <button key={genre} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

Books.propTypes = {
  books: PropTypes.array
};

export default Books
