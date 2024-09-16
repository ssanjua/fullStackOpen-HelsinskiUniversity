import PropTypes from 'prop-types'
import { useState } from 'react'
import { GET_GENRES } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const Books = ({ books }) => {
  const [ filter, setFilter ] = useState("")

  const { data, loading, error } = useQuery(GET_GENRES)

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  const { allGenres } = data || {}

  if (books === null) {
    return null
  }

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
        {allGenres.map((genre) => (
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
