import { GET_USER } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'


const Recommend = ({ books }) => {
  const { loading, error, data } = useQuery(GET_USER) 

  if (loading) return <p>loading data...</p>
  if (error) return <p>Error: {error.message}</p>

  const { me } = data || {}

  const filteredBooks = books.filter(book => 
    book.genres.some(genre => genre.toLowerCase() === (me?.favoriteGenre?.toLowerCase()))
  )

  return (
    <div>
      <h2>recommendations</h2>
      <h3>hello, {me?.username}</h3>
      <p>books in your favorite genre <strong>{me?.favoriteGenre}</strong></p>  
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.published}</td>
              <td>{book.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Recommend.propTypes = {
  books: PropTypes.array,
}

export default Recommend